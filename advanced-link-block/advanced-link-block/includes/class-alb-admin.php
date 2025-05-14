<?php
/**
 * Admin page & settings for Advanced Link Block
 */

if ( ! defined( 'ABSPATH' ) ) exit;

class ALB_Admin {

	/* ---------- 1. Init -------------------------------------------------- */
	public static function init() {
		add_action( 'admin_menu',              [ __CLASS__, 'add_menu' ] );
		add_action( 'admin_init',              [ __CLASS__, 'register_settings' ] );
		add_action( 'admin_post_alb_reset_defaults', [ __CLASS__, 'handle_reset_defaults' ] );
		add_action( 'admin_post_alb_reset_all',      [ __CLASS__, 'handle_reset_all' ] );
		add_action( 'enqueue_block_editor_assets',   [ __CLASS__, 'pass_defaults_to_editor' ] );
	}

	/* ---------- 2. Menu -------------------------------------------------- */
	public static function add_menu() {
		add_options_page(
			'Advanced Link Block',
			'Advanced Link Block',
			'manage_options',
			'advanced-link-block',
			[ __CLASS__, 'render_page' ]
		);
	}

	/* ---------- 3. Schema helpers --------------------------------------- */
	private static function get_schema_map() {
		static $map = null;
		if ( $map !== null ) return $map;

		$schema_path = plugin_dir_path( __FILE__ ) . '../build/albSchema.json';
		$schema      = wp_json_file_decode( $schema_path, [ 'associative' => true ] );

		$map = [];
		foreach ( $schema['sections'] as $sec ) {
			foreach ( $sec['fields'] as $attr_key => $field ) {
				$map[ $attr_key ] = $field;
			}
		}
		return $map;
	}

	/* ---------- 4. Register settings ------------------------------------ */
	public static function register_settings() {

		register_setting(
			'alb_options_group',
			'alb_options',
			[ 'type' => 'array', 'sanitize_callback' => [ __CLASS__, 'sanitize' ] ]
		);

		/* Defaults section header */
		add_settings_section(
			'alb_defaults',
			'Block Defaults',
			function() {
				echo '<p>Choose global defaults. Any block field left at “Default” inside the editor will inherit these values.</p>';
			},
			'advanced-link-block'
		);

		/* Dynamically add one <select> per dropdown field */
		$schema_map = self::get_schema_map();

		foreach ( $schema_map as $attr_key => $def ) {

			if ( $def['type'] !== 'dropdown' ) {
				continue;                       // only dropdowns for now
			}

			$choices = array_map(
				function( $c ) { return is_array( $c ) ? $c['label'] : $c; },
				$def['choices']
			);

			add_settings_field(
				$attr_key,
				esc_html( $def['label'] ),
				[ __CLASS__, 'render_dropdown' ],
				'advanced-link-block',
				'alb_defaults',
				[
					'key'     => $attr_key,
					'choices' => $choices
				]
			);
		}
	}

	/* ---------- 4a. Field renderer -------------------------------------- */
	public static function render_dropdown( $args ) {
		$opts    = get_option( 'alb_options', [] );
		$key     = $args['key'];
		$choices = $args['choices'];
		$current = isset( $opts[ $key ] ) ? $opts[ $key ] : 'default';

		echo '<select name="alb_options[' . esc_attr( $key ) . ']">';
		foreach ( $choices as $val => $label ) {
			printf(
				'<option value="%s"%s>%s</option>',
				esc_attr( $val ),
				selected( $current, $val, false ),
				esc_html( $label )
			);
		}
		echo '</select>';
	}

	/* ---------- 4b. Sanitizer ------------------------------------------- */
	public static function sanitize( $input ) {
		$schema  = self::get_schema_map();
		$output  = get_option( 'alb_options', [] );

		foreach ( $schema as $attr_key => $def ) {

			if ( $def['type'] !== 'dropdown' ) continue;

			$valid_choices = array_keys( $def['choices'] );

			if ( isset( $input[ $attr_key ] ) && in_array( $input[ $attr_key ], $valid_choices, true ) ) {
				$output[ $attr_key ] = $input[ $attr_key ];
			} else {
				unset( $output[ $attr_key ] ); // remove invalid or cleared value
			}
		}
		return $output;
	}

	/* ---------- 5. Reset handlers --------------------------------------- */
	public static function handle_reset_defaults() {
		check_admin_referer( 'alb_reset_defaults' );
		delete_option( 'alb_options' ); // remove overrides, fall back to schema defaults
		wp_redirect( wp_get_referer() ?: admin_url( 'options-general.php?page=advanced-link-block&reset=done' ) );
		exit;
	}

	public static function handle_reset_all() {
		check_admin_referer( 'alb_reset_all' );
		delete_option( 'alb_options' );
		wp_redirect( admin_url( 'options-general.php?page=advanced-link-block&reset=all' ) );
		exit;
	}

	/* ---------- 6. Pass defaults to editor ------------------------------ */
	public static function pass_defaults_to_editor() {
		$defaults = get_option( 'alb_options', [] );
		wp_add_inline_script(
			'advanced-link-block-editor',
			'window.AdvancedLinkBlockDefaults = ' . wp_json_encode( $defaults ) . ';',
			'before'
		);
	}

	/* ---------- 7. Settings page UI ------------------------------------- */
	public static function render_page() { ?>
		<div class="wrap">
			<h1>Advanced Link Block – Settings</h1>
			<form method="post" action="options.php">
				<?php
				settings_fields( 'alb_options_group' );
				do_settings_sections( 'advanced-link-block' );
				submit_button( 'Save Settings' );
				?>
			</form>

			<hr>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<?php wp_nonce_field( 'alb_reset_all' ); ?>
				<input type="hidden" name="action" value="alb_reset_all">
				<?php submit_button( 'Reset ALL Defaults', 'delete' ); ?>
			</form>

			<hr>
			<h2>Help &amp; Links</h2>
			<ul>
				<li><a href="https://scerno.com" target="_blank">Plugin documentation / support</a></li>
				<li><a href="https://github.com/Scerno/Advanced-Link-Block/issues" target="_blank">Report an issue on GitHub</a></li>
			</ul>
		</div>
	<?php }

} // class

ALB_Admin::init();
