// ----- Imports ----- //

import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { EmbedTracksType } from '@guardian/content-api-models/v1/embedTracksType';
import { fromNullable, withDefault } from '../vendor/@guardian/types/index';
import type { Option } from '../vendor/@guardian/types/index';
import { parseIntOpt, pipe, resultFromNullable } from 'lib';
import { Optional } from 'optional';
import type { DocParser } from 'parserContext';
import { Result } from 'result';

// ----- Types ----- //

enum EmbedKind {
	Generic = 'Generic',
	Instagram = 'Instagram',
	Spotify = 'Spotify',
	YouTube = 'YouTube',
	EmailSignup = 'EmailSignup',
	TikTok = 'TikTok',
}

interface YouTube {
	kind: EmbedKind.YouTube;
	id: string;
	width: number;
	height: number;
	tracking: EmbedTracksType;
}

interface Spotify {
	kind: EmbedKind.Spotify;
	src: string;
	width: number;
	height: number;
	tracking: EmbedTracksType;
}

interface Instagram {
	kind: EmbedKind.Instagram;
	id: string;
	caption: Option<string>;
	tracking: EmbedTracksType;
}

interface GenericFields {
	alt: Option<string>;
	html: string;
	height: number;
	mandatory: boolean;
	source: Option<string>;
	sourceDomain: Option<string>;
	tracking: EmbedTracksType;
}

interface Generic extends GenericFields {
	kind: EmbedKind.Generic;
}

interface TikTok extends GenericFields {
	kind: EmbedKind.TikTok;
}

interface EmailSignup {
	kind: EmbedKind.EmailSignup;
	alt: Option<string>;
	caption: Option<string>;
	src: string;
	tracking: EmbedTracksType;
	source: Option<string>;
	sourceDomain: Option<string>;
}

/**
 * Represents any third-party embed.
 */
type Embed = Generic | Instagram | Spotify | YouTube | EmailSignup | TikTok;

interface IFrame {
	src: string;
	width: number;
	height: number;
	component: string;
}

// ----- Setup ----- //

const youtube = 'https://www.youtube-nocookie.com';

// ----- Functions ----- //

const youtubeUrl = (id: string): string => {
	const params = new URLSearchParams({
		wmode: 'opaque',
		feature: 'oembed',
	});

	return `${youtube}/embed/${id}?${params.toString()}`;
};

const getNumericAttribute =
	(attr: string) =>
	(elem: Element): Option<number> =>
		Optional.fromNullable(elem.getAttribute(attr))
			.flatMap(parseIntOpt)
			.toOption();

const getAttribute =
	(attr: string) =>
	(elem: Element): Option<string> =>
		pipe(elem.getAttribute(attr), fromNullable);

const getPermalink = (blockquote: HTMLElement): Result<string, string> =>
	pipe(
		blockquote.getAttribute('data-instgrm-permalink'),
		resultFromNullable(
			"This blockquote didn't have a 'instgrm-permalink' attribute",
		),
	);

const parseInstagramHTML =
	(parser: DocParser) =>
	(html: string): Result<string, string> =>
		pipe(
			parser(html).querySelector('blockquote'),
			resultFromNullable(
				"I couldn't find a blockquote in the html for this embed",
			),
		).flatMap(getPermalink);

const getWidth = getNumericAttribute('width');
const getHeight = getNumericAttribute('height');
const getComponent = getAttribute('data-component');

const iframeAttributes = (iframe: HTMLIFrameElement): Result<string, IFrame> =>
	pipe(
		iframe.getAttribute('src'),
		resultFromNullable("This iframe didn't have a 'src' attribute"),
	).map((src) => ({
		src,
		width: withDefault(380)(getWidth(iframe)),
		height: withDefault(300)(getHeight(iframe)),
		component: withDefault('generic')(getComponent(iframe)),
	}));

const parseIframe =
	(parser: DocParser) =>
	(html: string): Result<string, IFrame> =>
		pipe(
			parser(html).querySelector('iframe'),
			resultFromNullable(
				"I couldn't find an iframe in the html for this embed",
			),
		).flatMap(iframeAttributes);

