module.exports = {
  up: queryInterface => queryInterface.bulkInsert('users', [{
    id: 1,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    password: 'john123',
    avatar: 'john-doe.png',
    dateofbirth: new Date(1989, 6, 18),
  }, {
    id: 2,
    name: 'John Wayne',
    email: 'john.wayne@gmail.com',
    password: 'john456',
    avatar: 'john-wayne.png',
    dateofbirth: new Date(1983, 3, 12),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
