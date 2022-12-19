import {SceneTitle, SceneRanking, WIDTH, HEIGHT, ScenePlay} from "./scenes/scene_loader.js";
import {SceneResult} from "./scenes/scene_result";
import {SceneLevel} from "./scenes/scene_level";
export const API_URL = process.env.NODE_ENV === 'development' ? `http://localhost:3000` : `.`
export const debug = log => process.env.NODE_ENV === 'development' ? console.log(log) : {}

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: [SceneTitle, SceneRanking, ScenePlay, SceneResult, SceneLevel],
    backgroundColor: '#eee',
    parent: 'game',
}
const game = new Phaser.Game(config)