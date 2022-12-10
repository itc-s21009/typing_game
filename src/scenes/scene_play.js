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
    'じゃ': ['zya', 'ja', 'jya'],
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
    'ふぁ': ['fwa', 'fa'],
    'ふぃ': ['fwi', 'fi', 'fyi'],
    'ふぅ': ['fwu'],
    'ふぇ': ['fwe', 'fe', 'fye'],
    'ふぉ': ['fwo', 'fo'],
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
    {display: '吾輩は猫である', kana: 'わがはいはねこである'}
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

    constructor() {
        super({key: SCENE_PLAY});
    }

    create({difficulty}) {
        this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'Escape') {
                this.scene.start(SCENE_TITLE)
            }
        })
        if (difficulty === undefined) {
            this.add.existing(new CustomText(this, WIDTH / 2, HEIGHT / 2, 'エラー\ndifficultyがないです')
                .setAlignCenterVertically(true)
                .setAlignCenterHorizontally(true)
                .setAlign('center'))
            return
        }
        const sentences = SENTENCES[difficulty]
        console.log(sentences)
        this.text_timer = new CustomText(this, 0, 0, '')
        this.add.existing(this.text_timer)
        let time = 60
        let timer_id
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
}