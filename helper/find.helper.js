function find(req, res, Model, clauseObj) {
    Model.findOne(clauseObj)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not Found!"
                });
                res.end();
            } else {
                res.status(200).json(data);
                res.end();
            }
        }).catch(err => {
            res.status(500).json(err.message);
        });
}


function findWithClause(req, res, Model, clauseObj, msg) {
    Model.findAll(clauseObj)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: msg
                });
                res.end();
            } else {
                res.status(200).json(data);
                res.end();
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        });
}

module.exports = { find, findWithClause }