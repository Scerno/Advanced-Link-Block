=== Advanced Link Block ===
Contributors: scernoltd
Donate link: https://scerno.com
Tags: block editor, gutenberg, anchor, link, download
Requires at least: 6.0
Tested up to: 6.8
Stable tag: 1.3.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Turn any block into a clickable link in the Gutenberg editor, with advanced options like phone, email, download, and more.

== Description ==

Advanced Link Block gives you powerful control over anchor (`<a>`) links in the Gutenberg block editor.  
It allows you to wrap any blocks — such as paragraphs, buttons, or images — inside a clickable link block.

**Features include:**

* Choose from various link types: standard URL, Email, Phone, File, or Raw
* Dynamically show relevant options for each type
* Add link attributes like `target`, `rel`, and `download`
* Use the WordPress media picker to insert file links
* Apply custom cursor styles and display behavior (block, contents, flex)
* Frontend click logic simulates real anchor wrapping (bypassing Gutenberg limitations)

This plugin is ideal for users who want cleaner, more accessible link wrappers and advanced control over how links behave — all directly within the Gutenberg editor.

== Installation ==

1. Upload the plugin folder to `/wp-content/plugins/` or install via the WordPress Plugin Directory
2. Activate the plugin via **Plugins > Installed Plugins**
3. Go to the block editor, search for “Advanced Link”, and insert the block
4. Drop other blocks inside it, and configure the link options in the sidebar

== Frequently Asked Questions ==

= Can I nest any block inside this link block? =

Yes — you can nest any type of block, but for legal and technical reasons the link itself is simulated using JavaScript. That means it works visually and functionally, but you can’t always rely on raw HTML serialization.

= Can I nest multiple blocks inside this one? =

Yes absolutely - the block becomes a mini editor, allowing you to add more then one block which will flow similar to the rest of your page.  You can add visual clarity by adding groups, grid and other organisation blocks inside the editor.

= Does it work with buttons and images? =

Yes! In fact, this is a perfect way to link button blocks to downloadable files, phone numbers, email addresses and more.

= What if I select the wrong link type? =

We allow saving even if a field is incomplete or a setting is mismatched — you'll just see a friendly warning.

= Is this accessible? =

Yes, the plugin uses standard HTML5 `<a>` tags and simulates wrapping behavior without breaking accessibility. Keyboard interaction can be enhanced via script updates if needed.

== Screenshots ==

1. Add the “Advanced Link” block in the editor using the slash command or block inserter.
2. A faint dotted outline shows you where the block is on the page — it disappears on the frontend.
3. Add multiple blocks inside the link block — such as grids, groups, and layout containers.
4. Add buttons and text inside, and edit the Advanced Link block using default WordPress controls.
5. Change the URL type, set link values, and choose target or rel attributes from the sidebar.
6. Pick local files from the Media Library using the file picker, and optionally force downloads.
7. Change the default display and cursor styling to better match your theme layout and behavior.

== Changelog ==

= 1.2.0 =
* Initial release
* Supports all main link types: URL, Email, Phone, File, Raw
* Custom link attributes: target, rel, download
* File picker integration
* Frontend JS simulates anchor wrapping
* Custom display and cursor styles

= 1.3.0 =
* Added support for middle click
* Added right click support
* Added a Behaviours option to allow user to select how they want the link to functional
* Added JS fallback behaviour for extra robustness
* Added options notest to clarify the impact of different options


