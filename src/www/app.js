const express = require('express')
const path = require('path')
const config = require('config')
const http = require('http')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const axios = require("axios")

const setupExpress = () => {
    const render = (res, pug) => d => {
        const data = d.data
        data.error
            ? res.render('error', {error: data.error})
            : res.render(pug, {data: data})
    }
    const app = express()
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'pug')

    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, '..', '..', 'public')));

    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())

    const router = express.Router()
    console.log(process.env.NODE_ENV)
    const api = axios.create({baseURL: `${config.get("api-host")}/api`})
    router.get('/', (req, res) => res.render('index'))
    router.get('/ranking', (req, res) => {
        api.get(`/ranking`)
            .then(render(res, 'ranking'))
            .catch(e => res.render('error', {error: e.code}))
    })
    router.get('/sentences', (req, res) => {
        api.get(`/sentences`, {headers: {Cookie: req.headers.cookie}})
            .then(render(res, 'sentences'))
            .catch(e => res.render('error', {error: e.code}))
    })
    router.get('/sentences/edit/:id', (req, res) => {
        api.get(`/sentences?id=${req.params.id}`, {headers: {Cookie: req.headers.cookie}})
            .then(render(res, 'edit_sentence'))
            .catch(e => res.render('error', {error: e.code}))
    })
    router.get('/sentences/new', (req, res) => {
        res.render('add_sentence')
    })
    router.post('/sentences/delete', (req, res) => {
        const {sentence, kana} = req.body
        api.post('/sentences/delete', req.body, {headers: {Cookie: req.headers.cookie}})
            .then(res => res.data)
            .then(d => d.error
                ? res.render('error', {error: d.error})
                : res.render('delete_sentence_complete', {sentence: sentence, kana: kana})
            )
            .catch(e => res.render('error', {error: e.code}))
    })
    router.post('/sentences/edit', (req, res) => {
        api.post('/sentences/edit', req.body, {headers: {Cookie: req.headers.cookie}})
            .then(() => res.redirect('/sentences'))
            .catch(e => res.render('error', {error: e.code}))
    })
    router.post('/sentences/register', (req, res) => {
        const {sentence, kana} = req.body
        api.post('/sentences/register', req.body, {headers: {Cookie: req.headers.cookie}})
            .then(res => res.data)
            .then(d => d.error
                ? res.render('error', {error: d.error})
                : res.render('add_sentence_complete', {sentence: sentence, kana: kana})
            )
            .catch(e => res.render('error', {error: e.code}))
    })

    app.use('/', router)

    const server = http.createServer(app)
    const port = process.env.PORT || 8080
    server.listen(port)
}
const main = () => {
    setupExpress()
}
main()