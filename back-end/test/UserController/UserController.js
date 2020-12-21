const crypto = require(crypto);

module.exports = {
  createUser(user) {
    const id = 12313;

    let { name } = user;

    return { id, name };
  },
};
