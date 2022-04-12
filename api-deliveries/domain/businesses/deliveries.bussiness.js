const Bussiness = require("./bussiness");

class DeliveriesBussiness extends Bussiness {
  constructor({ boaEntregaOrdersService, sqsServicenewDeliveries, geoDistanceService, warehousesBussiness, repository  }) {
    super({ repository });
    this.geoDistanceService = geoDistanceService;
    this.warehousesBussiness = warehousesBussiness;
    this.sqsServicenewDeliveries = sqsServicenewDeliveries;
    this.boaEntregaOrdersService = boaEntregaOrdersService;
  }

  async undeliveredOrderList(authorization) {
    const connection = await this.repository.getConnection();
    try {
      const undeliveredOrderList = await this.boaEntregaOrdersService.getUndeliveredOrderList(authorization);
      if (undeliveredOrderList.length === 0) return [];
      const orderIds = undeliveredOrderList.map(x => x.order_id);
      const deliveryList = await this.repository.undeliveredOrderList(orderIds, connection); 

      return undeliveredOrderList.map(order => {
        return {
          deliveryRoute: deliveryList.filter(y => y.order_id === order.order_id), 
          order
        };
      });
    } catch (err) {
      throw err;
    } finally {
      connection.end();
    }
  };

  async queueCreateEvent(data) {
    return await this.sqsServicenewDeliveries.send(data);
  }

 
  async create(data) {
    const connection = await this.repository.getConnection();
    try {
      await connection.beginTransaction();
    
      const warehouses = await this.warehousesBussiness.list(connection); 
      const location = await this.geoDistanceService.getCoordinatesFromAddress(data.client.address);
      const distances = warehouses.map(warehouse => {
        return {
          id: warehouse.id,
          latitude: warehouse.latitude, 
          longitude: warehouse.longitude,
          distance: this.geoDistanceService.getkmDistance(
            warehouse.latitude, 
            warehouse.longitude,
            location.lat,
            location.lng
          )
        };
      });

      const minimumDistance = Math.min(...distances.map(x => x.distance));
      const distanceObj = distances.find(x => x.distance === minimumDistance);
      
      // Origin warehouse
      await this.repository.createDelivery({
        orderId: data.order.id,
        latitude: distanceObj.latitude,
        longitude: distanceObj.longitude
      }, connection); 

      // Client destination
      await this.repository.createDelivery({
        orderId: data.order.id,
        latitude: location.lat,
        longitude: location.lng
      }, connection);  

      data.delivery = {
        distanceInKilometers: distanceObj.distance
      };
      
      // http call to charge API
      // to be done here!!!

      await connection.commit();

    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.end();
    }
  }
}

module.exports = DeliveriesBussiness;