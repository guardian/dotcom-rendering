# Lightbox 💡

Lightbox is an overlay that appears above the page to showcase image content.

https://github.com/guardian/dotcom-rendering/pull/7129

## Useful links

The [frontend version of lightbox](https://github.com/guardian/frontend/blob/main/static/src/javascripts/projects/common/modules/gallery/lightbox.js) works in a similar way and was used as the basis for DCR's version

Frontend's lightbox was added to the Guardian's website in 2014. [The PR to add this](https://github.com/guardian/frontend/pull/5934) has a lot of useful information in it.

## Features

### Parity with Frontend

-   History navigation closes lightbox
-   Permalinks to images
-   Traps focus
-   Optimises image loading
-   Images are scaled to the viewport

### New in DCR

-   Native scrolling
-   Defers hydration
-   Fullscreen API
-   Deduplicates images
-   Links to posts in liveblogs
-   Remembers display preferences for caption

## How it gets hydrated

On the server, we only insert a small amount of html and zero javascript. This html can be found in LightboxLayout. On the client hydration is trigged when the page url contains a hash that martches an expected pattern, namely, `img-[n]`. Using the `deferUntil='hash'` feature of Islands, we only execute the Lightbox javascript at the point the url changes and lightbox is requested.

## How it works

### The url is the source of truth

Lightbox works by using the url as the source of truth. If and when the url contains a hash in the form `img-[n]` then hydration is triggered (if it hasn't already happened) and the lightbox is opened. As soon as the url does not contain this hash, the lightbox is closed.

You open and close the lightbox by changing the url. When a reader clicks the 'close' button inside the lightbox there is some javascript that fires the `history.back()` function. Manually editing the url or pressing the back button in the browser is therefor identical to clicking 'close'.

### `LightboxLink`

This file is used on the server to co er each article image with an <a> tag. No javascript is used here, only platform features and css.

If the image is clicked the a tag captured this and mutates the url to add a hash in the form `img-[n]`. This triggers hydration based on the `deferUntil='hash'` island.

### `LightboxLayout`

On the server, we only render the basic furniture for the lightbox. Enough for us to be able to open the lightbox, fill the screen and show any controls. But this html does not include any images and is not hydrated.

### `LightboxImages`

We don't want to render the html for all of the images on the server because the size of the html produced by the Picture component is considerable. So instead we break this html out into a separate file and dynamically insert it into the dom during hydration.

We use React.createPortal to insert the resulting html from the `LightboxImages` component into a placeholder that exists inside `LightboxLayout`. This placeholder is called `ul#lightbox-images`.

### `LightboxCaption`

Captions in lightbox have sufficient deviation in style to have their own component.

### `LightboxHash.importable`

This small file is placed in an `Island` inside `ArticlePage` and executed immediately. It is not deferred.

It does one thing. It checks to see if the page load is happening with a url that already containd a lightbox hash. If it does, it handles an edge case by mutating history state. Normally, the lightbox hash is introduced to the url by clicking an image but maybe the reader refreshed the page or perhaps they were sent a link with a hash on it.

What is the edge case?
Because we use the url as the source of truth for lightbox it means we close the lightbox by using `history.back`. This works fine when the reader started on an article and then clicked an image because it means the place they go 'back' to is the article url without the hash. But if you directly load a url with a hash already on it then the place you will go 'back' to is probably a blank page (or just where you were when you entered the url).

The fix here is to mutate the history state by adding a new entry so that when `history.back()` gets fired the reader ends up on the article.

### `LightboxJavascript.importable`

This file contains the logic for how lightbox operates.

The React aspect of this file is small. It immediately returns a call to React.createPortal to insert the `LightboxImages` html and then executes a useEffect to run the `initialiseLightbox` function.

Both of these calls only happen once. There is no react state to trigger re-renders and the Islands archetecure prevents hydration repeating using the `data-island-status` flag. This flag is set at the end of the `initialiseLightbox` function.

#### `initialiseLightbox`

This file sets a series of event listeners and when these are triggered it runs functions. The listeners are:

`scroll`
When the list of images is scrolled to a new position, either manually or by clicking the pervious/next buttons, then there is a new image being shown so we:

-   Update the visual indication showing which image is selected
-   Edit the url hash to point to this new `img-[position]`
-   Start to eager load any adjacent images

`popstate`
When the reader clicks back or forward, the popstate event is fired. This can happen when the lightbox is open or closed. When it does we either open or close the lightbox based on if it has an `img-[n]` hash or not.

`change` (FullscreenAPI)
This event is fired when fullscreen mode changes. This can either be because it opened or closed. This listener check if it is closing and if it is, it closes the lightbox.

We do this because it is possible to exit fullscreen mode independently of the lightbox code.

`load`
An `<img>` tag will fire this 'load' event when the image that it depends on has been downloaded. We use this event to remove the loading screen that we render over each image (`LightboxLoader`)

`click` or `mousedown`
There are four controls on lightbox which respond to click or mousedown events.

-   close - Closes the lightbox by calling `history.back()`
-   next - Navigates inside the lightbox using `scrollTo()`, you can also just manually scroll, it's the same
-   previous - Navigates inside the lightbox using `scrollTo()`, you can also just manually scroll, it's the same
-   toggle info - Show / Hide the info `aside` element

The next and previous actions trigger the `scroll` event.

`keypress`
We capture a series of key presses and use them as shortcuts for other actions within the lightbox. These are better documented in the code.

### `LightboxLoader`

Returns a div that shows an animated loader above each lightbox image. This loader is removed if the `img.complete` state is true or when the `load` event is fired for an image.

This prevents an empty screen showing for readers on slower connections.

## Next steps

Add the ability to render all images from a liveblog and all images from a series.
See: https://github.com/guardian/frontend/pull/20462
