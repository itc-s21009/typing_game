import {HEIGHT, SCENE_PLAY, SCENE_TITLE, WIDTH} from "./scene_loader";
import CustomText from "../custom_text";

const romans = {
    'あ': ['a'],
    'い': ['i', 'yi'],
    'う': ['u', 'wu', 'whu'],
    'え': ['e'],
    'お': ['o'],
    'か': ['ka', 'ca'],
    'き': ['ki'],
    'く': ['ku', 'cu', 'qu'],
    'け': ['ke'],
    'こ': ['ko', 'co'],
    'さ': ['sa'],
    'し': ['si', 'shi', 'ci'],
    'す': ['su'],
    'せ': ['se', 'ce'],
    'そ': ['so'],
    'た': ['ta'],
    'ち': ['ti', 'chi'],
    'つ': ['tu', 'tsu'],
    'て': ['te'],
    'と': ['to'],
    'な': ['na'],
    'に': ['ni'],
    'ぬ': ['nu'],
    'ね': ['ne'],
    'の': ['no'],
    'は': ['ha'],
    'ひ': ['hi'],
    'ふ': ['hu', 'fu'],
    'へ': ['he'],
    'ほ': ['ho'],
    'ま': ['ma'],
    'み': ['mi'],
    'む': ['mu'],
    'め': ['me'],
    'も': ['mo'],
    'ら': ['ra'],
    'り': ['ri'],
    'る': ['ru'],
    'れ': ['re'],
    'ろ': ['ro'],
    'や': ['ya'],
    'ゆ': ['yu'],
    'よ': ['yo'],
    'わ': ['wa'],
    'を': ['wo'],
    'ん': ['nn', 'n\'', 'xn'],
    'が': ['ga'],
    'ぎ': ['gi'],
    'ぐ': ['gu'],
    'げ': ['ge'],
    'ご': ['go'],
    'ざ': ['za'],
    'じ': ['zi', 'ji'],
    'ず': ['zu'],
    'ぜ': ['ze'],
    'ぞ': ['zo'],
    'だ': ['da'],
    'ぢ': ['di'],
    'づ': ['du'],
    'で': ['de'],
    'ど': ['do'],
    'ば': ['ba'],
    'び': ['bi'],
    'ぶ': ['bu'],
    'べ': ['be'],
    'ぼ': ['bo'],
    'ぱ': ['pa'],
    'ぴ': ['pi'],
    'ぷ': ['pu'],
    'ぺ': ['pe'],
    'ぽ': ['po'],
    'ー': ['-'],
    'いぇ': ['ye'],
    'うぁ': ['wha'],
    'うぃ': ['wi', 'whi'],
    'うぇ': ['we', 'whe'],
    'うぉ': ['who'],
    'くゃ': ['qya'],
    'くゅ': ['qyu'],
    'くょ': ['qyo'],
    'くぁ': ['qa', 'qwa'],
    'くぃ': ['qi', 'qwi', 'qyi'],
    'くぅ': ['qwu'],
    'くぇ': ['qe', 'qwe', 'qye'],
    'くぉ': ['qo', 'qwo'],
    'ぎゃ': ['gya'],
    'ぎぃ': ['gyi'],
    'ぎゅ': ['gyu'],
    'ぎぇ': ['gye'],
    'ぎょ': ['gyo'],
    'ぐぁ': ['gwa'],
    'ぐぃ': ['gwi'],
    'ぐぅ': ['gwu'],
    'ぐぇ': ['gwe'],
    'ぐぉ': ['gwo'],
    'しゃ': ['sya', 'sha'],
    'しぃ': ['syi'],
    'しゅ': ['syu', 'shu'],
    'しぇ': ['sye', 'she'],
    'しょ': ['syo', 'sho'],
    'すぁ': ['swa'],
    'すぃ': ['swi'],
    'すぅ': ['swu'],
    'すぇ': ['swe'],
    'すぉ': ['swo'],
    'じゃ': ['ja', 'zya', 'jya'],
    'じぃ': ['zyi', 'jyi'],
    'じゅ': ['zyu', 'ju', 'jyu'],
    'じぇ': ['zye', 'je', 'jye'],
    'じょ': ['zyo', 'jo', 'jyo'],
    'ちゃ': ['tya', 'cha', 'cya'],
    'ちぃ': ['tyi', 'cyi'],
    'ちゅ': ['tyu', 'chu', 'cyu'],
    'ちぇ': ['tye', 'che', 'cye'],
    'ちょ': ['tyo', 'cho', 'cyo'],
    'つぁ': ['tsa'],
    'つぃ': ['tsi'],
    'つぇ': ['tse'],
    'つぉ': ['tso'],
    'てゃ': ['tha'],
    'てぃ': ['thi'],
    'てゅ': ['thu'],
    'てぇ': ['the'],
    'てょ': ['tho'],
    'とぁ': ['twa'],
    'とぃ': ['twi'],
    'とぅ': ['twu'],
    'とぇ': ['twe'],
    'とぉ': ['two'],
    'ぢゃ': ['dya'],
    'ぢぃ': ['dyi'],
    'ぢゅ': ['dyu'],
    'ぢぇ': ['dye'],
    'ぢょ': ['dyo'],
    'でゃ': ['dha'],
    'でぃ': ['dhi'],
    'でゅ': ['dhu'],
    'でぇ': ['dhe'],
    'でょ': ['dho'],
    'どぁ': ['dwa'],
    'どぃ': ['dwi'],
    'どぅ': ['dwu'],
    'どぇ': ['dwe'],
    'どぉ': ['dwo'],
    'にゃ': ['nya'],
    'にぃ': ['nyi'],
    'にゅ': ['nyu'],
    'にぇ': ['nye'],
    'にょ': ['nyo'],
    'ひゃ': ['hya'],
    'ひぃ': ['hyi'],
    'ひゅ': ['hyu'],
    'ひぇ': ['hye'],
    'ひょ': ['hyo'],
    'ふゃ': ['fya'],
    'ふゅ': ['fyu'],
    'ふょ': ['fyo'],
    'ふぁ': ['fa', 'fwa'],
    'ふぃ': ['fi', 'fwi', 'fyi'],
    'ふぅ': ['fwu'],
    'ふぇ': ['fe', 'fwe', 'fye'],
    'ふぉ': ['fo', 'fwo'],
    'びゃ': ['bya'],
    'びぃ': ['byi'],
    'びゅ': ['byu'],
    'びぇ': ['bye'],
    'びょ': ['byo'],
    'ぴゃ': ['pya'],
    'ぴぃ': ['pyi'],
    'ぴゅ': ['pyu'],
    'ぴぇ': ['pye'],
    'ぴょ': ['pyo'],
    'みゃ': ['mya'],
    'みぃ': ['myi'],
    'みゅ': ['myu'],
    'みぇ': ['mye'],
    'みょ': ['myo'],
    'りゃ': ['rya'],
    'りぃ': ['ryi'],
    'りゅ': ['ryu'],
    'りぇ': ['rye'],
    'りょ': ['ryo'],
    'ぁ': ['la', 'xa'],
    'ぃ': ['li', 'xi', 'lyi', 'xyi'],
    'ぅ': ['lu', 'xu'],
    'ぇ': ['le', 'xe', 'lye', 'xye'],
    'ぉ': ['lo', 'xo'],
    'っ': ['ltu', 'xtu', 'ltsu'],
    'ゃ': ['lya', 'xya'],
    'ゅ': ['lyu', 'xyu'],
    'ょ': ['lyo', 'xyo'],
    'ゎ': ['lwa', 'xwa'],
}

