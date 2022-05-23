const db = require("../models");
const Amalan = db.amalan;

const get = require("../helper/get.helper");
const post = require("../helper/post.helper");
const put = require("../helper/put.helper");
const del = require("../helper/delete.helper");
const find = require("../helper/find.helper");

const Op = db.Sequelize.Op;

exports.getAll = async (req, res) => {
    await get.gets(req, res, Amalan);
}


exports.post = async (req, res) => {
    const valueObj = {
        name: req.body.name,
        userUid: req.body.uid,
    }
    await post.post(req, res, Amalan, valueObj, "Amalan Create successfully!");
}

exports.get = async (req, res) => {
    let clauseObj = {
        where: {
            userUid: {
                [Op.eq]: req.params.userUid
            }
        }
    }
    await find.findWithClause(req, res, Amalan, clauseObj, "This user doesn't have amalan yet!");
}

exports.find = async (req, res) => {
    let clauseObj = {
        where: {
            uid: {
                [Op.eq]: req.params.uid
            }
        }
    }
    await find.find(req, res, Amalan, clauseObj);
}


exports.delete = async (req, res) => {
    let clauseObj = {
        where: {
            uid: {
                [Op.eq]: req.params.uid
            }
        }
    }
    await del.del(req, res, Amalan, clauseObj);
}

exports.update = async (req, res) => {
    let valueObj = {
        name: req.body.name,
        markDone: req.body.markDone
    }

    let clauseObj = {
        where: {
            uid: {
                [Op.eq]: req.params.uid
            }
        }
    }
    await put.put(req, res, Amalan, valueObj, clauseObj, "Amalan successfully updated");
}

exports.count = async (req, res) => {
    await Amalan.findOne({
        where: {
            userUid: {
                [Op.eq]: req.params.userUid
            }
        }
    }).then(userFound => {
        if (!userFound) {
            res.status(404).send({
                message: "this user doesn't have amalan yet!"
            });
        } else {
            Amalan.count({
                where: {
                    uid: req.params.uid
                }
            }).then(countAmalan => {
                res.status(200).send({
                    data: countAmalan
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}