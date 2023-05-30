const users = require('../data/users.json')

const login = {
  matchUser: function (email, password) {
    if(email.trim() === '' || password.trim() === ''){
      return null
    }
    
    for (const existedUser of users) {
      if (existedUser.email === email && existedUser.password === password) {
        return existedUser.firstName
      }
    }
  }
}

module.exports = login