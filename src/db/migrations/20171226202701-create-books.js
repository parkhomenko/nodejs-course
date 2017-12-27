module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    cover: {
      type: Sequelize.STRING,
    },
    author_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'authors',
        key: 'id',
      },
    },
  }),

  down: queryInterface => queryInterface.dropTable('books'),
};
