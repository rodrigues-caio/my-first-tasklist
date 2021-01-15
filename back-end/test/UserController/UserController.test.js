import UserController from './UserController';

describe('CRUD of User', () => {
  it('should be able to create an user.', () => {
    const user = {
      name: 'Caio',
      email: 'caaio@hotmail.com',
      password: '454s5s5a4s',
    };

    expect(UserController.createUser(user)).toEqual({
      name: 'Caio',
      id: 12313,
    });
  });
});
