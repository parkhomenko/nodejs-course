module.exports = {
  up: queryInterface => queryInterface.bulkInsert('book_comments', [{
    id: 1,
    comment: 'Very interesting classical book',
    book_id: 1,
    user_id: 1,
  }, {
    id: 2,
    comment: 'A perfect example of delegation',
    book_id: 1,
    user_id: 2,
  }, {
    id: 3,
    comment: 'Everything you need to know about the beginning of things',
    book_id: 2,
    user_id: 1,
  }, {
    id: 4,
    comment: 'It is really grand. But not for everyone to read. Has lots of technical details',
    book_id: 2,
    user_id: 2,
  }, {
    id: 5,
    comment: 'Good readers for anyone who wants to know more about the universe',
    book_id: 3,
    user_id: 1,
  }, {
    id: 6,
    comment: 'The best book about the history of things I have ever read',
    book_id: 3,
    user_id: 2,
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('book_comments', null, {}),
};
