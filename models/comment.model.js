module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comment", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: true
        },
        comment: {
            type: Sequelize.TEXT
        },
        likes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return Comments;
}