const sequelize = require('../config/connection');
const { User, Blog, Comments } = require('../models');

const userSeedData = requre('./userSeedData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true});

    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true
    });

    process.exit(0);
};

seedAll();