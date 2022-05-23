const config = require('../config/db.config');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        port: config.port,
        operatorAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model')(sequelize, Sequelize);
db.role = require('../models/role.model')(sequelize, Sequelize);
db.amalan = require('../models/amalan.model')(sequelize, Sequelize);
db.verfify = require('../models/verify.model')(sequelize, Sequelize);
db.blog = require('../models/miniBlog.model')(sequelize, Sequelize, db.user);
db.comment = require('../models/comment.model')(sequelize, Sequelize);
db.location = require('../models/location.model')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.comment.belongsToMany(db.blog, {
    through: "blog_comment",
    foreignKey: "commentId",
    otherKey: "blogId"
});

db.blog.belongsToMany(db.comment, {
    through: "blog_comment",
    foreignKey: "blogId",
    otherKey: "commentId"
});

db.blog.belongsTo(db.user, {
    foreignKey: "userId",
    constraint: false
});

db.user.hasMany(db.blog);

// db.amalan.belongsToMany(db.user, {
//     through: "count_amalan",
//     foreignKey: "amalanId",
//     otherKey: "userId"
// });

// db.user.belongsToMany(db.amalan, {
//     through: "count_amalan",
//     foreignKey: "userId",
//     otherKey: "amalanId"
// });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
