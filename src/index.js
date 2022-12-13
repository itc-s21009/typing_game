import {SceneTitle, SceneRanking, WIDTH, HEIGHT, ScenePlay} from "./scenes/scene_loader.js";
import {SceneResult} from "./scenes/scene_result";

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: [SceneTitle, SceneRanking, ScenePlay, SceneResult],
    backgroundColor: '#eee'
}
const game = new Phaser.Game(config)