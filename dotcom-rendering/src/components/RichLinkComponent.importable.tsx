import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import { decideFormat } from '../lib/decideFormat';
import { reportErrorToSentry } from '../lib/reportErrorToSentry';
import { useApi } from '../lib/useApi';
import type { RichLinkBlockElement } from '../types/content';
import type { TagType } from '../types/tag';
import type { RichLinkImageData } from './RichLink';
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
	starRating?: number;
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
	const url = buildUrl(element, ajaxUrl);
	const { data, error } = useApi<FERichLinkType>(url);

	if (error) {
		// Send the error to Sentry
		reportErrorToSentry(error, 'rich-link');
	}

	if (data?.imageAsset) {
		const richLinkImageData: RichLinkImageData = {
			thumbnailUrl: data.thumbnailUrl,
			altText: data.imageAsset.fields.altText,
			width: data.imageAsset.fields.width,
			height: data.imageAsset.fields.height,
		};

		return (
			// This is the enhanced rich link rendered on the client
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
			/>
		);
	}

	const defaultFormat = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		// We default to SpecialReport here purely because the greys of this theme
		// look better as the defaults
		theme: ArticleSpecial.SpecialReport,
	};

	return (
		// Render a default (basic) rich link on the server
		<RichLink
			richLinkIndex={richLinkIndex}
			cardStyle="news"
			imageData={{
				thumbnailUrl: '',
				altText: '',
				width: '',
				height: '',
			}}
			headlineText={element.text}
			contentType="article"
			url={element.url}
			linkFormat={defaultFormat}
			format={defaultFormat}
			tags={[]}
			sponsorName=""
			isPlaceholder={true}
		/>
	);
};
