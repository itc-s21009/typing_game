const express = require('express')
const path = require('path')
const config = require('config')
const http = require('http')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const axios = require("axios").create({baseURL: `${config.get("api-host")}/api`})

const setupExpress = () => {
    const render = (res, pug) => d => {
        const data = d.data
        data.error
            ? res.render('error', {error: data.error})
            : res.render(pug, {data: data})
    }
    const checkAdmin = (req, res, next) => {
        axios.get('/testadmin', {headers: {Cookie: req.headers.cookie}})
            .then(r => r.data)
            .then(d => {
                console.log(d)
                d['admin'] ? next() : res.render('error', {error: 'このページを表示する権限がありません。'})
            })
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
    router.get('/', (req, res) => res.render('index'))
    router.get('/ranking', (req, res) => {
        axios.get(`/ranking`)
            .then(render(res, 'ranking'))
    })
    router.get('/sentences', checkAdmin)
    router.get('/sentences', (req, res) => {
        axios.get(`/sentences`)
            .then(render(res, 'sentences'))
    })
    router.get('/sentences/edit/:id', (req, res) => {
        axios.get(`/sentences?id=${req.params.id}`)
            .then(render(res, 'edit_sentence'))
    })
    router.get('/sentences/new', (req, res) => {
        res.render('add_sentence')
    })
    router.post('/sentences/delete', (req, res) => {
        const {sentence, kana} = req.body
        axios.post('/sentences/delete', req.body)
            .then(res => res.data)
            .then(d => d.error
                ? res.render('error', {error: d.error})
                : res.render('delete_sentence_complete', {sentence: sentence, kana: kana})
            )
    })
    router.post('/sentences/edit', (req, res) => {
        axios.post('/sentences/edit', req.body)
            .then(() => res.redirect('/sentences'))
    })
    router.post('/sentences/register', (req, res) => {
        const {sentence, kana} = req.body
        axios.post('/sentences/register', req.body)
            .then(res => res.data)
            .then(d => d.error
                ? res.render('error', {error: d.error})
                : res.render('add_sentence_complete', {sentence: sentence, kana: kana})
            )
    })

    app.use('/', router)

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