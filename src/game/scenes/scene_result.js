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
        score = isNaN(score) ? 0 : score
        speed = isNaN(speed) ? 0 : speed
        miss = isNaN(miss) ? 0 : miss
        accuracy = isNaN(accuracy) ? 0 : accuracy
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
            new CustomButton(this, WIDTH - 50, HEIGHT - 50, 80, 50, '戻る', () => {
                this.scene.start(SCENE_TITLE)
            })
        )
        const click = () => {
            const bg = this.add.rectangle(400, 250, 550, 450)
                .setFillStyle(0xffffff)
            let name = ''
            let text_name
            const contents = [
                new CustomText(this, WIDTH / 2, 40, 'ランキングに名前を登録します。')
                    .setAlignCenterHorizontally(true)
                    .setFontSize(30),
                new CustomButton(this, WIDTH / 2, HEIGHT / 2 + 50, 180, 50, '名前入力', () => {

                    while ((name = window.prompt('名前を入力してください')).length <= 0) ;
                    text_name.text = name

                }),
                text_name = new CustomText(this, WIDTH / 2, HEIGHT / 2 - 35, '')
                    .setAlignCenterHorizontally(true)
                    .setFontSize(30),
                new CustomButton(this, WIDTH / 8 * 5, HEIGHT - 65, 180, 50, 'キャンセル', () => {
                    contents.forEach(c => c.destroy())
                }),
                new CustomButton(this, WIDTH / 8 * 3, HEIGHT - 65, 180, 50, '登録', () => {
                    axios.post(`${API_URL}/api/records/register`, {
                        name: name,
                        kps: speed,
                        miss: miss,
                        accuracy: accuracy,
                        score: score,
                    }, {
                        withCredentials: true
                    }).then(r => {
                        if (name.length <= 0) {
                            window.alert('名前を入力してください。')
                            return
                        }
                        if (r.status === 200) {
                            window.alert('スコアを登録しました')
                            contents.forEach(c => c.destroy())
                        }
                    }).catch(() => {
                        window.alert('エラーが発生したため、スコアを登録できませんでした')
                    })
                }),
                this.add.rectangle(WIDTH / 2, HEIGHT / 2 - 20, 490, 50)
                    .setFillStyle(0xeeeeee)
            ]
            contents.push(bg)
            contents.forEach(c => this.add.existing(c))
        }
        const register = new CustomButton(this, WIDTH - 50, HEIGHT - 110, 80, 50, '登録', click)
        this.add.existing(register)

    }
}
