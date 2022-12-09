import CustomButton from "../custom_button.js";
import {SCENE_RANKING, SCENE_TITLE, WIDTH} from "./scene_loader.js";

export class SceneTitle extends Phaser.Scene {
    constructor() {
        super({key: SCENE_TITLE});
    }

    create() {
        this.add.text(WIDTH / 2, 100, 'タイピング')
            .setFontFamily('Arial')
            .setFontSize(100)
            .setColor('#000')
            .setOrigin()
        this.add.existing(new CustomButton(this, WIDTH / 4, 300, 250, 100, 'スタート', () => {
        }))
        this.add.existing(new CustomButton(this, WIDTH / 4 * 3, 300, 250, 100, 'ランキング', () => {
            this.scene.start(SCENE_RANKING)
        }))
    }
}
