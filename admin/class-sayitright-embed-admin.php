<?php
/**
 * The core plugin class.
 *
 * This is used to define internationalization, dashboard-specific hooks, and
 * public-facing site hooks.
 *
 * @since      0.0.1
 * @package    Sayitright_Embed_Admin
 * @author     Ryan Whitlie <hello@mooschmedia.com>
 */
if( !class_exists('Sayitright_Embed_Admin') )
{
	class Sayitright_Embed_Admin
	{

		/**
		 * The unique identifier of this plugin.
		 *
		 * @since    0.0.1
		 * @access   protected
		 * @var      string    $sayitright_embed    The string used to uniquely identify this plugin.
		 */
		protected $sayitright_embed;

		/**
		 * The current version of the plugin.
		 *
		 * @since    0.0.1
		 * @access   protected
		 * @var      string    $version    The current version of the plugin.
		 */
		protected $version;

		/**
		 * Define the core functionality of the plugin.
		 *
		 * Set the plugin name and the plugin version that can be used throughout the plugin.
		 * Load the dependencies, define the locale, and set the hooks for the Dashboard and
		 * the public-facing side of the site.
		 *
		 * @since    0.0.1
		 */
		function __construct()
		{
			$this->sayitright_embed = 'sayitright-embed';
			$this->version = '0.0.1';

			if ( !RIDWPAISWP30 ) {
				add_action('admin_notices', array(&$this, 'require_wpversion_message'));
				return;
			}

			register_activation_hook(__FILE__, array(&$this, 'on_activate'));

			add_action( 'init', array( &$this, 'init' ) );
		}

		/**
		 * Load all required public scripts
		 *
		 * @since    0.0.1
		 */
		function init()
		{
			if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) )
			{
				return;
			}

			if ( get_user_option( 'rich_editing' ) == 'true' )
			{
				add_filter( 'mce_external_plugins', array( &$this, 'sayitright_shortcodes_plugin' ) );
				add_filter( 'mce_buttons', array( &$this,'sayitright_shortcodes_register' ) );
			}
		}

		/**
		 * Adds the plugin's default settings
		 *
		 * @since 0.0.1
		 */
		function default_settings() {
			if( !get_option("sayitright_embed_version") ) {
				add_option("sayitright_embed_version", SAYITRIGHT_EMBED_VERSION);
			}
			if( get_option("sayitright_embed_version") != SAYITRIGHT_EMBED_VERSION ) {
				update_option("sayitright_embed_version", SAYITRIGHT_EMBED_VERSION);
			}
		}

		function sayitright_shortcodes_plugin( $plugin_array )
		{
			if ( floatval( get_bloginfo( 'version' ) ) >= 3.9 )
			{
				$tinymce_js = SAYITRIGHT_EMBED_URI . 'assets/js/sir.tinymce.js';
			} else {
				$tinymce_js = SAYITRIGHT_EMBED_URI . 'assets/js/sir.tinymce.legacy.js';
			}
			$plugin_array['sayitright_embed'] = $tinymce_js;
			return $plugin_array;
		}

		function sayitright_shortcodes_register( $buttons )
		{
			array_push( $buttons, 'sayitright_embed_button' );
			return $buttons;
		}

		/**
	 	* Checks for the version of WordPress,
	 	* and adds a message to inform the user
	 	* if required WP version is less than 3.0
	 	*
	 	* @since 		0.0.1
	 	*/
		function require_wpversion_message() {
			echo "<div class='error fade'><p>" . __("<strong>SayitRight Embed</strong> 0.0.1 and above require at least WordPress 3.0! If you're still using a WP version prior to 3.0, please consider updating to the latest WP version for your own safety!", 'sir-embed') . "</p></div>";
		}

	}
}
