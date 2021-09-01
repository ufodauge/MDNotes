// config
import { HOST, PORT, PATH, UPDATE_RATE } from "/scripts/config.js";

// class
import { NavigationDrawer } from "/scripts/class/NavigationDrawer.js";
import { LiveSplitClient } from "/scripts/class/LiveSplitClient.js";
import { MarkdownContainer } from "/scripts/class/MarkdownContainer.js";
import { Markdown } from "/scripts/class/Markdown.js";
import { StatusBar } from "/scripts/class/StatusBar.js";

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        // Class
        NavigationDrawer: new NavigationDrawer(),
        MarkdownContainer: new MarkdownContainer(),
        Client: new LiveSplitClient(),
        Markdown: new Markdown(),
        StatusBar: new StatusBar(),
    },
    methods: {
        ToggleNavigationDrawer: function () {
            this.NavigationDrawer.Toggle()
        },
        ReadMarkdownFile: function (file) {
            this.Markdown.ReadFile(file)
        },
        ReconnectWithLiveSplit: function () {
            this.Client.Close()
            this.Client.Connect()
            this.StatusBar.Connecting()
        },
    },
    created: function () {
        // Call by reference
        this.Client.Markdown = this.Markdown;

        // Connect to LiveSplit
        // Then get GameTitle and CategoryTitle,
        //      set onmessage callback and
        //      create TimeInterval object to constantly send message
        this.Client.UpdateRate = UPDATE_RATE;

        this.Client.Connect(HOST, PORT, PATH);
        this.StatusBar.Connecting()

        this.Client.OnOpen = (message) => {
            this.Client.ProcedureOnOpen(message)
            this.StatusBar.Connected()
        };
        this.Client.OnError = (message) => {
            this.Client.ProcedureOnError(message)
            this.StatusBar.Disconnected()
        };
        this.Client.OnClose = (message) => {
            this.Client.ProcedureOnClose(message)
            this.StatusBar.Disconnected()
        };
        this.Client.OnMessage = (message) => {
            this.Client.ProcedureOnMessage(message)
        };

        // this.NavigationDrawer.AddNewItem("Upload File", "mdi-markdown", () => { })
    },
});