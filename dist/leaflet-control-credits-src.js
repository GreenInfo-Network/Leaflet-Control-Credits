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
        L.setOptions(this,options);
    },
    onAdd: function (map) {
        this._map = map;

        // create our container, and set the background image
        var container = L.DomUtil.create('div', 'leaflet-credits-control', container);
        container.style.backgroundImage = 'url(' + this.options.image + ')';

        // generate the hyperlink to the left-hand side
        var link        = L.DomUtil.create('a', '', container);
        link.target     = '_blank';
        link.href       = this.options.link;
        link.innerHTML  = this.options.text;

        // create a linkage between this control and the hyperlink bit, since we will be toggling CSS for that hyperlink section
        container.link = link;

        // clicking the control (the image bit) expands the left-hand hyperlink/text bit
        L.DomEvent
        .addListener(container, 'mousedown', L.DomEvent.stopPropagation)
        .addListener(container, 'click', L.DomEvent.stopPropagation)
        .addListener(container, 'dblclick', L.DomEvent.stopPropagation)
        .addListener(container, 'click', function () {
            var link = this.link;
            if ( L.DomUtil.hasClass(link, 'leaflet-credits-showlink') ) {
                L.DomUtil.removeClass(link, 'leaflet-credits-showlink');
            } else {
                L.DomUtil.addClass(link, 'leaflet-credits-showlink');
            }
        });

        return container;
    }
});