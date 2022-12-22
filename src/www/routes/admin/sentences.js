const createRouter = () => {
    const config = require("config");
    const app = require('express')
    const router = app.Router()
    const axios = require("axios").create({baseURL: `${config.get("api-host")}/api`})
    router.get('/', (req, res) => {
        axios.get(`/sentences`, {headers: {Cookie: req.headers.cookie}})
            .then((r) => {
                res.render('sentences', {data: r.data})
            })
            .catch(e => console.log(e))
    })
    router.get('/edit/:id', (req, res) => {
        axios.get(`/sentences?id=${req.params.id}`)
            .then((r) => res.render('edit_sentence', {data: r.data[0]}))
    })
    router.get('/new', (req, res) => {
        res.render('add_sentence')
    })
    router.post('/delete', (req, res) => {
        const {sentence, kana} = req.body
        axios.post('/sentences/delete', req.body)
            .then(res => res.data)
            .then(() => res.render('delete_sentence_complete', {sentence: sentence, kana: kana}))
    })
    router.post('/edit', (req, res) => {
        axios.post('/sentences/edit', req.body)
            .then(() => res.redirect('/sentences'))
    })
    router.post('/register', (req, res) => {
        const {sentence, kana} = req.body
        axios.post('/sentences/register', req.body)
            .then(res => res.data)
            .then(() => res.render('add_sentence_complete', {sentence: sentence, kana: kana}))
    })
    return router
}

module.exports = createRouter()