/*=====================================================================
Templating
=====================================================================*/
/*
IE & Safari Fix
- No longer uses DOMParser
*/

function embedTplNavEl(data, tag){
	var el = document.createElement(tag);
	el.setAttribute('class', 'navbar navbar-fixed-top navbar-default');
	el.setAttribute('role', 'navigation');

	var str = '<div class="navbar-header">';

	if( typeof data.site.icon_image_url !== 'undefined' && typeof data.request.host !== 'undefined' ){
		if( data.site.icon_image_url !== 'null' )
			str += '<a class="brand" href="http://'+data.request.host+'"><img src="'+data.site.icon_image_url+'/resize/fill/width/50/height/50/format.jpg" title="Icon" alt="Icon" /></a>';
		str += '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#sir-embed-navbar-collapse"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>';
		str += '<div class="collapse navbar-collapse" id="sir-embed-navbar-collapse">';
	}


	if( typeof data.request.host !== 'undefined' ){
		str += '<ul class="nav navbar-nav">';
			if( typeof data.request.is_home !== 'undefined' ){
				str += '<li class="active"><a href="http://'+data.request.host+'">Home</a></li>';
			} else {
				str += '<li class=""><a href="http://'+data.request.host+'">Home</a></li>';
			}

			if( typeof data.request.is_channels !== 'undefined' ){
				str += '<li class="active"><a href="http://'+data.request.host+'/channels/">Channels</a></li>';
			} else {
				str += '<li class=""><a href="http://'+data.request.host+'/channels/">Channels</a></li>';
			}

			if( typeof data.request.is_programs !== 'undefined' ){
				str += '<li class="active"><a href="http://'+data.request.host+'/programs/">Programs</a></li>';
			} else {
				str += '<li class=""><a href="http://'+data.request.host+'/programs/">Programs</a></li>';
			}
			// str += '<li><a href="http://'+data.request.host+'/programs/51110849ccf1be14bb000005">Featured Program</a></li>';
			// str += '<li><a href="http://'+data.request.host+'/pages/mmdemo">AboutMM</a></li>';
		str += '</ul>';

		// str += '<div class="sir-actions"><form action="http://'+data.request.host+'/search" class="form-inline sir-search"><div class="form-group has-feedback"><input type="text" name="search" class="form-control" placeholder="Search" /><span class="glyphicon glyphicon-search form-control-feedback"></span></div></form></div>';

		str += '<div class="social-links"><a  href="http://'+data.request.host+data.request.path+'" data-width="90%" data-height="90%" onclick="return false;" data-type="" class="fa fa-external-link sir-launcher" data-toggle="tooltip" data-placement="bottom" title="See this in TV view"><i class="fa sir-icon"></i></a>';

			if( typeof data.site.facebook_page_id !== 'undefined' )
				str += '<a target="_blank" href="http://facebook.com/'+data.site.facebook_page_id+'" class="fa fa-facebook" data-name="facebook" data-type="" data-prefix="social" data-utf="E031"></a>';
			if( typeof data.site.twitter_id !== 'undefined' )
				str += '<a target="_blank" href="http://twitter.com/'+data.site.twitter_id+'" class="fa fa-twitter" data-name="twitter" data-type="" data-prefix="social" data-utf="E031"></a>';
			if( typeof data.site.google_page_id !== 'undefined' )
				str += '<a target="_blank" href="http://google.com/'+data.site.google_page_id+'" class="fa fa-google-plus" data-name="google_plus" data-type="" data-prefix="social" data-utf="E031"></a>';
			
				// str += '<a href="http://'+data.request.host+'/hub/" class="nav-login" data-toggle="tooltip" data-placement="bottom" title="User Login"><span class="glyphicon glyphicon-user"></span></a>';

		str += '</div>';
	}

	str += '</div>';

	// str += '<i class="fa fa-chevron-right nav-forward"></i>';
	str += '<i class="glyphicon glyphicon-chevron-right nav-forward"></i>';
	// str += '<i class="fa fa-chevron-left nav-back"></i>';
	str += '<i class="glyphicon glyphicon-chevron-left nav-back"></i>';

	str += '</div>';

	el.innerHTML = str;
	return el;
}

