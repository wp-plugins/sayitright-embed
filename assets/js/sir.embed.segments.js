Element.prototype.sirEmbedSegment = function(obj){
	var slider = this;
	var slides = slider.childNodes;
	var parent = slider.parentNode;
	var opts = '';
	var frame = parent.parentNode.parentNode;
	// var viewport = ( frame.offsetHeight - Number(frame.style.paddingBottom.replace('px', '') ) ); // Available space
	var viewport = obj;
	var protocol = 'https';
	if (window.location.protocol != "https:")
		protocol = 'http';

	var segments = {
			settings: {
				win: window,
				doc: document,
				pos: 0,
				slideCount: 0,
				list_h: 0,
				topMargin: 0,
				bottomMargin: 0,
				edgeWidth: 50,
				spacingWidth: 20
			},
			init: function() {
				opts = segments.settings;
				parent.style.height = viewport.height+'px';
				segments.bindEvents();
			},
			setupPlaylistCaptions: function(){
				var captions = [];
				for (var i = 0; i <= slides.length - 1; i++) {
					if( slides[i].getElementsByTagName('figcaption')[0] )
						captions.push( slides[i].getElementsByTagName('figcaption')[0] );
				}
				// $('.playlist-carousel').find('figcaption').each(function(){
				// 	var h = $(this).height() + 10;
				// 	$(this).css({'bottom': '-'+h+'px'});
				// });
			},
			stopPlaylistVideos: function(){
				for( var i = 0; i <= slides.length - 1; i++ ){
					var rel = slides[i].getAttribute('rel');
					if( rel === 'clip' || rel === 'external' ){
						if( rel === 'external' ){
							var embed = slides[i].getAttribute('data-embed');
							if( embed.indexOf('youtube') > -1 ){
								var youtubes = slides[i].getElementsByTagName('iframe'),
									youtube = youtubes[0].contentWindow;
								youtube.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
							}
							if( embed.indexOf('vimeo') > -1 ){
								var vimeos = slides[i].getElementsByTagName('iframe'),
									vimeo = vimeos[0].contentWindow;
								vimeo.postMessage('{"method": "pause"}','*');
							}
						} else {
							var videos = slides[i].getElementsByTagName('video');
							for (var j = 0; j <= videos.length - 1; j++) {
							}
						}

					}
				}
			},
			removeImageZoom: function(){
				// $('.playlist-carousel').find('img.zoom').removeClass('zoom');
			},
			slidePlaylist: function(dir){
				segments.stopPlaylistVideos();
				var slide = '',
				overlayWidth = 0;
				if( dir === 'prev' ){
					if( opts.pos !== 0 ){
						opts.pos = opts.pos - 1;
						if( opts.pos < 0 )
							opts.pos = 0;

						slide = slider.childNodes[opts.pos];
						slider.style.left = ( (parent.offsetWidth / 2)-slider.childNodes[opts.pos].offsetLeft-(slider.childNodes[opts.pos].offsetWidth/2) )+'px';

						overlayWidth = ( (parent.offsetWidth - slider.childNodes[opts.pos].offsetWidth) / 2 );
						parent.childNodes[1].setAttribute('style', 'width:'+overlayWidth+'px;');
						parent.childNodes[2].setAttribute('style', 'width:'+overlayWidth+'px;');

						if( opts.pos === 0 ){
							parent.childNodes[1].style.display = 'none';
						}else{
							parent.childNodes[1].style.display = 'block';
						}
						if( opts.pos === opts.slidesCount-1 ){
							parent.childNodes[2].style.display = 'none';
						}else{
							parent.childNodes[2].style.display = 'block';
						}
					}
				} else {
					if( opts.pos !== opts.slideCount-1 ){
						opts.pos = opts.pos + 1;
						if( opts.pos >= opts.slideCount )
							opts.pos=opts.slideCount-1;

						slide = slider.childNodes[opts.pos];
						slider.style.left = ( (parent.offsetWidth / 2) - slider.childNodes[opts.pos].offsetLeft - (slider.childNodes[opts.pos].offsetWidth/2) )+'px';

						overlayWidth = ( (parent.offsetWidth - slider.childNodes[opts.pos].offsetWidth) / 2 );
						parent.childNodes[1].setAttribute('style', 'width: '+overlayWidth+'px;');
						parent.childNodes[2].setAttribute('style', 'width: '+overlayWidth+'px;');

						if( opts.pos === 0 ){
							parent.childNodes[1].style.display = 'none';
						}else{
							parent.childNodes[1].style.display = 'block';
						}

						if( opts.pos === opts.slideCount-1 ){
							parent.childNodes[2].style.display = 'none';
						}else{
							parent.childNodes[2].style.display = 'block';
						}
					}
				}
			},
			resizePlaylist: function(){
				// Resize container
				var h = parent.offsetWidth / 2;
				slider.style.height = h;

				var width = parent.offsetWidth;
				var height = h;

				// Max size of a slide
				var maxWidth = width - opts.edgeWidth - opts.edgeWidth - opts.spacingWidth - opts.spacingWidth;
				var maxHeight = height - opts.topMargin - opts.bottomMargin;
				var aspect = maxWidth/maxHeight;

				var left = 0;

				var w = 0;

				for( var i = 0; i <= slides.length - 1; i++ ){
					//Calculate a size that fits into max size
					var slideWidth = viewport.width;
					var slideHeight = viewport.height;

					if( typeof slides[i].getAttribute('data-max-width') !== 'undefined' && slides[i].getAttribute('data-max-width') == 'null' )
						slideWidth = slides[i].getAttribute('data-max-width');
					if( typeof slides[i].getAttribute('data-max-height') !== 'undefined' && slides[i].getAttribute('data-max-height') == 'null' ){
						slideHeight = slides[i].getAttribute('data-max-height');
					}

					var slideAspect = slideWidth/slideHeight;

					if(slideAspect > aspect){
						if(slideWidth > maxWidth){
							slideWidth = maxWidth;
							slideHeight = maxWidth / slideAspect;
						}
					}else{
						if(slideHeight > maxHeight){
							slideHeight = maxHeight;
							slideWidth = maxHeight * slideAspect;
						}
					}

					//Position clip relative to slider
					slides[i].setAttribute('style', 'display:block;top: '+opts.topMargin + ((maxHeight - slideHeight)/2) +'px;left:'+left+'px;width:'+slideWidth+'px;height:'+slideHeight+'px;');

					left = left + slideWidth + opts.spacingWidth + opts.spacingWidth;

					w = w + slideWidth;
				}

				//Position the slider at the center of the current slide
				var slide = slider.childNodes[opts.pos];
				var l = slider.childNodes[opts.pos].style.left;
				l = l.replace('px', '');
				slider.setAttribute('style', 'left:'+( (width / 2) - Number(l) - ( slider.childNodes[opts.pos].offsetWidth/2 ) )+'px; width: '+w+'px');

				//Position the overlay buttons to the edge of the current slide
				var overlayWidth = ((width - slide.offsetWidth)/2);
				parent.childNodes[1].style.width = overlayWidth+"px"; // prev
				parent.childNodes[2].style.width = overlayWidth+"px"; // next

				if( opts.pos === 0 ){
					parent.childNodes[1].style.display = 'none'; // prev
				}else{
					parent.childNodes[1].style.display = 'block'; // prev
				}

				if( opts.pos === (opts.slideCount-1) ){
					parent.childNodes[2].style.display = 'none'; // next
				}else{
					parent.childNodes[2].style.display = 'block'; // next
				}
			},
			// checkDownButton: function(){
			// 	var top = parent.offsetHeight;
			// 	console.log( opts.win.scrollY );
			// 	if( opts.win.scrollY > ($('.program-body').offsetTop - 50) )
			// 		$('#down').fadeOut(200);
			// },
			toHTML: function(str, tag){
				var parser = new DOMParser(),
				el = parser.parseFromString(str, "text/html");
				return el.firstChild.getElementsByTagName(tag)[0];
			},
			bindEvents: function(){

				opts.slideCount = slider.childNodes.length;

				for (var i = 0; i <= slides.length - 1; i++) {
					var tag = '',
						rel = slides[i].getAttribute('rel'),
						id = slides[i].getAttribute('data-id'),
						content = slides[i].getAttribute('data-content'),
						code = '',
						slide = '';
					if( rel === 'clip' ){
						var clip_width = slides[i].getAttribute('data-clip-width'),
							clip_height = slides[i].getAttribute('data-clip-height'),
							clip_image = slides[i].getAttribute('data-clip-image');

						if( clip_width )
							slides[i].setAttribute('data-max-width', clip_width);
						if( clip_height )
							slides[i].setAttribute('data-max-height', clip_height);

						if( slides[i].getAttribute('data-clip-video-hq_url') ){ // Video
							var video_hq_url = slides[i].getAttribute('data-clip-video-hq_url'),
								video_sq_url = slides[i].getAttribute('data-clip-video-sq_url');
							slide = document.createElement('video');
							slide.setAttribute('class', 'video-js vjs-default-skin');
							slide.setAttribute('preload', 'auto');
							slide.setAttribute('controls', 'true');
							slide.setAttribute('data-setup', '{"controls": true, "autoplay": false, "preload": "auto"}');
							slide.setAttribute('width', '100%');
							slide.setAttribute('height', '100%');
							slide.setAttribute('poster', protocol+'://idn.sayitright.com/user/sayitright/s3/'+clip_image+'/resize/fill/width/'+clip_width+'/height/'+clip_height+'/format.jpg');

							code = '<source src="'+video_hq_url+'" type="application/x-mpegURL">'+
									'<source src="'+video_hq_url+'" type="application/vnd.apple.mpegurl">'+
									'<source src="'+video_sq_url+'" type="video/mp4">';

							slide.innerHTML = code;

								// tag = 'video';
								// code = '<video id="video_'+id+'" '+
								// 'class="video-js vjs-default-skin" '+
								// 'preload="auto" '+
								// 'controls="true" '+
								// 'data-setup=\'{"controls": true, "autoplay": false, "preload": "auto"}\' '+
								// 'width="100%" height="100%" '+
								// 'poster="'+protocol+'://idn.sayitright.com/user/sayitright/s3/'+clip_image+'/resize/fill/width/'+clip_width+'/height/'+clip_height+'/format.jpg">'+
								// 	'<source src="'+video_hq_url+'" type="application/x-mpegURL">'+
								// 	'<source src="'+video_hq_url+'" type="application/vnd.apple.mpegurl">'+
								// 	'<source src="'+video_sq_url+'" type="video/mp4">'+
								// '</video>';
						} else { // Image
							slide = document.createElement('img');
							slide.setAttribute('src', protocol+'://idn.sayitright.com/user/sayitright/s3/'+clip_image+'/resize/limit/width/1280/format.jpg');

							if( content !== '' )
								code = '<figcaption>'+content+'</figcaption>';
							slide.innerHTML = code;

							// tag = 'img';
							// code = '<img src="'+protocol+'://idn.sayitright.com/user/sayitright/s3/'+clip_image+'/resize/limit/width/1280/format.jpg" />';
							// if( content !== '' )
							// 	code += '<figcaption>'+content+'</figcaption>';
						}

					} else if( rel === 'external' ){
						var embed = slides[i].getAttribute('data-embed'),
							embed_url = slides[i].getAttribute('data-embed-url'),
							embed_code = embed.replace('http://www.youtube.com/embed/', '');
							embed_code = embed.replace('https://www.youtube.com/embed/', '');
							if( embed.indexOf('youtube') > -1 )
								embed = embed+'?wmode=Opaque&enablejsapi=1';
							if( embed.indexOf('vimeo') > -1 )
								embed = embed+'?api=1';
						
						slide = document.createElement('iframe');
						slide.setAttribute('id', embed_code);
						slide.setAttribute('src', embed);
						slide.setAttribute('frameborder', '0');
						slide.setAttribute('webkitallowfullscreen', '');
						slide.setAttribute('mozallowfullscreen', '');
						slide.setAttribute('allowfullscreen', '');

						if( content !== '' )
							code = '<figcaption>'+content+'</figcaption>';
						slide.innerHTML = code;

						// tag = 'iframe';
						// code = '<iframe id="'+embed_code+'" src="'+embed+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
						// if( content !== '' )
						// 	code += '<figcaption>'+content+'</figcaption>';
					}

					// var slide = segments.toHTML( String(code), tag);
					if( slide )
						slides[i].appendChild( slide );
				}
				

				if(opts.pos >= opts.slideCount){
					opts.pos = opts.slideCount -1;
				}
				if(opts.pos < 0){
					opts.pos = 0;
				}

				segments.resizePlaylist();

				// segments.setupPlaylistCaptions();

				opts.win.addEventListener('resize', segments.resizePlaylist, false);
				// opts.win.addEventListener('scroll', segments.checkDownButton, false);
				// $(window).trigger("resize");

				parent.childNodes[1].addEventListener('click', function(){
					segments.slidePlaylist('prev');
				});
				parent.childNodes[2].addEventListener('click', function(){
					segments.slidePlaylist('next');
				});

				// parent.childNodes[3].style.display = 'none'; // Hide down arrow

				// Position #down
				// var b = $('.section-marketing-hidden').offsetHeight + 10;
				// $('#down').css('bottom', b+'px');

				// $('#down').find('i').on('click', function(){
				// 	var top = $('.playlist-carousel').height();
				// 	$(this).parent().fadeOut(200);
				// 	$('html, body').animate({
				// 		scrollTop: ( $('.program-body').offset().top - 50)
				// 	}, 600);
				// });

			}
		};
		segments.init();
};