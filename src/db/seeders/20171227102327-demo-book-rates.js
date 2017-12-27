module.exports = {
  up: queryInterface => queryInterface.bulkInsert('book_rates', [{
    id: 1,
    rate: 5,
    book_id: 1,
    user_id: 1,
  }, {
    id: 2,
    rate: 5,
    book_id: 1,
    user_id: 2,
  }, {
    id: 3,
    rate: 4,
    book_id: 2,
    user_id: 1,
  }, {
    id: 4,
    rate: 3,
    book_id: 2,
    user_id: 2,
  }, {
    id: 5,
    rate: 5,
    book_id: 3,
    user_id: 1,
  }, {
    id: 6,
    rate: 4,
    book_id: 3,
    user_id: 2,
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('book_rates', null, {}),
};
