export default class CustomButton extends Phaser.GameObjects.Container {
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