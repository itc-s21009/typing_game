export default class CustomTable extends Phaser.GameObjects.Container {
    texts
    fontFamily
    fontSize
    tableData

    constructor(scene, x, y, W, H, data) {
        super(scene, x, y)
        this.setSize(W, H)
        this.fontFamily = 'Arial'
        this.fontSize = 20
        if (data) {
            this.tableData = data
            this.updateTable()
        }
    }

    setFontSize = (size) => {
        this.fontSize = size
        this.texts.forEach(t => t.setFontSize(size))
        this.updateTable()
    }

    setFontFamily = (font) => {
        this.fontSize = font
        this.texts.forEach(t => t.setFontFamily(font))
        this.updateTable()
    }

    setTableData = (tableData) => {
        if (!tableData) return
        this.tableData = tableData
        this.updateTable()
    }

    updateTable = () => {
        const ctx = document.createElement('canvas').getContext('2d')
        ctx.font = `${this.fontSize}px ${this.fontFamily}`
        // 縦の列ごとの最大横幅
        const maxWidths = Array(this.tableData[0].length).fill(0)
        // スペースの横幅
        const spaceWidth = ctx.measureText('  ').width
        this.tableData.forEach(line => line.forEach((d, x) => maxWidths[x] = Math.max(ctx.measureText(`${d}`).width, maxWidths[x])))
        const lineStartX = this.x - spaceWidth / 2
        const lineEndX = maxWidths.reduce((a, b) => a + b) + spaceWidth * this.tableData[0].length
        this.texts = this.tableData.map((line, y) => {
            let offsetX = 0
            const textY = this.y + y * (this.fontSize + 10)
            if (y <= 1)  // 上から２本まで横の線を引く
                this.scene.add.line(lineStartX, textY - this.fontSize / 4, 0, 0, lineEndX, 0, 0).setOrigin(0)
            if (y === this.tableData.length - 1) // 一番下の線
                this.scene.add.line(lineStartX, textY + (this.fontSize + 10) - this.fontSize / 4, 0, 0, lineEndX, 0, 0).setOrigin(0)
            line.map((d, x) => {
                const textX = this.x + offsetX
                offsetX += maxWidths[x] + spaceWidth
                // 一番左端と、縦の線
                this.scene.add.line(textX - spaceWidth / 2, textY - 5, 0, 0, 0, this.fontSize * 1.6, 0).setOrigin(0)
                if (x === line.length - 1) {// 一番右端の線
                    this.scene.add.line(this.x + offsetX - spaceWidth / 2, textY - 5, 0, 0, 0, this.fontSize * 1.6, 0).setOrigin(0)
                }
                return this.scene.add.text(textX + (y === 0 ? maxWidths[x] / 2 : 0), textY, d)
                    .setColor('black')
                    .setFontFamily(this.fontFamily)
                    .setFontSize(this.fontSize)
                    .setOrigin(y === 0 ? 0.5 : 0, 0)
            })
        })
    }
}