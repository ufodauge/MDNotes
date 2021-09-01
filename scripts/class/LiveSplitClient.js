// consts
import {
    EVENT_GET_CURRENT_SEGMENT_INDEX,
    EVENT_GET_GAME,
    CONNECTION_STATUS_CONNECTED,
    CONNECTION_STATUS_DISCONNECTED,
    CONNECTION_STATUS_CONNECTING, CONNECTION_STATUS_CONNECTED_ICON, CONNECTION_STATUS_DISCONNECTED_ICON, CONNECTION_STATUS_CONNECTING_ICON
} from "/scripts/consts.js"

// utils
import { ReplaceFolderName } from "/scripts/utils.js";

export class LiveSplitClient {
    // objects
    set Markdown(value) { this.__markdown = value }
    get Markdown() { return this.__markdown }

    get Connection() { return this.__connection }
    set Connection(value) { this.__connection = value }

    get GameTitle() { return this.__gameTitle }
    set GameTitle(value) { this.__gameTitle = value }

    get CategoryTitle() { return this.__categoryTitle }
    set CategoryTitle(value) { this.__categoryTitle = value }

    get FileTitle() { return this.__fileTitle }
    set FileTitle(value) { this.__fileTitle = value }

    get CurrentSegmentIndex() { return this.__currentSegmentIndex }
    set CurrentSegmentIndex(value) { this.__currentSegmentIndex = value }

    get UpdateRate() { return this.__updateRate }
    set UpdateRate(value) { this.__updateRate = value }

    get Update() { return this.__update }
    set Update(value) { this.__update = value }

    get Log() { return this.__log }
    set Log(value) {
        this.__log = value + "\n"
    }

    set OnMessage(value) { this.Connection.onmessage = value }

    set OnOpen(value) { this.Connection.onopen = value }

    set OnError(value) { this.Connection.onerror = value }

    set OnClose(value) { this.Connection.onclose = value }

    set ConnectionStatus(value) { this.__connectionStatus = value }
    get ConnectionStatus() { return this.__connectionStatus }

    set ConnectionStatusIcon(value) { this.__connectionStatusIcon = value }
    get ConnectionStatusIcon() { return this.__connectionStatusIcon }

    constructor() { }

    // この辺の接続処理周りがごちゃってるけどどう直したら良いかわからん
    Connect(host, port, path) {
        console.log("Connect with WebSocket server....");

        if (path) {
            this.URL = `ws://${host}:${port}/${path}`
        }

        this.Connection = new WebSocket(this.URL);
    }

    Close() {
        clearInterval(this.Update)
        this.Connection.close()
    }

    ProcedureOnOpen(message) {
        try {
            this.Update = setInterval(() => {
                if (this.Connection.readyState == this.Connection.CLOSED) {
                    this.Close()
                }
                if (this.Connection.readyState == this.Connection.OPEN) {
                    this.Connection.send(EVENT_GET_CURRENT_SEGMENT_INDEX);
                }

            }, this.UpdateRate);
            this.Connection.send(EVENT_GET_GAME);
            console.log("Successfully Connected");

        } catch (error) {
            this.ProcedureOnClose()
        }
    }

    ProcedureOnMessage(message) {
        const event = JSON.parse(message.data);
        if (event.name === EVENT_GET_GAME) {
            const fileTitle = ReplaceFolderName(`${event.data.gameName.replaceAll(" ", "_")}_-_${event.data.categoryName.replaceAll(" ", "_")}`);
            const url = `/assets/notes/${fileTitle}.md`;

            this.Markdown.FileName = fileTitle;
            this.Markdown.ReadFileFromURL(url);
        }
        if (event.name === EVENT_GET_CURRENT_SEGMENT_INDEX) {
            this.Markdown.CurrentIndex = event.data;
        }
    }

    ProcedureOnError(message) {
        console.log("WebSocket error observed:", message);
        this.WebSocket = null
    }

    ProcedureOnClose(message) {
        console.log("WebSocket closed:", message);
        this.WebSocket = null
    }
}