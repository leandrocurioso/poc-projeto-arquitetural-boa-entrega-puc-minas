class ScopeMiddleware {
    static getMiddleware() {
        return (scopes = []) => (req, res, next) => {
            try {
                if (scopes.length === 0) return next();
                const scope = scopes.find((y) => req.jwt.scopes.find((x) => x === y));
                if (!scope) {
                    const err = new Error('Forbidden (Invalid Token Scope)');
                    err.status = 403;
                    throw err;
                }
                return next();
            } catch (err) {
                next(err);
            }
        };
    }
}

module.exports = ScopeMiddleware.getMiddleware();