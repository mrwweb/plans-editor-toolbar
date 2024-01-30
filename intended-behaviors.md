# Intended Behaviors of the Editor

aka `tests.HUMANS`

Instead of writing tests or anything fancy for now, I'm just writing out the intended behaviors of the editor. This is probably sufficient for testing should I make any significant changes to the behavior.

## Bold and Italic

- With no selection: Inserts the open and close tags and puts the cursor inside the tags.
- With selection: Wraps selected text in HTML tags and places cursor at end of the closing tag.

## Link Button

Plans link syntax: `[{URL}|{text}]`

- With no selection: Inserts the characters `[|]` and places the cursor between the pipe and the closing bracket (expecting link text).
- With selection: Detects if the selected text is a link. Places the selected text in the appropriate position and places the cursor in the other position.

## `[date]` and `<hr>`

- With no selection: Inserts the tag and places the cursor at the end of the tag.
- With selection (not sure why you would do this): Place the tag at the start of the selection and leave the selection selected.
- Note: The `[date]` tag is expected to include a trailing space. The `<hr>` tag is not.
