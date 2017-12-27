module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('authors', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    dateofbirth: {
      type: Sequelize.DATE,
    },
  }),

  down: queryInterface => queryInterface.dropTable('authors'),
};
