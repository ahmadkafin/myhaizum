const db = require("../models");
const Comment = db.comment;
const Blog = db.blog;

const get = require("../helper/get.helper");
const post = require("../helper/post.helper");
const put = require("../helper/put.helper");
const del = require("../helper/delete.helper");
const find = require("../helper/find.helper");


const Op = db.Sequelize.Op;

exports.get = async (req, res) => {
    await Blog.findOne({
        where: {
            uid: {
                [Op.eq]: req.params.blogUid
            }
        },
        attributes: ["uid", "content", "userId", "likes", "isActive", "createdAt"],
        include: [{
            model: Comment,
            attributes: ["uid", "comment", "likes", "createdAt"]
        }]
    }).then(comment => {
        res.status(200).send({
            data: comment
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

exports.post = async (req, res) => {
    await Blog.findOne({
        where: {
            uid: {
                [Op.eq]: req.params.blogUid
            }
        }
    }).then(blog => {
        if (blog) {
            Comment.create({
                comment: req.body.comment
            }).then(comment => {
                blog.addComment(comment).then(() => {
                    res.status(200).send({
                        message: "Comment Added Successfully!"
                    });
                })
            }).catch(err => {
                res.status(500).send({
                    message: `Error added Comment : ${err.message}`
                });
            });
        } else {
            res.status(404).send("Not Found!");
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
        res.end();
    });
}

exports.delete = async (req, res) => {
    let clauseObj = {
        where: {
            uid: {
                [Op.eq]: req.params.uid
            }
        }
    }
    await del.del(req, res, Comment, clauseObj)
}