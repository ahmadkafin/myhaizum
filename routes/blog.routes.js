const { authJwt } = require("../middleware");
const controller = require("../controllers/blog.controller");

var base_path = '/api/v1/';

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "X-Access-Token, Origin, Content-Type, Accept"
        );
        next();
    });

    let guard = [authJwt.verifyToken, authJwt.checkUserIfInternal];

    app.get(`${base_path}blog`, guard, controller.get);
    app.get(`${base_path}blog/:uid`, guard, controller.find);
    app.post(`${base_path}blog`, guard, controller.post);

    // for add like and update
    app.put(`${base_path}blog/:uid`, guard, controller.update);
    app.delete(`${base_path}blog/:uid`, guard, controller.delete);
}