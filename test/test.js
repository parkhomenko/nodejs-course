const test = require('ava');
const request = require('supertest');
const app = require('../src/server/app');

let tokenId;
let bookId;

test.before(async (t) => {
  const result = await request(app)
    .post('/login')
    .send({ email: 'john.wayne@gmail.com' })
    .send({ password: 'john456' });

  t.is(result.body.message, 'ok');

  const { token } = result.body;
  tokenId = token;
});

test('books', async (t) => {
  const response = await request(app)
    .get('/books')
    .set('Authorization', `Bearer ${tokenId}`)
    .send();

  t.is(response.status, 200);
});

test('add a new book', async (t) => {
  const response = await request(app)
    .post('/books')
    .set('Authorization', `Bearer ${tokenId}`)
    .send({ title: 'Example Book Name' })
    .send({ author_id: 1 });

  t.is(response.status, 201);

  bookId = response.body.book_id;
});

test('edit a book', async (t) => {
  const response = await request(app)
    .put('/books')
    .set('Authorization', `Bearer ${tokenId}`)
    .send({ id: bookId })
    .send({ title: 'Change a title' })
    .send({ author_id: 1 });

  t.is(response.status, 201);
});

test('delete a book', async (t) => {
  let response = await request(app)
    .post('/books')
    .set('Authorization', `Bearer ${tokenId}`)
    .send({ title: 'Example Book Name' })
    .send({ author_id: 1 });

  t.is(response.status, 201);

  bookId = response.body.book_id;

  response = await request(app)
    .delete(`/books/${bookId}`)
    .set('Authorization', `Bearer ${tokenId}`);

  t.is(response.status, 204);
});
