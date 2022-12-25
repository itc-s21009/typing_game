const createRouter = () => {
    const config = require("config");
    const app = require('express')
    const router = app.Router()
    const axios = require("axios").create({baseURL: `${config.get("api-host")}/api`})
    const sliceAsPage = (data, page, limit) => data.slice((page - 1) * limit, limit * page)
    router.get('/', (req, res) => {
        const page = 1
        const limit = 10
        axios.get(`/sentences`, {headers: {Cookie: req.headers.cookie}})
            .then(r => r.data)
            .then(data => {
                res.render('sentences', {
                    data: data,
                    page: page,
                    limit: limit,
                    dataToDisplay: sliceAsPage(data, page, limit)
                })
            })
            .catch(e => console.log(e))
    })
    router.post('/', (req, res) => {
        const {page, limit} = req.body
        const data = JSON.parse(req.body.data)
        const dataToDisplay = sliceAsPage(data, page, limit)
        res.render('sentences', {data: data, page: page, limit: limit, dataToDisplay: dataToDisplay})
    })
    router.get('/edit/:id', (req, res) => {
        axios.get(`/sentences?id=${req.params.id}`, {headers: {Cookie: req.headers.cookie}})
            .then((r) => res.render('edit_sentence', {data: r.data[0]}))
    })
    router.get('/new', (req, res) => {
        res.render('add_sentence')
    })
    router.post('/delete', (req, res) => {
        const {sentence, kana} = req.body
        axios.post('/sentences/delete', req.body, {headers: {Cookie: req.headers.cookie}})
            .then(res => res.data)
            .then(() => res.render('delete_sentence_complete', {sentence: sentence, kana: kana}))
    })
    router.post('/edit', (req, res) => {
        axios.post('/sentences/edit', req.body, {headers: {Cookie: req.headers.cookie}})
            .then(() => res.redirect('/admin/sentences'))
    })
    router.post('/register', (req, res) => {
        const {sentence, kana} = req.body
        axios.post('/sentences/register', req.body, {headers: {Cookie: req.headers.cookie}})
            .then(res => res.data)
            .then(() => res.render('add_sentence_complete', {sentence: sentence, kana: kana}))
    })
    return router
}

module.exports = createRouter()