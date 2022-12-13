import {HEIGHT, SCENE_RANKING, SCENE_TITLE, WIDTH} from "./scene_loader.js";
import CustomText from "../custom_text";

export class SceneRanking extends Phaser.Scene {
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
        this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.scene.start(SCENE_TITLE)
            }
        })
    }
}