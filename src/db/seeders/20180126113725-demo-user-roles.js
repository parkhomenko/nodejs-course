module.exports = {
  up: queryInterface => queryInterface.bulkInsert('user_roles', [{
    id: 1,
    user_id: 1,
    role_id: 1,
  }, {
    id: 2,
    user_id: 2,
    role_id: 1,
  }, {
    id: 3,
    user_id: 2,
    role_id: 2,
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('user_roles', null, {}),
};