function embedTplNav(data){
	var str = '<nav class="navbar navbar-fixed-top navbar-default" role="navigation"><div class="navbar-header">';

	if( typeof data.site.icon_image_url !== 'undefined' && typeof data.request.host !== 'undefined' ){
		str += '<a class="brand" href="http://'+data.request.host+'"><img src="'+data.site.icon_image_url+'/resize/fill/width/50/height/50/format.jpg" title="Icon" alt="Icon" /></a>';
		str += '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#sir-embed-navbar-collapse"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>';
		str += '<div class="collapse navbar-collapse" id="sir-embed-navbar-collapse">';
	}


	if( typeof data.request.host !== 'undefined' ){
		str += '<ul class="nav navbar-nav">';
			if( typeof data.request.is_home !== 'undefined' ){
				str += '<li class="active"><a href="http://'+data.request.host+'">Home</a></li>';
			} else {
				str += '<li class=""><a href="http://'+data.request.host+'">Home</a></li>';
			}

			if( typeof data.request.is_channels !== 'undefined' ){
				str += '<li class="active"><a href="http://'+data.request.host+'/channels/">Channels</a></li>';
			} else {
				str += '<li class=""><a href="http://'+data.request.host+'/channels/">Channels</a></li>';
			}

			if( typeof data.request.is_programs !== 'undefined' ){
				str += '<li class="active"><a href="http://'+data.request.host+'/programs/">Programs</a></li>';
			} else {
				str += '<li class=""><a href="http://'+data.request.host+'/programs/">Programs</a></li>';
			}
			// str += '<li><a href="http://'+data.request.host+'/programs/51110849ccf1be14bb000005">Featured Program</a></li>';
			// str += '<li><a href="http://'+data.request.host+'/pages/mmdemo">AboutMM</a></li>';
		str += '</ul>';

		// str += '<div class="sir-actions"><form action="http://'+data.request.host+'/search" class="form-inline sir-search"><div class="form-group has-feedback"><input type="text" name="search" class="form-control" placeholder="Search" /><span class="glyphicon glyphicon-search form-control-feedback"></span></div></form></div>';

		str += '<div class="social-links"><a  href="http://'+data.request.host+data.request.path+'" data-width="90%" data-height="90%" onclick="return false;" data-type="" class="fa fa-external-link sir-launcher" data-toggle="tooltip" data-placement="bottom" title="See this in TV view"><i class="fa sir-icon"></i></a>';

			if( typeof data.site.facebook_page_id !== 'undefined' )
				str += '<a target="_blank" href="http://facebook.com/'+data.site.facebook_page_id+'" class="fa fa-facebook" data-name="facebook" data-type="" data-prefix="social" data-utf="E031"></a>';
			if( typeof data.site.twitter_id !== 'undefined' )
				str += '<a target="_blank" href="http://twitter.com/'+data.site.twitter_id+'" class="fa fa-twitter" data-name="twitter" data-type="" data-prefix="social" data-utf="E031"></a>';
			if( typeof data.site.google_page_id !== 'undefined' )
				str += '<a target="_blank" href="http://google.com/'+data.site.google_page_id+'" class="fa fa-google-plus" data-name="google_plus" data-type="" data-prefix="social" data-utf="E031"></a>';
			
				// str += '<a href="http://'+data.request.host+'/hub/" class="nav-login" data-toggle="tooltip" data-placement="bottom" title="User Login"><span class="glyphicon glyphicon-user"></span></a>';

		str += '</div>';
	}

	str += '</div>';

	str += '<i class="fa fa-chevron-right nav-forward"></i>';
	str += '<i class="fa fa-chevron-left nav-back"></i>';

	str += '</div></nav>';

	return str;
}

function embedTplFooterEl(data, tag){
	var el = document.createElement(tag);
	el.setAttribute('role', 'contentinfo');

	var str = '<nav class="footer-navbar">';
			if( typeof data.site.home_url !== 'undefined' )
				str += '<a href="'+data.site.home_url+'">HOME</a>';
			if( typeof data.site.about_url !== 'undefined' )
				str += '<a href="'+data.site.about_url+'">ABOUT</a>';
			if( typeof data.site.terms_url !== 'undefined' )
				str += '<a href="'+data.site.terms_url+'">TERMS</a>';
			if( typeof data.site.privacy_url !== 'undefined' )
				str += '<a href="'+data.site.privacy_url+'">PRIVACY</a>';
			if( typeof data.site.contact_url !== 'undefined' )
				str += '<a href="'+data.site.contact_url+'">CONTACT</a>';
		str += '</nav>';
		if( typeof data.site.copyright !== 'undefined' )
			str += '<div class="copy"><p>'+data.site.copyright+'</p></div>';

	el.innerHTML = str;
	return el;
}

function embedTplFooter(data){
	var str = '<footer role="contentinfo"><nav class="footer-navbar">';
			if( typeof data.site.home_url !== 'undefined' )
				str += '<a href="'+data.site.home_url+'">HOME</a>';
			if( typeof data.site.about_url !== 'undefined' )
				str += '<a href="'+data.site.about_url+'">ABOUT</a>';
			if( typeof data.site.terms_url !== 'undefined' )
				str += '<a href="'+data.site.terms_url+'">TERMS</a>';
			if( typeof data.site.privacy_url !== 'undefined' )
				str += '<a href="'+data.site.privacy_url+'">PRIVACY</a>';
			if( typeof data.site.contact_url !== 'undefined' )
				str += '<a href="'+data.site.contact_url+'">CONTACT</a>';
		str += '</nav>';
		if( typeof data.site.copyright !== 'undefined' )
			str += '<div class="copy"><p>'+data.site.copyright+'</p></div>';
	str += '</footer>';

	return str;
}

function embedTplHeaderEl(data, tag){
	var el = document.createElement(tag);
	el.setAttribute('class', 'section-header bg-cover');

	var str = '';
	if( typeof data.site.header_image_url !== 'undefined' && data.site.header_image_url !== '' ){
		str += '<img src="'+data.site.header_image_url+'/resize/limit/width/2000/height/2000/format.jpg"></section>';
	} else if( typeof data.site.background_image_url !== 'undefined' && data.site.background_image_url !== '' ) {
		el.setAttribute('style', 'background-image:url('+data.site.background_image_url+'/resize/fill/width/1680/height/720/format.jpg)');

			str += '<div class="flex flex-21x9"><div class="flex-content"><div class="jumbotron"><div class="container"><div class="row"><div class="col-md-8 col-md-offset-2">';
				str += '<h1>'+data.site.title+'</h1>';
				str += '<p class="lead">'+data.site.summary+'</p>';
			str += '</div></div></div></div></div></div>';
	}
	el.innerHTML = str;
	return el;
}

