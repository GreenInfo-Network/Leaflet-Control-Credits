# L.Control.Credits
A Leaflet control for displaying credits in the corner. Supply a hyperlink to your image, and some text.

Live demo: http://gregallensworth.github.io/L.Control.Credits/

# Installation
See index.html for a demo.

Two files are required: _leaflet-constrol-credits.js_ and _leaflet-constrol-credits.css_

```
<script type="text/javascript" src="dist/leaflet-control-credits.js"></script>
<link rel="stylesheet" href="dist/leaflet-control-credits.css" />
```

Then add the control. In this example we keep a reference to the control, so we can call methods on it later.

```
var credctrl = L.controlCredits({
    image: "./greeninfo.png",
    link: "http://www.greeninfo.org/",
    text: "Interactive mapping<br/>by GreenInfo Network"
}).addTo(map);
```

#Options

* *image* - REQUIRED. An URL of the image to put into the right-hand side. May be any size you like, but to look good should be appropriate to the _text_ content. I like 35x35 to 40x40 for two lines.
* *text* - REQUIRED. When the image is clicked, this HTML will be shown. Up to you, but should be fairly brief and have a height that looks good for your image. I like two lines for a 35x35 image.
* *link* - REQUIRED. The left-hand text is a hyperlink, and this is the target URL. It will open in a new window/tab.
* *width* - Optional; the width of the control. Should match that of your image. Defaults to 39px.
* *height* - Optional; the height of the control. Should match that of your image. Defaults to 39px.

#Methods

* *setText(html)* - Replace the *text* content with new HTML.

#Credits
Thanks to my employer, GreenInfo Network http://www.greeninfo.org/ for the time to make this control.
