# Known Issues

## Technical Issues

Loading behavior is unrefined - Besides it being a simple "loading..." <p> element, sometimes the loading element will display for a bit while the recipe card elements are already displayed. Haven't figured out why yet.

Since the client side issues are checked first, the errors for the recipe form are displayed in an order that is unintuitive, for example, if leaves all of the "information" section blank, an error saying that "servings cannot be blank"

## Visual Issues

The ingredients box extends to the same minimum length as the cook time/prep time/servings box, if there are fewer ingredients than it takes to fill that in, they fill from the bottom first, leaving a lot of whitespace between the ingredients title and the first ingredient, can probably be fixed by tweaking either the min height of the flexbox or the alignment of the items within the flexbox.