function embedTplHeader(data){
	var str = '';
	if( typeof data.site.header_image_url !== 'undefined' && data.site.header_image_url !== '' ){
		str += '<section class="section-header bg-cover"><img src="'+data.site.header_image_url+'/resize/limit/width/2000/height/2000/format.jpg"></section>';
	} else if( typeof data.site.background_image_url !== 'undefined' && data.site.background_image_url !== '' ) {
		str += '<section class="section-header bg-cover" style="background-image:url('+data.site.background_image_url+'/resize/fill/width/1680/height/720/format.jpg)">';
			str += '<div class="flex flex-21x9"><div class="flex-content"><div class="jumbotron"><div class="container"><div class="row"><div class="col-md-8 col-md-offset-2">';
				str += '<h1>'+data.site.title+'</h1>';
				str += '<p class="lead">'+data.site.summary+'</p>';
			str += '</div></div></div></div></div></div>';
		str += '</section>';
	}
	return str;
}

function embedTplFeaturedChannelsEl(data, tag){
	var el = document.createElement(tag);
	el.setAttribute('class', 'section-grey');
	el.setAttribute('id', 'featured-channels');

	var str = '';
	if( typeof data.featured_channels !== 'undefined' ){
		str += '<div class="container">';
			str += '<div class="featured-results">';
				str += '<h2 class="text-center clearfix">Channels <a href="http://'+data.request.host+'/channels/" class="btn btn-default pull-right">View All <span class="glyphicon glyphicon-chevron-right"></span></a></h2>';

				data.featured_channels.forEach(function(item){
					str += '<div class="featured-channel">';
						if( item.preview_url !== null ){
							str += '<a href="http://'+data.request.host+item.path+'"><img src="'+item.preview_url+'/resize/fill/width/300/height/300/format.jpg" class="img-circle" /></a>';
						} else {
							str += '<a href="http://'+data.request.host+item.path+'"><img data-width="300" data-height="300" src="http://idn.sayitright.com/user/sayitright/s3/https%3a%2f%2ffdn.sayitright.be%2fthemes%2f50fc1e18f9caf705ff000001%2fimg%2fchannel.jpg/resize/fill/width/300/height/300/format.jpg" class="img-circle do-placeholder" /></a>';
						}
						str += '<h3><a href="http://'+data.request.host+item.path+'">'+item.title+'</a></h3>';
					str += '</div>';
				});

			str += '</div>';
		str += '</div>';
	}
	el.innerHTML = str;
	return el;
}

function embedTplFeaturedChannels(data){
	var str = '';
	if( typeof data.featured_channels !== 'undefined' ){
		str += '<section class="section-grey" id="featured-channels">';
			str += '<div class="container">';
				str += '<div class="featured-results">';
					str += '<h2 class="text-center clearfix">Channels <a href="http://'+data.request.host+'/channels/" class="btn btn-default pull-right">View All <span class="glyphicon glyphicon-chevron-right"></span></a></h2>';

					data.featured_channels.forEach(function(item){
						str += '<div class="featured-channel">';
							if( item.preview_url !== null ){
								str += '<a href="http://'+data.request.host+item.path+'"><img src="'+item.preview_url+'/resize/fill/width/300/height/300/format.jpg" class="img-circle" /></a>';
							} else {
								str += '<a href="http://'+data.request.host+item.path+'"><img data-width="300" data-height="300" src="http://idn.sayitright.com/user/sayitright/s3/https%3a%2f%2ffdn.sayitright.be%2fthemes%2f50fc1e18f9caf705ff000001%2fimg%2fchannel.jpg/resize/fill/width/300/height/300/format.jpg" class="img-circle do-placeholder" /></a>';
							}
							str += '<h3><a href="http://'+data.request.host+item.path+'">'+item.title+'</a></h3>';
						str += '</div>';
					});

				str += '</div>';
		str += '</div>';
	str += '</section>';
	}
	return str;
}

function embedTplChannelsEl(data, tag){
	var el = document.createElement(tag);
	el.setAttribute('class', 'section-grey');
	el.setAttribute('id', 'featured-channels');

	var str = '';
	if( typeof data.channels.channel !== 'undefined' ){
		str += '<div class="container">';
			str += '<div class="featured-results">';
				str += '<h2 class="text-center clearfix">Channels <a href="http://'+data.request.host+'/channels/" class="btn btn-default pull-right">View All <span class="glyphicon glyphicon-chevron-right"></span></a></h2>';

				data.channels.channel.forEach(function(item){
					str += '<div class="featured-channel">';
						if( item.preview_url !== null ){
							str += '<a href="http://'+data.request.host+item.path+'"><img src="'+item.preview_url+'/resize/fill/width/300/height/300/format.jpg" class="img-circle" /></a>';
						} else {
							str += '<a href="http://'+data.request.host+item.path+'"><img data-width="300" data-height="300" src="http://idn.sayitright.com/user/sayitright/s3/https%3a%2f%2ffdn.sayitright.be%2fthemes%2f50fc1e18f9caf705ff000001%2fimg%2fchannel.jpg/resize/fill/width/300/height/300/format.jpg" class="img-circle do-placeholder" /></a>';
						}
						str += '<h3><a href="http://'+data.request.host+item.path+'">'+item.title+'</a></h3>';
					str += '</div>';
				});

			str += '</div>';
		str += '</div>';
	}
	el.innerHTML = str;
	return el;
}

