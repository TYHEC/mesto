export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialItems = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    };

    renderItems() {
        this._initialItems.forEach(this._renderer);
    };
    addItem(element) {
        this._containerSelector.prepend(element);
    }
};