# L.Control.Credits

A Leaflet control for displaying credits in the corner. Displays an image/logo, and clicking that image/logo will expand to show a brief message with credits and links.

https://github.com/GreenInfo-Network/Leaflet-Control-Credits

https://greeninfo-network.github.io/Leaflet-Control-Credits/


# Installation

See index.html for a demo.

Two files are required: _leaflet-constrol-credits.js_ and _leaflet-constrol-credits.css_

```
<script type="text/javascript" src="dist/leaflet-control-credits.js"></script>
<link rel="stylesheet" href="dist/leaflet-control-credits.css" />
```

Then add the control.

```
L.controlCredits({
    imageurl: './greeninfo.png',
    tooltip: 'Made by GreenInfo Network',
    width: '45px',
    height: '45px',
    expandcontent: 'Interactive mapping<br/>by <a href="https://www.greeninfo.org/" target="_blank">GreenInfo Network</a>',
}).addTo(map);
```


# Options

* `imageurl` - URL of the image to display in the button.
* `width` - Specify width of the button & image. Default is `50px`
* `height` - Specify height of the button & image. Default is `50px`
* `tooltip` - A tooltip message displayed when the button is hovered. This is also the ARIA label for the button.
* `expandcontent` - HTML string which will be displayed on the left when the image/logo button is clicked.

# Methods

* `expandUi()` - Expand the UI to show the left-side HTML content.
* `collapseUi()` - Collapse the UI to hide the left-side HTML content.
* `toggleUi()` - Expand the UI if currently collapsed, or collapse if currently expanded.
* `isExpanded()` - Return true if the content is currently expanded, false if not.
* `setHtml(html)` - Replace the expanded content with new HTML.