function embedTplChannels(data){
	var str = '';
	if( typeof data.channels.channel !== 'undefined' ){
		str += '<section class="section-grey" id="featured-channels">';
			str += '<div class="container">';
				str += '<div class="featured-results">';
					str += '<h2 class="text-center clearfix">Channels <a href="http://'+data.request.host+'/channels/" class="btn btn-default pull-right">View All <span class="glyphicon glyphicon-chevron-right"></span></a></h2>';

					data.channels.channel.forEach(function(item){
						str += '<div class="featured-channel">';
							if( item.preview_url !== null ){
								str += '<a href="http://'+data.request.host+item.path+'"><img src="'+item.preview_url+'/resize/fill/width/300/height/300/format.jpg" class="img-circle" /></a>';
							} else {
								str += '<a href="http://'+data.request.host+item.path+'"><img data-width="300" data-height="300" src="http://idn.sayitright.com/user/sayitright/s3/https%3a%2f%2ffdn.sayitright.be%2fthemes%2f50fc1e18f9caf705ff000001%2fimg%2fchannel.jpg/resize/fill/width/300/height/300/format.jpg" class="img-circle do-placeholder" /></a>';
							}
							str += '<h3><a href="http://'+data.request.host+item.path+'">'+item.title+'</a></h3>';
						str += '</div>';
					});

				str += '</div>';
		str += '</div>';
	str += '</section>';
	}
	return str;
}


function embedTplChannelEl(data, tag){
	var el = document.createElement(tag);
	el.setAttribute('class', 'section-shadow');
	el.setAttribute('id', 'channel');

	var str = '';
	if( typeof data.channel !== 'undefined' && typeof data.programs !== 'undefined' ){
		str += '<div class="container">';
			str += '<h3>'+data.channel.title+' programs</h3>';
			str += '<div class="row search-results programs">';

				data.programs.program.forEach(function(item){
					str += '<div class="col-xs-12 col-sm-4">';
						str += '<div class="program-result">';
							if( item.preview_url !== null ){
								str += '<a class="result result-borderless" href="http://'+data.request.host+item.path+'"><img src="'+item.preview_url+'/resize/fill/width/480/height/270/format.jpg"></a>';
							} else {
								str += '<a class="result result-borderless" href="http://'+data.request.host+item.path+'"><img data-width="480" data-height="270" class="do-placeholder" src="http://idn.sayitright.com/user/sayitright/s3/https%3a%2f%2ffdn.sayitright.be%2fthemes%2f50fc1e18f9caf705ff000001%2fimg%2fprogram.jpg/resize/fill/width/480/height/270/format.jpg" /></a>';
							}
							str += '<div class="result-content">';
								if( typeof item.title !== 'undefined' )
									str += '<a href="'+item.path+'"><h4 class="text-clip">'+item.title+'</h4></a>';
								if( typeof item.description !== 'undefined' )
									str += '<p class="program-description">'+item.description+'</p>';
							str += '</div>';
						str += '</div>';
					str += '</div>';
				});

				if( typeof data.previous_page !== 'undefined' || typeof data.next_page !== 'undefined' ){
					str += '<div class="clearfix">';
						if( typeof data.previous_page !== 'undefined' )
							str += '<a href="'+data.previous_page+'" class="btn btn-default pull-left">&larr; Newer</a>';
						if( typeof data.previous_page !== 'undefined' )
							str += '<a href="'+data.previous_page+'" class="btn btn-default pull-right">Older &rarr;</a>';
					str += '</div>';
				}

			str += '</div>';
		str += '</div>';
	}
	el.innerHTML = str;
	return el;
}

function embedTplChannel(data){
	var str = '';
	if( typeof data.channel !== 'undefined' && typeof data.programs !== 'undefined' ){

		str += '<section class="section-shadow" id="channel">';
			str += '<div class="container">';
				str += '<h3>'+data.channel.title+' programs</h3>';
				str += '<div class="row search-results programs">';

					data.programs.program.forEach(function(item){
						str += '<div class="col-xs-12 col-sm-4">';
							str += '<div class="program-result">';
								if( item.preview_url !== null ){
									str += '<a class="result result-borderless" href="http://'+data.request.host+item.path+'"><img src="'+item.preview_url+'/resize/fill/width/480/height/270/format.jpg"></a>';
								} else {
									str += '<a class="result result-borderless" href="http://'+data.request.host+item.path+'"><img data-width="480" data-height="270" class="do-placeholder" src="http://idn.sayitright.com/user/sayitright/s3/https%3a%2f%2ffdn.sayitright.be%2fthemes%2f50fc1e18f9caf705ff000001%2fimg%2fprogram.jpg/resize/fill/width/480/height/270/format.jpg" /></a>';
								}
								str += '<div class="result-content">';
									if( typeof item.title !== 'undefined' )
										str += '<a href="'+item.path+'"><h4 class="text-clip">'+item.title+'</h4></a>';
									if( typeof item.description !== 'undefined' )
										str += '<p class="program-description">'+item.description+'</p>';
								str += '</div>';
							str += '</div>';
						str += '</div>';
					});

					if( typeof data.previous_page !== 'undefined' || typeof data.next_page !== 'undefined' ){
						str += '<div class="clearfix">';
							if( typeof data.previous_page !== 'undefined' )
								str += '<a href="'+data.previous_page+'" class="btn btn-default pull-left">&larr; Newer</a>';
							if( typeof data.previous_page !== 'undefined' )
								str += '<a href="'+data.previous_page+'" class="btn btn-default pull-right">Older &rarr;</a>';
						str += '</div>';
					}

			str += '</div>';
		str += '</div>';
	str += '</section>';

	}
	return str;
}

