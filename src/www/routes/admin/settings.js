const createRouter = () => {
    const app = require('express')
    const router = app.Router()

    router.get('/', (req, res) => res.render('settings'))
    router.get('/:pageId', (req, res, next) => {
        const pageId = req.params['pageId']
        res.render(pageId, {pageId: pageId}, (err, html) => {
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