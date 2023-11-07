const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userSeedData = requre('./userSeedData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true});

    await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true
    });

    await Blog.bulkCreate(userSeedData, {
        returning: true
    });

    await Comment.bulkCreate(userSeedData, {
        returning: true
    });

    process.exit(0);
};

seedAll();