module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('book_comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    comment: {
      type: Sequelize.STRING,
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

  down: queryInterface => queryInterface.dropTable('book_comments'),
};
