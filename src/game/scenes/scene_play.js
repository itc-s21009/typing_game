import {HEIGHT, SCENE_LEVEL, SCENE_PLAY, SCENE_RESULT, WIDTH} from "./scene_loader";
import CustomText from "../components/custom_text";
import {API_URL, debug} from "../../game";
import axios from "axios";

/**
 * @typedef {{id: number, sentence: string, kana: string}} Sentence
 */
/**
 * @typedef {{kana: string, roman: string[]}} KanaChar
 */

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

const COLOR_ROMAN = '#505050'
const COLOR_NEXT_CHAR = '#000080'
const COLOR_MISS = '#b00000'

export class ScenePlay extends Phaser.Scene {
    text_loading
    text_timer
    text_display
    text_roman
    text_next_char
    text_typed

    constructor() {
        super({key: SCENE_PLAY});
    }

    create({difficulty, debug}) {
        const drawError = (msg) => {
            eraseLoadingText()
            this.add.existing(new CustomText(this, WIDTH / 2, HEIGHT / 2, `エラー\n${msg}`)
                .setCentered(true)
                .setAlign('center')
                .setFontSize(40)
            )
        }
        const drawLoadingText = () => {
            this.text_loading = new CustomText(this, WIDTH / 2, HEIGHT / 2, '読み込み中...')
                .setCentered(true)
                .setAlign('center')
            this.add.existing(this.text_loading)
        }
        const eraseLoadingText = () => this.text_loading ? this.text_loading.destroy() : {}
        if (difficulty === undefined) {
            drawError('難易度が設定できませんでした')
            return
        }
        drawLoadingText()
        axios.get(`${API_URL}/api/sentences?min=${difficulty.min}&max=${difficulty.max}`)
            .then(r => r.data)
            .then(sentences => {
                eraseLoadingText()
                this.startCountdown(() => this.startGame(sentences, debug))
            })
            .catch((e) => drawError('お題の文章が読み込めませんでした'))
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
        const time_start = isDebug ? 30 : 60
        let time = time_start
        this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.scene.start(SCENE_LEVEL)
                clearInterval(timer_id)
            }
        })
        let typeCount = 0       // 全入力回数
        let correctCount = 0    // 正しい入力回数

        /**
         * 今の時点での成績を取得する関数
         * @returns {{score: number, accuracy: number, keysPerSecond: number, miss: number}}
         */
        const getCalculatedStats = () => {
            const miss = typeCount - correctCount
            const accuracy = Math.round(correctCount / typeCount * 100 * 10) / 10
            const keysPerSecond = Math.round(correctCount / (time_start - time) * 10) / 10
            const score = Math.round(correctCount * keysPerSecond * (accuracy / 100))
            return {miss: miss, accuracy: accuracy, keysPerSecond: keysPerSecond, score: score}
        }

        /**
         * 「しゅ」とかのローマ字一覧に「し」と「ゅ」のローマ字一覧を全部まとめる関数
         * 「しゅ」の場合は「し」に3個、「ゅ」に2個、「しゅ」に元々2個候補があるので、
         * 3x2+2 で最終的に「しゅ」の要素数は8になるはず
         * 'し': [ 'si', 'shi', 'ci' ],
         * 'ゅ': [ 'lyu', 'xyu' ],
         * 'しゅ': [
         *     'syu',    'shu',
         *     'silyu',  'sixyu',
         *     'shilyu', 'shixyu',
         *     'cilyu',  'cixyu'
         * ]
         */
        const registerSmallChars = () => Object.keys(romans).filter(k => k.length === 2).forEach(str => {
            const chars = str.split('')
            const [romanList1, romanList2] = [romans[chars[0]], romans[chars[1]]]
            const candidatesToAdd = romanList1.map(x => romanList2.map(y => `${x}${y}`)).flat()
            romans[str].push(...candidatesToAdd)
        })

        /**
         * 出題する文章のキュー
         * @type {Sentence[]}
         */
        let qSentences = []
        /**
         * 出題中の文章
         * @type {Sentence}
         */
        let sentence
        /**
         * 出題中の文章の、かなとローマ字の連想配列のリスト
         * @type {KanaChar[]}
         */
        let kanaRomanMap
        /** 今打ってる文字の位置 */
        let kanaIndex
        /** 今打ってる文字に対して、どんなキーで正しく打ったか */
        let romanInput
        /** 出題中の文章に対して、どんなキーで正しく打ったか */
        let inputForSentence
        /** 「kko(っこ)」のように重ねて入力する場合、何を重ねたかの記録用（この場合はk） */
        let charForT

        /**
         * ローマ字の部分の表示を更新する関数
         * @param {string} nextCandidate    今打ってる文字のローマ字入力パターンの候補
         */
        const updateDisplayedText = (nextCandidate) => {
            let displayTyped = inputForSentence
            let displayRoman = `${romanInput === nextCandidate ? '' : nextCandidate.slice(romanInput.length)}${kanaRomanMap.slice(kanaIndex + 1).map(d => d.roman[0]).join('')}`
            let displayNextChar = ' ' + displayRoman[0]
            for (let i = 0; i < displayRoman.length; i++) {
                displayNextChar = displayNextChar + ' '
                displayTyped = displayTyped + ' '
            }
            displayRoman = ' ' + displayRoman.slice(1)
            for (let i = 0; i < inputForSentence.length; i++) {
                displayNextChar = ' ' + displayNextChar
                displayRoman = ' ' + displayRoman
            }
            this.text_typed.text = displayTyped
            this.text_next_char.text = displayNextChar
            this.text_roman.text = displayRoman
        }

        /**
         * パターンの候補がある場合にタイピングを進める関数
         * @param {string[]} candidates 次の文字のローマ字入力パターンの候補の配列
         * @param {string} key          打ったキー
         */
        const attemptToType = (candidates, key) => {
            // 候補の中から、今入力可能なものだけに絞る
            candidates = candidates.filter(r => r.startsWith(`${romanInput}${key}`))
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
                updateDisplayedText(candidates[0])
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
                this.text_next_char.setColor(COLOR_NEXT_CHAR)
            } else {
                this.text_next_char.setColor(COLOR_MISS)
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
                // 次の文字が母音の場合
                const condB = 'あいうえお'.split('').includes(nextChar.kana)
                // 今打ってる文字が「っ」で、次の文字が母音じゃない場合
                const condT = d.kana === 'っ' && !condB
                // 次の文字が「っ」以外の小文字の場合
                const condY = 'ぁぃぅぇぉゃゅょ'.includes(nextChar.kana)
                if (condN || condT) {
                    debug(`nextRomanChar ${nextRomanChar}`)
                    // 次の文字の最初のローマ字がn以外で、母音以外で、それが打ったキーと一致した場合
                    if (!'n'.includes(nextRomanChar) && !condB && nextChar.roman.filter(r => r.startsWith(e.key)).length > 0) {
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
                            updateDisplayedText(nextChar.roman[0])
                            // 正しい入力としてカウントする
                            correctCount++
                            // 「っ」の判定の場合は、一旦処理を止める
                            return
                        }
                    }
                } else if (condY) {
                    // 「ち」+「ゃ」のように連結して、存在するパターンかをチェックする
                    /** 今の文字と次の文字を連結する */
                    const candidateKana = `${d.kana}${nextChar.kana}`
                    /** 連結した文字のローマ字入力パターンを取得する */
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
            attemptToType(d.roman, e.key)
        })
        const showRandomSentence = () => {
            // キューが空になったら、新しくランダムな順番で補充する
            // これで同じ文章を２連続で打ったり、すぐ同じ文章が出るということがほとんどなくなる
            if (qSentences.length === 0) {
                const sentencesCopy = [...sentences]
                qSentences = [...Array(sentencesCopy.length)].map(() => sentencesCopy.splice(Math.floor(Math.random() * sentencesCopy.length), 1)[0])
            }
            sentence = qSentences.pop()
            kanaRomanMap = sentence.kana.split('').map(k => ({kana: k, roman: romans[k]}))
            kanaIndex = 0
            romanInput = ''
            inputForSentence = ''
            this.text_display.text = sentence.sentence
            updateDisplayedText(kanaRomanMap[0].roman[0])
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
                .setColor(COLOR_ROMAN)
            this.text_next_char = new CustomText(this, WIDTH / 2, HEIGHT / 2 + 40, '')
                .setOrigin(0.5, 1)
                .setFontSize(28)
                .setFontFamily('Courier New')
                .setColor(COLOR_NEXT_CHAR)
            this.text_typed = new CustomText(this, WIDTH / 2, HEIGHT / 2 + 40, '')
                .setOrigin(0.5, 1)
                .setFontSize(28)
                .setFontFamily('Courier New')
            this.text_display = new CustomText(this, WIDTH / 2, HEIGHT / 2, '')
                .setOrigin(0.5, 1)
                .setFontSize(28)
                .setFontFamily('MS UI Gothic')
            this.add.existing(this.text_roman)
            this.add.existing(this.text_next_char)
            this.add.existing(this.text_typed)
            this.add.existing(this.text_display)
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
                }
                time--
            }
            timer_task()
            timer_id = setInterval(timer_task, 1000)
        }
        registerSmallChars()
        initTextArea()
        createTimer()
        startTimer()
        showRandomSentence()
    }
}