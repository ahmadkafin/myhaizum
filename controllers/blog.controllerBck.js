const db = require("../models");
const Blog = db.blog;

const get = require("../helper/get.helper");

const Op = db.Sequelize.Op;


// post blog
exports.blogPost = async (req, res) => {
    await Blog.create({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        isActive: req.body.isActive,
        likes: 0
    }).then(() => {
        res.status(201).send({
            message: "blog create succefully"
        });
        res.end();
    }).catch(err => {
        res.status(500).json(err.message);
        res.end();
    })
}

// get all blog data
// exports.blogs = async (req, res) => {
//     await Blog.findAll().then(blogs => {
//         res.status(200).json(blogs);
//         res.end();
//     }).catch(err => {
//         res.status(500).json(err.message);
//         res.end();
//     });
// }

exports.blogs = async (req, res) => {
    await get.gets(req, res, Blog);
}

// get single blog
exports.blog = async (req, res) => {
    await Blog.findOne({
        where: {
            uid: {
                [Op.eq]: req.params.uid
            }
        }
    }).then(blog => {
        if (!blog) {
            res.status(404).send({
                message: "Not Found!"
            });
            res.end();
        } else {
            res.status(200).json(blog);
            res.end()
        }
    }).catch(err => {
        res.status(500).json(err.message);
    });
}


// update blog data
exports.blogUpdate = async (req, res) => {
    await Blog.findOne({
        where: {
            uid: {
                [Op.eq]: req.params.uid
            }
        }
    }).then(blogFound => {
        if (!blogFound) {
            res.status(404).send({
                message: "Blog not found!"
            });
        } else {
            Blog.update(
                {
                    userId: req.body.userId,
                    title: req.body.title,
                    content: req.body.content,
                    isActive: req.body.isActive
                },
                {
                    where: {
                        uid: req.params.uid
                    }
                }
            ).then(() => {
                res.status(201).send({
                    message: "Blog successfully updated"
                });
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
    })
}


// delete blog data
exports.blogDelete = async (req, res) => {
    await Blog.findOne({
        where: {
            uid: {
                [Op.eq]: req.params.uid
            }
        }
    }).then(blog => {
        if (!blog) {
            res.status(404).send({
                message: "Blog not found!"
            })
        } else {
            Blog.destroy({
                where: {
                    uid: {
                        [Op.eq]: req.params.uid
                    }
                }
            }).then(() => {
                res.status(204);
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
