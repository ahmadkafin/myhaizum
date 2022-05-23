function del(req, res, Model, clauseObj) {
    Model.findOne(clauseObj).then(data => {
        if (!data) {
            res.status(404).send({
                message: "Not Found!"
            })
        } else {
            Model.destroy(clauseObj).then(() => {
                res.status(204);
                res.end();
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
        res.end();
    });
}

module.exports = { del }