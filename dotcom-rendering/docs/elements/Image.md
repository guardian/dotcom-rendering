# Image Element

An element representing an image.

## CAPI representation

This has an `ElementType` of [IMAGE](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#50) with fields described by [ImageElementFields](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L468).

This will also come with a list of [Asset](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L366).

## Frontend Representation

This is represented in frontend by [ImageBlockElement](https://github.com/guardian/frontend/blob/9a2e342437858c621b39eda3ea459e893770af93/common/app/model/liveblog/BlockElement.scala#L12).

The field `data` on this object is a `Map<String,String>` which is populated in [imageDataFor](https://github.com/guardian/frontend/blob/9a2e342437858c621b39eda3ea459e893770af93/common/app/model/liveblog/BlockElement.scala#L139).

The assets from the CAPI output are processed by [imageMediaFor](https://github.com/guardian/frontend/blob/c97d43a9cba88c8573f93676d3b5a0ea48e25d28/common/app/model/Asset.scala#L34) and placed into `media` these are assigned extra fields using [assetFieldsToMap](https://github.com/guardian/frontend/blob/c97d43a9cba88c8573f93676d3b5a0ea48e25d28/common/app/model/Asset.scala#L8).

## Current HTML Output

```html
 <figure class="element element-image" data-media-id="d1c48b0c6ec594b396f786cfd3f6ba6ae0d93516"> <img src="https://media.guim.co.uk/d1c48b0c6ec594b396f786cfd3f6ba6ae0d93516/0_105_2754_1652/1000.jpg" alt="A photo of a cat to show a demo image." width="1000" height="600" class="gu-image" /> <figcaption> <span class="element-image__caption">A photo of a cat to show a demo image.
</figcaption></span> <span class=
 "element-image__credit">Photograph: Murdo Macleod</span> </figcaption> </figure>
```

## Article Cleaned HTML

```html
<figure
	itemprop="associatedMedia image"
	itemscope=""
	itemtype="http://schema.org/ImageObject"
	data-component="image"
	class="element element-image img--landscape  fig--narrow-caption fig--has-shares "
	data-media-id="d1c48b0c6ec594b396f786cfd3f6ba6ae0d93516"
	id="img-2"
>
	<meta
		itemprop="url"
		content="https://i.guim.co.uk/img/media/d1c48b0c6ec594b396f786cfd3f6ba6ae0d93516/0_105_2754_1652/master/3848.jpg?width=700&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=2732c38045c067bad30f94ee64434bb5"
	/>
	<meta itemprop="width" content="2754" />
	<meta itemprop="height" content="1652" />
	<a
		href="#img-2"
		class="article__img-container js-gallerythumbs"
		data-link-name="Launch Article Lightbox"
		data-is-ajax=""
	>
		<div class="u-responsive-ratio" style="padding-bottom: 60.03%">
			<picture>
				<!--[if IE 9]><video style="display: none;"><![endif]-->
				<source
					media="(min-width: 660px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: 660px) and (min-resolution: 120dpi)"
					sizes="620px"
					srcset="
						https://i.guim.co.uk/img/media/d1c48b0c6ec594b396f786cfd3f6ba6ae0d93516/0_105_2754_1652/master/3848.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2b770d155153586da01aeac040b7d122 1240w
					"
				/>
				<source
					media="(min-width: 660px)"
					sizes="620px"
					srcset="
						https://i.guim.co.uk/img/media/d1c48b0c6ec594b396f786cfd3f6ba6ae0d93516/0_105_2754_1652/master/3848.jpg?width=620&quality=85&auto=format&fit=max&s=5bcc7d6a701c9e582ecae151d1e08470 620w
					"
				/>
				<source
					media="(min-width: 480px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: 480px) and (min-resolution: 120dpi)"
					sizes="605px"
					srcset="
						https://i.guim.co.uk/img/media/d1c48b0c6ec594b396f786cfd3f6ba6ae0d93516/0_105_2754_1652/master/3848.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=dbf6970a8486abb02a9112d702172632 1210w
					"
				/>
				<source
					media="(min-width: 480px)"
					sizes="605px"
					srcset="
						https://i.guim.co.uk/img/media/d1c48b0c6ec594b396f786cfd3f6ba6ae0d93516/0_105_2754_1652/master/3848.jpg?width=605&quality=85&auto=format&fit=max&s=d0286fd5dc881899c031a72240476296 605w
					"
				/>
				<source
					media="(min-width: 0px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: 0px) and (min-resolution: 120dpi)"
					sizes="445px"
					srcset="
						https://i.guim.co.uk/img/media/d1c48b0c6ec594b396f786cfd3f6ba6ae0d93516/0_105_2754_1652/master/3848.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=6054b04759da0282e7001187bdfbf44f 890w
					"
				/>
				<source
					media="(min-width: 0px)"
					sizes="445px"
					srcset="
						https://i.guim.co.uk/img/media/d1c48b0c6ec594b396f786cfd3f6ba6ae0d93516/0_105_2754_1652/master/3848.jpg?width=445&quality=85&auto=format&fit=max&s=55fc28528ae1ec3422adeb8f4060c54a 445w
					"
				/>
				<!--[if IE 9]></video><![endif]-->
				<img
					class="gu-image"
					itemprop="contentUrl"
					alt="A Boracay beach in April, before the closure of the holiday island."
					src="https://i.guim.co.uk/img/media/d1c48b0c6ec594b396f786cfd3f6ba6ae0d93516/0_105_2754_1652/master/3848.jpg?width=300&quality=85&auto=format&fit=max&s=6f59964904a7afc2941a40891464ceef "
				/>
			</picture>
		</div>
		<span
			class="inline-expand-image inline-icon centered-icon rounded-icon article__fullscreen modern-visible"
		>
			<svg
				width="22"
				height="22"
				viewBox="0 0 22 22"
				class="centered-icon__svg rounded-icon__svg article__fullscreen__svg modern-visible__svg inline-expand-image__svg inline-icon__svg"
			>
				<path
					d="M3.4 20.2L9 14.5 7.5 13l-5.7 5.6L1 14H0v7.5l.5.5H8v-1l-4.6-.8M18.7 1.9L13 7.6 14.4 9l5.7-5.7.5 4.7h1.2V.6l-.5-.5H14v1.2l4.7.6"
				></path>
			</svg>
		</span>
	</a>
	<div
		class="block-share block-share--article  hide-on-mobile "
		data-link-name="block share"
	>
		<a
			class="rounded-icon block-share__item block-share__item--facebook js-blockshare-link"
			href="???"
			target="_blank"
			data-link-name="social facebook"
		>
			<span class="inline-share-facebook inline-icon ">
				<svg
					width="32"
					height="32"
					viewBox="-2 -2 32 32"
					class="inline-share-facebook__svg inline-icon__svg"
				>
					<path
						d="M17.9 14h-3v8H12v-8h-2v-2.9h2V8.7C12 6.8 13.1 5 16 5c1.2 0 2 .1 2 .1v3h-1.8c-1 0-1.2.5-1.2 1.3v1.8h3l-.1 2.8z"
					></path>
				</svg>
			</span>
			<span class="u-h">Facebook</span>
		</a>
		<a
			class="rounded-icon block-share__item block-share__item--twitter js-blockshare-link"
			href="???"
			target="_blank"
			data-link-name="social twitter"
		>
			<span class="inline-share-twitter inline-icon ">
				<svg
					width="32"
					height="32"
					viewBox="-2 -2 32 32"
					class="inline-share-twitter__svg inline-icon__svg"
				>
					<path
						d="M21.3 10.5v.5c0 4.7-3.5 10.1-9.9 10.1-2 0-3.8-.6-5.3-1.6.3 0 .6.1.8.1 1.6 0 3.1-.6 4.3-1.5-1.5 0-2.8-1-3.3-2.4.2 0 .4.1.7.1l.9-.1c-1.6-.3-2.8-1.8-2.8-3.5.5.3 1 .4 1.6.4-.9-.6-1.6-1.7-1.6-2.9 0-.6.2-1.3.5-1.8 1.7 2.1 4.3 3.6 7.2 3.7-.1-.3-.1-.5-.1-.8 0-2 1.6-3.5 3.5-3.5 1 0 1.9.4 2.5 1.1.8-.1 1.5-.4 2.2-.8-.3.8-.8 1.5-1.5 1.9.7-.1 1.4-.3 2-.5-.4.4-1 1-1.7 1.5z"
					></path>
				</svg>
			</span>
			<span class="u-h">Twitter</span>
		</a>
		<a
			class="rounded-icon block-share__item block-share__item--pinterest js-blockshare-link"
			href="???"
			target="_blank"
			data-link-name="social pinterest"
		>
			<span class="inline-share-pinterest inline-icon ">
				<svg
					viewBox="0 0 32 32"
					width="32"
					height="32"
					class="inline-share-pinterest__svg inline-icon__svg"
				>
					<path
						d="M16.363 8C12.133 8 10 11.13 10 13.74c0 1.582.58 2.988 1.823 3.512.204.086.387.003.446-.23.04-.16.137-.568.18-.737.06-.23.037-.312-.127-.513-.36-.436-.588-1-.588-1.802 0-2.322 1.684-4.402 4.384-4.402 2.39 0 3.703 1.508 3.703 3.522 0 2.65-1.136 4.887-2.822 4.887-.93 0-1.628-.795-1.405-1.77.268-1.165.786-2.42.786-3.262 0-.752-.39-1.38-1.2-1.38-.952 0-1.716 1.017-1.716 2.38 0 .867.284 1.454.284 1.454l-1.146 5.006c-.34 1.487-.05 3.31-.026 3.493.014.108.15.134.21.05.09-.117 1.223-1.562 1.61-3.006.108-.41.625-2.526.625-2.526.31.61 1.215 1.145 2.176 1.145 2.862 0 4.804-2.693 4.804-6.298C22 10.54 19.763 8 16.363 8"
					></path>
				</svg>
			</span>
			<span class="u-h">Pinterest</span>
		</a>
	</div>
	<figcaption
		class="caption caption--img caption caption--img"
		itemprop="description"
	>
		<span class="inline-triangle inline-icon ">
			<svg
				width="11"
				height="10"
				viewBox="0 0 11 10"
				class="inline-triangle__svg inline-icon__svg"
			>
				<path fill-rule="evenodd" d="M5.5 0L11 10H0z"></path>
			</svg>
		</span>
		A photo of a cat to show a demo image.
	</figcaption>
</figure>
```

This is run through the [PictureCleaner](https://github.com/guardian/frontend/blob/bb83dabb21aea326c67168d0e0d3f6d4ccef6af5/common/app/views/support/HtmlCleaner.scala#L112) which attempts to find an `ImageMedia` with which it does the following:

-   [Fills out a `<figure>` tag](https://github.com/guardian/frontend/blob/a5be9f80b1d2898b68d89d1035d57aca4f1629bd/common/app/views/fragments/imageFigure.scala.html) imageFigure.scala.html
-   [Builds a `<picture>` tag](https://github.com/guardian/frontend/blob/48c86c0d3219a71f7f14b83eb7a6956421176f8e/common/app/views/fragments/image.scala.html) image.scala.html
    -   Uses [WidthsByBreakpoint](https://github.com/guardian/frontend/blob/91e117429d865936692de60aa2bea6740bde4f75/common/app/layout/WidthsByBreakpoint.scala#L1) to generate a list of _image_ breakpoints to combine with the media into urls.
    -   Combines the **master** ImageAsset and [breakpoints](https://github.com/guardian/frontend/blob/a101940926699230b8a95a9082aa56327ca98988/common/app/views/support/Profile.scala#L17) to generate [srcset](https://github.com/guardian/frontend/blob/a101940926699230b8a95a9082aa56327ca98988/common/app/views/support/Profile.scala#L240)s.

## AMP Cleaned HTML

This is run through the same cleaners and templates up to `image.scala.html` where it is then rendered using [ampImage](https://github.com/guardian/frontend/blob/f16a4ac50492dc65d7274576840c6993165a2485/common/app/views/fragments/amp/ampImage.scala.html) which uses [getAmpImageUrl](https://github.com/guardian/frontend/blob/a101940926699230b8a95a9082aa56327ca98988/common/app/views/support/Profile.scala#L298) to get a 620px wide crop.

## Salient points

-   Image URLS need to be rewritten from `media.guim` to `i.guim` on the server.
-   These URLS need to have the breakpoint encoded within it.
-   The CAPI response contains many images, we form our urls from the master image if sent, or the largest image.
-   The image breakpoints are [precalculated](https://github.com/guardian/frontend/blob/91e117429d865936692de60aa2bea6740bde4f75/common/app/layout/WidthsByBreakpoint.scala) image sizes for each presentation of an image for each screen breakpoint.
