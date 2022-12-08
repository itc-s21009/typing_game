const [width, height] = [800, 500]

class CustomButton extends Phaser.GameObjects.Container {
    text
    container

    constructor(scene, x, y, W, H, text, onClick) {
        super(scene, x, y)
        const fontSize = 32
        const colors = {
            container: {
                out: 0x808080,
                hover: 0x202020
            },
            text: {
                // out: 0x000000,
                // hover: 0xffffff
                out: 'black',
                hover: 'white'
            }
        }
        this.scene = scene
        this.scene.add.existing(this)
        this.setSize(W, H)
        this.setInteractive({useHandCursor: true})
        this.text = scene.add.text(0, 0, text,
            {fontSize: fontSize, color: colors.text.out}).setOrigin(0.5, 0.5)
        this.container = scene.add.rectangle(0, 0, W, H)
        this.container.setStrokeStyle(0, 0xffffff)
        this.container.setFillStyle(colors.container.out)
        this.add([this.container, this.text])
        this.on('pointerover', () => {
            this.container.setFillStyle(colors.container.hover)
            this.text.setColor(colors.text.hover)
        })
        this.on('pointerout', () => {
            this.container.setFillStyle(colors.container.out)
            this.text.setColor(colors.text.out)
        })
        this.on('pointerup', onClick)
    }
}

class SceneTitle extends Phaser.Scene {
    constructor() {
        super({key: 'Title'});
    }

    create() {
        this.add.text(width / 2, 100, 'タイピング')
            .setFontSize(100)
            .setColor('#000')
            .setOrigin()
        this.add.existing(new CustomButton(this, width / 4, 300, 250, 100, 'スタート', () => {
            console.log("start")
        }))
        this.add.existing(new CustomButton(this, width / 4 * 3, 300, 250, 100, 'ランキング', () => {
            console.log("ranking")
            this.scene.start('Ranking')
        }))
    }
}

class SceneRanking extends Phaser.Scene {
    constructor() {
        super({key: 'Ranking', active: false});
    }

    create() {
        this.add.text(10, 10, 'ランキング')
            .setFontSize(80)
            .setColor('#000')
        this.add.text(width - 150, height - 120, 'Escで\n戻る')
            .setFontSize(50)
            .setColor('#000')
            .setAlign('right')
    }
}

const config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    scene: [SceneTitle, SceneRanking],
    backgroundColor: '#eee'
}
const game = new Phaser.Game(config)