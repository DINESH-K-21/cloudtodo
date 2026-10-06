const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const { app } = require('../server');

test('GET /api/config returns the configured app title', async () => {
  const res = await request(app).get('/api/config');

  assert.equal(res.status, 200);
  assert.equal(res.body.title, 'CLoud App');
});

test('POST /api/tasks creates a new task', async () => {
  const res = await request(app)
    .post('/api/tasks')
    .send({ title: 'Write tests' });

  assert.equal(res.status, 201);
  assert.equal(res.body.title, 'Write tests');
  assert.equal(res.body.completed, false);
});
