Tooltip.js
==========

## A basic mouseover tooltip script

This tooltip script is a basic example of how data attributes can be used to add a tooltip functionality to DOM elements. The tooltips are created for each element by reading out the title attribute. Additionally the tooltip offset can be configured by passing a JSON option string to the data attribute. This concept comes from <a href="http://angularjs.org">AngularJS</a> and provides a quick extensibility.

Here are some key facts that should provide a short overview of what Tooltip.js is and how it works:

* Configuration via HTML and data attributes
* Customizable via CSS
* Extensible (JavaScript code is about 100 lines)
* Runs in all major browsers and Internet Explorer 9+
* No external dependencies


So the script is very basic and can be extended with various features. It's meant to be a learning example of how a tooltip functionality can be realized by using data attributes and parsing JSON string options.

## Demo
You can check the <a href="http://matthias-schuetz.github.com/tooltip.js">example.html</a> that is included in this package. This is also the website of Tooltip.js.

## Usage

You just need to include the JavaScript file in the HTML code of your site. That's it. Any further configuration is optional. From this point, when the HTML page has been loaded, all elements having the data attribute "data-tooltip" will be processed and provided with the tooltip functionality. The tooltip text comes from an additional title attribute. A sample element looks like this:

### HTML

```html
<html>
	<head>
    	<script src="Tooltip.js" type="text/javascript"></script>
    </head>

	<body>
    	<div data-tooltip title="I'm a tooltip text">Demo</div>
    </body>
</html>
```

You can also specify additional options to define a custom offset or a CSS class for each tooltip by using a JSON option string:

```html
<div data-tooltip="{ 'offset': 10, 'class': 'alt-tooltip' }" title="I'm a tooltip text">Demo</div>
```

This would set the tooltip offset (relative to the mouse cursor) to 10 pixels for this element. It has to be said that this is a very basic implementation of parsing a JSON option string. So you'll have to use the single quotes for attributes in order to make JSON.parse work.

### JavaScript

In addition you can call some additional methods which are globally available. You may set the default options which contain values for tooltipId and offsetDefault. This will affect all tooltips on the page. You can do this by using the following code:

```javascript
tooltip.setOptions({
	tooltipId: "example",
	offsetDefault: 20
});
```

Furthermore you can refresh all tooltips on a page with one call. This is required if you add tooltip elements dynamically (via Ajax) or update their options/text afterwards. Simply call this method to rebuild all tooltips.

```javascript
tooltip.refresh();
```

### CSS

There's always one div element added and removed to the body element when hovering over a tooltip source element. By default this div element has the id "tooltip". So the CSS is very basic to style the tooltip:

```css
#tooltip {
	position:absolute;
	background:#DB2A64;
	color:#ffffff;
	padding:8px;
}
```

That's all. As the Tooltip.js script is very basic, all tooltips on a page share the same look. You can go ahead and extend the script if you want to use different styles for each tooltip.

## License

Tooltip.js is released under the MIT license.
