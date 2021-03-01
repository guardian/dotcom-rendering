import React, { useEffect, useState } from 'react';

type Props = {
	url?: string;
	scriptUrl?: string;
	role?: RoleType;
	alt?: string;
	index?: number;
};

/*
HISTORY

A CAPI response for an interactive elements looks like:
{
	"type": "interactive",
	"assets": [],
	"interactiveTypeData": {
		"originalUrl": "https://interactive.guim.co.uk/charts/embed/jan/2019-01-05T14:22:01/embed.html",
		"source": "Guardian",
		"alt": "china 1978 gdp",
		"scriptUrl": "https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js",
		"html": "<a href=\"https://interactive.guim.co.uk/charts/embed/jan/2019-01-05T14:22:01/embed.html\">china 1978 gdp</a>",
		"scriptName": "iframe-wrapper",
		"iframeUrl": "https://interactive.guim.co.uk/charts/embed/jan/2019-01-05T14:22:01/embed.html",
		"role": "supporting",
		"isMandatory": false
		}
}

On Frontend, the HTML that we send to the browser is:
<figure class="element element-interactive interactive element--supporting" data-interactive="https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js" data-canonical-url="https://interactive.guim.co.uk/charts/embed/jan/2019-01-05T14:22:01/embed.html" data-alt="china 1978 gdp">
	<a href="https://interactive.guim.co.uk/charts/embed/jan/2019-01-05T14:22:01/embed.html" data-link-name="in body link" class="u-underline">china 1978 gdp</a>
</figure>

https://github.com/guardian/frontend/blob/e38da96c59eaaef143b9f89b2318eab9dcf2fc5a/common/app/views/fragments/inlineJSNonBlocking.scala.html#L52
We use the curl AMD loader to load the boot script from the data-interactive attribute:
	require([el.getAttribute('data-interactive')], function (interactive) {
		interactive.boot(el, document, window.guardian.config);
	}

Pulling from Kibana, 99% of articles use the standard iframe-wrapper/1.0/boot.js
A vast minority of pre interactive atom use a customised boot.js
https://gist.github.com/gtrufitt/c8f08caef0ae810a42fde5a4c0549ad0


THE STANDARD BOOT.js
boot.js is defined from https://github.com/guardian/interactive-boot-scripts/blob/master/iframe-wrapper/boot.js
and is sent with all interactive elements in the scriptUrl from CAPI to do a number of things:
- Create an iframe using the href of the anchor and set the src
- Add event listener to the window to listen for 'message'
- TBC

It has not been updated since 2016.

MIGRATION FROM FRONTEND
For the standard boot.js, we will re-write the behavior in modern JS to avoid the requirement of an AMD loader
and to avoid loading the boot.js file.

For the remaining few we dynamically load and AMD loader and support the contract as defined
https://www.npmjs.com/package/bare-amd-loader

*/

export const InteractiveBlockComponent = ({
	url,
	scriptUrl,
	alt,
	index,
}: Props) => {
	const [render, setRender] = useState(false);
	useEffect(() => {
		console.log('loaded');
		setRender(true);
	}, []);
	console.log(scriptUrl);
	return (
		<div id={`interactive-block-${index}`}>
			$
			{render ? (
				<iframe src={url} title={alt || ''} />
			) : (
				<p>This is an empty iframe</p>
			)}
			;
		</div>
	);
};
