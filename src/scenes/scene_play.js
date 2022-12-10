import {HEIGHT, SCENE_PLAY, SCENE_TITLE, WIDTH} from "./scene_loader";
import CustomText from "../custom_text";

const easy = [
    'easy'
]
const normal = [
    'normal'
]
const hard = [
    'hard'
]
const SENTENCES = [easy, normal, hard]
export const DIFFICULTY = Object.freeze({
    EASY: 0,
    NORMAL: 1,
    HARD: 2
})

export class ScenePlay extends Phaser.Scene {
    text_timer
    constructor() {
        super({key: SCENE_PLAY});
    }
    create({difficulty}) {
        this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.scene.start(SCENE_TITLE)
            }
        })
        if (difficulty === undefined) {
            this.add.existing(new CustomText(this, WIDTH / 2, HEIGHT / 2, 'エラー\ndifficultyがないです')
                .setAlignCenterVertically(true)
                .setAlignCenterHorizontally(true)
                .setAlign('center'))
            return
        }
        const sentences = SENTENCES[difficulty]
        console.log(sentences)
        this.text_timer = new CustomText(this, 0, 0, '')
        this.add.existing(this.text_timer)
        let time = 60
        let timer_id
        const timer_task = () => {
            if (time <= 0) {
                this.text_timer.text = `終了`
                clearInterval(timer_id)
                return
            }
            this.text_timer.text = `残り${time}秒`
            time--
        }
        timer_task()
        timer_id = setInterval(timer_task, 1000)
    }
}