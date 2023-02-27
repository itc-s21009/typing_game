# typing_game
課題研究 の課題

[仮で公開してます（asa0325.ddo.jp）](http://asa0325.ddo.jp)
# 起動
右端のボタンでコピーしたあと、ターミナルに貼り付けると一括で実行できます。
```
# リポジトリをクローンする
git clone https://github.com/itc-s21009/typing_game.git
# クローンしたフォルダに移動する
cd typing_game
# 必要なパッケージをダウンロードする
npm i
# 公開する静的ファイルをビルドする
npm run build
```
下記の設定が終わったら、起動してください。
```
npm start
```
## 設定
### config
* `api-host`: [タイピングゲームAPI](https://github.com/itc-s21009/typing_game_server)がホストされているURLを書きます。
* `secret`: セッションIDを生成したりするための秘密鍵の値を適当に入れます。
### .env
* `REACT_APP_API_HOST`: [タイピングゲームAPI](https://github.com/itc-s21009/typing_game_server)がホストされているURLを書きます。
