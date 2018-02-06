module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
  }),

  down: queryInterface => queryInterface.dropTable('roles'),
};
