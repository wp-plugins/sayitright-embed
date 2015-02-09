!(function(w, d){

	"use strict";

	var protocol = 'http';

	if( window.location.host.indexOf('https://') > -1 )
		protocol = 'https';

	var launchers = d.getElementsByClassName('sir-embed-item');
	console.log(launchers);
	if( typeof launchers !== 'undefined' && launchers.length > 0 ){
		for( var i = 0; i <= launchers.length - 1; i++ ){
			launchers[i].sirEmbed({
				"url": launchers[i].dataset.url,
				"width": launchers[i].dataset.width,
				"height": launchers[i].dataset.height
			});
		}
	}


	var lightboxes = d.getElementsByClassName('sir-lightbox-item');
	console.log(lightboxes);
	if( typeof lightboxes !== 'undefined' && lightboxes.length > 0 ){
		for( var j = 0; j <= lightboxes.length - 1; j++ ){
			lightboxes[j].sirLightbox({
				"url": lightboxes[j].dataset.url,
				"button": "true"
			});
		}
	}

})(window, document);