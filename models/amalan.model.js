module.exports = (sequelize, Sequelize) => {
    const Amalan = sequelize.define("amalan", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        userUid: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        markDone: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    return Amalan;
}