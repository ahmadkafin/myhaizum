const db = require("../models");
const Blog = db.blog;

const get = require("../helper/get.helper");
const post = require("../helper/post.helper");
const put = require("../helper/put.helper");
const del = require("../helper/delete.helper");
const find = require("../helper/find.helper");


const Op = db.Sequelize.Op;

// post blog
exports.post = async (req, res) => {
    const valueObj = {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        isActive: req.body.isActive,
        likes: 0
    }
    await post.post(req, res, Blog, valueObj, "blog create succefully");
}

// Get All Blog
exports.get = async (req, res) => {
    await get.gets(req, res, Blog);
}

// get single blog
exports.find = async (req, res) => {
    let clauseObj = {
        where: {
            uid: {
                [Op.eq]: req.params.uid
            }
        }
    }
    await find.find(req, res, Blog, clauseObj);
}

// update blog data
exports.update = async (req, res) => {
    let valueObj = {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        isActive: req.body.isActive
    }
    let clauseObj = {
        where: {
            uid: {
                [Op.eq]: req.params.uid
            }
        }
    }
    await put.put(req, res, Blog, valueObj, clauseObj, "Blog successfully updated");
}

// delete blog data
exports.delete = async (req, res) => {
    let clauseObj = {
        where: {
            uid: {
                [Op.eq]: req.params.uid
            }
        }
    }
    await del.del(req, res, Blog, clauseObj);
}
