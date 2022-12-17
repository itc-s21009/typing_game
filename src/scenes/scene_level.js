import CustomButton from "../custom_button.js";
import {SCENE_LEVEL, SCENE_PLAY, SCENE_TITLE, WIDTH} from "./scene_loader.js";
import CustomText from "../custom_text.js";

export const DIFFICULTY = Object.freeze({
    EASY: {min: 1, max: 7},
    NORMAL: {min: 8, max: 14},
    HARD: {min: 15, max: 64}
})

export class SceneLevel extends Phaser.Scene {
    isCtrlDown = false
    constructor() {
        super({key: SCENE_LEVEL});
    }

    create() {
        this.input.keyboard.on('keyup', (e) => {
            if (e.key === 'Control') {
                this.isCtrlDown = false
            }
        })
        this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.scene.start(SCENE_TITLE)
            }
            if (e.key === 'Control') {
                this.isCtrlDown = true
            }
        })
        this.add.existing(new CustomText(this, 0, 10, '難易度選択').setFontSize(60))
        this.add.existing(new CustomButton(this, WIDTH / 5, 300, 200, 200, 'Easy', () => {
            this.start(SCENE_PLAY, DIFFICULTY.EASY)
        }))
        this.add.existing(new CustomButton(this, WIDTH / 2, 300, 200, 200, 'Normal', () => {
            this.start(SCENE_PLAY, DIFFICULTY.NORMAL)
        }))
        this.add.existing(new CustomButton(this, WIDTH / 5 * 4, 300, 200, 200, 'Hard', () => {
            this.start(SCENE_PLAY, DIFFICULTY.HARD)
        }))
    }

    start(key, difficulty) {
        this.scene.start(key, {difficulty: difficulty, debug: this.isCtrlDown})
    }
}
