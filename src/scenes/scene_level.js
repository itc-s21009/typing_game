import CustomButton from "../custom_button.js";
import {SCENE_PLAY, WIDTH, SCENE_LEVEL, SCENE_TITLE} from "./scene_loader.js";
import CustomText from "../custom_text.js";
import {DIFFICULTY} from "./scene_play.js";

export class SceneLevel extends Phaser.Scene {
    constructor() {
        super({key: SCENE_LEVEL});
    }

    create() {
        this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.scene.start(SCENE_TITLE)
            }
        })
        this.add.existing(new CustomText(this, 0, 10, '難易度選択').setFontSize(60))
        this.add.existing(new CustomButton(this, WIDTH / 5, 300, 200, 200, 'Easy', () => {
            this.scene.start(SCENE_PLAY, {difficulty: DIFFICULTY.EASY})
        }))
        this.add.existing(new CustomButton(this, WIDTH / 2, 300, 200, 200, 'Normal', () => {
            this.scene.start(SCENE_PLAY, {difficulty: DIFFICULTY.NORMAL})
        }))
        this.add.existing(new CustomButton(this, WIDTH / 5 * 4, 300, 200, 200, 'Hard', () => {
            this.scene.start(SCENE_PLAY, {difficulty: DIFFICULTY.HARD})
        }))
    }
}
