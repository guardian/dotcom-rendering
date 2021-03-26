// ----- Imports ----- //

import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { EmbedTracksType } from '@guardian/content-api-models/v1/embedTracksType';
import {
	andThen,
	either,
	err,
	fromNullable,
	fromUnsafe,
	resultAndThen,
	resultMap,
	withDefault,
} from '@guardian/types';
import type { Option, Result } from '@guardian/types';
import { compose, parseIntOpt, pipe2, pipe3, resultFromNullable } from 'lib';
import type { DocParser } from 'types/parserContext';

// ----- Types ----- //

const enum EmbedKind {
	Generic,
	Instagram,
	Spotify,
	YouTube,
}

interface YouTube {
	kind: EmbedKind.YouTube;
	id: string;
	width: number;
	height: number;
}

interface Spotify {
	kind: EmbedKind.Spotify;
	src: string;
	width: number;
	height: number;
}

interface Instagram {
	kind: EmbedKind.Instagram;
	id: string;
	caption: Option<string>;
}

interface Generic {
	kind: EmbedKind.Generic;
	alt: Option<string>;
	html: string;
	height: number;
	mandatory: boolean;
	source: Option<string>;
	sourceDomain: Option<string>;
	tracking: EmbedTracksType;
}

/**
 * Represents any third-party embed.
 */
type Embed = Generic | Instagram | Spotify | YouTube;

interface IFrame {
	src: string;
	width: number;
	height: number;
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

const getNumericAttribute = (attr: string) => (elem: Element): Option<number> =>
	pipe2(elem.getAttribute(attr), fromNullable, andThen(parseIntOpt));

const getWidth = getNumericAttribute('width');
const getHeight = getNumericAttribute('height');

const iframeAttributes = (iframe: HTMLIFrameElement): Result<string, IFrame> =>
	pipe2(
		iframe.getAttribute('src'),
		resultFromNullable("This iframe didn't have a 'src' attribute"),
		resultMap((src) => ({
			src,
			width: withDefault(380)(getWidth(iframe)),
			height: withDefault(300)(getHeight(iframe)),
		})),
	);

const parseIframe = (parser: DocParser) => (
	html: string,
): Result<string, IFrame> =>
	pipe2(
		parser(html).querySelector('iframe'),
		resultFromNullable(
			"I couldn't find an iframe in the html for this embed",
		),
		resultAndThen(iframeAttributes),
	);

const genericHeight = (parser: DocParser): ((html: string) => number) =>
	compose(
		either(
			(_) => 300,
			(attrs: IFrame) => attrs.height,
		),
		parseIframe(parser),
	);

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
	fromUnsafe(
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
	pipe3(
		extractVideoUrl(element),
		resultAndThen(parseUrl),
		resultAndThen(getYoutubeIdParam),
		resultMap((id) => ({
			kind: EmbedKind.YouTube,
			id,
			width: element.videoTypeData?.width ?? 380,
			height: element.videoTypeData?.height ?? 300,
		})),
	);

const parseSpotifyAudio = (parser: DocParser) => (
	element: BlockElement,
): Result<string, Spotify> =>
	pipe2(
		extractAudioHtml(element),
		resultAndThen(parseIframe(parser)),
		resultMap(({ src, width, height }) => ({
			kind: EmbedKind.Spotify,
			src,
			width,
			height,
		})),
	);

const parseVideo = (element: BlockElement): Result<string, Embed> => {
	if (element.videoTypeData === undefined) {
		return err(
			"I can't parse this video element, it has no 'videoTypeData' field",
		);
	}

	if (element.videoTypeData.source === 'YouTube') {
		return parseYoutubeVideo(element);
	}

	return err(
		`I don't recognise the 'source' of this video element: ${
			element.videoTypeData.source ?? 'undefined'
		}`,
	);
};

const parseAudio = (parser: DocParser) => (
	element: BlockElement,
): Result<string, Embed> => {
	if (element.audioTypeData === undefined) {
		return err(
			"I can't parse this audio element, it has no 'audioTypeData' field",
		);
	}

	if (element.audioTypeData.source === 'Spotify') {
		return parseSpotifyAudio(parser)(element);
	}

	return err(
		`I don't recognise the 'source' of this audio element: ${
			element.audioTypeData.source ?? 'undefined'
		}`,
	);
};

const parseInstagram = (element: BlockElement): Result<string, Embed> => {
	if (element.instagramTypeData === undefined) {
		return err(
			"I can't parse this Instagram element, it has no 'instagramTypeData' field",
		);
	}

	return pipe3(
		extractInstagramUrl(element),
		resultAndThen(parseUrl),
		resultAndThen(getInstagramPostId),
		resultMap((id) => ({
			kind: EmbedKind.Instagram,
			id,
			caption: fromNullable(
				element.instagramTypeData?.caption ??
					element.instagramTypeData?.alt,
			),
		})),
	);
};

const parseGeneric = (parser: DocParser) => (
	element: BlockElement,
): Result<string, Embed> => {
	if (element.embedTypeData === undefined) {
		return err(
			"I can't parse this generic embed, it has no 'embedTypeData' field",
		);
	}

	return resultMap(
		(html: string): Generic => ({
			kind: EmbedKind.Generic,
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
	)(extractGenericHtml(element));
};

// ----- Exports ----- //

export type { Embed, Generic };

export {
	EmbedKind,
	parseVideo,
	parseAudio,
	parseGeneric,
	parseInstagram,
	youtubeUrl,
};
