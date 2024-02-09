// ==UserScript==
// @name     	PlansEditorToolbar
// @description	Adds date, hr, bold, italic, and link buttons to the Plans editor for easier formatting (especially on mobile!)
// @version  	1.3.0
// @match		https://grinnellplans.com/*
// @downloadURL https://github.com/mrwweb/plans-editor-toolbar/raw/master/plans-editor-toolbar.user.js
// @updateURL 	https://github.com/mrwweb/plans-editor-toolbar/raw/master/plans-editor-toolbar.user.js
// @supportURL	https://github.com/mrwweb/plans-editor-toolbar/issues/
// @source		https://github.com/mrwweb/plans-editor-toolbar/
// @author		[rootwile] aka Mark Root-Wiley
// @grant    	none
// ==/UserScript==

/* Known issue: You can't undo these. The common solution is to use execCommand which is now deprecated. So for now, I'm going to just not worry about this and see if anyone screams. */

const icons = {
    bold: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 100 100"><path d="M71.25 46.918a21.782 21.782 0 0 0 7.86-15.445 21.78 21.78 0 0 0-5.895-16.297 21.78 21.78 0 0 0-15.922-6.844H20.832c-2.3 0-4.164 1.867-4.164 4.168s1.863 4.168 4.164 4.168H25v66.664h-4.168c-2.3 0-4.164 1.867-4.164 4.168s1.863 4.168 4.164 4.168h38.543A23.963 23.963 0 0 0 82.929 63.48 23.945 23.945 0 0 0 71.25 46.92zm-13.957-30.25c7.477 0 13.539 6.063 13.539 13.539 0 7.48-6.063 13.543-13.539 13.543H33.332V16.668zm2.082 66.668-26.043-.004v-31.25h26.043A15.627 15.627 0 0 1 72.906 75.52a15.619 15.619 0 0 1-13.531 7.812z"/></svg>',
    italic: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 100 100"><path d="M66.668 8.332h-12.5a4.17 4.17 0 0 0 0 8.336h.75l-18.5 66.664h-3.086c-2.3 0-4.164 1.867-4.164 4.168s1.863 4.168 4.164 4.168h12.5a4.17 4.17 0 0 0 0-8.336h-.75l18.5-66.664h3.086c2.3 0 4.164-1.867 4.164-4.168s-1.863-4.168-4.164-4.168z"/></svg>',
    link: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 100 100"><path d="M67.25 4.168A28.198 28.198 0 0 0 47.082 12.5L35.957 23.668a4.164 4.164 0 0 0 .418 5.305 4.163 4.163 0 0 0 5.293.57l11.125-11.125A19.952 19.952 0 0 1 67.25 12.5c5.371 0 10.52 2.133 14.32 5.93a20.26 20.26 0 0 1 5.93 14.32 19.96 19.96 0 0 1-5.957 14.293L70.457 58.332a4.19 4.19 0 0 0-1.453 3.004 4.181 4.181 0 0 0 1.218 3.109 4.154 4.154 0 0 0 3.106 1.215 4.153 4.153 0 0 0 3.004-1.453L87.5 52.957a28.194 28.194 0 0 0 8.332-20.207c-.008-7.578-3.024-14.84-8.383-20.2S74.828 4.177 67.25 4.169zM52.918 87.5l11.125-11.125a4.166 4.166 0 0 0-.348-5.379 4.166 4.166 0 0 0-5.363-.539L47.207 81.582A19.952 19.952 0 0 1 32.75 87.5a20.258 20.258 0 0 1-14.32-5.93 20.26 20.26 0 0 1-5.93-14.32 19.96 19.96 0 0 1 5.957-14.293l11.086-11.289a4.163 4.163 0 0 0-.57-5.293 4.164 4.164 0 0 0-5.305-.418L12.5 47.043A28.194 28.194 0 0 0 4.168 67.25c.008 7.578 3.024 14.84 8.383 20.2s12.621 8.374 20.2 8.382A28.198 28.198 0 0 0 52.917 87.5zM30.375 69.625a4.164 4.164 0 0 0 5.875 0l33.332-33.332a4.164 4.164 0 0 0-.219-5.656 4.164 4.164 0 0 0-5.656-.219L30.375 63.75a4.164 4.164 0 0 0 0 5.875z"/></svg>',
    strike: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 100 100"><path d="M79.168 45.832H50A15.75 15.75 0 0 1 33.332 31.25 15.751 15.751 0 0 1 50 16.668 15.75 15.75 0 0 1 66.668 31.25a4.166 4.166 0 1 0 8.332 0 24.047 24.047 0 0 0-7.77-16.617A24.063 24.063 0 0 0 50 8.332a24.061 24.061 0 0 0-17.23 6.3A24.048 24.048 0 0 0 25 31.25a21.703 21.703 0 0 0 5.75 14.582h-9.917c-2.3 0-4.164 1.867-4.164 4.168s1.863 4.168 4.164 4.168H50A15.75 15.75 0 0 1 66.669 68.75 15.751 15.751 0 0 1 50 83.332 15.75 15.75 0 0 1 33.333 68.75a4.166 4.166 0 1 0-8.332 0 24.047 24.047 0 0 0 7.77 16.617 24.063 24.063 0 0 0 17.23 6.3 24.061 24.061 0 0 0 17.23-6.3A24.048 24.048 0 0 0 75 68.75a21.703 21.703 0 0 0-5.75-14.582h9.918c2.3 0 4.164-1.867 4.164-4.168s-1.863-4.168-4.164-4.168z"/></svg>',
    code: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 100 100"><path d="m55.332 11.5-18.75 75a4.171 4.171 0 0 0 3.004 5.203 4.194 4.194 0 0 0 3.223-.52 4.184 4.184 0 0 0 1.859-2.683l18.75-75a4.171 4.171 0 0 0-3.004-5.203 4.194 4.194 0 0 0-3.223.52 4.184 4.184 0 0 0-1.859 2.683zM26.207 77.957a4.164 4.164 0 0 0 5.656-.219 4.163 4.163 0 0 0 .219-5.656L10.042 50l22.083-22.043a4.183 4.183 0 0 0 0-5.914 4.18 4.18 0 0 0-5.918 0l-25 25a4.17 4.17 0 0 0 0 5.875zm47.586-55.914a4.164 4.164 0 0 0-5.656.219 4.164 4.164 0 0 0-.219 5.656L89.958 50 67.913 72.043h.004a4.153 4.153 0 0 0-1.453 3.004 4.154 4.154 0 0 0 1.215 3.105 4.187 4.187 0 0 0 3.11 1.22 4.19 4.19 0 0 0 3.003-1.454l25-25a4.17 4.17 0 0 0 0-5.875z"/></svg>',
    hr: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 100 100"><path d="M87.5 54.168h-75a4.17 4.17 0 0 1 0-8.336h75a4.17 4.17 0 0 1 0 8.336z"/></svg>',
    date: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100"><path d="M88.398 13H84V8c0-1.7-1.301-3-3-3h-2c-1.602 0-3 1.3-3 3v5H24V8c0-1.7-1.301-3-3-3h-2c-1.602 0-3 1.3-3 3v5h-4.4C8 13 5 16.102 5 19.898V88c0 3.801 3 6.9 6.6 6.9h76.801c3.602 0 6.602-3.102 6.602-6.899L95 19.898C95 16.101 92 13 88.398 13zM87 21v13H13V21zM13 87V42h74v45zm15.3-37h-7.5a2.22 2.22 0 0 0-2.199 2.2v7.5c0 1.198 1 2.198 2.2 2.198h7.5c1.199 0 2.199-1 2.199-2.199v-7.5C30.5 51 29.5 50 28.3 50z"/></svg>',
};
const styles = document.createElement('style');
styles.innerHTML = `
.plans-editor-toolbar {
    display: flex;
    gap: 0.5em;
    margin-block-end: 0.5em;
}
.plans-editor-toolbar button {
    display: inline-flex;
    padding: .1875em;
    line-height: 1;
    font-family: monospace;
}
.plans-editor-toolbar svg {
    width: 18px;
    height: 18px;
}
`;

