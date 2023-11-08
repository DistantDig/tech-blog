const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userSeedData = require('./userSeedData.json');
const blogSeedData = require('./blogSeedData.json');
const commentSeedData = require('./commentSeedData.json');

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