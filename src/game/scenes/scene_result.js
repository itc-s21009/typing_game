import {HEIGHT, SCENE_RESULT, SCENE_TITLE, WIDTH} from "./scene_loader.js";
import CustomText from "../components/custom_text.js";
import CustomButton from "../components/custom_button";
import axios from "axios";
import {API_URL} from "../../game";

export class SceneResult extends Phaser.Scene {
    constructor() {
        super({key: SCENE_RESULT});
    }

    create({score, speed, miss, accuracy}) {
        this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.scene.start(SCENE_TITLE)
            }
        })
        this.add.existing(new CustomText(this, WIDTH / 2, 50, '結果')
            .setAlignCenterHorizontally(true)
            .setFontSize(60))

        this.add.existing(new CustomText(this, WIDTH / 2, 150, `Score\n${score}`)
            .setAlignCenterHorizontally(true)
            .setAlign('center')
            .setFontSize(60)
        )
        this.add.existing(new CustomText(this, WIDTH / 3, 280, `・速さ：${speed}キー/秒`)
            .setAlignCenterHorizontally(true)
            .setFontSize(50)
        )
        this.add.existing(new CustomText(this, WIDTH / 3, 330, `・ミス：${miss}回`)
            .setAlignCenterHorizontally(true)
            .setFontSize(50)
        )
        this.add.existing(new CustomText(this, WIDTH / 3, 380, `・正確率：${accuracy} %`)
            .setAlignCenterHorizontally(true)
            .setFontSize(50)
        )
        this.add.existing(
            new CustomText(this, WIDTH - 90, HEIGHT - 80, 'Escで\n戻る')
                .setAlign('right')
                .setFontSize(30)
        )
        const click = () => {
            const bg = this.add.rectangle(400, 250, 550, 500)
                .setFillStyle(0xffffff)
            const contents = [
                new CustomText(this, WIDTH / 2, 10, 'ランキングに名前を登録します。')
                    .setAlignCenterHorizontally(true)
                    .setFontSize(30),
                new CustomButton(this, WIDTH / 8 * 3, HEIGHT - 50, 180, 50, '名前入力', () => {
                    let name
                    while ((name = window.prompt('名前を入力してください')).length <= 0) ;
                    axios.post(`${API_URL}/api/records/register`, {
                        name: name,
                        kps: speed,
                        miss: miss,
                        accuracy: accuracy,
                        score: score,
                    }, {
                        withCredentials: true
                    }).then(r => {
                        if (r.status === 200) {
                            window.alert('スコアを登録しました')
                            contents.forEach(c => c.destroy())
                        }
                    }).catch(() => {
                        window.alert('エラーが発生したため、スコアを登録できませんでした')
                    })
                }),
                new CustomButton(this, WIDTH / 8 * 5, HEIGHT - 50, 180, 50, 'キャンセル', () => {
                    contents.forEach(c => c.destroy())
                })
            ]
            contents.push(bg)
            contents.forEach(c => this.add.existing(c))
        }
        const register = new CustomButton(this, WIDTH - 50, HEIGHT - 110, 80, 50, '登録', click)
        this.add.existing(register)

    }
}
