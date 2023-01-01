const express = require('express')
const path = require('path')
const config = require('config')
const http = require('http')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const axios = require("axios")

const setupExpress = () => {
    const testAdmin = (req, res, next) => {
        axios.get('/testadmin', {headers: {Cookie: req.headers.cookie}})
            .then(r => r.data)
            .then(d => d['admin'] ? next() : res.render('error', {error: 'このページを表示する権限がありません。'}));
    }
    axios.defaults.baseURL = `${config.get("api-host")}/api`
    const app = express()
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'pug')

    app.use(cookieParser())

    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())

    const router = express.Router()
    const adminSentencesRouter = require('./routes/admin/sentences')
    console.log(process.env.NODE_ENV)
    router.get('/', (req, res) => res.render('index'))
    router.get('/ranking', (req, res) => {
        axios.get(`/ranking`)
            .then((r) => res.render('ranking', {data: r.data}))
    })
    router.get('/admin/*', testAdmin)

    app.use('/', router)
    app.use('/admin/sentences', adminSentencesRouter)
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