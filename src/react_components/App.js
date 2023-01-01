import {useState} from "react";

const App = () => {
    const [page, setPage] = useState(1)
    const options = {
        'new': '新しい順',
        'old': '古い順',
        'long': '文字数が長い順',
        'short': '文字数が短い順',
    }
    const ShowOrderOptions = () => Object.keys(options).map(k => <option value={k}>{options[k]}</option>)
    const ShowLimitOptions = () => [10, 20, 30, 40, 50].map(k => <option value={k}>{k}</option>)
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
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>文章</th>
                    <th>かな</th>
                    <th>編集</th>
                    <th>削除</th>
                </tr>
                </thead>
            </table>
            <script src="/js/sentences.js"></script>
        </>
    )
}

export default App