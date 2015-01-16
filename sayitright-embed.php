<?php
/**
 * Sayitright Embed plugin file
 *
 * @link              http://wp.mooschmedia.com/plugins/sayitright-embed/
 * @since             0.0.1
 * @package           Sayitright_Embed
 *
 * @wordpress-plugin
 * Plugin Name:       Sayitright Embed
 * Plugin URI:        http://wp.mooschmedia.com/plugins/sayitright-embed/
 * Description:       A plugin to embed stations, channels and programs from the SayitRight network.
 * Version:           0.0.2
 * Author:            Moosch Media Limited
 * Author URI:        http://mooschmedia.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       sayitright-embed
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) )
{
	die;
}

define( 'SAYITRIGHT_EMBED_VERSION', '0.0.2' );
/**
 * Define the global var SIREMBEDWP30, returning bool if WP 3.0 or higher is running
 */
define('SIREMBEDWP30', version_compare($GLOBALS['wp_version'], '2.9.999', '>'));

define( 'SAYITRIGHT_EMBED_NAME', 'sayitright-embed' );
define( 'SAYITRIGHT_EMBED_URL', dirname (__FILE__) . '/' );
define( 'SAYITRIGHT_EMBED_URI', plugins_url() . '/'.SAYITRIGHT_EMBED_NAME.'/' );

/**
 * The core plugin class that is used to define internationalization,
 * dashboard-specific hooks, and public-facing site hooks.
 */
require_once SAYITRIGHT_EMBED_URL . 'admin/class-sayitright-embed-admin.php';

require_once SAYITRIGHT_EMBED_URL . 'includes/class-sayitright-embed.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    0.0.1
 */
if ( class_exists('Sayitright_Embed_Admin') && is_admin() )
{
	$Sayitright_Embed_Admin = new Sayitright_Embed_Admin();
}

if ( class_exists('Sayitright_Embed') && !is_admin() )
{
	$Sayitright_Embed = new Sayitright_Embed();
}
