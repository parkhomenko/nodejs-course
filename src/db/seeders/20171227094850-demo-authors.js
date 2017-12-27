module.exports = {
  up: queryInterface => queryInterface.bulkInsert('authors', [{
    id: 1,
    name: 'Stephen Hawking',
    dateofbirth: new Date(1955, 6, 18),
  }, {
    id: 2,
    name: 'Mark Twain',
    dateofbirth: new Date(1859, 3, 12),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('authors', null, {}),
};
