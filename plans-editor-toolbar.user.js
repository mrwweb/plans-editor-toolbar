// ==UserScript==
// @name     	PlansEditorToolbar
// @description	Adds date, hr, bold, italic, and link buttons to the Plans editor for easier formatting (especially on mobile!)
// @version  	1.1.0
// @include		https://grinnellplans.com/edit.php
// @downloadURL https://github.com/mrwweb/plans-editor-toolbar/raw/master/plans-editor-toolbar.user.js
// @updateURL 	https://github.com/mrwweb/plans-editor-toolbar/raw/master/plans-editor-toolbar.user.js
// @supportURL	https://github.com/mrwweb/plans-editor-toolbar/issues/
// @source		https://github.com/mrwweb/plans-editor-toolbar/
// @author		[rootwile] aka Mark Root-Wiley
// @grant    	none
// ==/UserScript==

/* Known issue: You can't undo these. The common solution is to use execCommand which is now deprecated. So for now, I'm going to just not worry about this and see if anyone screams. */

const textarea = document.getElementById('edit_textarea');
if (textarea !== null) {
    initToolbar();
}

/**
 * Creates the toolbar and buttons, inserts it before the textarea, and sets up the event listeners
 */
function initToolbar() {
    const toolbar = document.createElement('div');
    toolbar.classList.add('toolbar');
    toolbar.style.marginBlockEnd = '.5em';
    toolbar.style.display = 'flex';
    toolbar.style.gap = '.5em';

    const dateButton = buildaButton('[date]');
    const hrButton = buildaButton('<hr>');
    const boldButton = buildaButton('Bold');
    const italicButton = buildaButton('Italic');
    const linkButton = buildaButton('Link');

    toolbar.appendChild(dateButton);
    toolbar.appendChild(hrButton);
    toolbar.appendChild(boldButton);
    toolbar.appendChild(italicButton);
    toolbar.appendChild(linkButton);

    dateButton.addEventListener('click', () => {
        insertText('[date] ');
    });
    hrButton.addEventListener('click', () => {
        insertText('<hr>');
    });
    boldButton.addEventListener('click', () => {
        wrapText('<b>', '</b>');
    });
    italicButton.addEventListener('click', () => {
        wrapText('<i>', '</i>');
    });
    linkButton.addEventListener('click', () => {
        wrapText('[|', ']', 1);
    });

    textarea.parentElement.prepend(toolbar);
}

/**
 * Generates a button element with consistent styling and type for use in the toolbar. Like Build-a-Bear, but without the capitalism.
 *
 * @param {string} label The visible label for the button
 * @returns {element}
 */
function buildaButton(label) {
    const button = document.createElement('button');
    button.innerText = label;
    button.type = 'button';
    button.style.fontFamily = 'monospace';

    return button;
}

/**
 * Insert a string of text into the editor in the cursor's position
 *
 * @param {string} text
 */
function insertText(text) {
    const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
    textarea.setRangeText(text, start, start, 'end');
    textarea.focus();
    textarea.selectionEnd = end + text.length;
}

/**
 * Wrap selected text with text and optionally set final cursor position
 *
 * @param {string} open The opening text to wrap, e.g. <b>
 * @param {string} close The closing text to wrap, e.g. </b>
 * @param {int} posAfterStart Number of characters after the start of the selection to place the cursor following the wrapping. Defaults to false, in which case the cursor is placed at the end of the wrapped text.
 */
function wrapText(open, close, posAfterStart = false) {
    const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
    const selectedText = textarea.value.substring(start, end);
    const wrappedText = open + selectedText + close;
    textarea.setRangeText(wrappedText, start, end, 'end');
    textarea.focus();
    textarea.selectionEnd = posAfterStart
        ? start + posAfterStart
        : start + wrappedText.length;
}
