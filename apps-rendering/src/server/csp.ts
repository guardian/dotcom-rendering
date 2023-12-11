// ----- Imports ----- //

import { createHash } from 'crypto';
import { ArticleDesign } from '@guardian/libs';
import { map, withDefault } from '../../vendor/@guardian/types/index';
import type { BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElement';
import type { ThirdPartyEmbeds } from 'capi';
import type { Item } from 'item';
import { compose, pipe } from 'lib';

// ----- Types ----- //

interface Assets {
	scripts: string[];
	styles: string[];
}

// ----- Functions ----- //

const assetHash = (asset: string): string =>
	createHash('sha256').update(asset).digest('base64');

const extractInteractiveAssets = (elements: BodyElement[]): Assets =>
	elements.reduce<Assets>(
		({ scripts, styles }, elem) => {
			if (elem.kind === ElementKind.InteractiveAtom) {
				return {
					styles: [...styles, elem.css],
					scripts: pipe(
						elem.js,
						map((js) => [...scripts, js]),
						withDefault(scripts),
					),
				};
			}

			if (elem.kind === ElementKind.ChartAtom) {
				return {
					styles: [...styles, ...elem.css],
					scripts: [...scripts, ...elem.js],
				};
			}

			return { scripts, styles };
		},
		{ scripts: [], styles: [] },
	);

const getElements = (item: Item): BodyElement[] =>
	item.design === ArticleDesign.LiveBlog ||
	item.design === ArticleDesign.DeadBlog
		? item.blocks.flatMap((block) => block.body)
		: item.body;

const interactiveAssets = compose(extractInteractiveAssets, getElements);

const assetHashes = (assets: string[]): string =>
	assets.map((asset) => `'sha256-${assetHash(asset)}'`).join(' ');

// const cspString = `
//     default-src https:;
//     script-src https: 'unsafe-inline' 'unsafe-eval';
//     frame-src https: data:;
//     style-src https: 'unsafe-inline';
//     img-src https: data: blob:;
//     media-src https: data: blob:;
//     font-src https: data:;
//     connect-src https: wss:;
//     child-src https: blob:
// `.trim()

const styleSrc = (
	styles: string[],
	twitter: boolean,
	hasInlineStyles: boolean,
): string => {
	const urls = `https://interactive.guim.co.uk ${
		twitter ? 'https://platform.twitter.com' : ''
	}`;
	return hasInlineStyles
		? `'self' ${urls} 'unsafe-inline';`
		: `'self' ${assetHashes(styles)} ${urls};`;
};

const buildCsp = (
	{ styles, scripts }: Assets,
	thirdPartyEmbed: ThirdPartyEmbeds,
	hasInlineStyles: boolean,
): string =>
	`
    default-src 'self';
    style-src ${styleSrc(styles, thirdPartyEmbed.twitter, hasInlineStyles)}
    img-src 'self' https://static.theguardian.com https://*.guim.co.uk ${
		thirdPartyEmbed.twitter
			? 'https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com data:'
			: ''
	};
    script-src 'self' ${assetHashes(scripts)}
	https://interactive.guim.co.uk https://s16.tiktokcdn.com https://www.tiktok.com/embed.js https://sf16-scmcdn-sg.ibytedtos.com/ ${
		thirdPartyEmbed.twitter
			? 'https://platform.twitter.com https://cdn.syndication.twimg.com'
			: ''
	};
    frame-src https://www.theguardian.com https://www.scribd.com https://www.google.com https://webstories.theguardian.com https://www.linkedin.com https://datawrapper.dwcdn.net https://apps.enformant.com ${
		thirdPartyEmbed.instagram ? 'https://www.instagram.com' : ''
	} https://www.facebook.com https://www.tiktok.com https://interactive.guim.co.uk ${
		thirdPartyEmbed.spotify ? 'https://open.spotify.com' : ''
	} ${
		thirdPartyEmbed.youtube ? 'https://www.youtube-nocookie.com' : ''
	} https://player.vimeo.com/ ${
		thirdPartyEmbed.twitter
			? 'https://platform.twitter.com https://syndication.twitter.com https://twitter.com'
			: ''
	};
    font-src 'self' https://assets.guim.co.uk https://interactive.guim.co.uk;
    connect-src 'self' https://callouts.code.dev-guardianapis.com/formstack-campaign/submit https://interactive.guim.co.uk https://sf-hs-sg.ibytedtos.com/ https://gdn-cdn.s3.amazonaws.com/;
    media-src 'self' https://audio.guim.co.uk/ https://multimedia.guardianapis.com https://cdn.theguardian.tv;
`.trim();

function buildCspEditions(
	{ styles, scripts }: Assets,
	thirdPartyEmbed: ThirdPartyEmbeds,
): string {
	return `
	default-src 'self';
    style-src ${styleSrc(styles, thirdPartyEmbed.twitter, false)};
	script-src 'self' ${assetHashes(scripts)}
	https://editions-published-code.s3.eu-west-1.amazonaws.com https://editions-published-prod.s3.eu-west-1.amazonaws.com https://interactive.guim.co.uk ${
		thirdPartyEmbed.twitter
			? 'https://platform.twitter.com https://cdn.syndication.twimg.com'
			: ''
	};
	img-src 'self' https://static.theguardian.com https://*.guim.co.uk ${
		thirdPartyEmbed.twitter
			? 'https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com data:'
			: ''
	};
	frame-src https://www.theguardian.com https://embed.theguardian.com https://www.facebook.com https://www.tiktok.com https://interactive.guim.co.uk ${
		thirdPartyEmbed.spotify ? 'https://open.spotify.com' : ''
	} ${
		thirdPartyEmbed.youtube ? 'https://www.youtube-nocookie.com' : ''
	} https://player.vimeo.com/ ${
		thirdPartyEmbed.twitter
			? 'https://platform.twitter.com https://syndication.twitter.com https://twitter.com'
			: ''
	};
	font-src 'self' https://assets.guim.co.uk https://interactive.guim.co.uk https://editions-published-code.s3.eu-west-1.amazonaws.com https://editions-published-prod.s3.eu-west-1.amazonaws.com;
	connect-src 'self' https://callouts.code.dev-guardianapis.com/formstack-campaign/submit https://interactive.guim.co.uk https://sf-hs-sg.ibytedtos.com/ https://gdn-cdn.s3.amazonaws.com/;
	media-src 'self' https://audio.guim.co.uk/
	`;
}

function csp(
	item: Item,
	additionalAssets: Assets,
	thirdPartyEmbed: ThirdPartyEmbeds,
	hasInlineStyles: boolean,
	isEditions: boolean,
): string {
	const interactives = interactiveAssets(item);
	const assets = {
		styles: [...interactives.styles, ...additionalAssets.styles],
		scripts: [...interactives.scripts, ...additionalAssets.scripts],
	};

	return isEditions
		? buildCspEditions(assets, thirdPartyEmbed)
		: buildCsp(assets, thirdPartyEmbed, hasInlineStyles);
}

// ----- Exports ----- //

export { assetHashes, csp };
