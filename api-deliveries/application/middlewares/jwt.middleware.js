const JwtService = require('../../infrastructure/services/jwt.service');
const jwtService = new JwtService();

class JwtMiddleware {
    static getMiddleware() {
        return (req, res, next) => {
            try {
                let authorization = req.headers.authorization || '';
                authorization = authorization.replace('Bearer ', '');
                req.jwt = jwtService.getPayload(authorization);
                req.authorization = authorization;
                return next();
            } catch (err) {
                next(err);
            }
        };;
    }
}

module.exports = JwtMiddleware.getMiddleware();