<?php
/**
 * The core plugin class.
 *
 * This is used to define internationalization, dashboard-specific hooks, and
 * public-facing site hooks.
 *
 * @since      0.0.1
 * @package    Sayitright_Embed
 * @author     Ryan Whitlie <hello@mooschmedia.com>
 */
if( !class_exists('Sayitright_Embed') )
{
	class Sayitright_Embed
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

			$this->define_public_hooks();
			$this->define_shortcodes();

		}

		/**
		 * Load all required public scripts
		 *
		 * @since    0.0.1
		 * @access   private
		 */
		function enqueue_public_scripts()
		{
			/* Tools */
			wp_enqueue_script( 'sir-embed-tools', SAYITRIGHT_EMBED_URI . 'assets/js/sir.embed.tools.js', array(), NULL, true );
			/* Templating */
			wp_enqueue_script( 'sir-embed-templating', SAYITRIGHT_EMBED_URI . 'assets/js/sir.embed.templating.js', array(), NULL, true );
			/* Segments */
			wp_enqueue_script( 'sir-embed-segments', SAYITRIGHT_EMBED_URI . 'assets/js/sir.embed.segments.js', array(), NULL, true );
			/* Embed */
			wp_enqueue_script( 'sir-embed', SAYITRIGHT_EMBED_URI . 'assets/js/sir.embed.js', array(), NULL, true );
			/* Launcher */
			wp_enqueue_script( 'sir-embed-launcher', SAYITRIGHT_EMBED_URI . 'assets/js/sir.launcher.js', array(), NULL, true );
		}

		/**
		 * Load all required public stylesheets
		 *
		 * @since    0.0.1
		 * @access   private
		 */
		function enqueue_public_styles()
		{
			wp_enqueue_style( 'sir-embed-bootstrap', SAYITRIGHT_EMBED_URI . 'assets/css/sir-embed-bootstrap.css', NULL, NULL, 'all' );

			wp_enqueue_style( 'sir-embed-font-awesome', SAYITRIGHT_EMBED_URI . 'assets/css/sir-embed-font-awesome.css', NULL, NULL, 'all' );

			wp_enqueue_style( 'sir-embed', SAYITRIGHT_EMBED_URI . 'assets/css/sir-embed.css', NULL, NULL, 'all' );
		}

		/**
		 * Register all of the hooks related to the public-facing functionality
		 * of the plugin.
		 *
		 * @since    0.0.1
		 */
		function define_public_hooks()
		{
			add_action( 'wp_enqueue_scripts', array( &$this, 'enqueue_public_styles' ) );
			add_action( 'wp_enqueue_scripts', array( &$this, 'enqueue_public_scripts' ) );
		}

		/**
		 * Main Embed shortcode
		 *
		 * @since    0.0.1
		 */
		function sir_embed( $atts )
		{
			extract( shortcode_atts( array(
				'url' 		=> '',
				'width' 	=> '',
				'height' 	=> ''
			), $atts ) );
			return '<div class="sir-embed-item" data-url="'.$url.'" data-width="'.$width.'" data-height="'.$height.'"></div>';
		}

		/**
		 * Lightbox Embed shortcode
		 *
		 * @since    0.0.1
		 */
		function sir_lightbox( $atts, $content = null )
		{
			extract( shortcode_atts( array(
				'url' => ''
			), $atts ) );
			return '<div class="sir-lightbox-item" data-url="'.$url.'">'.do_shortcode($content).'</div>';
		}

		/**
		 * Launch Button shortcode
		 *
		 * @since    0.0.2
		 */
		function sir_launch_button( $atts )
		{
			extract( shortcode_atts( array(
				'size' 		=> 'medium',
				'text'		=> 'Launch'
			), $atts ) );
			switch ($size) {
				case 'small':
					$s = 'sm';
				break;
				case 'small':
					$s = 'md';
				break;
				case 'small':
					$s = 'lg';
				break;
				case 'small':
					$s = 'xl';
				break;
				default:
					$s = 'md';
				break;
			}
			return '<button class="sir-btn sir-btn-'.$s.'">'.$text.'</button>';
		}

		/**
		 * Define the shortcodes
		 *
		 * @since    0.0.1
		 */
		function define_shortcodes()
		{
			add_shortcode('sir-embed', array( &$this, 'sir_embed') );
			add_shortcode('sir-lightbox', array( &$this, 'sir_lightbox') );
			add_shortcode('sir-launch-button', array( &$this, 'sir_launch_button') );
		}

	}
}
