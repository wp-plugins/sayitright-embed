!(function(DOMParser){
	"use strict";
	var DOMParser_proto = DOMParser.prototype
		, real_parseFromString = DOMParser_proto.parseFromString;

	// Firefox/Opera/IE throw errors on unsupported types
	try{
		// WebKit returns null on unsupported types  
		if( (new DOMParser).parseFromString("", "text/html") ){
			// text/html parsing is natively supported
			return;
		}
	} catch (ex) {}

	DOMParser_proto.parseFromString = function(markup, type){
		if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
			var doc = document.implementation.createHTMLDocument(""),
				doc_elt = doc.documentElement,
				first_elt;

			doc_elt.innerHTML = markup;
			first_elt = doc_elt.firstElementChild;

			if (doc_elt.childElementCount === 1 && first_elt.localName.toLowerCase() === "html"){
				doc.replaceChild(first_elt, doc_elt);
			}

			return doc;
		} else {
			return real_parseFromString.apply(this, arguments);
		}
	};
}(DOMParser));
/*=====================================================================
States:
home
channels
programs
channel-xxx
program-xxx
=====================================================================*/
!(function(){
	'use strict';

	/*=====================================================================
	Define Protocol
	=====================================================================*/
	var protocol = 'http';

	if( window.location.host.indexOf('https://') > -1 )
		protocol = 'https';

	var appTools = {
		isEmbedLoaded: function(src){
			var scripts = document.getElementsByTagName("script");
			for(var i = 0; i < scripts.length; i++)
				if(scripts[i].getAttribute('src') === src) return true;
			return false;
		},
		loadCSSIfNotAlreadyLoaded: function(str, url){
			var ss = document.styleSheets;
			for( var i = 0, max = ss.length; i < max; i++ ){
				if( typeof ss[i].href !== 'undefined' && ss[i].href !== 'null' && ss[i].href !== null )
					if( ss[i].href.indexOf( str ) > -1 )
						return;
			}
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = url;
			document.getElementsByTagName('head')[0].appendChild(link);
		},
		isUrl: function(s){
			var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)? (\/|\/([\w#!:.?+=&%@!\-\/]))?/;
			return regexp.test(s);
		},
		subDomain: function(url){
			// IF THERE, REMOVE WHITE SPACE FROM BOTH ENDS
			url = url.replace(new RegExp(/^\s+/),""); // START
			url = url.replace(new RegExp(/\s+$/),""); // END

			// IF FOUND, CONVERT BACK SLASHES TO FORWARD SLASHES
			url = url.replace(new RegExp(/\\/g),"/");

			// IF THERE, REMOVES 'http://', 'https://' or 'ftp://' FROM THE START
			url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"");

			// IF THERE, REMOVES 'www.' FROM THE START OF THE STRING
			url = url.replace(new RegExp(/^www\./i),"");

			// REMOVE COMPLETE STRING FROM FIRST FORWARD SLASH ON
			url = url.replace(new RegExp(/\/(.*)/),"");

			// REMOVES '.??.??' OR '.???.??' FROM END - e.g. '.CO.UK', '.COM.AU'
			if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))) {
				url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i),"");
				// REMOVES '.??' or '.???' or '.????' FROM END - e.g. '.US', '.COM', '.INFO'
			} else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))) {
				url = url.replace(new RegExp(/\.[a-z]{2,4}$/i),"");
			}

			// CHECK TO SEE IF THERE IS A DOT '.' LEFT IN THE STRING
			var subDomain = (url.match(new RegExp(/\./g))) ? true : false;

			return(subDomain);
		}
	};

	Element.prototype.classToggle = function(className){
		if (!this || !className){
			return;
		}
		var classString = this.className, nameIndex = classString.indexOf(className);
		if (nameIndex == -1) {
			classString += ' ' + className;
		} else {
			classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
		}
		this.className = classString;
	};

	Element.prototype.sirEmbed = function(obj){
		var ua = navigator.userAgent.toLowerCase();
		var self = this;
		var contId = self.id;
		if( typeof contId === 'unfedined' || contId === '' ){
			self.id = 'sir-embed-'+(Math.floor(Math.random() * 999) + 1);
			contId = self.id;
		}
		var s = {};
		var json = '';
		var app = {
				init: function(url) {
					s = {
						win: window,
						doc: document,
						vendors: ['webkit', 'moz']
					};
					app.updateOptions(self, url);
					app.setContstraints(self);
					app.setup(url);
					app.bindActions();
				},
				updateOptions: function(url){
					s.par = self;
					s.url = url;
					s.state = '';
					s.scaffoldLinks = [];
					s.historyLinks = [];
					s.historyLayers = {"position":0,"history":[]};
					s.historyStack = [];
					s.stateLayers = [];
					s.viewport = {"width":0,"height":0};
					s.viewport.width = self.offsetWidth;
					s.resetHistoryState = false;
				},
				setContstraints: function(){
					var width = self.offsetWidth,
						ratio = 1.77777778; // 16:9
					if( typeof obj.width !== 'undefined' && typeof obj.height !== 'undefined' ){
						var w = obj.width,
							h = obj.height;
						if( isNaN(w) )
							w = w.replace(/\D/g,'');
						if( isNaN(h) )
							h = h.replace(/\D/g,'');

						if( width > Number(w) )
							width = w; // Container is bigger than set width

						ratio = Number(w) / Number(h);
					}
					var height = width / ratio;

					var c = document.createElement('div');
					self.appendChild(c);
					s.cont = c;
					app.setAttributes(self, {"class":"parent-embed sir-embed", "style": "width:"+width+"px;height:"+height+"px;box-shadow:0px 4px 20px rgba(0,0,0,0.5);margin:30px auto;position:relative;overflow:hidden;"});
					app.setAttributes(s.cont, {"class":"sir-embed-container", "style": "width:"+width+"px;height:"+height+"px;overflow-y:scroll;position:relative;"});
				},
				routingState: function(){
					/*=====================================================================
					ROUTING
					=====================================================================*/
					if( typeof json.request.is_home !== 'undefined' ){
						s.state = 'home';
					} else if( typeof json.request.is_channels !== 'undefined' ){
						if( typeof json.channel !== 'undefined' ){ // Channel
							s.state = 'channels-'+json.channel.id;
						} else { // Channels Page
							s.state = 'channels';
						}
					} else if( typeof json.request.is_programs !== 'undefined' ){
						if( typeof json.program !== 'undefined' ){ // Program
							s.state = 'programs-'+json.program.id;
						} else { // Programs Page
							s.state = 'programs';
						}
					} else if( typeof json.request.is_pages !== 'undefined' ){ // Page
						s.state = 'pages-'+json.request.page.id;
					} else if( typeof json.request.is_searches !== 'undefined' ){ // Search
						s.state = 'search';
					} else {
						s.state = 'home';
					}
				},
				animateToTop: function(){
					s.cont.scrollTop = 0;
				},
				updateNav: function(){
					var links = s.scaffoldMainNav.getElementsByTagName('li');
					var current = s.scaffoldMainNav.getElementsByClassName('active')[0].innerText.toLowerCase();
					var last = current[(current.length-1)];
					if( last === 's' )
						current = current.substring(0, str.length - 1);

					if( s.state.indexOf(current) <= 0  ){
						s.scaffoldMainNav.getElementsByClassName('active')[0].className = '';// remove current
						if( s.state.indexOf('home') > -1 ){
							links[0].className = 'active';
						} else if( s.state.indexOf('channel') > -1 ){
							links[1].className = 'active';
						} else if( s.state.indexOf('program') > -1 ){
							links[2].className = 'active';
						}
					}
				},
				changeStateRoute: function(){
					var found = false;
					var num = 2;
					for(var i = 0; i <= s.historyStack.length - 1; i++){
						if( num <= s.historyStack[i].num )
							num++;
						if( s.historyStack[i].state === s.state )
							found = true;
					}
					if( s.resetHistoryState === true ){ // Regular links, NOT back/forward
						s.historyLayers.history.push(s.state);
						s.historyLayers.position = s.historyLayers.position+1;

						app.resetHistory();
						s.resetHistoryState = false;
					}

					if( found === true ){ // State exists
						// Show an old state
						app.revertToState();
					} else { // Load new state
						s.historyStack.push({"num" : num, "state" : s.state, "last":false});
						// app.newState();
						app.pageScaffolds();
					}
					app.animateToTop();
					app.updateNav();
				},
				resetHistory: function(){
					var newHistory = [];
					for( var i = 0; i <= s.historyLayers.history.length - 1; i++ ){
						if( s.historyLayers.position >= (i+1) )
							newHistory.push(s.historyLayers.history[i]);
					}
					s.historyLayers.history = newHistory;
				},
				getRoutLink: function(link){
					var protomatch = /^(https?|ftp|file):\/\//;
					return link.replace(protomatch, '');
				},
				routeAction: function(el){
					var change = false,
						l = el.href;

					if( l.indexOf(json.request.host) > -1 ){ // Check if external
						var link = app.getRoutLink(l),
							_link = link.replace(json.request.host, '');

						var state = '';
						if( _link === '/' || _link === '' ){
							state = 'home';
						} else {
							if( _link.indexOf('pages/') > -1 ){
								state = _link.replace(/\//g, '-');
								if( state[0] === '-' )
									state = state.replace('-', '');
							} else if( _link.indexOf('channels/') > -1 && _link[(_link.length-1)] !== '/' && _link.indexOf('programs/') > -1 ){
								state = _link.substring(_link.indexOf("programs/"));
								state = state.replace(/\//g, '-');
								if( state[0] === '-' )
									state = state.replace('-', '');
							} else if( _link.indexOf('programs/') > -1 && _link[(_link.length-1)] !== '/' ){
								state = _link.replace(/\//g, '-');
								if( state[0] === '-' )
									state = state.replace('-', '');
							} else if( _link.indexOf('channels/') > -1 && _link[(_link.length-1)] !== '/' ){
								state = _link.replace(/\//g, '-');
								if( state[0] === '-' )
									state = state.replace('-', '');
							} else {
								state = _link.replace(/\//g, '');
							}
						}

						if( s.state !== state ){
							if( link === json.request.host || link === json.request.host+'/' ){
								if( s.state !== 'home' ){
									s.state = 'home';
									change = true;
								}
							} else {
								if( state === 'programs' ){
									if( s.sate !== state ){
										s.state = 'programs';
										change = true;
									}
								} else if( state === 'channels' ){
									if( s.sate !== state ){
										s.state = 'channels';
										change = true;
									}
								} else if( state.indexOf('pages-') > -1 ){
									if( s.sate !== state ){
										s.state = state; // pages-xxx
										change = true;
									}
								} else if( state.indexOf('programs-') > -1 ){
									if( s.sate !== state ){
										s.state = state; // programs-xxx
										change = true;
									}
								} else if( state.indexOf('channels-') > -1 ){
									if( s.sate !== state ){
										s.state = state; // channels-xxx
										change = true;
									}
								}
							}

							if( change === true ){
								s.resetHistoryState = true;
								var len = l.length,
									last = l[(len-1)],
									json_link = '';
								if( last === '/' ){
									json_link = l.substr(0, (len-1));
									if( s.state === 'home' ){
										json_link = json_link+'/index.json';
									} else {
										json_link = json_link+'.json';
									}
								} else {
									if( s.state === 'home' ){
										json_link = l+'/index.json';
									} else {
										json_link = l+'.json';
									}
								}

								if( appTools.subDomain(json_link) === false ){
									json_link = json_link.replace('://', '://www.');
									if( json_link.indexOf('www.www.') > -1 )
										json_link = json_link.replace('www.www.', 'www.');
								}

								json_link = json_link.replace('https://', protocol+'://');
								json_link = json_link.replace('http://', protocol+'://');

								// If no protocol set
								if( json_link.indexOf('http://') < 0 && json_link.indexOf('https://') < 0 )
									json_link = protocol+'://'+json_link;

								Lib.ajax.getJSON({
									url: json_link,
									type: 'json'
								}, function(data){
									if (data.status == 200 && data.readyState == 4) {
										json = JSON.parse(data.responseText);
										// Lib.scrollToTop(self, 0, 300);
										app.changeStateRoute();
									} else {
										alert('Could not load '+json_link);
									}
								});
							}
						}

					} else { // External Link
						window.open(l, '_blank');
					}

				},
				setAttributes: function(el, attrs){
					for(var key in attrs) {
						el.setAttribute(key, attrs[key]);
					}
				},
				stringToHtml: function(str, tag){
					var parser = new DOMParser(),
					el = parser.parseFromString(str, "text/html");
					return el.firstChild.getElementsByTagName(tag)[0];
				},
				addFooterPadding: function(el){
					setTimeout(function(){
						var h = el.offsetHeight;
						s.cont.style.paddingBottom = h+'px';
						s.viewport.height = ( s.cont.offsetHeight - h );
					}, 800);
				},
				headerScaffolds: function(){
					// Create elements
					// var navBarIcon = s.doc.createElement('i');
					// var programsAnchor = s.doc.createElement('a');
					// var channelsAnchor = s.doc.createElement('a');
					// var programsAnchorIcon = s.doc.createElement('i');
					// var channelsAnchorIcon = s.doc.createElement('i');
					// var historyBackIcon = s.doc.createElement('i');
					// var historyForwardIcon = s.doc.createElement('i');
					// var historyBackAnchor = s.doc.createElement('div');
					// var historyForwardAnchor = s.doc.createElement('div');

					// Set element attributes
					// navBarIcon.className = 'nav-fa fa fa-bars';
					// app.setAttributes( programsAnchor, {"href":"http://www.sayitright.be/channels/", "class":"nav-fa-channels", } );
					// app.setAttributes( channelsAnchor, {"href":"http://www.sayitright.be/programs/", "class":"nav-fa-programs"} );
					// app.setAttributes( programsAnchorIcon, {"class": "fa fa-folder-open", "data-toggle":"tooltip", "data-placement": "left", "title": "", "data-original-title": "Channels"} );
					// app.setAttributes( channelsAnchorIcon, {"class": "fa fa-file", "data-toggle":"tooltip", "data-placement": "left", "title": "", "data-original-title": "Programs"} );

					// app.setAttributes( historyBackAnchor, {"class":"nav-fa-back"} );
					// app.setAttributes( historyForwardAnchor, {"class":"nav-fa-forward"} );
					// app.setAttributes( historyBackIcon, {"class": "fa fa-chevron-left nav-back"} );
					// app.setAttributes( historyForwardIcon, {"class": "fa fa-chevron-right nav-forward"} );


					// Add elements to Container
					// s.par.appendChild(navBarIcon);
					// s.par.appendChild(programsAnchor);
					// s.par.appendChild(channelsAnchor);
					// programsAnchor.appendChild(programsAnchorIcon);
					// channelsAnchor.appendChild(channelsAnchorIcon);

					// s.par.appendChild(historyBackAnchor);
					// s.par.appendChild(historyForwardAnchor);
					// navbar-header

					// historyBackAnchor.appendChild(historyBackIcon);
					// historyForwardAnchor.appendChild(historyForwardIcon);

					// var mainNav = app.stringToHtml( String(embedTplNav(json)), 'nav' );
					var mainNav = embedTplNavEl(json, 'nav');

					if( mainNav )
						s.par.appendChild( mainNav );

					// s.scaffoldNavBarIcon = navBarIcon;
					s.scaffoldMainNav = mainNav;
					// s.scaffoldProgramsAnchor = programsAnchor;
					// s.scaffoldChannelsAnchor = channelsAnchor;

					// s.scaffoldHistoryBackAnchor = historyBackAnchor;
					// s.scaffoldHistoryForwardAnchor = historyForwardAnchor;

					s.scaffoldHistoryBackAnchorIcon = mainNav.getElementsByClassName('nav-back')[0];
					s.scaffoldHistoryForwardAnchorIcon = mainNav.getElementsByClassName('nav-forward')[0];

					// console.log( mainNav.getElementsByClassName('nav-back') );
				},
				routeAnimation: function(el){
					var lastId = '';
					for( var i = 0; i <= s.historyStack.length - 1; i++ ){
						if( s.historyStack[i].last === true ){
							lastId = s.historyStack[i].state;
							s.historyStack[i].last = false;
						} else if( s.historyStack[i].state === s.state ){
							s.historyStack[i].last = true;
						}
					}
					var last = Lib.getElementInsideContainer(contId, 'page-'+lastId);

					el.className = el.className.replace(' out', '');
					setTimeout(function(){
						el.className = el.className+' page-in moving-in';
						last.className = last.className.replace(' in', '');
					}, 100);
					setTimeout(function(){
						last.className = last.className+' moving-out';
					}, 400);
					setTimeout(function(){
						last.className = last.className.replace(' moving-out', ' out');
						last.className = last.className.replace(' page-in', '');
						last.className = last.className.replace(' in', '');

						el.className = el.className.replace(' moving-in', ' in');
					}, 600);
				},
				revertToState: function(){
					var layer = Lib.getElementInsideContainer(contId, 'page-'+s.state);
					// Animate change
					app.routeAnimation(layer);
				},
				pageScaffolds: function(){
					var str = s.state,
						layer = s.doc.createElement('div');
					if( s.historyStack.length <= 1 ){ // First Setup
						layer.className = 'page-layer page-in in';
					} else {
						layer.className = 'page-layer out';
					}
					layer.id = 'page-'+str;

					/*=====================================================================
					Build page
					=====================================================================*/
					var theFirstChild = s.cont.lastChild;
					s.cont.insertBefore(layer, theFirstChild); // Insert before footer
					switch(s.state){
						case 'home':
							app.buildHomeTpl('home');
						break;
						case 'channels':
							app.buildChannelsTpl('channels');
						break;
						case 'channel':
							app.buildChannelTpl( s.state.replace('channels-', '') );
						break;
						case 'programs':
							app.buildProgramsTpl('programs');
						break;
						case 'program':
							app.buildProgramTpl( s.state.replace('programs-', '') );
						break;
						case 'page':
						break;
						case 'search':
						break;
						default:
							// Get ID of program or channel
							if( s.state.indexOf('programs-') > -1 ){
								app.buildProgramTpl( s.state.replace('programs-', '') );
							} else if( s.state.indexOf('channels-') > -1 ){
								app.buildChannelTpl( s.state.replace('channels-', '') );
							} else if( s.state.indexOf('pages-') > -1 ){
								app.buildPageTpl( s.state.replace('pages-', '') );
							}
						break;
					}

					/*=====================================================================
					Animate
					=====================================================================*/
					if( s.historyStack.length <= 1 ){ // First Setup
						s.cont.appendChild(layer);
					} else {
						app.routeAnimation(layer);
					}
				},
				footerScaffolds: function(){
					// var sectionMarketing = app.stringToHtml('<section class="section-marketing"><div class="container"><div class="row site-banner"><div class="col-xs-3 middle-align"><a href=""><img src="http://idn.sayitright.com/user/sayitright/s3/https%3A%2F%2Ffdn.sayitright.be%2Fsites%2F50f1d1a5a81fe3e4c6000001%2Flogo/date/1408979138/format.jpg" title="Network Logo" alt="Network Logo"></a></div><div class="col-xs-9 middle-align"><a href="http://www.sayitright.com"><img style="width:100%;max-width:auto;" src="http://idn.sayitright.com/user/sayitright/s3/https%3A%2F%2Ffdn.sayitright.be%2Fsites%2F50f1d1a5a81fe3e4c6000001%2Fbanner/date/1408979138/resize/fill/width/730/height/90/format.jpg" title="Site Banner" alt="Site Banner"></a></div></div></div></section>', 'section');
					var sectionMarketing = s.doc.createElement('section');
					sectionMarketing.setAttribute('class', 'section-marketing');
					var str = '<div class="container"><div class="row site-banner">';

					str += '<div class="col-xs-3">';
					if( typeof json.site.logo_image_url !== 'undefined' ){
						str += '<a href="'+json.site.home_url+'"><img src="'+json.site.logo_image_url+'/format.jpg" title="Network Logo" alt="Network Logo" /></a>';
					} else {
						str += '<h1><a href="'+json.network.url+'">'+json.network.title+'</a></h1>';
					}
					str += '</div>';

					str += '<div class="col-xs-9">';
					if( typeof json.site.banner_url !== 'undefined' )
						str += '<a href="'+json.site.banner_url+'">';

					if( typeof json.site.banner_image_url !== 'undefined' )
						str += '<img src="'+json.site.banner_image_url+'/resize/fill/width/730/height/90/format.jpg" title="Site Banner" alt="Site Banner" />';

					if( typeof json.site.banner_url !== 'undefined' )
						str += '</a>';

					str += '</div>';

					str += '</div></div>';
					sectionMarketing.innerHTML = str;
					// sectionMarketing.innerHTML = '<div class="container"><div class="row site-banner"><div class="col-xs-3 middle-align"><a href=""><img src="http://idn.sayitright.com/user/sayitright/s3/https%3A%2F%2Ffdn.sayitright.be%2Fsites%2F50f1d1a5a81fe3e4c6000001%2Flogo/date/1408979138/format.jpg" title="Network Logo" alt="Network Logo"></a></div><div class="col-xs-9 middle-align"><a href="http://www.sayitright.com"><img style="width:100%;max-width:auto;" src="http://idn.sayitright.com/user/sayitright/s3/https%3A%2F%2Ffdn.sayitright.be%2Fsites%2F50f1d1a5a81fe3e4c6000001%2Fbanner/date/1408979138/resize/fill/width/730/height/90/format.jpg" title="Site Banner" alt="Site Banner"></a></div></div></div>';


					if( sectionMarketing ){
						s.par.appendChild( sectionMarketing );
						app.addFooterPadding(sectionMarketing);
					}

					// var footer = app.stringToHtml( String(embedTplFooter(json)) , 'footer');
					var footer = embedTplFooterEl(json, 'footer');
					s.scaffoldFooter = footer;
					if( footer )
						s.cont.appendChild( footer );
				},
				scaffoldListeners: function(){
					if( typeof s.scaffoldFooter !== 'undefined' ){
						var footerLinks = s.scaffoldFooter.getElementsByTagName('a');
						if( footerLinks ){
							for( var i = 0; i <= footerLinks.length - 1; i++ ){
								s.scaffoldLinks.push(footerLinks[i]);
							}
						}
					}
					if( typeof s.scaffoldMainNav !== 'undefined' ){
						var navLinks = s.scaffoldMainNav.getElementsByTagName('a');
						if( navLinks ){
							for( var j = 0; j <= navLinks.length - 1; j++ ){
								s.scaffoldLinks.push(navLinks[j]);
							}
						}
					}
					// if( typeof s.scaffoldProgramsAnchor !== 'undefined' )
					// 	s.scaffoldLinks.push(s.scaffoldProgramsAnchor);

					// if( typeof s.scaffoldChannelsAnchor !== 'undefined' )
					// 	s.scaffoldLinks.push(s.scaffoldChannelsAnchor);

					if( typeof s.scaffoldHistoryBackAnchorIcon !== 'undefined' )
						s.historyLinks.push(s.scaffoldHistoryBackAnchorIcon);

					if( typeof s.scaffoldHistoryForwardAnchorIcon !== 'undefined' )
						s.historyLinks.push(s.scaffoldHistoryForwardAnchorIcon);

				},
				getAllElementsWithAttribute: function(attribute){
					var matchingElements = [];
					var allElements = document.getElementsByTagName('*');
					for( var i = 0, n = allElements.length; i <= n; i++ ){
						if( allElements[i].getAttribute(attribute) ){
							// Element exists with attribute. Add to array.
							matchingElements.push(allElements[i]);
						}
					}
					return matchingElements;
				},
				buildHomeTpl: function(page){
					var layer = Lib.getElementInsideContainer(contId, 'page-'+page);
					// var sectionHeader = app.stringToHtml( String(embedTplHeader(json)), 'section' );
					var sectionHeader = embedTplHeaderEl(json, 'section');
					// var featuredChannels = app.stringToHtml( String(embedTplFeaturedChannels(json)), 'section' );
					var featuredChannels = embedTplFeaturedChannelsEl(json, 'section');
					// var programs = app.stringToHtml( String(embedTplPrograms(json)), 'section' );
					var programs = embedTplProgramsEl(json, 'section');

					if( typeof sectionHeader !== 'undefined' && sectionHeader !== '' )
						layer.appendChild( sectionHeader );
					if( typeof featuredChannels !== 'undefined' && featuredChannels !== '' )
						layer.appendChild( featuredChannels );
					if( typeof programs !== 'undefined' && programs !== '' )
						layer.appendChild( programs );

					// Event listeners on links
					s.stateLayers.push(layer);
					app.checkEventListeners();
				},
				buildChannelsTpl: function(page){
					var layer = Lib.getElementInsideContainer(contId, 'page-'+page);
					// var channels = app.stringToHtml( String(embedTplChannels(json)), 'section' );
					var channels = embedTplChannelsEl(json, 'section');

					if( channels )
						layer.appendChild( channels );

					// Event listeners on links
					s.stateLayers.push(layer);
					app.checkEventListeners();
				},
				buildChannelTpl: function(id){
					var layer = Lib.getElementInsideContainer(contId, 'page-channels-'+id);
					// var channel = app.stringToHtml( String( embedTplChannel(json) ), 'section');
					var channel = embedTplChannelEl(json, 'section');

					if( channel )
						layer.appendChild( channel );

					// Event listeners on links
					s.stateLayers.push(layer);
					app.checkEventListeners();

				},
				buildProgramsTpl: function(page){
					var layer = Lib.getElementInsideContainer(contId, 'page-'+page);
					// var programs = app.stringToHtml( String(embedTplPrograms(json)), 'section' );
					var programs = embedTplProgramsEl(json, 'section');

					if( programs )
						layer.appendChild( programs );

					// Event listeners on links
					s.stateLayers.push(layer);
					app.checkEventListeners();
				},
				buildProgramTpl: function(id){
					var layer = Lib.getElementInsideContainer(contId, 'page-programs-'+id);
					var segment = '';
					if( typeof json.program.segments !== 'undefined' && json.program.segments.length > 0 ){
						// segment = app.stringToHtml( String( embedTplProgramSegments(json) ), 'section');
						segment = embedTplProgramSegmentsEl(json, 'section');
					}
					// var program = app.stringToHtml( String( embedTplProgram(json) ), 'section');
					var program = embedTplProgramEl(json, 'section');

					if( segment )
						layer.appendChild( segment );
					if( program )
						layer.appendChild( program );

					// Start Carousel JS
					if( typeof json.program.segments !== 'undefined' && json.program.segments.length > 0 ){
						setTimeout(function(){
							// Run after the viewport has been set.
							Lib.getElementInsideContainer('page-programs-'+id, 'slider').sirEmbedSegment(s.viewport);
						}, 850);
					}

					// Event listeners on links
					s.stateLayers.push(layer);
					app.checkEventListeners();
				},
				buildPageTpl: function(id){
					var layer = Lib.getElementInsideContainer(contId, 'page-pages-'+page);
					// var page = app.stringToHtml( String(embedTplPage(json)), 'section' );
					var page = embedTplPageEl(json, 'section');

					if( page )
						layer.appendChild( page );

					// Event listeners on links
					s.stateLayers.push(layer);
					app.checkEventListeners();
				},
				setup: function(url){
					app.routingState();

					s.historyStack.push({"num": 1, "state": s.state, "last":true});
					app.headerScaffolds();

					// var id = '';

					// switch(s.state){
					// 	case 'home':
					// 	break;
					// 	case 'channels':
					// 	break;
					// 	case 'channel':
					// 		id = json.channel.id; // ID
					// 	break;
					// 	case 'programs':
					// 	break;
					// 	case 'program':
					// 		id = json.program.id; // ID
					// 	break;
					// 	case 'page':
					// 		// id = ''; // ID
					// 	break;
					// 	case 'search':
					// 	break;
					// }

					s.historyLayers.history.push(s.state);
					s.historyLayers.position = s.historyLayers.position+1;

					app.pageScaffolds();

					app.footerScaffolds();
					app.scaffoldListeners();
				},
				openShareButton: function(el){
					var url = el.getAttribute('href'),
						name = el.getAttribute('title'),
						w = 500,
						h = 450,
						left = (screen.width/2)-(w/2),
						top = (screen.height/2)-(h/2);
					window.open(url, name, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
				},
				checkEventListeners: function(){
					var l = s.stateLayers.length - 1,
						links = [],
						externals = [],
						shares = [];

					// Add listeners to last added layer
					var layerLinks = s.stateLayers[l].getElementsByTagName('a');
					if( layerLinks ){
						for( var i = 0; i <= layerLinks.length - 1; i++ ){

							if( layerLinks[i].href.indexOf('twitter.com/home?status') > -1 ){

								shares.push(layerLinks[i]);

							} else if( layerLinks[i].href.indexOf('plus.google.com') > -1 ){

								shares.push(layerLinks[i]);

							} else if( layerLinks[i].href.indexOf('facebook.com/sharer.php') > -1 ){

								shares.push(layerLinks[i]);

							} else {

								if( layerLinks[i].href.indexOf(json.request.host.replace('www.', '')) > -1 ){
									links.push(layerLinks[i]);
								}

							}
						}
						links.forEach(function(item){
							item.addEventListener('click', function(e){
								e.preventDefault();
								app.routeAction(item);
							});
						});
						shares.forEach(function(item){
							item.addEventListener('click', function(e){
								e.preventDefault();
								app.openShareButton(item);
							});
						});
						// externals.forEach(function(item){
						// 	item.addEventListener('click', function(e){
						// 		e.preventDefault();
						// 		if( e.target.href.indexOf(json.request.host) > -1 ){
						// 			app.routeAction(item);
						// 		} else {
						// 			window.open(e.target.href, '_blank');
						// 		}
						// 	});
						// });
					}
				},
				bindActions: function(){
					/*=====================================================================
					Scaffold Links
					=====================================================================*/
					s.historyLinks.forEach(function(item){
						item.addEventListener('click', function(e){
							e.preventDefault();
							if( e.target.className.indexOf('back') > -1 ){
								if( s.historyLayers.position > 1 ){ // Allow Back
									s.state = s.historyLayers.history[(s.historyLayers.position-2)];
									s.historyLayers.position = s.historyLayers.position-1;
									app.changeStateRoute();
								}
							} else if( e.target.className.indexOf('forward') > -1 ){
								if( s.historyLayers.position < s.historyLayers.history.length ){ // Allow Forward
									s.state = s.historyLayers.history[(s.historyLayers.position)];
									s.historyLayers.position = s.historyLayers.position+1;
									app.changeStateRoute();
								}
							}
						});
					});
					s.scaffoldLinks.forEach(function(item){
						item.addEventListener('click', function(e){
							e.preventDefault();
							app.routeAction(item);
						});
					});

				}
			};

		if( typeof obj.url !== 'undefined' ){
			var link = obj.url,
				len = link.length,
				last = link[(len-1)],
				json_link = '';
			if( last === '/' ){
				if( link.substr(len -5) === '.com/' || link.substr(len -4) === '.be/' ){// Is Home
					json_link = link+'index.json';
				} else {
					var l = link.substring(0, len - 1);
					json_link = l+'.json';
				}
			} else {
				if( link.substr(len -4) === '.com' || link.substr(len -3) === '.be' ){// Is Home
					json_link = link+'/index.json';
				} else if( link.substr(len -5) === '.json' ){
					json_link = link;
				} else {
					json_link = link+'.json';
				}
			}
			// if( json_link.indexOf('http:') < 0 )
			// 	json_link = 'http://'+json_link;

			if( appTools.subDomain(json_link) === false ){
				json_link = json_link.replace('://', '://www.');
				if( json_link.indexOf('www.www.') > -1 )
					json_link = json_link.replace('www.www.', 'www.');
			}
			// if( json_link.indexOf('www.') < 0 )
			// 	json_link = json_link.replace('://', '://www.');

			json_link = json_link.replace('https://', protocol+'://');
			json_link = json_link.replace('http://', protocol+'://');

			// If no protocol set
			if( json_link.indexOf('http://') < 0 && json_link.indexOf('https://') < 0 )
				json_link = protocol+'://'+json_link;

			Lib.ajax.getJSON({
				url: json_link,
				type: 'json'
			}, function(data){
				if( data.status == 200 && data.readyState == 4 ){
					// console.log( Lib.getOnlyJson(data.responseText) );
					json = JSON.parse(data.responseText);
					app.init(json_link);
				} else {
					alert('Could not load '+json_link);
				}
			});
		} else {
			alert('Please set a url');
		}

		return false;
	};

	Element.prototype.sirLightbox = function(obj){
		// Create button
		if( obj.button === 'true' )
			this.className = this.className+' sir-btn';
		var self = this;
		var overlay,
			container,
			box,
			close;
		var lightbox = {
			build: function(){
				overlay = document.createElement('div');
				overlay.setAttribute('class', 'sir-lightbox-overlay');

				container = document.createElement('div');
				container.setAttribute('class', 'sir-lightbox-container');

				box = document.createElement('div');
				box.setAttribute('id', 'sir-embed-lightbox');

				close = document.createElement('a');
				close.setAttribute('class', 'sir-lightbox-close');
				close.innerHTML = 'X';

				document.getElementsByTagName('body')[0].appendChild(overlay);
				document.getElementsByTagName('body')[0].appendChild(container);
				container.appendChild(box);
				document.getElementsByTagName('body')[0].appendChild(close);
				this.setEvents();
			},
			setEvents: function(){
				overlay.addEventListener('click', function(e){
					e.preventDefault();
					lightbox.closeLightbox();
				});
				close.addEventListener('click', function(e){
					e.preventDefault();
					lightbox.closeLightbox();
				});
			},
			closeLightbox: function(){
				overlay.className = overlay.className.replace(' sir-show', '');
				container.className = container.className.replace(' sir-show', '');
				close.className = close.className.replace(' sir-show', '');
				setTimeout(function(){
					overlay.remove();
					container.remove();
					close.remove();
				}, 300);
			}
		};
		if( typeof obj.url !== 'undefined' ){
			self.addEventListener('click', function(e){
				e.preventDefault();

				lightbox.build();

				setTimeout(function(){
					overlay.className = overlay.className+' sir-show';
					container.className = container.className+' sir-show';
					close.className = close.className+' sir-show';
				}, 300);
				box.sirEmbed(obj);
			});
		} else {
			alert('Please set a url');
		}

		return false;
	};


	/*=====================================================================
	Define Embeds & Lightboxes
	=====================================================================*/
	function defineElements(){
		var embeds = document.getElementsByClassName('sir-embed-item');
		if( typeof embeds !== 'undefined' && embeds.length > 0 ){
			for( var i = 0; i <= embeds.length - 1; i++ ){
				embeds[i].sirEmbed({
					"url": embeds[i].dataset.url,
					"width": embeds[i].dataset.width,
					"height": embeds[i].dataset.height
				});
			}
		}

		var lightboxes = document.getElementsByClassName('sir-lightbox-item');
		if( typeof lightboxes !== 'undefined' && lightboxes.length > 0 ){
			for( var j = 0; j <= lightboxes.length - 1; j++ ){
				lightboxes[j].sirLightbox({
					"url": lightboxes[j].dataset.url,
					"button": "true"
				});
			}
		}
	}


	/*=====================================================================
	On Page Load
	=====================================================================*/
	window.onload=defineElements;

})();