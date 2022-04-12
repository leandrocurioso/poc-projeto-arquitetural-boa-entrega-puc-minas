class RouteValidatorMiddleware {
    static getMiddleware() {
        return (joiSchema) => async (req, res, next) => {
            const expectedSchema = {};
            joiSchema.$_terms.keys.forEach((obj) => {
                expectedSchema[obj.key] = req[obj.key];
            });
            return await joiSchema.validateAsync(expectedSchema, { abortEarly: false })
                .then(() => next())
                .catch((err) => {
                    err.isJoi = true;
                    err.status = 400;
                    next(err);
                });
          };
    }
}

module.exports = RouteValidatorMiddleware.getMiddleware();