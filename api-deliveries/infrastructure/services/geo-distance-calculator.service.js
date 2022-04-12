class GeoDistanceService {

  constructor({ axios, googleApiKey }) {
    this.axios = axios;
    this.googleApiKey = googleApiKey
  }

  //This function takes in latitude and longitude of two location 
  // and returns the distance between them as the crow flies (in km)
  getkmDistance(lat1, lon1, lat2, lon2) 
  {
    var R = 6371; // km
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }

  toRad(Value) {
    return Value * Math.PI / 180;
  }

  async getCoordinatesFromAddress(address) {
      let fullAddress = `${address.street}, ${address.number}, ${address.district}, ${address.city}, ${address.state}, ${address.country}, ${address.zipcode}`;
      fullAddress = fullAddress.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${this.googleApiKey}`;
      const result = await this.axios.get(url).catch((err) => {
          console.log(err.response.data);
          console.log(err.response.status);
          throw err;
      });

      if (result.data.results.length === 0) {
        const err = new Error('Cannot find geocoordinates for the given address.');
        err.status = 400;
        throw err;
      }
      const { location } = result.data.results[0].geometry;
      return location;
  }
  
}

module.exports = GeoDistanceService;
