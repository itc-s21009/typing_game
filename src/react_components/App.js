import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
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

    const orderOptions = {
        'new': '新しい順',
        'old': '古い順',
        'long': '文字数が長い順',
        'short': '文字数が短い順',
    }
    const limitOptions = [10, 20, 30, 40, 50]

    const [page, setPage] = useState(1)
    const [order, setOrder] = useState(Object.keys(orderOptions)[0])    // => new
    const [limit, setLimit] = useState(limitOptions[0])                 // => 10
    const [data, setData] = useState([])
    const [dataOnTable, setDataOnTable] = useState([])

    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/api/sentences`, {withCredentials: true})
            .then(r => r.data)
            .then(d => setData(d))
    }
    const updateDataOnTable = () => {
        const sortFunctions = {
            'new': (a, b) => a.id < b.id ? 1 : -1,
            'old': (a, b) => a.id > b.id ? 1 : -1,
            'long': (a, b) => a.kana.length < b.kana.length ? 1 : -1,
            'short': (a, b) => a.kana.length > b.kana.length ? 1 : -1,
        }
        const copyOfData = Array(...data)
        copyOfData.sort(sortFunctions[order])
        setDataOnTable(copyOfData.splice((page - 1) * limit, limit))
    }
    useEffect(fetchData, [])
    useEffect(updateDataOnTable, [data, page, order, limit])

    const ShowOrderOptions = () => Object.keys(orderOptions).map(k => <option value={k}>{orderOptions[k]}</option>)
    const ShowLimitOptions = () => limitOptions.map(k => <option value={k}>{k}</option>)
    const ShowTableRows = () =>
        dataOnTable.map(d =>
            <tr className="align-middle">
                <td style={{width: '50%'}}>{d.sentence}</td>
                <td style={{width: '50%'}}>{d.kana}</td>
                <td style={{minWidth: '74px'}}>
                    <a href={`/admin/sentences/edit/${d.id}`} className="btn btn-outline-primary">編集</a>
                </td>
                <td style={{minWidth: '74px'}}>
                    <button className="del-link btn btn-outline-danger"
                            onClick={() => confirmDelete(d.id, d.sentence, d.kana)}>削除
                    </button>
                </td>
            </tr>
        )
    const ShowTable = () =>
        <table className="table table-hover">
            <thead>
            <tr>
                <th>文章</th>
                <th>かな</th>
                <th>編集</th>
                <th>削除</th>
            </tr>
            </thead>
            <tbody>
            <ShowTableRows/>
            </tbody>
        </table>
    const getLastPage = (length, limit) => Math.ceil(length / limit)
    const handleChangePage = (page) => {
        if (page <= 0 || page > getLastPage(data.length, limit)) {
            return
        }
        setPage(page)
    }
    const handleChangeLimit = (limit) => {
        const lastPage = getLastPage(data.length, limit)
        setLimit(limit)
        if (page > lastPage) {
            setPage(lastPage)
        }
    }
    return (
        <div style={{margin: '0 30px'}}>
            <h2 className="ms-2">文章一覧</h2>
            <div className="d-flex justify-content-between">
                <div>
                    <select className="form-select w-auto" value={order}
                            onChange={(e) => setOrder(e.target.value)}>
                        <ShowOrderOptions/>
                    </select>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="page-prev btn btn-primary" onClick={() => handleChangePage(page - 1)}>
                        <i className="bi bi-caret-left"></i>
                    </button>
                    <h3 className="me-3 ms-3">{page} ページ目</h3>
                    <button className="page-next btn btn-primary" onClick={() => handleChangePage(page + 1)}>
                        <i className="bi bi-caret-right"></i>
                    </button>
                </div>
                <div className="d-flex justify-content-end">
                    <p className="me-2 mb-0 m-auto">最大</p>
                    <select className="form-select w-auto" value={limit}
                            onChange={(e) => handleChangeLimit(parseInt(e.target.value))}>
                        <ShowLimitOptions/>
                    </select>
                    <p className="ms-2 me-3 mb-0 m-auto">件表示</p>
                    <a className="btn btn-outline-primary" href="/admin/sentences/new">文章追加</a>
                </div>
            </div>
            <ShowTable/>
        </div>
    )
}

export default App