=== Plugin Name ===
Contributors: (this should be a list of wordpress.org userid's)
Donate link: https://https://scerno.com/author/
Tags: comments, spam
Requires at least: 3.0.1
Tested up to: 3.4
Stable tag: 4.3
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Here is a short description of the plugin.  This should be no more than 150 characters.  No markup here.

== Description ==

This is the long description.  No limit, and you can use Markdown (as well as in the following sections).

For backwards compatibility, if this section is missing, the full length of the short description will be used, and
Markdown parsed.

A few notes about the sections above:

*   "Contributors" is a comma separated list of wp.org/wp-plugins.org usernames
*   "Tags" is a comma separated list of tags that apply to the plugin
*   "Requires at least" is the lowest version that the plugin will work on
*   "Tested up to" is the highest version that you've *successfully used to test the plugin*. Note that it might work on
higher versions... this is just the highest one you've verified.
*   Stable tag should indicate the Subversion "tag" of the latest stable version, or "trunk," if you use `/trunk/` for
stable.

    Note that the `readme.txt` of the stable tag is the one that is considered the defining one for the plugin, so
if the `/trunk/readme.txt` file says that the stable tag is `4.3`, then it is `/tags/4.3/readme.txt` that'll be used
for displaying information about the plugin.  In this situation, the only thing considered from the trunk `readme.txt`
is the stable tag pointer.  Thus, if you develop in trunk, you can update the trunk `readme.txt` to reflect changes in
your in-development version, without having that information incorrectly disclosed about the current stable version
that lacks those changes -- as long as the trunk's `readme.txt` points to the correct stable tag.

    If no stable tag is provided, it is assumed that trunk is stable, but you should specify "trunk" if that's where
you put the stable version, in order to eliminate any doubt.

== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload `advanced-link-block.php` to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress
1. Place `<?php do_action('plugin_name_hook'); ?>` in your templates

== Frequently Asked Questions ==

= A question that someone might have =

An answer to that question.

= What about foo bar? =

Answer to foo bar dilemma.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

== Changelog ==

= 1.0 =
* A change since the previous version.
* Another change.

= 0.5 =
* List versions from most recent at top to oldest at bottom.

== Upgrade Notice ==

= 1.0 =
Upgrade notices describe the reason a user should upgrade.  No more than 300 characters.

= 0.5 =
This version fixes a security related bug.  Upgrade immediately.

== Arbitrary section ==

You may provide arbitrary sections, in the same format as the ones above.  This may be of use for extremely complicated
plugins where more information needs to be conveyed that doesn't fit into the categories of "description" or
"installation."  Arbitrary sections will be shown below the built-in sections outlined above.

== A brief Markdown Example ==

Ordered list:

1. Some feature
1. Another feature
1. Something else about the plugin

Unordered list:

* something
* something else
* third thing

Here's a link to [WordPress](http://wordpress.org/ "Your favorite software") and one to [Markdown's Syntax Documentation][markdown syntax].
Titles are optional, naturally.

[markdown syntax]: http://daringfireball.net/projects/markdown/syntax
            "Markdown is what the parser uses to process much of the readme file"

Markdown uses email style notation for blockquotes and I've been told:
> Asterisks for *emphasis*. Double it up  for **strong**.

`<?php code(); // goes in backticks ?>`








=== Advanced Link Block ===
Contributors: scerno
Donate link: https://scerno.com
Tags: block editor, gutenberg, anchor, link, download, phone, email, url, advanced,
Requires at least: 6.0
Tested up to: 6.5
Stable tag: trunk
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

= 1.1.0 =
* Initial release
* Supports all main link types: URL, Email, Phone, File, Raw
* Custom link attributes: target, rel, download
* File picker integration
* Frontend JS simulates anchor wrapping
* Custom display and cursor styles

== Upgrade Notice ==

= 1.1.0 =
Initial public release. Enables advanced link options in Gutenberg.