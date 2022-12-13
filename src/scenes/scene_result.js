import {HEIGHT, SCENE_RESULT, WIDTH} from "./scene_loader.js";
import CustomText from "../custom_text.js";

export class SceneResult extends Phaser.Scene {
    constructor() {
        super({key: SCENE_RESULT});
    }

    create({score, speed, miss, accuracy }) {
        this.add.existing(new CustomText(this, WIDTH / 2, 50, '結果')
            .setAlignCenterHorizontally(true)
            .setFontSize(60))

        this.add.existing(new CustomText(this, WIDTH / 2, 150, `Score\n${score}`)
                .setAlignCenterHorizontally(true)
                .setAlign('center')
                .setFontSize(60)
            )
        this.add.existing(new CustomText(this, WIDTH / 3, 280, `・${speed}`)
            .setFontSize(60)
        )
        this.add.existing(new CustomText(this, WIDTH / 3, 330, `・${miss}`)
            .setFontSize(60)
        )
        this.add.existing(new CustomText(this, WIDTH / 3, 380, `・${accuracy} %`)
            .setFontSize(60)
        )
        this.add.existing(
            new CustomText(this, WIDTH - 90, HEIGHT - 80, 'Escで\n戻る')
                .setAlign('right')
                .setFontSize(30)
        )
        this.add.existing(
            new CustomText(this, WIDTH - 90, HEIGHT - 150, '登録')
                .setAlign('right')
                .setFontSize(30)
        )
    }
}
