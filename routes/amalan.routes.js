const { authJwt } = require("../middleware");
const controller = require("../controllers/amalan.controller");

var base_path = '/api/v1/';

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "X-Access-Token, Origin, Content-Type, Accept"
        );
        next();
    });

    let guard = [authJwt.verifyToken];

    app.get(`${base_path}amalan`, guard, controller.getAll);
    app.post(`${base_path}amalan`, guard, controller.post);
    app.get(`${base_path}amalan/:userUid`, guard, controller.get);
    app.get(`${base_path}amalan/:uid`, guard, controller.find);
    app.delete(`${base_path}amalan/:uid`, guard, controller.delete);
    app.put(`${base_path}amalan/:uid`, guard, controller.update);
    app.get(`${base_path}amalan_count/:uuid`, guard, controller.count);
}