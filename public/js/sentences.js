const updateTable = (sentences, page, limit) => {
    if (page <= 0) {
        return
    }
    const form = document.createElement('form')
    form.action = `/admin/sentences`
    form.method = 'post'
    document.body.appendChild(form)
    form.addEventListener('formdata', (e) => {
        const data = e.formData
        data.set('data', sentences)
        data.set('page', page)
        data.set('limit', limit)
    })
    form.submit()
}