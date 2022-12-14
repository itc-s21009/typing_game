import {HEIGHT, SCENE_RANKING, SCENE_TITLE, WIDTH} from "./scene_loader.js";
import CustomText from "../custom_text";

export class SceneRanking extends Phaser.Scene {
    text_ranking

    constructor() {
        super({key: SCENE_RANKING, active: false});
    }

    create() {
        this.add.existing(new CustomText(this, 10, 10, 'ランキング'))
        this.add.existing(
            new CustomText(this, WIDTH - 90, HEIGHT - 80, 'Escで\n戻る')
                .setAlign('right')
                .setFontSize(30)
        )
        this.add.existing(this.text_ranking = new CustomText(this, 10, 100, 'データ読み込み中')
            .setFontSize(25))
        this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.scene.start(SCENE_TITLE)
            }
        })
        const toDate = (date) => ({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        })
        fetch('http://localhost:3000/api/ranking')
            .then(res => res.json())
            .then(data => {
                this.text_ranking.text = data.map(d => {
                    const {year, month, day, hour, minute, second} = toDate(new Date(d['updated_at']))
                    const dateStr = `${year}年${month}月${day}日${hour}:${minute}:${second}`
                    return `${d['name']}\t${d['score']}\t${dateStr}`
                }).join('\n')
            })
    }
}