import {SCENE_PLAY} from "./scene_loader";

export class ScenePlay extends Phaser.Scene {
    text_timer
    constructor() {
        super({key: SCENE_PLAY});
    }
    create() {
        this.text_timer = this.add.text(0, 0, '')
            .setFontFamily('Arial')
            .setFontSize(80)
            .setColor('#000')
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