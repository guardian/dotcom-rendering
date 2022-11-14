import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import type { TagType } from '../../types/tag';
import { decideFormat } from '../lib/decideFormat';
import { useApi } from '../lib/useApi';
import type { RichLinkImageData } from './RichLink';
import { RichLink } from './RichLink';

type Props = {
	element: RichLinkBlockElement;
	ajaxUrl: string;
	richLinkIndex: number;
	format: ArticleFormat;
};

interface CAPIRichLinkType {
	cardStyle: RichLinkCardType;
	thumbnailUrl: string;
	headline: string;
	contentType: ContentType;
	url: string;
	tags: TagType[];
	sponsorName: string;
	format: CAPIFormat;
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

const buildUrl: (element: RichLinkBlockElement, ajaxUrl: string) => string = (
	element,
	ajaxUrl,
) => {
	const path = new URL(element.url).pathname;
	return `${ajaxUrl}/embed/card${path}.json?dcr=true`;
};

export const RichLinkComponent = ({
	element,
	ajaxUrl,
	richLinkIndex,
	format,
}: Props) => {
	const url = buildUrl(element, ajaxUrl);
	const { data, error } = useApi<CAPIRichLinkType>(url);

	if (error) {
		// Send the error to Sentry
		window.guardian.modules.sentry.reportError(error, 'rich-link');
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
