# Pictures in DCR

This document outlines how (and why) pictures in DCR work the way they do. A lot of methodology comes from Frontend, however DCR didn't immediately have parity with Frontend for image/picture rendering, and it has been built on over time to improve it.

The overall goal of the picture rendering to ensure that we serve the correct resolution image to the user in all cases. This can involve looking at things like the page & image layout, as well as client properties like DPR.

## Background Info

This background info section aims to give enough information for anyone who hasn't worked a lot with picture or source elements, or source sets. Feel free to skip it if you like!

DCR uses the html `<picture>` tag to render images. This offers us a advantage over regular `<img>` tags, and that is the use of `<source>` elements to further help the browser understand what size & quality image to download, saving our users bandwidth & us money.

### Fastly Image Optimiser

They key enabler in this is the [fastly image optimiser](https://developer.fastly.com/reference/io/). This allows us to specify image widths when requesting an image URL. for example for a given image, say `https://i.guim.co.uk/img/media/xxxxx/yyy.jpg`, we are able to specify some important image transformation properties: `width`, `quality` & `dpr` (& others).

-   `width` allows us to specify the width of the image in pixels.
-   `quality` allows us to specify how much to compress the image, 0 being very compressed, and 100 preserving the best quality possible.
-   `dpr` or Device Pixel Ratio allows us to scale the size of the image by this number, for example using `?width=300&dpr=2` would return a 600px wide image.

### Media queries (`media="query"`)

Within any given `<picture>` tag, you can have multiple `<source>` child elements. Using the `media` html attribute, which uses the same syntax as CSS media queries, you can tell the browser which `<source>` element to look for an image source in.

For example `<source media="min-width: 600px">` would tell the browser to pick this source if the viewport is 600px or wider.

The browser will choose and stick with the first matching source element it finds, so it's important to ensure they're in the DOM in the right order.

Another important media queries we use is (`(orientation: portrait)`) to check if it's a portrait device (e.g a smartphone).

### Sizes (`sizes=`)

The sizes html attribute acts as the translation layer between the size of the viewport and the size of the image source you'd like to pick. A good way to think about this is that, beyond a certain width, main media (inline) images never go beyond `620px` wide, and this html attribute gives us a way to communicate that to the browser.

For example `<source sizes="(min-width: 660px) 620px, 100vw">` tells the browser, "Hey, if your viewport is 660px or wider, always look for an image source which is 620px wide. If not, default to an image which is the same width as 100% of the viewport width". We can provide as many sizes & queries as we want, with the `(query) px, (query) px, ... , px)` syntax, where the last argument without a query is the default if none others match.

### Source Set (`srcset=`)

Source sets work as our final piece of the puzzle. Our browser has already picked a `source` element, and has used `sizes` to figure out what size (in width only) image it is looking for. Our source set allows us to provide a list of URLs & the width of the image for each one, which the browser will then use to look for the best fitting image from.

Source sets are formatted like: `<source srcset="https://url.to/image 300w, https://url.to/larger/image 600w">` Our comma separated list of sources specifies first the URL to a given image source, then the real pixel width for that image. The unit `w` is used, to distinguish pixels inside the image from CCS `px` on the screen–there are many pixels per CSS `px` on high DPI screens. In our case where we use Fastly image optimiser, the only thing changing between these image urls is in the query parameters, e.g `?dpr=2` or `?width=300` and `?width=600`.

### DPR?!

DPR originates from the concept that the pixel widths which we use for CSS media queries is often different from the actual resolution of a devices display.
For example imagine a phone with a super high resolution 1200px wide (2400px high) screen. Following our breakpoint sizes, we'd try and render a desktop type experience for this user. However, the reality is this screen is only maybe 5 inches across, so the site would be totally unusable.

CSS Pixels & DPR to the rescue! Our browser can use a different width for calculating breakpoints, media queries, etc than the real resolution of the screen. This is CSS pixels. So let's say for the sake of argument the browser uses 300px for our CSS pixel width - Wohoo, we're displaying a mobile experience, all is well. The DPR is the ratio between CSS pixels and actual resolution, so 1200 / 300 gives us a DPR of 4. Why this is important will be discussed later.

#### The DPR Problem

This problem comes from how the browser tries to compensate for high DPR displays when choosing an image source. In previous iterations of Frontend & DCR, we provided only 2 sources - a regular set, and a set of sources for high DPR displays; targeted with a media query to ensure it's picked.

Unfortunately the browser itself would try to compensate for high DPR as well, but in a less efficient way. Once the browser had figured out what size source it wants from the `sizes` attribute on our source element, it's then multiplied by the DPR of the display to get the desired width it will look for in our `srcset`:

```
# desiredWidth is the width of an image that the browser will look for in `srcset`
# size is the chosen size based off our queries in the `sizes` attribute
# DPR is the ration between CSS Pixels & device resolution (e.g 2, 3, 4)
desiredWidth = size * DPR
```

This posed a problem for us, because if we tell the browser "Hey choose a 620px image", and the browser has a DPR of say 3, it will actually look for an image source for 1860px, far higher resolution than is needed for the user to have a good experience.

#### The DPR Solution

This problem was first solved in Frontend, then replicated in DCR

Rather than having just 2 source elements, we instead have 2 source elements per breakpoint (one for high DPR, one for regular displays), and provide just one size & source set for that source element.

Lets look at a simplified example (with only 1 source per breakpoint):

```html
<picture>
	<source
		media="min-width: 980px"
		srcset="https://xxx.png?width=620px 620w"
	/>
	<source
		media="min-width: 660px"
		srcset="https://xxx.png?width=620px 620w"
	/>
	<source
		media="min-width: 480px"
		srcset="https://xxx.png?width=480px 480w"
	/>
	<source
		media="min-width: 375px"
		srcset="https://xxx.png?width=420px 420w"
	/>
</picture>
```

In this example, we have the logic that usually would have been in our sizes attribute (`sizes="(min-width: 660px) 620px, 100vw"`) extrapolated into individual source elements. All our breakpoint which are 660px or larger offer only 1 choice, the 620px source. The lower breakpoints have looked for sources which are closest to their own size, as a replacement for `100vw`.

This solves our DPR problem because, the `media` attribute uses CSS pixels, and because we only offer 1 image source for each of these elements, once the browser has picked its source element, we basically strong arm it into which source to use.

## What does DCR do?

**Partially deprecated. See decision 029**

DCR Maintains some parity with Frontend's implementation of images, the key difference's being:

1. DCR Relies on Frontend to generate it's image sources
2. Frontend offers higher resolution source for portait immersives
3. DCR Removes redundant sources to make the DOM more effecient.

The implementation DCR picked involves creating 2 <source> elements for each breakpoint, one regular, and one for high DPR displays.

For Example:

```html
<picture>
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=620&;quality=45&;auto=format&;fit=max&;dpr=2&; 1240w" media="(min-width: 980px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: 980px) and (min-resolution: 120dpi)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=620&;quality=85&;auto=format&;fit=max&; 620w" media="(min-width: 980px)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=700&;quality=45&;auto=format&;fit=max&;dpr=2&; 1400w" media="(min-width: 740px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: 740px) and (min-resolution: 120dpi)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=700&;quality=85&;auto=format&;fit=max&; 700w" media="(min-width: 740px)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=620&;quality=45&;auto=format&;fit=max&;dpr=2&; 1240w" media="(min-width: 660px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: 660px) and (min-resolution: 120dpi)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=620&;quality=85&;auto=format&;fit=max&; 620w" media="(min-width: 660px)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=620&;quality=45&;auto=format&;fit=max&;dpr=2&; 1240w" media="(min-width: 480px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: 480px) and (min-resolution: 120dpi)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=620&;quality=85&;auto=format&;fit=max&; 620w" media="(min-width: 480px)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=465&;quality=45&;auto=format&;fit=max&;dpr=2&; 930w" media="(min-width: 375px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: 375px) and (min-resolution: 120dpi)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=465&;quality=85&;auto=format&;fit=max&; 465w" media="(min-width: 375px)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=465&;quality=45&;auto=format&;fit=max&;dpr=2&; 930w" media="(min-width: 320px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: 320px) and (min-resolution: 120dpi)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=465&;quality=85&;auto=format&;fit=max&; 465w" media="(min-width: 320px)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=465&;quality=45&;auto=format&;fit=max&;dpr=2&; 930w" media="(min-width: 0px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: 0px) and (min-resolution: 120dpi)">
    <source srcset="https://i.guim.co.uk/img/media/picture.jpg?width=465&;quality=85&;auto=format&;fit=max&; 465w" media="(min-width: 0px)">
    <img alt="The Palace Theatre, London, showing Harry Potter and the Cursed Child" src="https://i.guim.co.uk/img/media/picture.jpg?width=465&;quality=45&;auto=format&;fit=max&;dpr=2&;s=0492ab78e73c5167d8b4b841e601fbd4" height="1200" width="2000" class="dcr-b5pnrc-css">
</picture>
```

### Immersive Main Media

Immersive main media gets special treatment for images ~ due to 2 unique qualities:

1. Desktop full width - The images will always fill 100vw on all desktop breakpoints
2. Portrait full height- On portrait devices, filling 100vh must be handled differently

Each of these specific cases are not handled optimally by the original solution. However, immersive main media images often have more content value as they're sometimes the only thing on screen when an article loads, so getting them right is important.

#### Desktop

**Deprecated. See decision 029**

For regular images, we'll loop through each breakpoint and pick an appropriate source based on the desired width at that breakpoint. This works well on non-responsive (e.g fixed width images) because we know exactly what size image we want at each breakpoint. A side-effect of this is that we always use image sources which exist within the confines of our breakpoints, which can cause a problem for higher screen resolutions.

Our largest breakpoint is 1300px, for a full-width image we then know we'd want a 1300px image. But what if we have a scren larger than that? Say 2000px? Even if we had a 2000px source available to us, we couldn't use it because our largest breakpoint was 1300px.

The solution to this is that rather than looping through each breakpoint, and picking an appropriate image source, we can instead loop through each image source we have (provided by frontend) and use its own width as the breakpoints. This is what you can see in `landscapeImmersiveMainMediaSource` in `Picture.tsx` - by doing this we're taking advantage of the full range of image sources offered to us by Frontend, improving image quality available to larger displays.

#### Mobile / Portrait

Coming soon