function embedTplProgramsEl(data, tag){
	var el = document.createElement(tag);
	el.setAttribute('class', 'section-shadow');

	var str = '';
	if( typeof data.programs !== 'undefined' ){
		str += '<div class="container">';

		if( typeof data.channel !== 'undefined' ){
			str += '<h3>'+data.channel.title+' programs</h3>';
		} else {
			if( typeof data.request.is_home !== 'undefined' ){
				str += '<h2 class="clearfix">Recent Programs<a href="http://'+data.request.host+'/programs/" class="pull-right btn btn-default">View All <span class="glyphicon glyphicon-chevron-right"></span></a></h2>';
			} else {
				if( typeof data.request.is_searches !== 'undefined' ){
					str += '<h2 class="clearfix">Search Results for: ';
					if( typeof data.request.query !== 'undefined' )
						str += '<em>'+data.search+'</em>';
					if( typeof data.programs.next_page !== '' )
						str += '<a href="'+data.programs.next_page+'" class="pull-right text-small">More <span class="glyphicon glyphicon-chevron-right"></span></a>';
					str += '</h2>';
				} else {
					str += '<h2 class="clearfix">Programs ';
					if( typeof data.programs.next_page !== '' )
						str += '<a href="'+data.programs.next_page+'" class="pull-right text-small">More <span class="glyphicon glyphicon-chevron-right"></span></a>';
					str += '</h2>';
				}
			}
		}

		str += '<div class="row search-results ';
		if( typeof data.request.is_searches === 'undefined' )
			str += 'programs';
		str += '">';

		if( typeof data.programs !== 'undefined' ){
			data.programs.program.forEach(function(item){
				if( typeof data.request.is_searches !== 'undefined' ){
					str += '<div class="program-search-result"><div class="result-content"><a href="http://'+data.request.host+item.path+'"><h4 class="text-clip">'+item.title+'</h4></a></div></div>';
				} else {
					str += '<div class="col-xs-12 col-sm-4"><div class="program-result">';
					if( typeof item.preview_url === 'string' ){
						str += '<a class="result result-borderless" href="http://'+data.request.host+item.path+'"><img src="'+item.preview_url+'/resize/fill/width/480/height/270/format.jpg"></a>';
					} else {
						str += '<a class="result result-borderless" href="http://'+data.request.host+item.path+'"><img data-width="480" data-height="270" class="do-placeholder" src="http://idn.sayitright.com/user/sayitright/s3/https%3a%2f%2ffdn.sayitright.be%2fthemes%2f50fc1e18f9caf705ff000001%2fimg%2fprogram.jpg/resize/fill/width/480/height/270/format.jpg" /></a>';
					}
							str += '<div class="result-content"><a href="http://'+data.request.host+item.path+'"><h4 class="text-clip">'+item.title+'</h4></a><p class="program-description">'+item.description+'</p></div>';
					str += '</div></div>';
				}
			});
		}

		str += '</div><div class="clearfix">';
				if( typeof data.previous_page !== 'undefined' )
					str += '<a href="'+data.previous_page+'" class="btn btn-default pull-left">&larr; Newer</a>';
				if( typeof data.next_page !== 'undefined' )
					str += '<a href="'+data.next_page+'" class="btn btn-default pull-right">Older &rarr;</a>';
			str += '</div>';

		str += '</div>';
	}
	el.innerHTML = str;
	return el;
}

