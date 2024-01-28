// ==UserScript==
// @name     	PlansEditorToolbar
// @description	Adds date, hr, bold, italic, and link buttons to the Plans editor for easier formatting (especially on mobile!)
// @version  	1.0.0
// @include		https://grinnellplans.com/edit.php
// @downloadURL https://github.com/mrwweb/plans-editor-toolbar/raw/master/plans-editor-toolbar.user.js
// @updateURL 	https://github.com/mrwweb/plans-editor-toolbar/raw/master/plans-editor-toolbar.user.js
// @supportURL	https://github.com/mrwweb/plans-editor-toolbar/issues/
// @source		https://github.com/mrwweb/plans-editor-toolbar/
// @author		rootwile aka Mark Root-Wiley
// @grant    	none
// ==/UserScript==

/* Known issue: You can't undo these. The common solution is to use execCommand which is now deprecated. So for now, I'm going to just not worry about this and see if anyone screams. */

const textarea = document.getElementById("edit_textarea");
if (textarea !== null) {
	initToolbar();
}

function initToolbar() {
	const toolbar = document.createElement("div");
	toolbar.classList.add("toolbar");
	toolbar.style.marginBlockEnd = ".5em";
	toolbar.style.display = "flex";
	toolbar.style.gap = ".5em";

	const dateButton = buildaButton("[date]");
	const hrButton = buildaButton("<hr>");
	const boldButton = buildaButton("Bold");
	const italicButton = buildaButton("Italic");
	const linkButton = buildaButton("Link");

	toolbar.appendChild(dateButton);
	toolbar.appendChild(hrButton);
	toolbar.appendChild(boldButton);
	toolbar.appendChild(italicButton);
	toolbar.appendChild(linkButton);

	dateButton.addEventListener("click", () => {
		insertText("[date] ");
	});
	hrButton.addEventListener("click", () => {
		insertText("<hr>\n");
	});
	boldButton.addEventListener("click", () => {
		wrapText("<b>", "</b>");
	});
	italicButton.addEventListener("click", () => {
		wrapText("<i>", "</i>");
	});
	linkButton.addEventListener("click", () => {
		wrapText("[|", "]", 1);
	});

	textarea.parentElement.prepend(toolbar);
}

function buildaButton(label) {
	const button = document.createElement("button");
	button.innerText = label;
	button.type = "button";
	button.style.fontFamily = "monospace";

	return button;
}

function insertText(text) {
	const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
	console.log( start, end );
	textarea.setRangeText(text, start, start, "end");
	textarea.focus();
	textarea.selectionEnd = end + text.length;
}

function wrapText(open, close, posAfterStart = false) {
	const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
	selectedText = textarea.value.substring(start, end);
	wrappedText = open + selectedText + close;
	textarea.setRangeText(wrappedText, start, end, "end");
	textarea.focus();
	textarea.selectionEnd = posAfterStart
		? start + posAfterStart
		: end + wrappedText.length;
}
