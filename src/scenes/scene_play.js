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
    // {display: 'タイピングゲーム', kana: 'たいぴんぐげーむ'},
    // {display: '朱色', kana: 'しゅいろ'},
    // {display: '橋本環奈', kana: 'はしもとかんな'},
    // {display: 'ピッタンコ', kana: 'ぴったんこ'},
    // {display: 'あっいっう', kana: 'あっいっう'},
    // {display: '星のカービィ', kana: 'ほしのかーびぃ'},
    // {display: '名前はまだ無い', kana: 'なまえはまだない'},
    // {display: 'スマッシュ', kana: 'すまっしゅ'},
    {display: 'やっふー', kana: 'やっふー'},
    {display: 'あっつい', kana: 'あっつい'},
    {display: 'ふぉっふぉっふぉ', kana: 'ふぉっふぉっふぉ'},
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
        // 「しゅ」とかのローマ字一覧に「し」と「ゅ」のローマ字一覧を全部まとめる
        // 「しゅ」の場合は「し」に3個、「ゅ」に2個、「しゅ」に元々2個候補があるので、
        // 3x2+2 で最終的に「しゅ」の要素数は8になるはず
        // 'し': [ 'si', 'shi', 'ci' ],
        // 'ゅ': [ 'lyu', 'xyu' ],
        // 'しゅ': [
        //   'syu',    'shu',
        //   'silyu',  'sixyu',
        //   'shilyu', 'shixyu',
        //   'cilyu',  'cixyu'
        // ]
        const prepareForSmallChars = () => Object.keys(romans).filter(k => k.length === 2).forEach(str => {
            const chars = str.split('')
            const [romanList1, romanList2] = [romans[chars[0]], romans[chars[1]]]
            const condidatesToAdd = romanList1.map(x => romanList2.map(y => `${x}${y}`)).flat()
            romans[str].push(...condidatesToAdd)
        })
        const kanaToRoman = (kana) => kana.split('').map(k => romans[k][0]).join('')
        const sentences = SENTENCES[difficulty]
        let sentence            // 出題中の文章
        // 出題中の文章の、かなとローマ字の連想配列のリスト
        // [
        //   {kana: 'か', roman: ['ka', 'ca']}
        //   {kana: 'な', roman: ['na']},
        // ]
        // のように並ぶ
        let kanaRomanMap
        let kanaIndex           // 今打ってる文字の位置
        let romanInput          // 今打ってる文字に対して、どんなキーで正しく打ったか
        let inputForSentence    // 出題中の文章に対して、どんなキーで正しく打ったか
        const checkByCandidates = (candidates, key) => {
            if (candidates.length > 0) {
                romanInput += key
                inputForSentence += key
                console.log(romanInput, candidates, inputForSentence)
                this.text_roman.text = `${romanInput === candidates[0] ? '' : candidates[0].slice(romanInput.length)}${kanaRomanMap.map(d => d.roman[0]).slice(kanaIndex + 1).join('')}`
                if (romanInput === candidates[0]) {
                    kanaIndex++
                    romanInput = ''
                    console.log(`  completed: ${candidates[0]}`)
                }
                if (kanaIndex === kanaRomanMap.length) {
                    kanaIndex = 0
                    inputForSentence = ''
                    showRandomSentence()
                }
            }
        }
        this.input.keyboard.on('keydown', (e) => {
            let d = kanaRomanMap[kanaIndex]
            // 今打ってる文字が最後の文字じゃない場合
            if (kanaIndex < kanaRomanMap.length - 1) {
                const nextChar = kanaRomanMap[kanaIndex + 1]
                const nextRomanChar = nextChar.roman[0][0]
                // 今打ってる文字が「ん」で、「n」まで打ってる時
                const condN = d.kana === 'ん' && romanInput === 'n'
                // 今打ってる文字が「っ」で、次の文字が母音じゃない場合
                const condT = d.kana === 'っ' && !'あいうえお'.split('').includes(nextChar.kana)
                // 次の文字が「っ」以外の小文字の場合
                const condY = 'ぁぃぅぇぉゃゅょ'.includes(nextChar.kana)
                if (condN || condT) {
                    // 次の文字の最初のローマ字がn以外で、それが打ったキーと一致した場合
                    if (nextRomanChar !== 'n' && nextChar.roman.filter(r => r.startsWith(e.key)).length > 0) {
                        kanaIndex++
                        romanInput = ''
                        if (condN) {
                            // 「ん」の判定の場合は、次の文字の判定をこの先で実行する
                            d = kanaRomanMap[kanaIndex]
                        } else if (condT) {
                            // 「っ」の判定の場合は、一旦処理を止める
                            inputForSentence += e.key
                            return
                        }
                    }
                } else if (condY) {
                    // 「ち」+「ゃ」のように連結して、存在するパターンかをチェックする
                    const candidateKana = `${d.kana}${nextChar.kana}`
                    const candidateKanaData = romans[candidateKana]
                    // パターンが存在した場合
                    if (candidateKanaData !== undefined) {
                        // 「ち」の次に「ゃ」が来るような場合は、
                        // 「ちゃ」の１文字として処理する
                        // ['ち', 'ゃ', 'い', 'ろ'] の場合は、
                        // ['ちゃ', 'い', 'ろ'] になるはず...
                        // 「ち」の１文字目のローマ字を打った時に実行されるので、
                        // ひとつの「ちゃ」のようなパターンに対して１回だけ実行される
                        d.kana = candidateKana
                        d.roman = candidateKanaData
                        kanaRomanMap.splice(kanaIndex + 1, 1)
                    }
                }
            }
            const candidates = d.roman.filter(r => r.startsWith(`${romanInput}${e.key}`))
            checkByCandidates(candidates, e.key)
        })
        const showRandomSentence = () => {
            sentence = sentences[Math.floor(Math.random() * sentences.length)]
            kanaRomanMap = sentence.kana.split('').map(k => ({kana: k, roman: romans[k]}))
            kanaIndex = 0
            romanInput = ''
            inputForSentence = ''
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
        prepareForSmallChars()
        createTimer()
        startTimer()
        initTextArea()
        showRandomSentence()
    }
}