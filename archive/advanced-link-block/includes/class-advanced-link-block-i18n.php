<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://https://scerno.com/author
 * @since      1.0.0
 *
 * @package    Advanced_Link_Block
 * @subpackage Advanced_Link_Block/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Advanced_Link_Block
 * @subpackage Advanced_Link_Block/includes
 * @author     Scerno Visualise Ltd <info@scerno.com>
 */
class Advanced_Link_Block_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'advanced-link-block',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
