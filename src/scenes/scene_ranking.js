import {HEIGHT, SCENE_RANKING, SCENE_TITLE, WIDTH} from "./scene_loader.js";
import CustomText from "../custom_text";
import axios from "axios";
import {API_URL} from "../index";
import CustomTable from "../custom_table";

export class SceneRanking extends Phaser.Scene {
    text_ranking
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
        this.add.existing(this.text_ranking = new CustomText(this, 10, 100, 'データ読み込み中')
            .setFontSize(25)
        )
        this.add.existing(this.table_ranking = new CustomTable(this, 30, 100, WIDTH, HEIGHT, null, 18))
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
        axios.get(`${API_URL}/api/ranking`)
            .then(res => res.data)
            .then(data => {
                const tableData = [
                    ['', 'スコア', 'プレイヤー名', '速度', 'ミス数', '正確率', '更新日時'],
                    ...data.map((d, i) => {
                        const {year, month, day, hour, minute} = toDate(new Date(d['updated_at']))
                        const dateStr = `${year}/${p2(month)}/${p2(day)} ${p2(hour)}:${p2(minute)}`
                        return [`${i+1}位`, `${d['score']}点`, `${d['name']}`, `${d['kps']}キー/秒`, `${d['miss']}回`, `${d['accuracy']}%`, `${dateStr}`]
                    })
                ]
                this.table_ranking.setTableData(tableData)
                this.text_ranking.destroy()
            })
            .catch((e) => {
                this.text_ranking.text = `ランキングを取得できませんでした`
            })
    }
}
