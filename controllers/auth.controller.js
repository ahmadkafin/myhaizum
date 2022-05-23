const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Ver = db.verfify;
const uuid = require("uuid");
const nodemailer = require("nodemailer");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    // let testAccount = await nodemailer.createTestAccount();

    // Save User to Database
    var smtpConfig = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'your-email',
            pass: 'your-email-password'
        },
        tls: {
            rejectUnauthorized: false
        },
        logger: true,
        debug: false
    }
    let transporter = await nodemailer.createTransport(smtpConfig);
    let randomNumber4digits = Math.floor(1000 + Math.random() * 9000);

    let mailOptions = {
        from: '"no_reply :: HAIZUM APP " haizumclan@gmail.com',
        to: req.body.email,
        subject: "Confirmation pages",
        text: `Hello test Email`,
        html: `
                <b>Thanks ${req.body.username} for your registration, this is your confirmation code</b>
                <h2>${randomNumber4digits}</h2>           
                `
    }
    transporter.verify(function (err, success) {
        if (err) {
            res.status(500).json(err)
        } else {
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    // console.log(testAccount.user);
                    res.status(500).json(err);
                } else {
                    Ver.create({
                        randnum: randomNumber4digits,
                        username: req.body.username
                    }).then(() => {
                        User.create({
                            uid: uuid.v4(),
                            username: req.body.username,
                            email: req.body.email,
                            password: bcrypt.hashSync(req.body.password, 8)
                        }).then(user => {
                            if (req.body.roles) {
                                Role.findAll({
                                    where: {
                                        name: {
                                            [Op.or]: req.body.roles
                                        }
                                    }
                                }).then(roles => {
                                    user.setRoles(roles).then(() => {
                                        res.send({
                                            message: "User registered with roles successfully!",
                                            info: info
                                        });
                                    });
                                });
                            } else {
                                user.setRoles([1]).then(() => {
                                    res.send({
                                        message: "User registered successfully!",
                                        info: info
                                    });
                                });
                            }
                        }).catch(err => {
                            res.status(500).send({
                                message: err.message,
                            });
                        });
                    }).catch(err => {
                        res.status(500).json(err);
                    });
                }
            });
        }
    });
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            [Op.and]: [
                { username: req.body.username },
                { isActive: true }
            ]
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: `${req.body.username} not found!`
            });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Username or Password is Invalid"
            });
        }

        var token = jwt.sign(
            { id: user.id },
            config.secret,
            { expiresIn: 7200 } // 2 jam
        );

        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }

            User.update({
                last_login: Date.now()
            }, {
                where: { username: req.body.username },
                returning: true,
                plain: true
            }).then(function (result) {
                console.log(result);
            })
            res.status(200).send({
                id: user.id,
                uid: user.uid,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

exports.verify = async (req, res) => {
    await Ver.findOne({
        where: {
            randnum: {
                [Op.eq]: req.body.randnum
            }
        }
    }).then(numFound => {
        if (!numFound) {
            res.status(404).send({
                message: "Your verification number isn't match"
            });
        } else {
            User.update(
                {
                    isActive: true
                },
                {
                    where: {
                        username: req.params.username
                    }
                }
            ).then(() => {
                Ver.destroy({
                    where: {
                        randnum: {
                            [Op.eq]: req.body.randnum
                        }
                    }
                }).then(() => {
                    res.status(201).send({
                        message: "Verified Suceess, please login"
                    });
                });
            });
        }
    }).catch(err => {
        res.status(500).json(err);
    });
}

exports.autoDelete = async (req, res) => {
    await Ver.destroy({
        where: {
            username: {
                [Op.eq]: req.params.username
            }
        }
    }).then(() => {
        res.status(2014);
    }).catch(err => {
        res.status(500).json(err);
    });
}
