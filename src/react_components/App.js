import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [dataOnTable, setDataOnTable] = useState([])
    const options = {
        'new': '新しい順',
        'old': '古い順',
        'long': '文字数が長い順',
        'short': '文字数が短い順',
    }
    const API_URL = 'http://localhost:3000'
    const fetchData = () => {
        axios.get(`${API_URL}/api/sentences`, {withCredentials: true})
            .then(r => r.data)
            .then(d => setData(d))
    }
    useEffect(fetchData, [data, API_URL])
    useEffect(() => {
        setDataOnTable(data)
    }, [data])
    const ShowOrderOptions = () => Object.keys(options).map(k => <option value={k}>{options[k]}</option>)
    const ShowLimitOptions = () => [10, 20, 30, 40, 50].map(k => <option value={k}>{k}</option>)
    const ShowTableRows = () =>
        dataOnTable.map(d =>
            <tr className="align-middle">
                <td style={{width: '50%'}}>{d.sentence}</td>
                <td style={{width: '50%'}}>{d.kana}</td>
                <td style={{minWidth: '74px'}}>
                    <a href={`/admin/sentences/edit/${d.id}`} className="btn btn-outline-primary">編集</a>
                </td>
                <td style={{minWidth: '74px'}}>
                    <a href="javascript:void(0)" className="del-link btn btn-outline-danger"
                       data-id={d.id} data-sentence={d.sentence} data-kana={d.kana}>削除</a>
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
    return (
        <>
            <h2 className="ms-2">文章一覧</h2>
            <div className="d-flex justify-content-between">
                <div>
                    <select className="update-order form-select w-auto" name="order">
                        <ShowOrderOptions/>
                    </select>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="page-prev btn btn-primary" onClick={() => setPage(page - 1)}>
                        <i className="bi bi-caret-left"></i>
                    </button>
                    <h3 className="me-3 ms-3">{page} ページ目</h3>
                    <button className="page-next btn btn-primary" onClick={() => setPage(page + 1)}>
                        <i className="bi bi-caret-right"></i>
                    </button>
                </div>
                <div className="d-flex justify-content-end">
                    <p className="me-2 mb-0 m-auto">最大</p>
                    <select className="update-limit form-select w-auto" name="limit">
                        <ShowLimitOptions/>
                    </select>
                    <p className="ms-2 me-3 mb-0 m-auto">件表示</p>
                    <a className="btn btn-outline-primary" href="/admin/sentences/new">文章追加</a>
                </div>
            </div>
            <ShowTable/>
            <script src="/js/sentences.js"></script>
        </>
    )
}

export default App