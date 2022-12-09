import {HEIGHT, SCENE_RANKING, SCENE_TITLE, WIDTH} from "./scene_loader.js";

export class SceneRanking extends Phaser.Scene {
    constructor() {
        super({key: SCENE_RANKING, active: false});
    }

    create() {
        this.add.text(10, 10, 'ランキング')
            .setFontSize(80)
            .setColor('#000')
        this.add.text(WIDTH - 150, HEIGHT - 120, 'Escで\n戻る')
            .setFontSize(50)
            .setColor('#000')
            .setAlign('right')
        this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.scene.start(SCENE_TITLE)
            }
        })
    }
}