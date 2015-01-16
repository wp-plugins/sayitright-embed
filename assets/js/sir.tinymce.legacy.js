// =============================================================================
// JS/TINYMCE-LEGACY.JS
// -----------------------------------------------------------------------------
// v0.0.2 TinyMCE specific functions.
// =============================================================================

(function() {
	tinymce.create('tinymce.plugins.sayitRightEmbedMce', {

		init : function(ed, url){
			tinymce.plugins.sayitRightEmbedMce.theurl = url;
		},

		createControl : function(btn, e) {
			if ( btn == 'sayitright_embed_button' ) {
				var a   = this;
				btn = e.createSplitButton('sayitright_embed_button', {
					title: 'Insert Shortcode',
					image: tinymce.plugins.sayitRightEmbedMce.theurl + '/sayitright-embed.png',
					icons: false,
				});

				btn.onRenderMenu.add(function (c, b) {


					//
					// Embeds.
					//
					c = b.addMenu({title:'Embeds'});

					a.render( c, 'Simple Embed', 'sir-embed' );

					//
					// Lightboxes.
					//
					c = b.addMenu({title:'Lightboxes'});

					a.render( c, 'Simple Lightbox', 'sir-lightbox' );

					//
					// Buttons.
					//
					c = b.addMenu({title:'Buttons'});

					a.render( c, 'Launch Button', 'sir-launch-button' );

				});
				return btn;
			}
			return null;
		},

		render : function(ed, title, id) {
			ed.add({
				title: title,
				onclick: function () {


					//
					// Embeds.
					//

					if(id === 'sir-embed') {
						tinyMCE.activeEditor.selection.setContent('[sir-embed url="www.station-domain.com..." width="800" height="450"]');
					}

					//
					// Lightboxes.
					//
					if(id === 'sir-lightbox') {
						tinyMCE.activeEditor.selection.setContent('[sir-lightbox url="www.station-domain.com..."]...[/sir-lightbox]');
					}

					//
					// Buttons.
					//
					if(id === 'sir-launch-button') {
						tinyMCE.activeEditor.selection.setContent('[sir-launch-button text="..."]');
					}

					return false;

				}
			});
		}
	
	});

	tinymce.PluginManager.add('sayitright_embed', tinymce.plugins.sayitRightEmbedMce);

})();