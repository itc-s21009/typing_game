const express = require('express')
const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session)
const path = require('path')
const config = require('config')
const http = require('http')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const axios = require("axios")
const passport = require('passport')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
const flash = require('connect-flash')

const setupExpress = () => {
    axios.defaults.baseURL = `${config.get("api-host")}/api`
    const app = express()
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'pug')

    app.use(cookieParser())

    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())

    app.use(session({
        secret: config.get('secret'),
        resave: false,
        saveUninitialized: false,
        store: new SQLiteStore({db: 'sessions.db', dir: './var/db'})
    }))
    app.use(passport.authenticate('session'))

    app.use(flash())

    const router = express.Router()
    const adminSentencesRouter = require('./routes/admin/sentences')
    const authRouter = require('./routes/auth')
    console.log(process.env.NODE_ENV)
    app.use((req, res, next) => {
        res.locals.user = req.user
        next()
    })
    router.get('/', (req, res) => res.render('index'))
    router.get('/ranking', (req, res) => {
        axios.get(`/ranking`)
            .then((r) => res.render('ranking', {data: r.data}))
    })
    router.get('/admin/*', ensureLoggedIn)

    app.use('/', router)
    app.use('/admin/sentences', adminSentencesRouter)
    app.use(authRouter)
    app.use(express.static(path.join(__dirname, '..', '..', 'build')));

    app.use((req, res) => {
        res.render('error', {error: 'No Page.'})
    })

    const server = http.createServer(app)
    const port = process.env.PORT || 8080
    server.listen(port)
}
const main = () => {
    setupExpress()
}
main()

module.exports = axios