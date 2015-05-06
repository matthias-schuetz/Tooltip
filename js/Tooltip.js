/**
 * Tooltip.js
 * A basic script that applies a mouseover tooltip functionality to all elements of a page that have a data-tooltip attribute
 * Matthias Schuetz, http://matthiasschuetz.com
 *
 * Copyright (C) Matthias Schuetz
 * Free to use under the MIT license
 */

(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if (!root.tooltip) {
		// Browser globals
		root.tooltip = factory(root);
	}
}(this, function() {
	var _options = {
		tooltipId: "tooltip",
		offsetDefault: 15
	};
	
	function _createTooltip(text) {
		var tooltipElm = document.createElement("div");
		var tooltipText = document.createTextNode(text);
		
		tooltipElm.setAttribute("id", _options.tooltipId);
		tooltipElm.appendChild(tooltipText);
		
		document.querySelector("body").appendChild(tooltipElm);
	}
	
	function _parseOptions(options) {
		var optionsObj;
		
		if (options.length) {
			try {
				optionsObj = JSON.parse(options.replace(/'/ig, "\""));
			} catch(err) {
				console.log(err);
			}
		}
		
		return optionsObj;
	}
	
	function getTooltipElm() {
		return document.querySelector("#" + _options.tooltipId);
	}
	
	function _init() {
		window.addEventListener("load", function() {
			Array.prototype.forEach.call(document.querySelectorAll("[data-tooltip]"), function(elm) {
				var tooltipText = elm.getAttribute("title");
				var options;
				
				if (tooltipText) {
					elm.setAttribute("title", "");
					options = _parseOptions(elm.getAttribute("data-tooltip"));
					
					elm.addEventListener("mouseover", function (evt) {
						_createTooltip(tooltipText);
					});
					
					elm.addEventListener("mouseout", function (evt) {
						var tooltipElm = getTooltipElm();
						
						if (tooltipElm) {
							document.querySelector("body").removeChild(tooltipElm);
						}
					});
					
					elm.addEventListener("mousemove", function (evt) {
						var tooltipElm = getTooltipElm();
						var offset = options && options.offset || _options.offsetDefault;
						var scrollY = window.scrollY || window.pageYOffset;
						var scrollX = window.scrollX || window.pageXOffset;
						var tooltipTop = evt.pageY + offset;
						var tooltipLeft = evt.pageX + offset;
						
						if (tooltipElm) {
							tooltipTop = (tooltipTop - scrollY + tooltipElm.offsetHeight + 20 >= window.innerHeight ? (tooltipTop - tooltipElm.offsetHeight - 20) : tooltipTop);
							tooltipLeft = (tooltipLeft - scrollX + tooltipElm.offsetWidth + 20 >= window.innerWidth ? (tooltipLeft - tooltipElm.offsetWidth - 20) : tooltipLeft);
							
							tooltipElm.style.top = tooltipTop + "px";
							tooltipElm.style.left = tooltipLeft + "px";
						}
					});
				}
			});
		});
	}
	
	_init();
	
	return {
		setOptions: function(options) {
			for (var option in options) {
				if (_options.hasOwnProperty(option)) {
					_options[option] = options[option];
				}
			}
		}
	};
}));