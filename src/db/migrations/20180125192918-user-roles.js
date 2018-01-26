module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    role_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'roles',
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

  down: queryInterface => queryInterface.dropTable('user_roles'),
};
