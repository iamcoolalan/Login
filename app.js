const express = require('express')
const app = express()
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const login = require('./utils/login')

const PORT = process.env.PORT || 3000

app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('login', { errorMessage: null })
})

app.post('/login', (req, res) => {
  const userData = req.body
  const firstName = login.matchUser(userData)

  if (firstName) {
    res.render('welcome', { firstName })
  } else {
    res.render('login', { errorMessage: 'Username or password wrong. Please try again!' })
  }

})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
