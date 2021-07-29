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
    initialize: function(options) {
        if (! options.text)  throw "L.CreditsControl missing required option: text";
        if (! options.image) throw "L.CreditsControl missing required option: image";
        if (! options.link)  throw "L.CreditsControl missing required option: link";

        L.setOptions(this,options);
    },
    onAdd: function (map) {
        this._map = map;

        // create our container, and set the background image
        var container = L.DomUtil.create('div', 'leaflet-credits-control', container);
        container.style.backgroundImage = 'url(' + this.options.image + ')';
        container.tabIndex = 0;
        if (this.options.width)  container.style.paddingRight = this.options.width + 'px';
        if (this.options.height) container.style.height       = this.options.height + 'px';

        // generate the hyperlink to the left-hand side
        var link        = L.DomUtil.create('a', '', container);
        link.target     = '_blank';
        link.href       = this.options.link;
        link.innerHTML  = this.options.text;

        // create a linkage between this control and the hyperlink bit, since we will be toggling CSS for that hyperlink section
        container.link = link;

        // clicking the control (the image bit) expands the left-hand hyperlink/text bit
        L.DomEvent.addListener(container, 'click', function () {
            var link = this.link;
            if ( L.DomUtil.hasClass(link, 'leaflet-credits-showlink') ) {
                L.DomUtil.removeClass(link, 'leaflet-credits-showlink');
            } else {
                L.DomUtil.addClass(link, 'leaflet-credits-showlink');
            }
        });
        L.DomEvent.addListener(container, 'keydown', function(event) {
            if (event.key == 'Enter') container.click();
        });

        // keep mouse events from falling through to the map: don't drag-pan or double-click the map on accident
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);

        // keep a reference to our container and to the link
        this._container = container;
        this._link      = link;

        // all done
        return container;
    },
    setText: function (html) {
        this._link.innerHTML = html;
    }
});
