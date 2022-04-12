class BoaEntregaDeliveriesService {
  constructor({ axios, url }) {
    this.axios = axios;
    this.url = url;
  }

  async createDelivery(data) {
      const result = await this.axios.post(`${this.url}/v1/deliveries`, data, {
        headers: {
            Authorization: `Bearer ${data.authorization}`
        }
      }).catch((err) => {
          throw new Error(`An error happened while calling the orders api (${err.response.status})`);
      });
    if (result.status === 200) return result.data;
    return null;
  }
  
}

module.exports = BoaEntregaDeliveriesService;
