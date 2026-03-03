const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (e) {
        res.status(400);
        next(new Error(e.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')));
    }
};

module.exports = validate;
