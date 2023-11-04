const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true});

    // Seed Tables

    process.exit(0);
};

seedAll();