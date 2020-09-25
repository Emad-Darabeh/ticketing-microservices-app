import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);
const BASE_URL = '/api/users/signin';

it('Should signin with valid email and password', async () => {
  await request
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  const res = await request
    .post(BASE_URL)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});

it('Should not signin with a non-existing email', async () => {
  await request
    .post(BASE_URL)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
});

it('Should not signin with a wrong password', async () => {
  await request
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  await request
    .post(BASE_URL)
    .send({ email: 'test@test.com', password: 'wrong-password' })
    .expect(400);
});
