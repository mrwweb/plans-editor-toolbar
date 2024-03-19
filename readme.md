# Plans Editor Toolbar

v1.7.0 ([Changelog](#changelog))

[GrinnellPlans](https://grinnellplans.com) can be a little easier to use—especialy for new users or those without physical keyboards—with a simple toolbar for formatting text.

## Features

This script adds a toolbar with the following features:

- Formatting buttons for bold and italic
- Button to make links that smartly detects selected text to help you
- [Magic link pasting](#magic-link-pasting)
- Button to insert planlove brackets `[]` or wrap selected text in brackets
- Buttons to insert the `[date]` shortcode and `<hr>` tag
- [Keyboard shortcuts for all features!](#shortcuts)
- Full screen editor on mobile for _astoundingly_ better usability on your phone

### Magic link pasting

Link pasting feels like magic if you've never used it before. To make a link with link pasting:

1. Copy a URL to your clipboard
2. Select the text that should be the link
3. Paste (right-click > Paste or `Ctrl`/`Cmd` + `v`)
4. Result `[{clipboard link}|{selected text}]`

### Shortcuts

When your cursor is in the plan editor, you can use the following shortcuts:

| Shortcut      | Action                |
|-------------- |---------------------- |
| `Ctrl` + `b`  | Bold                  |
| `Ctrl` + `i`  | Italic                |
| `Ctrl` + `k`  | Make/Insert link      |
| `Ctrl` + `l`  | Make/Insert planlove  |
| `Ctrl` + `d`  | Insert `[date]`       |
| `Ctrl` + `h`  | Insert `<hr>`         |
| `Ctrl` + `s`  | Save plan             |

## Installation

The editor feature is installed as a custom UserScript, just like [NewLove](https://github.com/grinnellplans/Newlove) and [PlansPlus](https://github.com/niqjohnson/PlansPlus).

### Step 1: Install a userscript browser add-on

All browsers can use the Tampermonkey browser extension, a cross-browser successor to Greasemonkey. Firefox users can also use [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).

- [Firefox Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- [Chrome Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Edge Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- [Safari Tampermonkey](https://apps.apple.com/us/app/tampermonkey/id1482490089)

### Step 2: Open the userscript file to install it

[Open the toolbar script.](https://github.com/mrwweb/plans-editor-toolbar/raw/main/plans-editor-toolbar.user.js) A box should show up asking you if you want to install the script.

## Upgrading

Tampermonkey is known to stuggle with updates. You can always manually upgrade a script by [opening the toolbar script again](https://github.com/mrwweb/plans-editor-toolbar/raw/main/plans-editor-toolbar.user.js).

## Known Issues and Limitations

- It might be cool if the link button acted a little more like a builder/prompt to help people remember the format. Again, wouldn't be that hard to add if people want it. See: #2
- Undo / Redo doesn't work for toolbar actions. It could be added if enough people run into problems. See: #4

## Changelog

### v1.7.0 (March 17, 2024)

- Prevent plan loss! Warn you before closing the browser tab if you unsaved changes to your plan.
- Add new help button with popup documentation for all features of the editor

### v1.6.1 (March 8, 2024)

- Fix shortcuts so browser doesn't respond to them.

### v1.6.0 (March 3, 2024)

- [Magic link pasting!](#magic-link-pasting)
- [Shortcuts](#shortcuts) for `[date]` and `<hr>`
- Add new `@match` userscript rule so this works regardless of `www` in URL.
- Refactor code into more reusable functions and remove some unnecessary checks and `preventDefault()`s. Encapsulate code in function to avoid interferance with other scripts.

### v1.5.0 (February 28, 2024)

- New Editor fullscreen mode when editing on phones! (Added close button when editor is in fullscreen mode)
- New button to insert planlove brackets (e.g., "[]")
- `Ctrl` + `s` will now save your plan
- Reordered toolbar buttons to put formatting buttons first
- "Change Plan" button aka save button gets a fun disk icon
- Roll back previous change that tried to target all editors. Only apply to the main Plan text editor for now (not notes, secrets)

### v1.4.1 (February 21, 2024)

- Set SVG fill to `currentColor` to improve stylesheet compatibility

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

- [GrinnellPlans Source on Github](https://github.com/grinnellplans/)
- Editor icons from [Dashicons](https://github.com/WordPress/dashicons/)
- [Save icon](https://thenounproject.com/icon/save-1050704/) from Noun Project (downloaded from licensed account)

## Other Plans Userscripts

- [PlansPlus](https://github.com/niqjohnson/PlansPlus)
- [NewLove](https://github.com/grinnellplans/Newlove)
