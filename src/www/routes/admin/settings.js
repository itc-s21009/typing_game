const config = require("config");
const axios = require("axios").create({baseURL: `${config.get("api-host")}/api`});
const createRouter = () => {
    const app = require('express')
    const router = app.Router()

    router.post('/username', (req, res) => {
        const {id, password, newUsername} = req.body
        axios.post('/settings/username', {id: id, password: password, newUsername: newUsername})
            .then(r => r.data)
            .then(data => {
                const isSuccess = data['success']
                if (isSuccess) {
                    req.user.username = newUsername
                    req.flash('success', 'ユーザー名を変更しました')
                } else {
                    req.flash('error', 'パスワードが違います')
                    req.flash('username', newUsername)
                }
                res.redirect('/admin/settings/username')
            })
            .catch(e => {
                req.flash('error', 'エラーが発生しました')
                res.redirect('/admin/settings/username')
            })
    })
    router.post('/password', (req, res) => {
        const {id, password, newPassword, confirmPassword} = req.body
        if (newPassword !== confirmPassword) {
            req.flash('error', '確認用パスワードは新しいパスワードと同じものを入力してください')
            res.redirect('/admin/settings/password')
        } else {
        axios.post('/settings/password', {id: id, password: password, newPassword: newPassword})
            .then(r => r.data)
            .then(data => {
                const isSuccess = data['success']
                if (isSuccess) {
                    req.flash('success', 'パスワードを変更しました')
                } else {
                    req.flash('error', 'パスワードが違います')
                }
                res.redirect('/admin/settings/password')
            })
            .catch(e => {
                req.flash('error', 'エラーが発生しました')
                res.redirect('/admin/settings/password')
            })
        }
    })
    router.get('/', (req, res) => res.render('settings'))
    router.get('/:pageId', (req, res, next) => {
        const pageId = req.params['pageId']
        res.render(pageId, {
            pageId: pageId,
            error: req.flash('error'),
            success: req.flash('success'),
            username: req.flash('username')[0]
        }, (err, html) => {
            if (err) {
                res.redirect('/admin/settings')
            } else {
                res.send(html)
            }
        })
    })

    return router
}

module.exports = createRouter()