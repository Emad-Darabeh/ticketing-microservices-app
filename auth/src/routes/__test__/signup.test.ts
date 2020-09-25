import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);
const BASE_URL = '/api/users/signup';
it('Should return 201 on successful signup', async () => {
  await request
    .post(BASE_URL)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('Should return 400 with invalid email', async () => {
  await request
    .post(BASE_URL)
    .send({ email: 'invalid.email', password: 'password' })
    .expect(400);
});

it('Should return 400 with invalid password', async () => {
  await request
    .post(BASE_URL)
    .send({ email: 'test@test.com', password: 'a' })
    .expect(400);
});

it('Should return 400 with missing email and password', async () => {
  await request.post(BASE_URL).send({ email: 'test@test.com' }).expect(400);

  await request.post(BASE_URL).send({ password: 'password' }).expect(400);

  await request.post(BASE_URL).send({}).expect(400);
});

it('Should not signup with a used email', async () => {
  await request
    .post(BASE_URL)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  await request
    .post(BASE_URL)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
});

it('Should set a cookie after successful signup', async () => {
  const res = await request
    .post(BASE_URL)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
});