const easy = [
    {display: 'イージー', kana: 'いーじー'}
]
const normal = [
    // {display: '吾輩は猫である', kana: 'わがはいはねこである'},
    // {display: 'お寿司が食べたい', kana: 'おすしがたべたい'},
    {display: 'タイピングゲーム', kana: 'たいぴんぐげーむ'},
    {display: '橋本環奈', kana: 'はしもとかんな'},
    // {display: '星のカービィ', kana: 'ほしのかーびぃ'},
    // {display: '名前はまだ無い', kana: 'なまえはまだない'},
    // {display: 'スマッシュブラザーズ', kana: 'すまっしゅぶらざーず'},
    // {display: 'プログラミング', kana: 'ぷろぐらみんぐ'},
]
const hard = [
    {display: 'ハード', kana: 'はーど'}
]
const SENTENCES = [easy, normal, hard]
export const DIFFICULTY = Object.freeze({
    EASY: 0,
    NORMAL: 1,
    HARD: 2
})

export class ScenePlay extends Phaser.Scene {
    text_timer
    text_display
    text_roman

    constructor() {
        super({key: SCENE_PLAY});
    }

    create({difficulty}) {
        let timer_id
        this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.scene.start(SCENE_TITLE)
                clearInterval(timer_id)
            }
        })
        if (difficulty === undefined) {
            this.add.existing(new CustomText(this, WIDTH / 2, HEIGHT / 2, 'エラー\ndifficultyがないです')
                .setCentered(true)
                .setAlign('center'))
            return
        }
        const kanaToRoman = (kana) => kana.split('').map(k => romans[k][0]).join('')
        const sentences = SENTENCES[difficulty]
        let sentence, kanaRomanMap, kanaIndex, romanInput
        this.input.keyboard.on('keydown', (e) => {
            let d = kanaRomanMap[kanaIndex]
            // 今打ってる文字が最後の文字じゃなくて、「ん」で、「n」まで打ってる時
            if (kanaIndex < kanaRomanMap.length && d.kana === 'ん' && romanInput === 'n') {
                const nextRomanChar = kanaRomanMap[kanaIndex + 1].roman[0][0]
                console.log(nextRomanChar)
                // 次の文字の最初のローマ字がn以外で、それが打ったキーと一致した場合
                if (nextRomanChar !== 'n' && nextRomanChar === e.key) {
                    // 次の文字の１文字を入力した状態で、次の文字へ
                    kanaIndex++
                    romanInput = ''
                    d = kanaRomanMap[kanaIndex]
                }
            }
            const candidates = d.roman.filter(r => r.startsWith(`${romanInput}${e.key}`))
            if (candidates.length > 0) {
                romanInput += e.key
                console.log(romanInput, candidates)
                this.text_roman.text = `${romanInput === candidates[0] ? '' : candidates[0].slice(romanInput.length)}${kanaRomanMap.map(d => d.roman[0]).slice(kanaIndex + 1).join('')}`
                if (romanInput === candidates[0]) {
                    kanaIndex++
                    romanInput = ''
                    console.log(`  completed: ${candidates[0]}`)
                }
                if (kanaIndex === kanaRomanMap.length) {
                    kanaIndex = 0
                    showRandomSentence()
                }
            }
        })
        const showRandomSentence = () => {
            sentence = sentences[Math.floor(Math.random() * sentences.length)]
            kanaRomanMap = sentence.kana.split('').map(k => ({kana: k, roman: romans[k]}))
            kanaIndex = 0
            romanInput = ''
            this.text_roman.text = kanaToRoman(sentence.kana)
            this.text_display.text = sentence.display
        }
        const createTimer = () => {
            this.text_timer = new CustomText(this, 0, 0, '')
            this.add.existing(this.text_timer)
        }
        const initTextArea = () => {
            this.add.rectangle(WIDTH / 4, HEIGHT / 2)
                .setSize(550, HEIGHT / 4)
                .setFillStyle(0x808080)
            this.text_roman = new CustomText(this, WIDTH / 2, HEIGHT / 2 + 40, '')
                .setOrigin(0.5, 1)
                .setFontSize(32)
                .setFontFamily('MS UI Gothic')
            this.text_display = new CustomText(this, WIDTH / 2, HEIGHT / 2, '')
                .setOrigin(0.5, 1)
                .setFontSize(32)
                .setFontFamily('MS UI Gothic')
            this.add.existing(this.text_roman)
            this.add.existing(this.text_display)
        }
        const startTimer = () => {
            let time = 60
            const timer_task = () => {
                if (time <= 0) {
                    this.text_timer.text = `終了`
                    clearInterval(timer_id)
                    return
                }
                this.text_timer.text = `残り${time}秒`
                time--
            }
            timer_task()
            timer_id = setInterval(timer_task, 1000)
        }
        createTimer()
        startTimer()
        initTextArea()
        showRandomSentence()
    }
}