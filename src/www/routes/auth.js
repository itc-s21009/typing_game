const config = require("config");
const passport = require('passport')
const LocalStrategy = require('passport-local')
const axios = require("axios").create({baseURL: `${config.get("api-host")}/api`})

const setupPassport = () => {
    passport.use(new LocalStrategy((id, password, callback) => {
        axios.post('/login', {id: id, password: password})
            .then(r => r.data)
            .then(data => {
                const isSuccess = data['success']
                if (isSuccess) {
                    const {id, username} = data
                    return callback(null, {id: id, username: username})
                } else {
                    return callback(null, false)
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
    router.get('/login', (req, res) => res.render('login', {
        error: req.flash('error'),
        id: req.flash('id')[0] // [0]がないと、「user」にしたいところがなぜか「["user"]」になってしまう
    }))
    router.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (err) return next(err)
            if (!user) {
                req.flash('id', req.body.username)
                req.flash('error', 'ユーザー名かパスワードが違います')
                return res.redirect('login')
            }
            req.logIn(user, function (err) {
                if (err) return next(err)
                return res.redirect('/')
            })
        })(req, res, next)
    })
    router.get('/logout', (req, res, next) => {
        req.logout(err => {
            if (err) return next(err)
            res.locals.user = undefined
            res.render('logout')
        })
    })

    return router
}

module.exports = createRouter()