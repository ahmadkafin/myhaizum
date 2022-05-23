module.exports = (sequelize, Sequelize, User) => {
    const Blog = sequelize.define("blog", {
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
        userId: {
            type: Sequelize.STRING,
            references: {
                model: User,
                key: 'uid'
            }
        },
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        },
        isActive: {
            type: Sequelize.BOOLEAN
        },
        likes: {
            type: Sequelize.INTEGER
        }
    });
    return Blog;
}

