// consts
import { REGEX_CONTENT, REGEX_SEGMENTNAME, MARKDOWN_HOW_TO_USE } from "/scripts/consts.js"

export class Markdown {
    get Reader() { return this.__reader; }
    set Reader(value) { this.__reader = value; }

    get Text() { return this.__text; }
    set Text(value) { this.__text = value; }

    get FileName() { return this.__fileName; }
    set FileName(value) { this.__fileName = value; }

    get Source() { return this.__source; }
    set Source(value) {
        this.__source = value;
        this.__contents = [];

        let source = value + "# "
        if (source.match(REGEX_CONTENT)) {
            for (const item of source.match(REGEX_CONTENT)) {
                let segmentName = item.match(REGEX_SEGMENTNAME)[0];
                let html = marked(item)

                this.__contents.push({ html: html, segmentName: segmentName })
            }
        }
    }

    get CurrentIndex() { return this.__currentIndex; }
    set CurrentIndex(value) { this.__currentIndex = value; }

    get Content() {
        if (this.__contents[this.CurrentIndex]) {
            return this.__contents[this.CurrentIndex].html;
        } else {
            return marked(MARKDOWN_HOW_TO_USE);
        }
    }

    get SegmentName() {
        if (this.__contents[this.CurrentIndex]) {
            return this.__contents[this.CurrentIndex].segmentName;
        } else {
            return `Undefined Segment`
        }
    }

    get SegmentIndex() {
        return this.CurrentIndex
    }

    constructor() {
        this.Reader = new FileReader();
        this.Reader.onload =
            (event) => {
                this.Source = event.target.result
            };
        this.Reader.onerror =
            (event) => {
                console.log(event.target.error)
            }
        this.__contents = [];
        this.__currentIndex = -1
    };

    ReadFile(file) {
        this.Reader.readAsText(file);
    }

    ReadFileFromURL(url) {
        fetch(url)
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                }
                else {
                    // ファイルを作りたい
                    this.Source = "# ???"
                }
            })
            .then(text => {
                console.log("Set markdown text")
                this.Source = text
            })
            .catch(err => console.log(err));
    };
}