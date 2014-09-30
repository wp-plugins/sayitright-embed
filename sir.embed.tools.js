/*=====================================================================
Tools
=====================================================================*/
var XMLHttpFactories = [
	function () {return new XMLHttpRequest()},
	function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];
var Lib = {
	ajax: {
		isIE8: function(){
			return window.XDomainRequest ? true : false;
		},
		xhr: function() {
			var xmlhttp;
			if (window.XMLHttpRequest) {
				// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp = new XMLHttpRequest();
			} else {
				// code for IE6, IE5
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			return xmlhttp;
		},
		createXMLHTTPObject: function() {
			var xmlhttp = false;
			for (var i=0;i<XMLHttpFactories.length;i++) {
				try {
					xmlhttp = XMLHttpFactories[i]();
				}
				catch (e) {
					continue;
				}
				break;
			}
			return xmlhttp;
		},
		getJSON: function(options, callback) {
			var xhttp = this.xhr();
			callback = callback || function() {};
			options.data = options.data || null;

			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 ) {
					if(xhttp.status == 200){
						callback( xhttp );
					} else if(xhttp.status == 400) {
						alert('There was an error 400 from '+options.url);
					} else {
						alert('something else other than 200 was returned from '+options.url);
					}
				}
			};

			xhttp.open("GET", options.url, true);
			xhttp.send();
		}
	},
	scrollToTop: function(element, to, duration) {
		if (duration < 0) return;
		var difference = to - element.scrollTop;
		var perTick = difference / duration * 10;

		setTimeout(function () {
			element.scrollTop = element.scrollTop + perTick;
			this.scrollToTop(element, to, duration - 10);
		}, 10);
	},
	getElementInsideContainer: function(containerID, childID) {
		var elm = {};
		var elms = document.getElementById(containerID).getElementsByTagName("*");
		for (var i = 0; i < elms.length; i++) {
			if (elms[i].id === childID) {
				elm = elms[i];
				break;
			}
		}
		return elm;
	},
	stripScripts: function(s){
		var div = document.createElement('div');
		div.innerHTML = s;
		var scripts = div.getElementsByTagName('script');
		var i = scripts.length;
		while (i--) {
			scripts[i].parentNode.removeChild(scripts[i]);
		}
		return div.innerHTML;
	},
	getOnlyJson: function(str){
		reg = /\<body[^>]*\>([^]*)\<\/body/m;
		return str.match( reg )[1];
	}
};