const genericHeight =
	(parser: DocParser) =>
	(html: string): number =>
		parseIframe(parser)(html).either(
			(_) => 300,
			(attrs) => attrs.height,
		);

const isGuardianDomain = (href: string): boolean => {
	try {
		return new URL(href).origin === 'https://www.theguardian.com';
	} catch (e) {
		return false;
	}
};

const extractVideoUrl = (element: BlockElement): Result<string, string> =>
	resultFromNullable("I can't find a 'url' field for this video embed")(
		element.videoTypeData?.url,
	);

const extractAudioHtml = (element: BlockElement): Result<string, string> =>
	resultFromNullable("I can't find an 'html' field for this audio embed")(
		element.audioTypeData?.html,
	);

const extractGenericHtml = (element: BlockElement): Result<string, string> =>
	resultFromNullable("I can't find an 'html' field for this generic embed")(
		element.embedTypeData?.html,
	);

const parseUrl = (url: string): Result<string, URL> =>
	Result.fromUnsafe(
		() => new URL(url),
		`The 'url' I was given is not valid: ${url}`,
	);

const getYoutubeIdParam = (url: URL): Result<string, string> =>
	resultFromNullable(
		`The YouTube 'url' is missing a 'v' parameter: ${url.toString()}`,
	)(url.searchParams.get('v'));

const extractInstagramUrl = (element: BlockElement): Result<string, string> =>
	resultFromNullable(
		"I can't find an 'originalUrl' field for this Instagram embed",
	)(element.instagramTypeData?.originalUrl);

const getInstagramPostId = (url: URL): Result<string, string> =>
	resultFromNullable(
		`The Instagram 'originalUrl' doesn't have an id in the path ${url.toString()}`,
	)(url.pathname.split('/')[2]);

const parseYoutubeVideo = (element: BlockElement): Result<string, YouTube> =>
	extractVideoUrl(element)
		.flatMap(parseUrl)
		.flatMap(getYoutubeIdParam)
		.map((id) => ({
			kind: EmbedKind.YouTube,
			id,
			width: element.videoTypeData?.width ?? 380,
			height: element.videoTypeData?.height ?? 300,
			source: fromNullable(element.videoTypeData?.source),
			sourceDomain: fromNullable(element.videoTypeData?.sourceDomain),
			tracking:
				element.tracking?.tracks ?? EmbedTracksType.DOES_NOT_TRACK,
		}));

const parseSpotifyAudio =
	(parser: DocParser) =>
	(element: BlockElement): Result<string, Spotify> =>
		extractAudioHtml(element)
			.flatMap(parseIframe(parser))
			.map(({ src, width, height }) => ({
				kind: EmbedKind.Spotify,
				src,
				width,
				height,
				source: fromNullable(element.audioTypeData?.source),
				sourceDomain: fromNullable(element.audioTypeData?.sourceDomain),
				tracking:
					element.tracking?.tracks ?? EmbedTracksType.DOES_NOT_TRACK,
			}));

const parseVideo = (element: BlockElement): Result<string, Embed> => {
	if (element.videoTypeData === undefined) {
		return Result.err(
			"I can't parse this video element, it has no 'videoTypeData' field",
		);
	}

	if (element.videoTypeData.source === 'YouTube') {
		return parseYoutubeVideo(element);
	}

	return Result.err(
		`I don't recognise the 'source' of this video element: ${
			element.videoTypeData.source ?? 'undefined'
		}`,
	);
};

const parseAudio =
	(parser: DocParser) =>
	(element: BlockElement): Result<string, Embed> => {
		if (element.audioTypeData === undefined) {
			return Result.err(
				"I can't parse this audio element, it has no 'audioTypeData' field",
			);
		}

		if (element.audioTypeData.source === 'Spotify') {
			return parseSpotifyAudio(parser)(element);
		}

		return Result.err(
			`I don't recognise the 'source' of this audio element: ${
				element.audioTypeData.source ?? 'undefined'
			}`,
		);
	};

