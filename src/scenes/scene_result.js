import {HEIGHT, SCENE_RESULT, WIDTH} from "./scene_loader.js";
import CustomText from "../custom_text.js";
import CustomButton from "../custom_button";

export class SceneResult extends Phaser.Scene {
    constructor() {
        super({key: SCENE_RESULT});
    }

    create({score, speed, miss, accuracy}) {
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
        const click = () => {
            this.add.rectangle(400, 250, 550, 500)
                .setFillStyle(0xffffff)

            this.add.existing(
                new CustomText(this, WIDTH / 2, 10, 'ランキングに名前を登録します。')
                    .setAlignCenterHorizontally(true)
                    .setFontSize(30)
            )
            this.add.existing(
                new CustomText(this, WIDTH / 4, HEIGHT / 3, '名前入力')
                    .setAlignCenterHorizontally(true)
                    .setFontSize(30)
            )
            this.add.existing(
                new CustomButton(this, WIDTH / 8 * 3, HEIGHT - 50, 180, 50, '登録', () => {

                } )
            )
            this.add.existing(
                new CustomButton(this, WIDTH / 8 * 5, HEIGHT - 50, 180, 50, 'キャンセル', () => {

                } )
            )
        }
        const register = new CustomButton(this, WIDTH - 50, HEIGHT - 110, 80, 50, '登録', click)
        this.add.existing(register)

    }
}
