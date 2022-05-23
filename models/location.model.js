module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true
        },
        ip: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        last_access: {
            type: Sequelize.DATE
        }
    });
    return Location;
}