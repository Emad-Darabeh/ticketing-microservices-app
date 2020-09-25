import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);
const BASE_URL = '/api/users/signout';

it('Should signout after signup', async () => {
  await request
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  const res = await request.post(BASE_URL).send().expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
  expect(res.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
