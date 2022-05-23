function gets(req, res, Model) {
    Model.findAll().then(data => {
        res.status(200).json(data);
        res.end();
    }).catch(err => {
        res.status(500).json(err.message);
        res.end
    });
}

module.exports = { gets }