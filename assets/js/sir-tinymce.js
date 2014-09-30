// =============================================================================
// JS/TINYMCE.JS
// -----------------------------------------------------------------------------
// v0.0.2 TinyMCE specific functions.
// =============================================================================

(function() {

	tinymce.PluginManager.add('sayitright_embed', function(editor, url) {
 
		editor.addButton('sayitright_embed_button', {

			type  : 'menubutton',
			title : 'Sayitright – Embed',
			text  : '',
			image : url + '/sayitright-embed.png',
			style : 'background-image: url("' + url + '/sayitright-embed.png' + '"); background-repeat: no-repeat; background-position: 2px 2px;"',
			icon  : true,
			menu  : [

				{ text : 'Embeds',
					menu : [
						{ text : 'Simple Embed', onclick: function(){ editor.insertContent('[sir-embed url="www.station-domain.com..." width="800" height="450"]'); } }
					]
				},

				{ text : 'Lightboxes',
					menu : [
						{ text : 'Simple Lightbox', onclick: function() { editor.insertContent('[sir-lightbox url="www.station-domain.com..."]...[/sir-lightbox]'); } }
					]
				},

				{ text : 'Buttons',
					menu : [
						{ text : 'Launch Button', onclick: function() { editor.insertContent('[sir-launch-button text="..."]'); } }
					]
				}

			]

		});

	});

})();