export default class CustomText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text)
            .setFontFamily('Arial')
            .setFontSize(80)
            .setColor('#000')
            .setStyle(style)
    }

    /**
     * 文字を横方向に中央揃えするかを設定する
     * alignがtrueの場合は中央揃えにする
     * @param align
     * @returns {CustomText}
     */
    setAlignCenterHorizontally = (align) => {
        this.originX = align ? 0.5 : 1
        this.updateDisplayOrigin()
        return this
    }

    /**
     * 文字を縦方向に中央揃えするかを設定する
     * alignがtrueの場合は中央揃えにする
     * @param align
     * @returns {CustomText}
     */
    setAlignCenterVertically = (align) => {
        this.originY = align ? 0.5 : 1
        this.updateDisplayOrigin()
        return this
    }

    /**
     * 文字を上下左右方向に中央揃えするかを設定する
     * alignがtrueの場合は中央揃えにする
     * @param align
     * @returns {CustomText}
     */
    setCentered = (align) => this.setOrigin(align ? 0.5 : 1, align ? 0.5 : 1)
}