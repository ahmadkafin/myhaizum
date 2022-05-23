module.exports = (sequelize, Sequelize) => {
    const Verify = sequelize.define("verify", {
        randnum: {
            type: Sequelize.INTEGER,
            unique: true
        },
        username: {
            type: Sequelize.STRING
        },

    });
    return Verify;
}