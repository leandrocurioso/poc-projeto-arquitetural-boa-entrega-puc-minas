class BoaEntregaOrdersService {
  constructor({ axios, url }) {
    this.axios = axios;
    this.url = url;
  }

  async getUndeliveredOrderList(authorization) {
      const result = await this.axios.get(`${this.url}/v1/orders/undelivered`, {
        headers: {
            Authorization: `Bearer ${ authorization}`
        }
      }).catch((err) => {
          throw new Error(`An error happened while calling the orders api (${err.response.status})`);
      });
    if (result.status === 200) return result.data;
    return null;
  }
  
}

module.exports = BoaEntregaOrdersService;
