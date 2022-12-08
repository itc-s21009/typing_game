const [width, height] = [800, 500]

class SceneTitle extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(width / 2, 100, 'タイピング')
            .setFontSize(100)
            .setColor('#000')
            .setOrigin()
    }
}
const config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    scene: [SceneTitle],
    backgroundColor: '#eee'
}
const game = new Phaser.Game(config)