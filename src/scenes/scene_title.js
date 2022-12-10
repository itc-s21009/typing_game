import CustomButton from "../custom_button.js";
import {SCENE_PLAY, SCENE_RANKING, SCENE_TITLE, WIDTH} from "./scene_loader.js";
import CustomText from "../custom_text.js";
import {DIFFICULTY} from "./scene_play";

export class SceneTitle extends Phaser.Scene {
    constructor() {
        super({key: SCENE_TITLE});
    }

    create() {
        this.add.existing(new CustomText(this, WIDTH / 2, 100, 'タイピング').setAlignCenterHorizontally(true))
        this.add.existing(new CustomButton(this, WIDTH / 4, 300, 250, 100, 'スタート', () => {
            this.scene.start(SCENE_PLAY, {difficulty: DIFFICULTY.HARD})
        }))
        this.add.existing(new CustomButton(this, WIDTH / 4 * 3, 300, 250, 100, 'ランキング', () => {
            this.scene.start(SCENE_RANKING)
        }))
    }
}
