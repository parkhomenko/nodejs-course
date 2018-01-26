module.exports = {
  up: queryInterface => queryInterface.bulkInsert('roles', [{
    id: 1,
    name: 'default',
  }, {
    id: 2,
    name: 'admin',
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('roles', null, {}),
};