const parseInstagram = (element: BlockElement): Result<string, Embed> => {
	if (element.instagramTypeData === undefined) {
		return Result.err(
			"I can't parse this Instagram element, it has no 'instagramTypeData' field",
		);
	}

	return extractInstagramUrl(element)
		.flatMap(parseUrl)
		.flatMap(getInstagramPostId)
		.map((id) => ({
			kind: EmbedKind.Instagram,
			id,
			caption: fromNullable(
				element.instagramTypeData?.caption ??
					element.instagramTypeData?.alt,
			),
			source: fromNullable(element.instagramTypeData?.source),
			sourceDomain: fromNullable(element.instagramTypeData?.sourceDomain),
			tracking:
				element.tracking?.tracks ?? EmbedTracksType.DOES_NOT_TRACK,
		}));
};

const parseGenericEmbedKind =
	(parser: DocParser) =>
	(element: BlockElement) =>
	(html: string): EmbedKind.TikTok | EmbedKind.Generic => {
		if (element.embedTypeData?.source === 'TikTok') {
			return EmbedKind.TikTok;
		}
		return EmbedKind.Generic;
	};

const extractIdFromInstagramUrl = (url: string): string => {
	const splitUrl = url.split('/');
	return splitUrl[splitUrl.length - 2];
};

const extractInstagramId =
	(parser: DocParser) =>
	(html: string): Result<string, string> =>
		parseInstagramHTML(parser)(html).map(extractIdFromInstagramUrl);

const parseGenericInstagram =
	(parser: DocParser) =>
	(element: BlockElement): Result<string, Instagram> =>
		extractGenericHtml(element)
			.flatMap(extractInstagramId(parser))
			.map(
				(id: string): Instagram => ({
					kind: EmbedKind.Instagram,
					id,
					caption: fromNullable(element.embedTypeData?.alt),
					tracking:
						element.tracking?.tracks ??
						EmbedTracksType.DOES_NOT_TRACK,
				}),
			);

const emailFromIframe =
	(element: BlockElement) =>
	(iframe: IFrame): Result<string, EmailSignup> => {
		if (
			iframe.component.includes('email-embed') &&
			isGuardianDomain(iframe.src)
		) {
			return Result.ok({
				kind: EmbedKind.EmailSignup,
				src: iframe.src,
				alt: fromNullable(element.embedTypeData?.alt),
				caption: fromNullable(element.embedTypeData?.caption),
				tracking:
					element.tracking?.tracks ?? EmbedTracksType.DOES_NOT_TRACK,
				source: fromNullable(element.embedTypeData?.source),
				sourceDomain: fromNullable(element.embedTypeData?.sourceDomain),
			});
		} else {
			return Result.err('element is not an email signup');
		}
	};

const parseEmailSignup =
	(parser: DocParser) =>
	(element: BlockElement): Result<string, EmailSignup> =>
		extractGenericHtml(element)
			.flatMap(parseIframe(parser))
			.flatMap(emailFromIframe(element));

const parseGeneric =
	(parser: DocParser) =>
	(element: BlockElement): Result<string, Embed> => {
		if (element.embedTypeData === undefined) {
			return Result.err(
				"I can't parse this generic embed, it has no 'embedTypeData' field",
			);
		}

		if (element.embedTypeData.source === 'Instagram') {
			return parseGenericInstagram(parser)(element);
		}

		const emailSignup = parseEmailSignup(parser)(element);
		if (emailSignup.isOk()) {
			return emailSignup;
		}

		return extractGenericHtml(element).map(
			(html: string): Generic | TikTok => ({
				kind: parseGenericEmbedKind(parser)(element)(html),
				alt: fromNullable(element.embedTypeData?.alt),
				html,
				height: genericHeight(parser)(html),
				mandatory: element.embedTypeData?.isMandatory ?? false,
				source: fromNullable(element.embedTypeData?.source),
				sourceDomain: fromNullable(element.embedTypeData?.sourceDomain),
				// If there's no tracking information the embed does not track
				tracking:
					element.tracking?.tracks ?? EmbedTracksType.DOES_NOT_TRACK,
			}),
		);
	};

// ----- Exports ----- //

export type {
	Embed,
	Generic,
	Spotify,
	YouTube,
	Instagram,
	EmailSignup,
	TikTok,
	GenericFields,
};

export {
	EmbedKind,
	parseVideo,
	parseAudio,
	parseGeneric,
	parseInstagram,
	youtubeUrl,
};
