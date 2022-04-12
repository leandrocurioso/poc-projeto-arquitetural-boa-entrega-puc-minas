const JsonWebToken = require('jsonwebtoken');

class JwtService {
  constructor(jsonwebtoken = JsonWebToken) {
    this.jsonwebtoken = jsonwebtoken;
  }

  encode(data, secretKey, expiresIn = '1h') {
    return new Promise((resolve, reject) => {
      this.jsonwebtoken.sign(
              data,
              secretKey,
              { algorithm: 'HS256', expiresIn },
              (err, token) => {
              if (err) throw reject(err);
              return resolve(token);
            }
        );
    });
  }

  decode(token, secretKey) {
    return new Promise((resolve, reject) => {
      this.jsonwebtoken.verify(token, secretKey, (err, decoded) => {
        if (err) throw reject(err);
        return resolve(decoded);
      });
    });
  }

  async refresh(token, secretKey, expiresIn) {
    const decodedToken = await this.decode(token, secretKey);
    return await this.encode(decodedToken, secretKey, expiresIn);
  }

  getPayload(rawAuthorization) {
    const splitedAuthorization = rawAuthorization.split('.').map((x) => x.trim());
    if (!splitedAuthorization || !Array.isArray(splitedAuthorization) || splitedAuthorization.length !== 3){
        const err = new Error('Forbidden');
        err.status = 403;
        throw err;
    }
    const [header, payload, signature] = splitedAuthorization;
    const decodedPayloadStr = Buffer.from(payload, 'base64').toString();
    const parsedPayload = JSON.parse(decodedPayloadStr);
    return parsedPayload;
  }
}

module.exports = JwtService;