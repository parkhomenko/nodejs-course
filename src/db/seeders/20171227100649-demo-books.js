module.exports = {
  up: queryInterface => queryInterface.bulkInsert('books', [{
    id: 1,
    title: 'The Adventures of Tom Sawyer',
    cover: 'tomsawyer.png',
    author_id: 2,
  }, {
    id: 2,
    title: 'The grand design',
    cover: 'grand-design.png',
    author_id: 1,
  }, {
    id: 3,
    title: 'The universe in a nutshell',
    cover: 'universe-in-a-nutshell.png',
    author_id: 1,
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('books', null, {}),
};