function embedTplPrograms(data){
	var str = '';
	if( typeof data.programs !== 'undefined' ){
		str += '<section class="section-shadow"><div class="container">';

		if( typeof data.channel !== 'undefined' ){
			str += '<h3>'+data.channel.title+' programs</h3>';
		} else {
			if( typeof data.request.is_home !== 'undefined' ){
				str += '<h2 class="clearfix">Recent Programs<a href="http://'+data.request.host+'/programs/" class="pull-right btn btn-default">View All <span class="glyphicon glyphicon-chevron-right"></span></a></h2>';
			} else {
				if( typeof data.request.is_searches !== 'undefined' ){
					str += '<h2 class="clearfix">Search Results for: ';
					if( typeof data.request.query !== 'undefined' )
						str += '<em>'+data.search+'</em>';
					if( typeof data.programs.next_page !== '' )
						str += '<a href="'+data.programs.next_page+'" class="pull-right text-small">More <span class="glyphicon glyphicon-chevron-right"></span></a>';
					str += '</h2>';
				} else {
					str += '<h2 class="clearfix">Programs ';
					if( typeof data.programs.next_page !== '' )
						str += '<a href="'+data.programs.next_page+'" class="pull-right text-small">More <span class="glyphicon glyphicon-chevron-right"></span></a>';
					str += '</h2>';
				}
			}
		}

		str += '<div class="row search-results ';
		if( typeof data.request.is_searches === 'undefined' )
			str += 'programs';
		str += '">';

		if( typeof data.programs !== 'undefined' ){
			data.programs.program.forEach(function(item){
				if( typeof data.request.is_searches !== 'undefined' ){
					str += '<div class="program-search-result"><div class="result-content"><a href="http://'+data.request.host+item.path+'"><h4 class="text-clip">'+item.title+'</h4></a></div></div>';
				} else {
					str += '<div class="col-xs-12 col-sm-4"><div class="program-result">';
					if( typeof item.preview_url === 'string' ){
						str += '<a class="result result-borderless" href="http://'+data.request.host+item.path+'"><img src="'+item.preview_url+'/resize/fill/width/480/height/270/format.jpg"></a>';
					} else {
						str += '<a class="result result-borderless" href="http://'+data.request.host+item.path+'"><img data-width="480" data-height="270" class="do-placeholder" src="http://idn.sayitright.com/user/sayitright/s3/https%3a%2f%2ffdn.sayitright.be%2fthemes%2f50fc1e18f9caf705ff000001%2fimg%2fprogram.jpg/resize/fill/width/480/height/270/format.jpg" /></a>';
					}
							str += '<div class="result-content"><a href="http://'+data.request.host+item.path+'"><h4 class="text-clip">'+item.title+'</h4></a><p class="program-description">'+item.description+'</p></div>';
					str += '</div></div>';
				}
			});
		}

		str += '</div><div class="clearfix">';
				if( typeof data.previous_page !== 'undefined' )
					str += '<a href="'+data.previous_page+'" class="btn btn-default pull-left">&larr; Newer</a>';
				if( typeof data.next_page !== 'undefined' )
					str += '<a href="'+data.next_page+'" class="btn btn-default pull-right">Older &rarr;</a>';
			str += '</div>';

		str += '</div></section>';
	}

	return str;
}


function embedTplProgramSegmentsEl(data, tag){
	var el = document.createElement(tag);
	el.setAttribute('class', 'playlist-carousel');

	var str = '';
	if( typeof data.program !== 'undefined' ){

		if( typeof data.program.segments !== 'undefined' && data.program.segments.length > 0 ){
			str += '<div id="slider">';
				data.program.segments.forEach(function(item){

					if( typeof item.clip !== 'undefined' ){

						if( item.clip.kind === 'image' ){
							if( item.clip.image_url !== 'null' && item.clip.image_url !== '' ){
								
								str += '<div class="slide '+item.kind+'" rel="'+item.kind+'" ';
									str += 'data-clip-image="'+item.clip.image_url+'" ';

									if( typeof item.content !== 'undefined' )
										str += 'data-content="'+item.content+'" ';

									str += 'data-id="'+item.id+'">';
								str += '</div>';
							}

						} else if( item.clip.kind === 'video' ){
							if( typeof item.clip.video !== 'undefined' ){
								str += '<div class="slide '+item.kind+'" rel="'+item.kind+'" ';

									if( item.clip.image_url !== 'null' && item.clip.image_url !== '' )
										str += 'data-clip-image="'+item.clip.image_url+'" ';
									if( item.clip.width !== 'null' && item.clip.width !== '' )
										str += 'data-clip-width="'+item.clip.width+'" ';
									if( item.clip.height !== 'null' && item.clip.height !== '' )
										str += 'data-clip-height="'+item.clip.height+'" ';

									str += 'data-clip-video-hq_url="'+item.clip.video.hq_url+'" ';
									str += 'data-clip-video-sq_url="'+item.clip.video.sq_url+'" ';

									if( typeof item.content !== 'undefined' )
										str += 'data-content="'+item.content+'" ';

								str += 'data-id="'+item.id+'">';
								str += '</div>';
							}

						} else if( item.clip.kind === 'application' ){
							console.log('application');
						}

					} else if( typeof item.kind !== 'undefined' ){
						if( item.kind === 'external' ){ // Youtube etc
							str += '<div class="slide '+item.kind+'" rel="'+item.kind+'" ';

								str += 'data-embed="'+item.embed_url+'" ';
								str += 'data-embed-url="'+item.url+'" ';

								if( typeof item.content !== 'undefined' )
									str += 'data-content="'+item.content+'" ';

							str += 'data-id="'+item.id+'">';
							str += '</div>';
						}
					} else {
						console.log('unknown');
					}
				});
			str += '</div>';
			str += '<div id="prev"><i class="fa fa-angle-left"></i></div>';
			str += '<div id="next"><i class="fa fa-angle-right"></i></div>';
			// str += '<div id="down"><i class="fa fa-angle-down"></i></div>';
		}
	}
	el.innerHTML = str;
	return el;
}

