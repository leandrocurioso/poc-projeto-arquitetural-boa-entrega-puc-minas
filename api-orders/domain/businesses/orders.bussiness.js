const Bussiness = require("./bussiness");

class OrdersBussiness extends Bussiness {
  constructor({ sqsServicenewOrder, boaEntregaDeliveriesService, repository  }) {
    super({ repository });
    this.sqsServicenewOrder = sqsServicenewOrder;
    this.boaEntregaDeliveriesService = boaEntregaDeliveriesService;
  }

  async queueCreateEvent(data) {
    let err = null;
    if (!data.thirdPartyOrderId && !data.client || !Array.isArray(data.products) || data.products.length === 0) {
      err = new Error('Invalid parameters to queue a new creation event!');
      err.status = 400;
      throw err;
    }
    return await this.sqsServicenewOrder.send(data);
  }

  async list() {
    const connection = await this.repository.getConnection();
    try {
      return await this.repository.list(connection); 
    } catch (err) {
      throw err;
    } finally {
      connection.end();
    }
  };

  async createOrder(data) {
    const connection = await this.repository.getConnection();
    const parsedData = {
      clientAccessKey: data.clientAccessKey,
      thirdPartyOrderId: data.thirdPartyOrderId,
      clientName: data.client.name,
      clientEmail: data.client.email,
      clientTelephone: data.client.telephone,
      clientDocumentId: data.client.documentId,
      clientDocumentType: data.client.documentType,
      clientAddressStreet: data.client.address.street,
      clientAddressDistrict: data.client.address.district,
      clientAddressNumber: data.client.address.number,
      clientAddressCity: data.client.address.city,
      clientAddressState: data.client.address.state,
      clientAddressCountry: data.client.address.country,
      clientAddressAdditional: data.client.address.additional,
      clientAddressZipcode: data.client.address.zipcode
    };

    try {
      await connection.beginTransaction();

      await this.repository.truncateTable('order_product', connection); 
      await this.repository.truncateTable('order', connection); 
    
      const orderResult = await this.repository.createOrder(parsedData, connection); 

      const resultInsertOrderProducts = [];
      for (const product of data.products) {
        const resultInsertOrderProduct = await this.repository.createOrderProduct(orderResult.insertId, product, connection);
        resultInsertOrderProducts.push(resultInsertOrderProduct);
      }


      data.order = { id: orderResult.insertId };
      for (let i=0;i < resultInsertOrderProducts.length;i++) {
        data.products[i]['id'] =  resultInsertOrderProducts[i].insertId;
      }
      
      await this.boaEntregaDeliveriesService.createDelivery(data);

      await connection.commit();

    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.end();
    }
  }
}

module.exports = OrdersBussiness;