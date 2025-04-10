<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://scerno.com/author
 * @since             1.0.0
 * @package           Advanced_Link_Block
 *
 * @wordpress-plugin
 * Plugin Name:       Advanced Link Block
 * Plugin URI:        https://scerno.com
 * Description:       Turn any existing block into a clickable link in Gutenberg, with advanced options and features including downloading, open in new tab, phone numbers, emails and more.
 * Version:           1.1.0
 * Author:            Scerno Visualise Ltd
 * Author URI:        https://scerno.com/author/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       advanced-link-block
 * Domain Path:       /languages
 */


defined( 'ABSPATH' ) || exit;

// Run the main function to register the block
function advanced_link_block_register_block() {
	register_block_type( __DIR__ . '/blocks/advanced-link' );
}
add_action( 'init', 'advanced_link_block_register_block' );

/**
 * Add a frontend script to make links clickable.
 * Gutenberg / WP doesnt allow putting normal 
 * blocks inside <a> tags so we have to simulate
 * link behaviour using js.
 
 
 */
 
function advanced_link_block_enqueue_frontend_script() {
	if (is_admin()) return; // Only load on the frontend

	wp_enqueue_script(
		'advanced-link-block-frontend',
		plugins_url( 'blocks/advanced-link/advanced-link.js', __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks/advanced-link/advanced-link.js' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'advanced_link_block_enqueue_frontend_script' );


