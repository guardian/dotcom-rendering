# Core development principles (lines in the sand)

## Non-critical scripts will not block rendering

Any script added to the website that is not critical to rendering must must not block first paint or cause a dramatic repaint. Such scripts should have an `async` or `defer` attribute, be loaded programmatically from within our application JavaScript, or be added at the bottom of the document body.
