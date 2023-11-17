# Track user behaviour

_Note, the key library here - `tracker-js` is not well-documented at the time of
writing, but the hope is that this will improve soon._

## Track clicks:

-   add a data-link-name attribute to your component and the `ophan-tracking.js`
    script will automatically send click data to Ophan.

The code that does this is
[here](https://github.com/guardian/ophan/blob/75b86abcce07369c8998521399327d436246c016/tracker-js/assets/coffee/ophan/click-path-capture.coffee)
if you're interested in seeing the nitty gritty.

## Track anything else

Have a look at
[tracker-js](https://github.com/guardian/ophan/tree/master/tracker-js/assets/coffee/ophan)
as there are a few existing helpers which you can use. For example, the
`data-component` attribute can be used to track attention time.

Unfortunately, this library is not properly documented (yet) so it may be
easiest to ask around to find out what is available.

If `tracker-js` doesn't do what you need, you can fire your own Ophan events
using the helpers in `ophan.ts`.
