function put(req, res, Model, valueObj, clauseObj, message) {
    Model.findOne(clauseObj).then(found => {
        if (!found) {
            res.status(404).send({
                message: 'Not Found!'
            });
        } else {
            Model.update(valueObj, clauseObj)
                .then(() => {
                    res.status(201).send({
                        message: message
                    });
                    res.end();
                }).catch(err => {
                    res.status(500).send({
                        message: err.message
                    })
                })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

module.exports = { put }