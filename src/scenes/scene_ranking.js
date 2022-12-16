import {HEIGHT, SCENE_RANKING, SCENE_TITLE, WIDTH} from "./scene_loader.js";
import CustomText from "../custom_text";
import axios from "axios";
import {API_URL} from "../index";
import CustomTable from "../custom_table";

export class SceneRanking extends Phaser.Scene {
    text_loading
    table_ranking

    constructor() {
        super({key: SCENE_RANKING, active: false});
    }

    create() {
        this.add.existing(new CustomText(this, 10, 10, 'ランキング')
            .setFontSize(70))
        this.add.existing(
            new CustomText(this, WIDTH - 90, HEIGHT - 80, 'Escで\n戻る')
                .setAlign('right')
                .setFontSize(30)
        )
        this.add.existing(this.text_loading = new CustomText(this, 10, 100, 'データ読み込み中')
            .setFontSize(25)
        )
        this.add.existing(this.table_ranking = new CustomTable(this, 20, 100, [], 18))
        this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.scene.start(SCENE_TITLE)
            }
        })
        const toDate = (date) => ({
            year: date.getFullYear() - 2000,
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        })
        const pad = len => num => String(num).padStart(len, '0')
        const p2 = pad(2)
        const reqRanking = axios.get(`${API_URL}/api/ranking`)
        const reqMe = axios.get(`${API_URL}/api/records/me`, {withCredentials: true})
        axios.all([reqRanking, reqMe])
            .then(([r1, r2]) => {
                console.log(r1, r2)
                return [r1.data, r2.data[0]]
            })
            .then(([ranking, me]) => {
                const tableData = [
                    ['','スコア', '　　　　　プレイヤー名　　　　　', '速度', 'ミス数', '正確率', '更新日時'],
                    ...ranking.map(d => {
                        const {year, month, day, hour, minute} = toDate(new Date(d['updated_at']))
                        const dateStr = `${year}/${p2(month)}/${p2(day)} ${p2(hour)}:${p2(minute)}`
                        return [`${d['place']}位`, `${d['score']}点`, `${d['name']}`, `${d['kps']}キー/秒`, `${d['miss']}回`, `${d['accuracy']}%`, `${dateStr}`]
                    })
                ]
                this.table_ranking.setTableData(tableData)
                this.text_loading.destroy()
                this.add.line(WIDTH / 2, 0, 0, 0, 0, 100, 0x0).setOrigin(0)
                this.add.line(0, 100, 0, 0, WIDTH, 0, 0x0).setOrigin(0)
                this.add.existing(new CustomText(this, WIDTH / 2 + 10, 10, '自己ベスト')
                    .setFontSize(20))
                this.add.existing(new CustomText(this, WIDTH / 4 * 3, 40, `${me['score']}点 ( ${me['place']}位 )`)
                    .setFontSize(40)
                    .setAlignCenterHorizontally(true))
            })
            .catch((e) => {
                console.log(e)
                this.text_loading.text = `ランキングを取得できませんでした`
            })
    }
}