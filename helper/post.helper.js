function post(req, res, Model, valueObj, message) {
    Model.create(valueObj)
        .then(() => {
            res.status(201).send({
                message: message
            });
        }).catch(err => {
            res.status(500).json(err.message);
        });
}

module.exports = { post }