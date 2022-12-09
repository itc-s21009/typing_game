import {SceneTitle, SceneRanking, WIDTH, HEIGHT} from "./scenes/scene_loader.js";

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: [SceneTitle, SceneRanking],
    backgroundColor: '#eee'
}
const game = new Phaser.Game(config)