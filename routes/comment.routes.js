const { authJwt } = require("../middleware");
const controller = require("../controllers/comment.controller")

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

    app.get(`${base_path}comment/:blogUid`, guard, controller.get);
    app.post(`${base_path}comment/:blogUid`, guard, controller.post);
    app.delete(`${base_path}comment/:uid`, guard, controller.delete);
}