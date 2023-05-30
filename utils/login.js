const users = require('../data/users.json')

const login = {
  matchUser: function (user) {
    for (const existedUser of users) {
      if (existedUser.email === user.email && existedUser.password === user.password) {
        return existedUser.firstName
      }
    }
  }
}

module.exports = login