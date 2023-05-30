const express = require('express')
const app = express()
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const login = require('./utils/login')

const PORT = process.env.PORT || 3000

app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'test secret',
  name: 'user',
  saveUninitialized: false,
  resave: true,
}))

function auth(req, res, next) {
  if(req.session.user){
    return res.render('welcome', { firstName: req.session.user })
  }else{
    next()
  }
}

app.get('/', auth, (req, res) => {
  res.render('login', { errorMessage: null })
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  const firstName = login.matchUser(email, password)

  if (firstName) {
    req.session.user = firstName
    return res.render('welcome', { firstName })
  } else {
    return res.render('login', { errorMessage: 'Username or password wrong. Please try again!' })
  }

})

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('session destoryed')
  })

  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
