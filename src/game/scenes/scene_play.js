import {HEIGHT, SCENE_LEVEL, SCENE_PLAY, SCENE_RESULT, WIDTH} from "./scene_loader";
import CustomText from "../components/custom_text";
import {API_URL, debug} from "../../game";
import axios from "axios";

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
    'きゃ': ['kya'],
    'きぃ': ['kyi'],
    'きゅ': ['kyu'],
    'きぇ': ['kye'],
    'きょ': ['kyo'],
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
    '、': [','],
    '。': ['.'],
    '1': ['1'],
    '2': ['2'],
    '3': ['3'],
    '4': ['4'],
    '5': ['5'],
    '6': ['6'],
    '7': ['7'],
    '8': ['8'],
    '9': ['9'],
    '0': ['0'],
    '１': ['1'],
    '２': ['2'],
    '３': ['3'],
    '４': ['4'],
    '５': ['5'],
    '６': ['6'],
    '７': ['7'],
    '８': ['8'],
    '９': ['9'],
    '０': ['0'],
}

export class ScenePlay extends Phaser.Scene {
    text_loading
    text_timer
    text_display
    text_roman
    text_typed
    text_stats

    constructor() {
        super({key: SCENE_PLAY});
    }

    create({difficulty, debug}) {
        if (difficulty === undefined) {
            this.add.existing(new CustomText(this, WIDTH / 2, HEIGHT / 2, 'エラー\ndifficultyがないです')
                .setCentered(true)
                .setAlign('center'))
            return
        }
        this.text_loading = new CustomText(this, WIDTH / 2, HEIGHT / 2, '読み込み中...')
            .setCentered(true)
            .setAlign('center')
        this.add.existing(this.text_loading)
        axios.get(`${API_URL}/api/sentences?min=${difficulty.min}&max=${difficulty.max}`)
            .then(r => r.data)
            .then(sentences => {
                this.text_loading.destroy()
                this.startCountdown(() => this.startGame(sentences, debug))
            })
            .catch((e) => this.text_loading.text = "エラー\nお題の文章を\n読み込めませんでした")
    }
    startCountdown(callback) {
        let timer_id
        let time = 3
        const countdown_text = new CustomText(this, WIDTH / 2, HEIGHT / 2, '')
            .setCentered(true)
        this.add.existing(countdown_text)
        const timer_task = () => {
            if (time <= 0) {
                countdown_text.destroy()
                clearInterval(timer_id)
                callback()
                return
            }
            countdown_text.setText(`${time}...`)
            time--
        }
        timer_id = setInterval(timer_task, 1000)
    }
    startGame(sentences, isDebug) {
        let timer_id
        const time_start = isDebug ? 5 : 60
        let time = time_start
        this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.scene.start(SCENE_LEVEL)
                clearInterval(timer_id)
            }
        })
        let typeCount = 0       // 全入力回数
        let correctCount = 0    // 正しい入力回数
        const getCalculatedStats = () => {
            const miss = typeCount - correctCount
            const accuracy = Math.round(correctCount / typeCount * 100 * 10) / 10
            const keysPerSecond = Math.round(correctCount / (time_start - time) * 10) / 10
            const score = Math.round(correctCount * keysPerSecond * (accuracy / 100))
            return {miss: miss, accuracy: accuracy, keysPerSecond: keysPerSecond, score: score}
        }
        const updateStats = () => {
            const {miss, accuracy, keysPerSecond, score} = getCalculatedStats()
            this.text_stats.text = `(後で消す)\nミス数: ${miss}\n正確率: ${accuracy}%\nキー/秒: ${keysPerSecond}\nスコア: ${score}`
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
        let qSentences = []     // 出題する文章のキュー
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
        let charForT            // 「kko(っこ)」のように重ねて入力する場合、何を重ねたかの記録用（この場合はk）
        const checkByCandidates = (candidates, key) => {
            // 2文字目以降で、前の文字が「っ」で、重ねる入力方法をしていた場合
            if (kanaIndex > 0 && charForT !== '' && kanaRomanMap[kanaIndex - 1].kana === 'っ') {
                // 前回重ねた文字を使った打ち方のみ残す
                // 「hhu(っふ)」を「f」で重ねた場合、
                // ['hu', 'fu']から'fu'だけを残す
                // これをしないと「やっふー」が「yahfu-」とか「yafhu-」で打ててしまった
                candidates = candidates.filter(c => c.startsWith(charForT))
            }
            if (candidates.length > 0) {
                romanInput += key
                inputForSentence += key
                correctCount++
                debug(`${romanInput}, ${candidates}, ${inputForSentence}`)
                let displayTyped = inputForSentence
                let displayRoman = `${romanInput === candidates[0] ? '' : candidates[0].slice(romanInput.length)}${kanaRomanMap.slice(kanaIndex + 1).map(d => d.roman[0]).join('')}`
                for (let i = 0; i < displayRoman.length; i++) {
                    displayTyped = `${displayTyped} `
                }
                for (let i = 0; i < inputForSentence.length; i++) {
                    displayRoman = ` ${displayRoman}`
                }
                this.text_typed.text = displayTyped
                this.text_roman.text = displayRoman
                if (romanInput === candidates[0]) {
                    kanaIndex++
                    romanInput = ''
                    charForT = ''
                    debug(`  completed: ${candidates[0]}`)
                }
                if (kanaIndex === kanaRomanMap.length) {
                    kanaIndex = 0
                    inputForSentence = ''
                    showRandomSentence()
                }
            }
        }
        this.input.keyboard.on('keydown', (e) => {
            if (time < 0) {
                return
            }
            typeCount++
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
                    // 次の文字の最初のローマ字がnと句読点以外で、それが打ったキーと一致した場合
                    if (!'n,.'.includes(nextRomanChar) && nextChar.roman.filter(r => r.startsWith(e.key)).length > 0) {
                        kanaIndex++
                        romanInput = ''
                        if (condN) {
                            // 「ん」の判定の場合は、次の文字の判定をこの先で実行する
                            d = kanaRomanMap[kanaIndex]
                        } else if (condT) {
                            // 正しく打ったキーを記録
                            inputForSentence += e.key
                            // 重ねたキーを記録
                            charForT = e.key
                            // 正しい入力としてカウントする
                            correctCount++
                            updateStats()
                            // 「っ」の判定の場合は、一旦処理を止める
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
            updateStats()
        })
        const showRandomSentence = () => {
            // キューが空になったら、新しくランダムな順番で補充する
            // これで同じ文章を２連続で打ったり、すぐ同じ文章が出るということがほとんどなくなる
            if (qSentences.length === 0) {
                const sentencesCopy = [...sentences]
                qSentences = [...Array(sentencesCopy.length)].map(() => sentencesCopy.splice(Math.floor(Math.random() * sentencesCopy.length), 1)[0])
            }
            sentence = qSentences.pop()
            kanaRomanMap = sentence['kana'].split('').map(k => ({kana: k, roman: romans[k]}))
            kanaIndex = 0
            romanInput = ''
            inputForSentence = ''
            this.text_roman.text = kanaToRoman(sentence['kana'])
            this.text_typed.text = ''
            this.text_display.text = sentence['sentence']
        }
        const createTimer = () => {
            this.text_timer = new CustomText(this, 0, 0, '')
            this.add.existing(this.text_timer)
        }
        const initTextArea = () => {
            this.add.rectangle(WIDTH / 2, HEIGHT / 2, 750, HEIGHT / 4)
                .setFillStyle(0x808080)
            this.text_roman = new CustomText(this, WIDTH / 2, HEIGHT / 2 + 40, '')
                .setOrigin(0.5, 1)
                .setFontSize(28)
                .setFontFamily('Courier New')
                .setColor('#505050')
            this.text_typed = new CustomText(this, WIDTH / 2, HEIGHT / 2 + 40, '')
                .setOrigin(0.5, 1)
                .setFontSize(28)
                .setFontFamily('Courier New')
            this.text_display = new CustomText(this, WIDTH / 2, HEIGHT / 2, '')
                .setOrigin(0.5, 1)
                .setFontSize(28)
                .setFontFamily('MS UI Gothic')
            this.text_stats = new CustomText(this, 0, HEIGHT - 180, '')
                .setFontSize(32)
            this.add.existing(this.text_roman)
            this.add.existing(this.text_typed)
            this.add.existing(this.text_display)
            this.add.existing(this.text_stats)
        }
        const startTimer = () => {
            const timer_task = () => {
                if (time <= 0) {
                    clearInterval(timer_id)
                    const {miss, accuracy, keysPerSecond, score} = getCalculatedStats()
                    this.scene.start(SCENE_RESULT, {
                        score: score,
                        speed: keysPerSecond,
                        miss: miss,
                        accuracy: accuracy
                    })
                } else {
                    this.text_timer.text = `残り${time}秒`
                    updateStats()
                }
                time--
            }
            timer_task()
            timer_id = setInterval(timer_task, 1000)
        }
        prepareForSmallChars()
        initTextArea()
        createTimer()
        startTimer()
        showRandomSentence()
        updateStats()
    }
}