const textarea = document.getElementsByTagName('textarea')[0];
if (textarea !== undefined) {
    initToolbar();
}

/**
 * Creates the toolbar and buttons, inserts it before the textarea, and sets up the event listeners
 */
function initToolbar() {
    const toolbar = document.createElement('div');
    toolbar.classList.add('plans-editor-toolbar');

    const dateButton = buildaButton('[date]', 'date');
    const hrButton = buildaButton('Horizontal Rule', 'hr');
    const boldButton = buildaButton('Bold', 'bold');
    const italicButton = buildaButton('Italic', 'italic');
    const linkButton = buildaButton('Link', 'link');

    toolbar.appendChild(dateButton);
    toolbar.appendChild(hrButton);
    toolbar.appendChild(boldButton);
    toolbar.appendChild(italicButton);
    toolbar.appendChild(linkButton);

    dateButton.addEventListener('click', () => {
        insertText('[date]');
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
        insertLink();
    });

    textarea.parentElement.prepend(styles);
    textarea.parentElement.prepend(toolbar);
}

/**
 * Generates a button element with consistent styling and type for use in the toolbar. Like Build-a-Bear, but without the capitalism.
 *
 * @param {string} label The visible label for the button
 * @returns {element}
 */
function buildaButton(label, icon = false) {
    const button = document.createElement('button');
    button.type = 'button';
    if (icon) {
        button.setAttribute('aria-label', label);
        button.innerHTML = icons[icon];
    } else {
        button.innerHTML = label;
    }

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
 * @param {int} cursorOffset Number of characters after the start of the selection to place the cursor following the wrapping. Defaults to false, in which case the cursor is placed at the end of the wrapped text. If cursorPos is negative, then the cursor position is set relative to the end of the selection.
 */
function wrapText(open, close, cursorOffset = false) {
    // text selection and wrap it
    const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
    const selectedText = textarea.value.substring(start, end);
    const leadingWhiteSpace = /^(\s*)/;
    const trailingWhiteSpace = /(\s*)$/;
    const matchLeading = selectedText.match(leadingWhiteSpace);
    const matchTrailing = selectedText.match(trailingWhiteSpace);
    const wrappedText =
        matchLeading[0] + open + selectedText.trim() + close + matchTrailing[0];

    // update textarea and reset focus
    textarea.setRangeText(wrappedText, start, end, 'end');
    textarea.focus();

    // default cursor to end of selection
    let cursorPos = start + wrappedText.length;
    // If no selection, place cursor in between open and close
    if (start === end) {
        cursorPos = start + open.length;
    }
    // If there's an explicit position requested, that wins
    if (cursorOffset && cursorOffset >= 0) {
        cursorPos = start + cursorOffset;
    } else if (cursorOffset < 0) {
        cursorPos =
            start + wrappedText.length - matchTrailing[0].length + cursorOffset; // offset is negative!
    }

    textarea.selectionEnd = cursorPos;
}

/**
 * Insert the link syntax, detecting if selected text is the URL or link text
 */
function insertLink() {
    const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
    const selectedText = textarea.value.substring(start, end);

    if (selectedText.trim().startsWith('http')) {
        wrapText('[', '|]', -1);
    } else {
        wrapText('[|', ']', start === end ? 2 : 1);
    }
}