function embedTplProgramSegments(data){
	var str = '';
	if( typeof data.program !== 'undefined' ){

		if( typeof data.program.segments !== 'undefined' && data.program.segments.length > 0 ){
			str += '<section class="playlist-carousel">';
				str += '<div id="slider">';
					data.program.segments.forEach(function(item){

						if( typeof item.clip !== 'undefined' ){

							if( item.clip.kind === 'image' ){
								if( item.clip.image_url !== 'null' && item.clip.image_url !== '' ){
									
									str += '<div class="slide '+item.kind+'" rel="'+item.kind+'" ';
										str += 'data-clip-image="'+item.clip.image_url+'" ';

										if( typeof item.content !== 'undefined' )
											str += 'data-content="'+item.content+'" ';

										str += 'data-id="'+item.id+'">';
									str += '</div>';
								}

							} else if( item.clip.kind === 'video' ){
								if( typeof item.clip.video !== 'undefined' ){
									str += '<div class="slide '+item.kind+'" rel="'+item.kind+'" ';

										if( item.clip.image_url !== 'null' && item.clip.image_url !== '' )
											str += 'data-clip-image="'+item.clip.image_url+'" ';
										if( item.clip.width !== 'null' && item.clip.width !== '' )
											str += 'data-clip-width="'+item.clip.width+'" ';
										if( item.clip.height !== 'null' && item.clip.height !== '' )
											str += 'data-clip-height="'+item.clip.height+'" ';

										str += 'data-clip-video-hq_url="'+item.clip.video.hq_url+'" ';
										str += 'data-clip-video-sq_url="'+item.clip.video.sq_url+'" ';

										if( typeof item.content !== 'undefined' )
											str += 'data-content="'+item.content+'" ';

									str += 'data-id="'+item.id+'">';
									str += '</div>';
								}

							} else if( item.clip.kind === 'application' ){
								console.log('application');
							}

						} else if( typeof item.kind !== 'undefined' ){
							if( item.kind === 'external' ){ // Youtube etc
								str += '<div class="slide '+item.kind+'" rel="'+item.kind+'" ';

									str += 'data-embed="'+item.embed_url+'" ';
									str += 'data-embed-url="'+item.url+'" ';

									if( typeof item.content !== 'undefined' )
										str += 'data-content="'+item.content+'" ';

								str += 'data-id="'+item.id+'">';
								str += '</div>';
							}
						} else {
							console.log('unknown');
						}
					});
				str += '</div>';
				str += '<div id="prev"><i class="fa fa-angle-left"></i></div>';
				str += '<div id="next"><i class="fa fa-angle-right"></i></div>';
				// str += '<div id="down"><i class="fa fa-angle-down"></i></div>';
			str += '</section>';
		}
	}
	return str;
}

function embedTplProgramEl(data, tag){
	var el = document.createElement(tag);
	el.setAttribute('class', 'program-body');

	var str = '';
	if( typeof data.program !== 'undefined' ){
		str += '<div class="container">';
			str += '<div class="row program-page">';
				str += '<div class="col-xs-12 col-sm-9">';
					str += '<h1 class="program-header">'+data.program.title+'</h1>';
					str += '<h6>Published by <a href="'+data.program.user.url+'">'+data.program.user.name+'</a> on <date>'+data.program.publish_at.full_date+'</date></h6>';
					str +='<hr>';
					if( data.program.tags.length > 0 )
						for (var i = 0; i <= data.program.tags.length - 1; i++) {
							str += '<div class="tags">'+data.program.tags[i]+'</div>';
						}
					str += '<div class="content">'+data.program.content+'</div>';
					str += '<hr>';
					str += '<p>Share on:</p>';
					str += '<div class="share-buttons">';
					str += '<a href="http://twitter.com/home?status='+data.program.title+' http://'+data.request.host+data.request.path+'" class="popup"><i class="fa fa-twitter"></i></a>';
						str += '<a href="http://www.facebook.com/sharer.php?s=100&amp;p[title]='+data.program.title+'&amp;p[url]=http://'+data.request.host+data.request.path+'" class="popup"><i class="fa fa-facebook"></i></a>';
						str += '<a href="https://plus.google.com/share?url='+data.program.title+' http://'+data.request.host+data.request.path+'" class="popup"><i class="fa fa-google-plus"></i></a>';
					str += '</div>';
				str += '</div>';
				str += '<aside class="col-xs-12 col-sm-3">';
					str += '<div class="site-info">';
						if( typeof data.site.icon_image_url !== 'undefined' ){
							str += '<div class="site-icon">';
							if( typeof data.site.url !== 'undefined' ){
								str += '<a href="'+data.site.url+'">';
							}
							str += '<img src="'+data.site.icon_image_url+'" />';
							if( typeof data.site.url !== 'undefined' ){
								str += '</a>';
							}
							str += '</div>';
						}
						if( typeof data.site.title !== 'undefined' ){
							str += '<div class="site-data">';
								str += '<h4>From <em>';
								if( typeof data.site.url !== 'undefined' ){
									str += '<a href="'+data.site.url+'">';
								}
								str += data.site.title;
								if( typeof data.site.url !== 'undefined' ){
									str += '</a>';
								}
								str += '</em></h4>';
							str += '</div>';
						}
					str += '</div>';
					str += '<div class="user-profile">';
						if( typeof data.program.user.avatar_image_url !== 'undefined' ){
							str += '<img src="'+data.program.user.avatar_image_url+'" />';
						}
						str += '<p>';
						if( typeof data.program.user.url !== 'undefined' ){
							str += '<a href="'+data.program.user.url+'">';
						}
						if( typeof data.program.user.name !== 'undefined' ){
							str += data.program.user.name;
						}
						if( typeof data.program.user.url !== 'undefined' ){
							str += '</a>';
						}
						if( typeof data.program.user.bio !== 'undefined' ){
							str += '<br />'+data.program.user.bio;
						}
						str += '</p>';
					str += '</div>';
					str += '<a href="http://'+data.request.host+'/channels/" class="btn btn-default"><span class="glyphicon glyphicon-chevron-left"></span> Back to Channels</a>';
				str += '</aside>';
			str += '</div>';
		str += '</div>';
	}
	el.innerHTML = str;
	return el;
}

