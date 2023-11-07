const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userSeedData = requre('./userSeedData.json');
const blogSeedData = requre('./blogSeedData.json');
const commentSeedData = requre('./commentSeedData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true});

    await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true
    });

    await Blog.bulkCreate(blogSeedData, {
        returning: true
    });

    await Comment.bulkCreate(commentSeedData, {
        returning: true
    });

    process.exit(0);
};

seedAll();