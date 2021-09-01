export class NavigationDrawer {

    get Model() { return this.__model }
    set Model(value) { this.__model = value }

    get ModelItemGroup() { return this.__modelItemGroup }
    set ModelItemGroup(value) { this.__modelItemGroup = value }

    get Items() { return this.__items }
    set Items(value) { this.__items = value }

    constructor() {
        this.Items = []
        this.Model = null
        this.ModelItemGroup = null
    }

    AddNewItem(title = "undefined", icon = "mdi-checkbox-blank-circle-outline", func = () => { }) {
        const id = this.Items.length + 1
        this.Items.push(new Item(id, title, icon, func))
    }

    RemoveItem(id) { }

    SetItems(...args) {

    }

    Toggle() {
        this.Model = !this.Model
    }
}

class Item {
    get Id() { return this.__id }
    get Title() { return this.__title }
    get Icon() { return this.__icon }
    get Func() { return this.__func }

    constructor(id, title, icon, func) {
        this.__id = id;
        this.__title = title;
        this.__icon = icon;
        this.__func = func;
    }
}