function embedTplProgram(data){
	var str = '';
	if( typeof data.program !== 'undefined' ){
		str += '<section class="program-body">';
			str += '<div class="container">';
				str += '<div class="row program-page">';
					str += '<div class="col-xs-12 col-sm-9">';
						str += '<h1 class="program-header">'+data.program.title+'</h1>';
						str += '<h6>Published by <a href="'+data.program.user.url+'">'+data.program.user.name+'</a> on <date>'+data.program.publish_at.full_date+'</date></h6>';
						str +='<hr>';
						if( data.program.tags.length > 0 )
							for (var i = 0; i <= data.program.tags.length - 1; i++) {
								str += '<div class="tags">'+data.program.tags[i]+'</div>';
							}
						str += '<div class="content">'+data.program.content+'</div>';
						str += '<hr>';
						str += '<p>Share on:</p>';
						str += '<div class="share-buttons">';
						str += '<a href="http://twitter.com/home?status='+data.program.title+' http://'+data.request.host+data.request.path+'" class="popup"><i class="fa fa-twitter"></i></a>';
							str += '<a href="http://www.facebook.com/sharer.php?s=100&amp;p[title]='+data.program.title+'&amp;p[url]=http://'+data.request.host+data.request.path+'" class="popup"><i class="fa fa-facebook"></i></a>';
							str += '<a href="https://plus.google.com/share?url='+data.program.title+' http://'+data.request.host+data.request.path+'" class="popup"><i class="fa fa-google-plus"></i></a>';
						str += '</div>';
					str += '</div>';
					str += '<aside class="col-xs-12 col-sm-3">';
						str += '<div class="site-info">';
							if( typeof data.site.icon_image_url !== 'undefined' ){
								str += '<div class="site-icon">';
								if( typeof data.site.url !== 'undefined' ){
									str += '<a href="'+data.site.url+'">';
								}
								str += '<img src="'+data.site.icon_image_url+'" />';
								if( typeof data.site.url !== 'undefined' ){
									str += '</a>';
								}
								str += '</div>';
							}
							if( typeof data.site.title !== 'undefined' ){
								str += '<div class="site-data">';
									str += '<h4>From <em>';
									if( typeof data.site.url !== 'undefined' ){
										str += '<a href="'+data.site.url+'">';
									}
									str += data.site.title;
									if( typeof data.site.url !== 'undefined' ){
										str += '</a>';
									}
									str += '</em></h4>';
								str += '</div>';
							}
						str += '</div>';
						str += '<div class="user-profile">';
							if( typeof data.program.user.avatar_image_url !== 'undefined' ){
								str += '<img src="'+data.program.user.avatar_image_url+'" />';
							}
							str += '<p>';
							if( typeof data.program.user.url !== 'undefined' ){
								str += '<a href="'+data.program.user.url+'">';
							}
							if( typeof data.program.user.name !== 'undefined' ){
								str += data.program.user.name;
							}
							if( typeof data.program.user.url !== 'undefined' ){
								str += '</a>';
							}
							if( typeof data.program.user.bio !== 'undefined' ){
								str += '<br />'+data.program.user.bio;
							}
							str += '</p>';
						str += '</div>';
						str += '<a href="http://'+data.request.host+'/channels/" class="btn btn-default"><span class="glyphicon glyphicon-chevron-left"></span> Back to Channels</a>';
					str += '</aside>';
				str += '</div>';
			str += '</div>';
		str += '</section>';

	}
	return str;
}

function embedTplPageEl(data, tag){
	var el = document.createElement(tag);

	var str = '';
	if( typeof data.page !== 'undefined' ){
		str += '<div class="container">';
			str += '<div class="row">';
				str += '<div class="col-xs-12">';
					if( typeof data.page.content !== 'undefined' && data.page.content !== '' ){
						str += Lib.stripScripts(data.page.content); // Remove js
					} else {
						str += '<h3 style="text-align:center;margin-top:50px;">Nothing found</h3>';
					}
				str += '</div>';
			str += '</div>';
		str += '</div>';
	}
	el.innerHTML = str;
	return el;
}

function embedTplPage(data){
	var str = '';
	if( typeof data.page !== 'undefined' ){
		str += '<section>';
			str += '<div class="container">';
				str += '<div class="row">';
					str += '<div class="col-xs-12">';
						if( typeof data.page.content !== 'undefined' && data.page.content !== '' ){
							str += Lib.stripScripts(data.page.content); // Remove js
						} else {
							str += '<h3 style="text-align:center;margin-top:50px;">Nothing found</h3>';
						}
					str += '</div>';
				str += '</div>';
			str += '</div>';
		str += '</section>';
	}
	return	str;
}

function embedTplTooltipEl(str, dir){
	var el = document.createElement('div');
	el.setAttribute('class', 'sir-tooltip tooltip-'+dir);
	el.innerHTML = str;
	return el;
}

function embedTplTooltip(str, dir){
	return '<div class="sir-tooltip tooltip-'+dir+'">'+str+'</div>';
}