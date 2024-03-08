// ==UserScript==
// @name     	PlansEditorToolbar
// @description	Bold, italic, date, hr, planlove, and link buttons and shortcuts for the Plans editor. Full-screen mode on mobile.
// @version  	1.6.1
// @match		https://grinnellplans.com/edit.php
// @match		https://www.grinnellplans.com/edit.php
// @supportURL	https://github.com/mrwweb/plans-editor-toolbar/issues/
// @source		https://github.com/mrwweb/plans-editor-toolbar/
// @author		[rootwile] aka Mark Root-Wiley
// @grant    	none
// ==/UserScript==

/* Known issue: You can't undo these. The common solution is to use execCommand which is now deprecated. So for now, I'm going to just not worry about this and see if anyone screams. */

function PlansEditorToolbar() {
    const icons = {
        bold: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M6 4v13h4.54c1.37 0 2.46-.33 3.26-1 .8-.66 1.2-1.58 1.2-2.77 0-.84-.17-1.51-.51-2.01s-.9-.85-1.67-1.03v-.09c.57-.1 1.02-.4 1.36-.9s.51-1.13.51-1.91c0-1.14-.39-1.98-1.17-2.5C12.75 4.26 11.5 4 9.78 4H6zm2.57 5.15V6.26h1.36c.73 0 1.27.11 1.61.32.34.22.51.58.51 1.07 0 .54-.16.92-.47 1.15s-.82.35-1.51.35h-1.5zm0 2.19h1.6c1.44 0 2.16.53 2.16 1.61 0 .6-.17 1.05-.51 1.34s-.86.43-1.57.43H8.57v-3.38z"/></svg>',
        italic: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M14.78 6h-2.13l-2.8 9h2.12l-.62 2H4.6l.62-2h2.14l2.8-9H8.03l.62-2h6.75z"/></svg>',
        link: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M17.74 2.76c1.68 1.69 1.68 4.41 0 6.1l-1.53 1.52c-1.12 1.12-2.7 1.47-4.14 1.09l2.62-2.61.76-.77.76-.76c.84-.84.84-2.2 0-3.04-.84-.85-2.2-.85-3.04 0l-.77.76-3.38 3.38c-.37-1.44-.02-3.02 1.1-4.14l1.52-1.53c1.69-1.68 4.42-1.68 6.1 0zM8.59 13.43l5.34-5.34c.42-.42.42-1.1 0-1.52-.44-.43-1.13-.39-1.53 0l-5.33 5.34c-.42.42-.42 1.1 0 1.52.44.43 1.13.39 1.52 0zm-.76 2.29l4.14-4.15c.38 1.44.03 3.02-1.09 4.14l-1.52 1.53c-1.69 1.68-4.41 1.68-6.1 0-1.68-1.68-1.68-4.42 0-6.1l1.53-1.52c1.12-1.12 2.7-1.47 4.14-1.1l-4.14 4.15c-.85.84-.85 2.2 0 3.05.84.84 2.2.84 3.04 0z"/></svg>',
        strike: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 100 100"><path fill="currentColor" d="M79.168 45.832H50A15.75 15.75 0 0 1 33.332 31.25 15.751 15.751 0 0 1 50 16.668 15.75 15.75 0 0 1 66.668 31.25a4.166 4.166 0 1 0 8.332 0 24.047 24.047 0 0 0-7.77-16.617A24.063 24.063 0 0 0 50 8.332a24.061 24.061 0 0 0-17.23 6.3A24.048 24.048 0 0 0 25 31.25a21.703 21.703 0 0 0 5.75 14.582h-9.917c-2.3 0-4.164 1.867-4.164 4.168s1.863 4.168 4.164 4.168H50A15.75 15.75 0 0 1 66.669 68.75 15.751 15.751 0 0 1 50 83.332 15.75 15.75 0 0 1 33.333 68.75a4.166 4.166 0 1 0-8.332 0 24.047 24.047 0 0 0 7.77 16.617 24.063 24.063 0 0 0 17.23 6.3 24.061 24.061 0 0 0 17.23-6.3A24.048 24.048 0 0 0 75 68.75a21.703 21.703 0 0 0-5.75-14.582h9.918c2.3 0 4.164-1.867 4.164-4.168s-1.863-4.168-4.164-4.168z"/></svg>',
        code: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M12 2l4 4v12H4V2h8zM9 13l-2-2 2-2-1-1-3 3 3 3zm3 1l3-3-3-3-1 1 2 2-2 2z"/></svg>',
        hr: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M4 9h12v2H4V9z"/></svg>',
        date: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M15 4h3v14H2V4h3V3c0-.83.67-1.5 1.5-1.5S8 2.17 8 3v1h4V3c0-.83.67-1.5 1.5-1.5S15 2.17 15 3v1zM6 3v2.5c0 .28.22.5.5.5s.5-.22.5-.5V3c0-.28-.22-.5-.5-.5S6 2.72 6 3zm7 0v2.5c0 .28.22.5.5.5s.5-.22.5-.5V3c0-.28-.22-.5-.5-.5s-.5.22-.5.5zm4 14V8H3v9h14zM7 16V9H5v7h2zm4 0V9H9v7h2zm4 0V9h-2v7h2z"/></svg>',
        close: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M15.75 6.75L18 3v14l-2.25-3.75L17 12h-4v4l1.25-1.25L18 17H2l3.75-2.25L7 16v-4H3l1.25 1.25L2 17V3l2.25 3.75L3 8h4V4L5.75 5.25 2 3h16l-3.75 2.25L13 4v4h4z"/></svg>',
        save: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M14.5 2H3.7C2.7 2 2 2.7 2 3.7v12.6c0 1 .7 1.7 1.7 1.7h12.6c1 0 1.7-.7 1.7-1.7V6l-3.5-4zM10 15.6a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zm2.7-7.5H4.3V4.2h8.4v4z"/></svg>',
        planLove:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M6 14H4V6h2V4H2v12h4M14 4v2h2v8h-2v2h4V4"/></svg>',
    };
    const styles = document.createElement('style');
    styles.innerHTML = `
.plans-editor-toolbar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-block-end: 0.5rem;
}
.plans-editor-toolbar button,
#editbox .submitinput {
    display: inline-flex;
    align-items: center;
    padding: .1875rem;
    gap: .25em;
    line-height: 1;
}
.plans-editor-toolbar svg,
#editbox .submitinput svg {
    width: 20px;
    height: 20px;
}
.plans-editor-button--close-editor {
    display: none !important;
}
@media( max-width: 40em ) {
    .plans-editor-focused {
        textarea {
            position: fixed;
            width: 100%;
            height: 100%;
            inset: var(--toolbar-height) 0 0 0;
            z-index: 999999;
        }
        .plans-editor-toolbar {
            position: fixed;
            inset-block-start: 0;
            inset-inline-start: 0;
            width: 100%;
            padding: .25rem;
            z-index: 1000000;
            background: currentColor;
        }
        .plans-editor-button--close-editor {
            display: inline-flex !important;
            margin-inline-start: auto;
            margin-inline-end: 0.5rem;
        }
        #editbox .submitinput {
            position: fixed;
            left: 50%;
            bottom: 10px;
            transform: translateX(-50%);
            z-index: 1000000;
        }
    }
}`;

    const editForm = document.getElementById('editbox');
    const submitButton = editForm.querySelector('.submitinput');
    const textarea = editForm.querySelector('textarea');
    const toolbar = document.createElement('div');
    toolbar.classList.add('plans-editor-toolbar');

    if (editForm !== null) {
        init();
    }

    /**
     * Creates the toolbar and buttons, inserts it before the textarea, and sets up the event listeners
     */
    function init() {
        createToolbarButton('Bold', 'bold', formatBold);
        createToolbarButton('Italic', 'italic', formatItalic);
        createToolbarButton('Link', 'link', insertLink);
        createToolbarButton('Plan Love', 'planLove', insertPlanLove);
        createToolbarButton('[date]', 'date', insertDate);
        createToolbarButton('Horizontal Rule', 'hr', insertHr);
        createToolbarButton('Close Editor', 'close', closeEditor);

        // add icon to save button and
        submitButton.innerHTML = icons.save + submitButton.innerHTML;

        // intercept paste for "link pasting" on selections
        textarea.addEventListener('paste', pasteLink);

        // add keyboard shortcuts, all with CTRL
        textarea.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch (e.key) {
                    case 'b':
                        e.preventDefault();
                        formatBold(e);
                        break;
                    case 'i':
                        e.preventDefault();
                        formatItalic(e);
                        break;
                    case 'k':
                        e.preventDefault();
                        insertLink(e);
                        break;
                    case 'l':
                        e.preventDefault();
                        insertPlanLove(e);
                        break;
                    case 'd':
                        e.preventDefault();
                        insertDate();
                        break;
                    case 'h':
                        e.preventDefault();
                        insertHr();
                        break;
                    case 's':
                        e.preventDefault();
                        editForm.requestSubmit(submitButton);
                        break;
                }
            }
        });

        // handle editor focus and removing on submit focus
        textarea.addEventListener('focus', () => {
            document.body.classList.add('plans-editor-focused');
            textarea.style.setProperty(
                '--toolbar-height',
                `${toolbar.offsetHeight}px`
            );
        });
        submitButton.addEventListener('focus', () => {
            document.body.classList.remove('plans-editor-focused');
        });

        // insert styles and toolbar into the DOM
        textarea.parentElement.prepend(styles);
        textarea.parentElement.prepend(toolbar);
    }

    /**
     * Generates a button element with icon and event handler for use in the toolbar
     * @param {string} label The visible label for the button
     * @param {string} icon Icon key to use in the butto
     * @param {function} eventHandler Function to run on click
     */
    function createToolbarButton(label, icon, eventHandler) {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add(
            `plans-editor-button--${label.toLowerCase().replace(' ', '-')}`
        );
        button.setAttribute('aria-label', label);
        button.innerHTML = icons[icon];
        button.addEventListener('click', eventHandler);

        toolbar.appendChild(button);
    }

    /**
     * Insert a string of text into the editor in the cursor's position
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
        // get selection
        const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
        const selectedText = textarea.value.substring(start, end);

        // capture leading and trailing whitespace
        const leadingWhiteSpace = /^(\s*)/;
        const trailingWhiteSpace = /(\s*)$/;
        const matchLeading = selectedText.match(leadingWhiteSpace);
        const matchTrailing = selectedText.match(trailingWhiteSpace);

        // wrap the selected text with whitespace outside the opening and closing "tag"
        const wrappedText =
            matchLeading[0] +
            open +
            selectedText.trim() +
            close +
            matchTrailing[0];

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
                start +
                wrappedText.length -
                matchTrailing[0].length +
                cursorOffset; // offset is negative!
        }

        textarea.selectionEnd = cursorPos;
    }

    /**
     * Insert the link syntax, detecting if selected text is the URL or link text
     * @param {object} e event object
     */
    function insertLink(e) {
        const selectedText = getSelectedText();

        if (isUrl(selectedText.trim())) {
            wrapText('[', '|]', -1);
        } else {
            wrapText('[|', ']', selectedText.length ? 1 : 2);
        }
    }

    /**
     * Get selected text from the textarea
     * @returns {string}
     */
    function getSelectedText() {
        const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
        const selectedText = textarea.value.substring(start, end);
        return selectedText;
    }

    /**
     * When pasting a URL and text is selected, form a link
     * @param {object} e event object
     */
    function pasteLink(e) {
        // get clipboard text and textarea selection
        const clipBoardText = e.clipboardData.getData('text').trim();
        const selectedText = getSelectedText();

        if (isUrl(clipBoardText) && selectedText) {
            e.preventDefault();
            wrapText('[' + clipBoardText + '|', ']');
        }
    }

    /**
     * Wrap text with bold HTML tags
     * @param {object} e event object
     */
    function formatBold(e) {
        wrapText('<b>', '</b>');
    }

    /**
     * Wrap text with italic HTML tags
     * @param {object} e event object
     */
    function formatItalic(e) {
        wrapText('<i>', '</i>');
    }

    /**
     * Wrap text with square brackets
     * @param {object} e event object
     */
    function insertPlanLove(e) {
        wrapText('[', ']');
    }

    /**
     * Insert date shortcode
     */
    function insertDate() {
        insertText('[date]');
    }

    /**
     * Insert hr element
     */
    function insertHr() {
        insertText('<hr>');
    }

    /**
     * Close the editor and put focus on submit button
     */
    function closeEditor() {
        document.body.classList.remove('plans-editor-focused');
        submitButton.focus();
    }

    /**
     * Test if it's a URL. Not perfect, but it doesn't need to be
     * @param {string} string
     * @returns {boolean}
     */
    function isUrl(string) {
        return string.startsWith('http://') || string.startsWith('https://');
    }
}

PlansEditorToolbar();
