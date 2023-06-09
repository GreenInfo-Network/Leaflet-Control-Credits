// a simple control to display a logo and credits in the corner of the map, with some neat interactive behavior
// in Leaflet tradition, a shortcut method is also provided, so you may use either version:
//     new L.CreditsControl(options)
//     L.controlCredits(options)
L.controlCredits = function (options) {
    return new L.CreditsControl(options);
}

L.CreditsControl = L.Control.extend({
    options: {
        position: 'bottomright'
    },
    initialize: function (options) {
        const settings = Object.assign({
            width: '50px',
            height: '50px',
        }, options);

        if (! settings.expandcontent) throw "L.CreditsControl missing required option: expandcontent";
        if (! settings.imageurl)      throw "L.CreditsControl missing required option: imageurl";
        if (! settings.imagealt)       throw "L.CreditsControl missing required option: alt text";
        if (! settings.tooltip)       throw "L.CreditsControl missing required option: tooltip";

        L.setOptions(this, settings);
    },
    onAdd: function (map) {
        this._map = map;
        this._container = L.DomUtil.create('div', 'leaflet-credits-control');

        const contentdivid = `leaflet-credits-control-expandcontent-${Math.round(1000000 * Math.random())}`;

        this._content = L.DomUtil.create('div', 'leaflet-credits-control-expandcontent', this._container);
        this._content.id = contentdivid;
        this.setHtml(this.options.expandcontent);


        this._button = L.DomUtil.create('button', 'leaflet-credits-control', this._container);
        this._button.type = 'button';
        this._button.title = this.options.tooltip;
        if (this.options.width)  this._button.style.width = this.options.width;
        if (this.options.height) this._button.style.height = this.options.height;
        this._button.setAttribute('aria-controls', contentdivid);

        const logo = L.DomUtil.create('img', 'leaflet-logo', this._button);
        logo.setAttribute('src', this.options.imageurl);
        logo.setAttribute('alt', this.options.imagealt);
        if (this.options.width) logo.style.width = this.options.width;
        if (this.options.height) logo.style.height = this.options.height;


        // click image button = toggle left-side expandcontent
        L.DomEvent.addListener(this._button, 'click', () => {
            this.toggleUi();
        });

        // keep mouse events from falling through to the map: don't drag-pan or double-click the map on accident
        L.DomEvent.disableClickPropagation(this._container);
        L.DomEvent.disableScrollPropagation(this._container);

        // collapse by default
        this.collapseUi();

        // all done
        return this._container;
    },
    toggleUi: function () {
        if (this.isExpanded()) this.collapseUi();
        else this.expandUi();
    },
    expandUi: function () {
        L.DomUtil.removeClass(this._container, 'leaflet-credits-control-collapsed');
        this._button.setAttribute('aria-expanded', 'true');
    },
    collapseUi: function () {
        L.DomUtil.addClass(this._container, 'leaflet-credits-control-collapsed');
        this._button.setAttribute('aria-expanded', 'false');
    },
    isExpanded: function () {
        return ! L.DomUtil.hasClass(this._container, 'leaflet-credits-control-collapsed');
    },
    setHtml: function (html) {
        this._content.innerHTML = html;
    }
});
