import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);
const BASE_URL = '/api/users/currentuser';

it('Should get current user after authentication', async () => {
  const cookie = await global.signin();

  const res = await request
    .get(BASE_URL)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual('test@test.com');
});

it('Should not get current user if user is not authentication', async () => {
  const res = await request.get(BASE_URL).send().expect(200);

  expect(res.body.currentUser).toBe(null);
});
