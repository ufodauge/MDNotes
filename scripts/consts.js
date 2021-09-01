export const EVENT_GET_CURRENT_SEGMENT_INDEX = 'getsplitindex';
export const EVENT_GET_GAME = 'getGame';

export const REGEX_CONTENT = /(?<=(^|\n))#[^#]*?\n(.*\r\n)+?(?=#[^#]+?)/g;
export const REGEX_SEGMENTNAME = /(?<=(^|\n)#\s*)[^#]*?\n/g;

export const CONNECTION_STATUS_CONNECTED = "Connected"
export const CONNECTION_STATUS_DISCONNECTED = "Disconnected"
export const CONNECTION_STATUS_CONNECTING = "Connecting..."

export const CONNECTION_STATUS_CONNECTED_ICON = "mdi-check"
export const CONNECTION_STATUS_DISCONNECTED_ICON = "mdi-cancel"
export const CONNECTION_STATUS_CONNECTING_ICON = "mdi-dots-horizontal"

export const MARKDOWN_HOW_TO_USE = `## 準備するもの

* [LiveSplit WebSocket](https://github.com/Xenira/LiveSplit-Websocket)
* マークダウン形式で書かれたメモ
    * 区間ごとにH1タグ(#) で区切られている必要がある

## 使い方

1. 予めLiveSplitを起動し、WebSocket Server をオンにしておく
1. このページをリロードし、左上のステータスが "Connected" になっていることを確認する
1. ナビゲーションドロワーを開き、マークダウンファイルを読み込ませる

## 余談

自分でサーバー立てて動かせば逐一マークダウン読み込ませる必要ないけどとりあえず未実装ってことで

`
