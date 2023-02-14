const config = require("config");
const passport = require('passport')
const axios = require("axios").create({baseURL: `${config.get("api-host")}/api`})

const setupPassport = () => {
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
        const {username, password} = req.body
        axios.post('/login', {
            id: username,
            password: password
        }).then((r) => {
            const {token, ...userData} = r.data
            res.cookie('token', token)
            req.logIn(userData, function (err) {
                if (err) return next(err)
                return res.redirect('/')
            })
        }).catch((e) => {
            const r = e.response
            req.flash('id', req.body.username)
            if (r.status === 401) {
                req.flash('error', 'ユーザー名かパスワードが違います')
            } else {
                req.flash('error', `エラーが発生しました: ${r.status}`)
            }
            return res.redirect('login')
        })
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