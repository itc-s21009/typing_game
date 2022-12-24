const confirmDelete = (id, sentence, kana) => {
    if (window.confirm(`「${sentence}」を削除しますか？`)) {
        const form = document.createElement('form')
        form.action = `/admin/sentences/delete`
        form.method = 'post'
        document.body.appendChild(form)
        form.addEventListener('formdata', (e) => {
            const data = e.formData
            data.set('id', id)
            data.set('sentence', sentence)
            data.set('kana', kana)
        })
        form.submit()
    }
}
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
document.querySelectorAll('a.del-link').forEach(a => a.onclick = () => confirmDelete(a.dataset.id, a.dataset.sentence, a.dataset.kana))
document.querySelectorAll('a.page-prev').forEach(a => a.onclick = () => updateTable(a.dataset.sentences, parseInt(a.dataset.page) - 1, a.dataset.limit))
document.querySelectorAll('a.page-next').forEach(a => a.onclick = () => updateTable(a.dataset.sentences, parseInt(a.dataset.page) + 1, a.dataset.limit))