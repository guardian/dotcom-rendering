import { decideFormat } from '../lib/decideFormat';
import { type ArticleFormat } from '../lib/format';
import { useApi } from '../lib/useApi';
import type { RichLinkBlockElement, StarRating } from '../types/content';
import type { FEFormat } from '../types/frontend';
import type { TagType } from '../types/tag';
import { RichLink } from './RichLink';

type Props = {
	element: RichLinkBlockElement;
	ajaxUrl: string;
	richLinkIndex: number;
	format: ArticleFormat;
};

interface FERichLinkType {
	cardStyle: RichLinkCardType;
	thumbnailUrl: string;
	headline: string;
	contentType: ContentType;
	url: string;
	tags: TagType[];
	sponsorName: string;
	format: FEFormat;
	starRating?: StarRating;
	contributorImage?: string;
	imageAsset?: ImageAsset;
}
interface ImageAsset {
	index: number;
	fields: ImageAssetFields;
	mediaType: string;
	url: string;
}
interface ImageAssetFields {
	displayCredit: string;
	source: string;
	photographer: string;
	isMaster: string;
	altText: string;
	height: string;
	credit: string;
	mediaId: string;
	width: string;
}

const buildUrl = (
	element: RichLinkBlockElement,
	ajaxUrl: string,
): string | undefined => {
	try {
		const path = new URL(element.url).pathname;
		return `${ajaxUrl}/embed/card${path}.json?dcr=true`;
	} catch (error) {
		console.error(`Failed to build a url with "${element.url}"`);
		return undefined;
	}
};

/**
 * Wrapper around `RichLink` which fetches the rich links’ images.
 *
 * ## Why does this need to be an Island?
 *
 * Rich links’ images and formats are not available on the CAPI response,
 * so they have to be fetched client-side, via the card embed endpoint;
 * e.g. <https://api.nextgen.guardianapps.co.uk/embed/card/football/2023/feb/08/erik-ten-hag-blasts-manchester-uniteds-start-as-unacceptable-against-leeds.json?dcr=true>
 *
 * This enables to have a richer look for these links, rather than simply their
 * headline and a grey “Read More” unaware of the pillar or design.
 *
 * ---
 *
 * [`RichLink` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-richlink)
 */
export const RichLinkComponent = ({
	element,
	ajaxUrl,
	richLinkIndex,
	format,
}: Props) => {
	/** Render a default (basic) rich link on the server */
	const fallbackData = {
		headline: element.text,
		url: element.url,
		thumbnailUrl: '',
		imageAsset: {
			fields: {
				altText: '',
				width: '',
				height: '',
				source: '',
				displayCredit: '',
				photographer: '',
				isMaster: '',
				credit: '',
				mediaId: '',
			},
			index: -1,
			mediaType: '',
			url: '',
		},
		contentType: 'article',
		format: {
			design: 'ArticleDesign',
			display: 'StandardDisplay',
			// We default to SpecialReport here purely because the greys of this theme
			// look better as the defaults
			theme: 'SpecialReportTheme',
		},
		cardStyle: 'news',
		tags: [],
		sponsorName: '',
	} satisfies FERichLinkType;

	const url = buildUrl(element, ajaxUrl);
	const { data, error } = useApi<FERichLinkType>(url, { fallbackData });

	if (error) {
		// Send the error to Sentry
		window.guardian.modules.sentry.reportError(error, 'rich-link');
	}

	if (!data) return null;

	const richLinkImageData = {
		thumbnailUrl: data.thumbnailUrl,
		altText: (data.imageAsset ?? fallbackData.imageAsset).fields.altText,
		width: (data.imageAsset ?? fallbackData.imageAsset).fields.width,
		height: (data.imageAsset ?? fallbackData.imageAsset).fields.height,
	} satisfies Parameters<typeof RichLink>[0]['imageData'];

	return (
		<RichLink
			richLinkIndex={richLinkIndex}
			cardStyle={data.cardStyle}
			imageData={richLinkImageData}
			headlineText={data.headline}
			contentType={data.contentType}
			url={data.url}
			starRating={data.starRating}
			linkFormat={decideFormat(data.format)}
			format={format}
			tags={data.tags}
			sponsorName={data.sponsorName}
			contributorImage={data.contributorImage}
			isPlaceholder={
				// This should never be the case, unless it’s fallback data
				// https://github.com/guardian/frontend/blob/8256fe148f9abb5842e30339ac64dfa43d758226/common/app/model/Asset.scala#L64
				data.imageAsset?.index === -1
			}
		/>
	);
};
