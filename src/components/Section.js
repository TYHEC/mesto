export class Section {
    constructor({renderer }, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    };

    renderItems(res) {
        res.forEach(this._renderer);
    };
    addItem(element) {
        this._containerSelector.prepend(element);
    }
};