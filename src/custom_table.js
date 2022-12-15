export default class CustomTable extends Phaser.GameObjects.Container {
    texts
    fontFamily
    fontSize

    constructor(scene, x, y, W, H, data) {
        super(scene, x, y)
        this.fontFamily = 'Arial'
        this.fontSize = 20
        if (data) {
            this.setTableData(data)
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
        // 縦の列ごとの最大文字数
        const maxWidths = Array(tableData[0].length).fill(0)
        const ctx = document.createElement('canvas').getContext('2d')
        ctx.font = `${this.fontSize}px ${this.fontFamily}`
        tableData.forEach(line => line.forEach((d, x) => maxWidths[x] = Math.max(ctx.measureText(`${d}  `).width, maxWidths[x])))
        this.texts = tableData.map((line, y) => {
            let offsetX = 0
            line.map((d, x) => {
                const textX = this.x + offsetX
                const textY = this.y + y * (this.fontSize + 10)
                offsetX += maxWidths[x]
                return this.scene.add.text(textX, textY, d)
                    .setColor('black')
                    .setFontFamily(this.fontFamily)
                    .setFontSize(this.fontSize)
            })
        })
    }
}