export default class CustomTable extends Phaser.GameObjects.Container {
    texts
    fontFamily
    fontSize
    tableData

    constructor(scene, x, y, W, H, data) {
        super(scene, x, y)
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
        this.setTableData(this.tableData)
    }

    setFontFamily = (font) => {
        this.fontSize = font
        this.texts.forEach(t => t.setFontFamily(font))
        this.setTableData(this.tableData)
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
        this.texts = this.tableData.map((line, y) => {
            let offsetX = 0
            line.map((d, x) => {
                const textX = this.x + offsetX
                const textY = this.y + y * (this.fontSize + 10)
                offsetX += maxWidths[x] + spaceWidth
                return this.scene.add.text(textX+(y === 0? maxWidths[x]/2:0), textY, d)
                    .setColor('black')
                    .setFontFamily(this.fontFamily)
                    .setFontSize(this.fontSize)
                    .setOrigin(y === 0 ? 0.5 : 0, 0.5)
            })
        })
    }
}