const config = require("config");
const passport = require('passport')
const LocalStrategy = require('passport-local')
const axios = require("axios").create({baseURL: `${config.get("api-host")}/api`})

const setupPassport = () => {
    passport.use(new LocalStrategy((username, password, callback) => {
        axios.post('/login', {username: username, password: password})
            .then(r => r.data)
            .then(data => {
                const isSuccess = data['success']
                if (isSuccess) {
                    return callback(null, username)
                } else {
                    return callback(null, false, {message: 'ユーザー名かパスワードが違います'})
                }
            })
            .catch(e => callback(e))
    }))
    passport.serializeUser((user, callback) => {
        process.nextTick(() => callback(null, user))
    })
    passport.deserializeUser((user, callback) => {
        process.nextTick(() => callback(null, user))
    })
}

const createRouter = () => {
    setupPassport()
    const express = require('express')
    const router = express.Router()
    router.get('/login', (req, res) => res.render('login'))
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }))
    router.get('/logout', (req, res, next) => {
        req.logout(err => {
            if (err) return next(err)
            res.redirect('/')
        })
    })

    return router
}

module.exports = createRouter()