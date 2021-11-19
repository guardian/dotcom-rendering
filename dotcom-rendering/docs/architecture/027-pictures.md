# Pictures in DCR

This document outlines how (and why) pictures in DCR work the way they do. A lot of methodology comes from Frontend, however DCR didn't immediately have parity with Frontend for image/picture rendering, and it has been built on over time to improve it.

The overall goal of image rendering to ensure that we serve the correct resolution image to the user in all cases. This can involve looking at things like the page & image layout, as well as client properties like DPR.

## Background Info

This background info section aims to give enough information for anyone who hasn't worked a lot with picture or source elements, or source sets. Feel free to skip it if you like!

DCR uses the html `<picture>` tag to render images. This offers us a advantage over regular `<img>` tags, and that is the use of `<source>` elements to further help the browser understand what size & quality image to download, saving our users bandwidth & us money.

### Fastly Image Optimiser

They key enabler in this is the [fastly image optimiser](https://developer.fastly.com/reference/io/). This allows us to specify image widths when requesting an image URL. for example for a given image, say `https://i.guim.co.uk/img/media/xxxxx/yyy.jpg`, we are able to specify some important image transformation properties: `width`, `quality` & `dpr` (& others).

-   `width` allows us to specify the width of the image in pixels.
-   `quality` allows us to specify how much to compress the image, 0 being very compressed, and 100 preserving the best quality possible.
-   `dpr` or Device Pixel Ratio allows us to scale the size of the image by this number, for example using `?width=300&dpr=2` would return a 600px wide image.

#### Media queries (`media="query"`)

Within any given `<picture>` tag, you can have multiple `<source>` child elements. Using the `media` html attribute, which uses the same syntax as CSS media queries, you can tell the browser which `<source>` element to look for an image source in.

For example `<source media="min-width: 600px">` would tell the browser to pick this source if the viewport is 600px or wider.

The browser will choose and stick with the first matching source element it finds, so it's important to ensure they're in the DOM in the right order.

Another important media queries we use is (`(orientation: portrait)`) to check if it's a portrait device (e.g a smartphone).

#### Sizes (`sizes=`)

The sizes html attribute acts as the translation layer between the size of the viewport and the size of the image source you'd like to pick. A good way to think about this is that, beyond a certain width, main media (inline) images never go beyond `620px` wide, and this html attribute gives us a way to communicate that to the browser.

For example `<source sizes="(min-width: 660px) 620px, 100vw">` tells the browser, "Hey, if your viewport is 660px or wider, always look for an image source which is 620px wide. If not, default to an image which is the same width as 100% of the viewport width". We can provide as many sizes & queries as we want, with the `(query) px, (query) px, ... , px)` syntax, where the last argument without a query is the default if none others match.

#### Source Set (`srcset=`)

Source sets work as our final piece of the puzzle. Our browser has already picked a `source` element, and has used `sizes` to figure out what size (in width only) image it is looking for. Our source set allows us to provide a list of URLs & the width of the image for each one, which the browser will then use to look for the best fitting image from.

Source sets are formatted like: `<source srcset="https://url.to/image 300w, https://url.to/larger/image 600w">` Our comma separated list of sources specifies first the URL to a given image source, then the width (where `w` is, from what I can tell just `px`) for that image. In our case where we use fastly image optimiser, the only thing changing between these image urls is in the query parameters, e.g `?width=300` and `?width=600`.

### What is DPR?

DPR originates from the concept that the pixel widths which we use for CSS media queries is often different from the actual resolution of a devices display.

For example imagine a phone with a super high resolution 1200px wide (2400px high) screen. Following our breakpoint sizes, we'd try and render a desktop type experience for this user. However, the reality is this screen is only maybe 5 inches across, so the site would be totally unusable.

CSS Pixels & DPR to the rescue! Our browser can use a different width for calculating breakpoints, media queries, etc than the real resolution of the screen. This is CSS pixels. So let's say for the sake of argument the browser uses 300px for our CSS pixel width - Wohoo, we're displaying a mobile experience, all is well. The DPR is the ratio between CSS pixels and actual resolution, so 1200 / 300 gives us a DPR of 4. Why this is important will be discussed later.

## What does DCR do?

DCR's History of Images:

1. Use Picture tag instead of Img [#2214](https://github.com/guardian/dotcom-rendering/pull/2214)
2. Solving the DPR Problem [#3641](https://github.com/guardian/dotcom-rendering/pull/3641)
