# Plans Editor Toolbar

v1.4.0

Plans might be a little easier to use—especialy for new users or those without physical keyboards—if there was a toolbar to quickly access common formatting options.

This script adds a toolbar with the following features:

- Insert the [date] shortcode
- Insert the `<hr>` tag to make a horizontal rule
- Wrap selected text in bold or italic
- Insert the link syntax `[|]` - OR - wrap selected text inside a link, e.g. `[|{text selection}]`

## Installation

This script can be installed as a UserScript just like [the _legendary_ NewLove script](https://github.com/grinnellplans/Newlove).

### Step 1: Install browser add-on

All browsers can use the Tampermonkey browser extension, a cross-browser successor to Greasemonkey.

**All other browsers**: Install the Tampermonkey browser extension in:

- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- [Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089)

**Firefox with Greasemonkey**: If you are already using the [Greasemonkey browser extension](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/), this script will also work with that and you don't need to install Tampermonkey.

### Step 2: Open the script file to install

[Open the toolbar script.](https://github.com/mrwweb/plans-editor-toolbar/raw/main/plans-editor-toolbar.user.js) A box should show up asking you if you want to install the script.

## Known Issues and Limitations

- There's no support for keyboard shortcuts. I can  add this it this catches on.
- It might be cool if the link button acted a little more like a builder/prompt to help people remember the format. Again, wouldn't be that hard to add if people want it.
- Undo / Redo doesn't work for toolbar actions. It could be added if enough people run into problems.

## Changelog

### v1.4.0 (February 8, 2024)

- Use icons for buttons to make it slicker and more editor-like
- New shortcuts! `CTRL` + `B`, `CTRL` + `I`, and `CTRL` + `K` for bold, italic, and link, respectively
- Add GPV3 license now that I'm using Dashicons icons from the WordPress project

### v1.3.0 (January 31, 2024)

- Switch @includes to @match for better Tampermonkey support
- Run on ALL plans pages, not just the editor
- Select the first `textarea` on every page (#5)

### v1.2.0 (January 31, 2024)

- Put leading and trailing whitespace in selections outside of wrapped text (bold, italic, links). (#7)
- Place cursor inside bold/italic/link buttons if no text is selected (#6)
- Detect whether selected text is a link and place selection accordingly when making a link (#1), props to [marcouke] for the nudge on this one

### v1.1.0 (January 28, 2024)

- Remove newline following `<hr>` tag. That was too opinionated. (Good excuse to test Tampermonkey updates)
- Add CONTRIBUTING.md and this changelog section

### v1.0.0 (January 27, 2024)

- Initial release

## Credits

Mark Root-Wiley ([rootwile])

## Open Source

- Editor icons from [Dashicons](https://github.com/WordPress/dashicons/)
