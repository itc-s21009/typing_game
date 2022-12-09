import {SCENE_PLAY} from "./scene_loader";
import CustomText from "../custom_text";

export class ScenePlay extends Phaser.Scene {
    text_timer
    constructor() {
        super({key: SCENE_PLAY});
    }
    create() {
        this.text_timer = new CustomText(this, 0, 0, 'a')
        this.add.existing(this.text_timer)
        let time = 60
        let timer_id
        const timer_task = () => {
            if (time <= 0) {
                this.text_timer.text = `終了`
                clearInterval(timer_id)
            }
            this.text_timer.text = `残り${time}秒`
            time--
        }
        timer_task()
        timer_id = setInterval(timer_task, 1000)
    }
}