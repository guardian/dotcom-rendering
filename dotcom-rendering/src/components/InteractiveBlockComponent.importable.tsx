import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	article17,
	from,
	space,
	textSans17,
} from '@guardian/source/foundations';
import libDebounce from 'lodash.debounce';
import { useRef, useState } from 'react';
import { interactiveLegacyFigureClasses } from '../layouts/lib/interactiveLegacyStyling';
import { type ArticleFormat, ArticleSpecial } from '../lib/articleFormat';
import { useOnce } from '../lib/useOnce';
import { palette as themePalette } from '../palette';
import type { RoleType } from '../types/content';
import { Caption } from './Caption';
import { useConfig } from './ConfigContext';
import { defaultRoleStyles } from './Figure';
import { Placeholder } from './Placeholder';

type Props = {
	url?: string;
	scriptUrl?: string;
	alt?: string;
	role?: RoleType;
	caption?: string;
	format: ArticleFormat;
	elementId?: string;
	isMainMedia: boolean;
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
and is sent with all interactive elements in the scriptUrl from CAPI to do a two simple things:
- Create an iframe using the href of the anchor and set the src
- Add event listener to the window to listen for 'message' of the following types
	- set-height
	- navigate
	- scroll-to
	- get-location
	- get-position
	- monitor-position

It has not been updated since 2016.

MIGRATION FROM FRONTEND
- For the standard boot.js, we have re-written the behavior in modern JS to avoid the requirement of an AMD loader
and to avoid loading the boot.js file.
- For all other files that do not load the standard boot.js, we'll add a AMD loader to the page

For the remaining few we dynamically load and AMD loader and support the contract as defined with curl AMD loader

*/
const decideHeight = (role: RoleType) => {
	switch (role) {
		case 'supporting':
			return 200;
		default:
			return 500;
	}
};
const getMinHeight = (role: RoleType, loaded: boolean) => {
	if (loaded) {
		return `auto`;
	}
	return `${decideHeight(role)}px`;
};
const wrapperStyle = ({
	format,
	role,
	loaded,
	isDatawrapperGraphic,
}: {
	format: ArticleFormat;
	role: RoleType;
	loaded: boolean;
	isDatawrapperGraphic: boolean;
}) => css`
	${format.theme === ArticleSpecial.Labs ? textSans17 : article17}
	background-color: ${themePalette(
		isDatawrapperGraphic
			? '--interactive-block-background-datawrapper'
			: '--interactive-block-background',
	)};
	min-height: ${getMinHeight(role, loaded)};
	position: relative;
	display: flex;
	flex-direction: column;
	${isDatawrapperGraphic
		? `
	border-top: 1px solid ${themePalette('--branding-border')};
	padding-top: ${space[2]}px;
	`
		: ''}
`;

const datawrapperRoleStyles = (role: RoleType): SerializedStyles | null => {
	switch (role) {
		case 'inline':
			return datawrapperRoleCss.inline;
		case 'supporting':
			return datawrapperRoleCss.supporting;
		case 'immersive':
			return datawrapperRoleCss.immersive;
		case 'showcase':
			return datawrapperRoleCss.showcase;
		case 'thumbnail':
		case 'halfWidth':
			return null;
	}
};

const datawrapperRoleCss = {
	inline: css`
		margin-top: ${space[6]}px;
		margin-bottom: ${space[6]}px;
	`,

	supporting: css`
		clear: left;
		margin-top: ${space[6]}px;
		margin-bottom: ${space[6]}px;

		${from.leftCol} {
			margin-bottom: ${space[2]}px;
			padding-bottom: ${space[4]}px;
			border-bottom: 1px solid ${themePalette('--branding-border')};
		}
		${from.wide} {
			width: 380px;
			margin-left: -240px;
		}
	`,

	immersive: css`
		margin-top: ${space[6]}px;
		margin-bottom: ${space[6]}px;

		${from.leftCol} {
			margin-bottom: ${space[4]}px;
			padding-bottom: ${space[4]}px;
			border-bottom: 1px solid ${themePalette('--branding-border')};
		}
	`,

	showcase: css`
		margin-top: ${space[6]}px;
		margin-bottom: ${space[6]}px;

		${from.leftCol} {
			margin-bottom: ${space[4]}px;
			padding-bottom: ${space[4]}px;
			border-bottom: 1px solid ${themePalette('--branding-border')};
		}
	`,
};

const placeholderLinkStyle = css`
	position: absolute;
	bottom: ${space[1]}px;
	left: ${space[1]}px;
`;

const mainMediaFigureStyles = css`
	height: 100%;
`;

// https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js
const setupWindowListeners = (iframe: HTMLIFrameElement) => {
	// Calls func on trailing edge of the wait period

	const postMessage = (message: Record<string, unknown>) => {
		if (iframe.contentWindow) {
			iframe.contentWindow.postMessage(JSON.stringify(message), '*');
		}
	};

	window.addEventListener(
		'message',
		(event) => {
			if (event.source !== iframe.contentWindow) {
				return;
			}

			let message: Record<string, unknown> | undefined;
			try {
				message = JSON.parse(event.data);
			} catch (e) {
				window.guardian.modules.sentry.reportError(
					// @ts-expect-error
					e,
					'Json parse Failed on in interactiveBlockComponent',
				);
			}

			if (isUndefined(message)) {
				return;
			}

			const postPositionMessage = (subscribe?: boolean) => {
				const iframeBox = iframe.getBoundingClientRect();
				postMessage({
					id: message?.id || '',
					type: message?.type || '',
					subscribe: !!subscribe,
					iframeTop: iframeBox.top,
					iframeRight: iframeBox.right,
					iframeBottom: iframeBox.bottom,
					iframeLeft: iframeBox.left,
					innerHeight: window.innerHeight,
					innerWidth: window.innerWidth,
					pageYOffset: window.pageYOffset,
				});
			};

			// Actions
			switch (message.type) {
				case 'set-height':
					if (typeof message.value === 'number') {
						iframe.height = message.value.toString();
					}
					break;
				case 'navigate':
					if (typeof message.value === 'string') {
						document.location.href = message.value;
					}
					break;
				case 'scroll-to':
					if (
						typeof message.x === 'number' &&
						typeof message.y === 'number'
					) {
						window.scrollTo(message.x, message.y);
					}
					break;
				case 'get-location':
					postMessage({
						id: message.id,
						type: message.type,
						hash: window.location.hash,
						host: window.location.host,
						hostname: window.location.hostname,
						href: window.location.href,
						origin: window.location.origin,
						pathname: window.location.pathname,
						port: window.location.port,
						protocol: window.location.protocol,
						search: window.location.search,
					});
					break;
				case 'get-position':
					postPositionMessage();
					break;
				case 'monitor-position':
					// Send initial position
					postPositionMessage(true);

					// Send updated position on scroll or resize
					window.addEventListener(
						'scroll',
						libDebounce(() => {
							postPositionMessage(true);
						}, 50),
					);
					window.addEventListener(
						'resize',
						libDebounce(() => {
							postPositionMessage(true);
						}, 50),
					);
					break;
			}
		},
		false,
	);
};

export const InteractiveBlockComponent = ({
	url,
	scriptUrl,
	alt,
	role = 'inline',
	caption,
	format,
	elementId = '',
	isMainMedia,
}: Props) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const placeholderLinkRef = useRef<HTMLAnchorElement>(null);
	const [loaded, setLoaded] = useState(false);
	const { darkModeAvailable } = useConfig();

	// Define some one-time flags
	const isDatawrapperGraphic =
		url && url.includes('interactive.guim.co.uk/datawrapper')
			? true
			: false;

	const isUploaderEmbedPath =
		url &&
		(url.includes('interactive.guim.co.uk/uploader/embed/') ||
			url.includes('superyacht') ||
			url.includes('choropleth_map_maker'))
			? true
			: false;

	const scriptUrlIsBoot =
		scriptUrl &&
		scriptUrl.includes(
			'interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js',
		)
			? true
			: false;

	useOnce(() => {
		// We've brought the behavior from boot.js into this file to avoid loading 2 extra scripts

		// Define additional one-time flags - these depend on window/document objects
		const isRunningInWebEnvironment =
			!document.querySelector('.ios') &&
			!document.querySelector('.android')
				? true
				: false;

		const prefersDarkScheme = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;
		const requiresDarkMode =
			darkModeAvailable && prefersDarkScheme ? true : false;

		if (url && scriptUrlIsBoot && placeholderLinkRef.current) {
			// Prepare for graphic url dynamic updates
			const graphicUrl = new URL(url);

			// Begin creating new iframe element
			const iframe = document.createElement('iframe');
			iframe.style.width = '100%';
			iframe.style.border = 'none';
			iframe.height = decideHeight(role).toString();
			iframe.title = caption ?? alt ?? 'Interactive Content';

			// Fix for Datawrapper graphic
			if (isDatawrapperGraphic) {
				iframe.scrolling = 'no';
			}

			// Fix darkmode for web environment
			if (isRunningInWebEnvironment && !requiresDarkMode) {
				if (isDatawrapperGraphic || isUploaderEmbedPath) {
					// Add the 'dark=false' search param
					if (graphicUrl.search.length) {
						graphicUrl.search += '&dark=false';
					} else {
						// Embed URLs without a trailing slash are redirected and the
						// search param is lost so we need to add it to the pathname
						const hasTrailingSlash = graphicUrl.pathname.endsWith(
							'/',
						)
							? true
							: false;
						graphicUrl.pathname += hasTrailingSlash ? '' : '/';
						graphicUrl.search += '?dark=false';
					}
				}
			}

			// Always serve graphic over https, not http
			graphicUrl.protocol = 'https:';

			// Finalise new iframe element
			iframe.src = graphicUrl.href;

			setupWindowListeners(iframe);

			wrapperRef.current?.prepend(iframe);

			setLoaded(true);
		} else if (scriptUrl) {
			// We're going to use curl AMD loader to load the script that the
			// interactive has given us.
			window.require(
				[scriptUrl],
				(interactive: {
					boot: (
						el: HTMLDivElement,
						document: Document,
						config: unknown,
					) => void;
				}) => {
					if (wrapperRef.current !== null) {
						interactive.boot(
							wrapperRef.current,
							document,
							window.guardian.config,
						);
					}
				},
			);

			setLoaded(true);
		}
	}, [loaded]);

	return (
		<>
			<figure
				id={elementId} // boot scripts use id when inserting interactive content
				ref={wrapperRef}
				css={[
					isMainMedia
						? mainMediaFigureStyles
						: defaultRoleStyles(role, format),
					isDatawrapperGraphic ? datawrapperRoleStyles(role) : null,
					wrapperStyle({
						format,
						role,
						loaded,
						isDatawrapperGraphic,
					}),
				]}
				className={interactiveLegacyFigureClasses(
					'model.dotcomrendering.pageElements.InteractiveBlockElement',
					role,
				)}
				data-alt={alt} // for compatibility with custom boot scripts
				data-testid={`interactive-element-${encodeURI(alt ?? '')}`}
				data-spacefinder-role={role}
			>
				{!loaded && (
					<>
						<Placeholder // removed by HydrateInteractiveOnce
							height={decideHeight(role)}
							shouldShimmer={false}
						/>
						<a
							ref={placeholderLinkRef}
							data-name="placeholder" // removed by HydrateInteractiveOnce
							css={placeholderLinkStyle}
							href={url}
						>
							{alt}
						</a>
					</>
				)}
				{!!caption && (
					<Caption
						captionText={caption}
						format={format}
						isMainMedia={isMainMedia}
					/>
				)}
			</figure>
		</>
	);
};
