import {
    CONNECTION_STATUS_CONNECTED,
    CONNECTION_STATUS_DISCONNECTED,
    CONNECTION_STATUS_CONNECTING,
    CONNECTION_STATUS_CONNECTED_ICON,
    CONNECTION_STATUS_DISCONNECTED_ICON,
    CONNECTION_STATUS_CONNECTING_ICON
} from "/scripts/consts.js"

const TEXTS = {
    [CONNECTION_STATUS_CONNECTED]: CONNECTION_STATUS_CONNECTED,
    [CONNECTION_STATUS_DISCONNECTED]: CONNECTION_STATUS_DISCONNECTED,
    [CONNECTION_STATUS_CONNECTING]: CONNECTION_STATUS_CONNECTING,
}

const ICONS = {
    [CONNECTION_STATUS_CONNECTED]: CONNECTION_STATUS_CONNECTED_ICON,
    [CONNECTION_STATUS_DISCONNECTED]: CONNECTION_STATUS_DISCONNECTED_ICON,
    [CONNECTION_STATUS_CONNECTING]: CONNECTION_STATUS_CONNECTING_ICON,
}

export class StatusBar {
    set ConnectionStatus(value) { this.__status = value }
    get ConnectionStatus() { return this.__status }

    get ConnectionStatusText() {
        if (TEXTS[this.ConnectionStatus]) {
            return TEXTS[this.ConnectionStatus]
        } else {
            return "???"
        }
    }

    get ConnectionStatusIcon() {
        if (ICONS[this.ConnectionStatus]) {
            return ICONS[this.ConnectionStatus]
        } else {
            return "mdi-account"
        }
    }

    constructor() {
        this.Connecting()
    }

    Connected() {
        // this.ConnectionStatus = CONNECTION_STATUS_CONNECTED
        Vue.set(this, "ConnectionStatus", CONNECTION_STATUS_CONNECTED)
    }

    Disconnected() {
        // this.ConnectionStatus = CONNECTION_STATUS_DISCONNECTED
        Vue.set(this, "ConnectionStatus", CONNECTION_STATUS_DISCONNECTED)
    }

    Connecting() {
        // this.ConnectionStatus = CONNECTION_STATUS_CONNECTING
        Vue.set(this, "ConnectionStatus", CONNECTION_STATUS_CONNECTING)
    }
}