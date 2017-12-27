module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('book_rates', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    rate: {
      type: Sequelize.INTEGER,
    },
    book_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'books',
        key: 'id',
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  }),

  down: queryInterface => queryInterface.dropTable('book_rates'),
};
