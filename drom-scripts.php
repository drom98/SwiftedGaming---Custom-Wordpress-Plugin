<?php
/**
 * Plugin Name: drom scripts
 * Plugin URI: 
 * Description: My custom scripts
 * Version: 1.0.0
 * Author: Diogo Oliveira
 * Author URI: https://github.com/drom98
 * License: GPL2
 */

//Create submenu entry
/*
function dromPluginMenu(){
  add_menu_page('drom Plugin', 'drom Plugin', 'manage_options', __FILE__, 'render_plugin_page', plugins_url('plugin_icon.png',__FILE__), 2);
}
add_action('admin_menu','dromPluginMenu');

function render_plugin_page() {
	include 'plugin_page.html';
}
*/
function importJavaScript() {
  wp_enqueue_script('main', plugins_url('/api/main.js',__FILE__));
  wp_localize_script('main', 'magicalData', array(
		'nonce' => wp_create_nonce('wp_rest'),
		'siteURL' => get_site_url()
	));
}
add_action('wp_enqueue_scripts', 'importJavaScript');

function my_custom_login() {
  wp_register_style('my_custom_login', plugins_url('/login/login-styles.css',__FILE__ ));
  wp_enqueue_style('my_custom_login');
}
add_action('login_head', 'my_custom_login');

function logo_url() {
  return get_bloginfo( 'url' );;
}
add_filter( 'login_headerurl', 'my_url' );

function my_login_logo_url_title() {
  return 'Made by @drom98';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );

function my_url() {
  ?>
  <p style="text-align: center; padding: 20px"><a href="https://github.com/drom98" style="color: rgba(0, 0, 0, 0.3); font-weight: bold; text-decoration: none">Developed by @drom98 | <?php echo date(" Y"); ?></a></p>
  </p>
<?php
}