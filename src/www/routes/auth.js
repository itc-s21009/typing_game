const config = require("config");
const createRouter = () => {
    const express = require('express')
    const router = express.Router()
    const axios = require("axios").create({baseURL: `${config.get("api-host")}/api`})
    router.get('/login', (req, res) => res.render('login'))
    router.post('/login', (req, res) => {
        const {username, password} = req.body
        axios.post('/login', {username: username, password: password})
            .then(() => {
                res.redirect('/')
            })
            .catch(e => {
                res.redirect('/login')
            })
    })

    return router
}

module.exports = createRouter()