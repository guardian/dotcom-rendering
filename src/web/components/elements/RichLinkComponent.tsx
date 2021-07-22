import { RichLink, RichLinkImageData } from '@root/src/web/components/RichLink';
import { DefaultRichLink } from '@root/src/web/components/DefaultRichLink';

import { useApi } from '@root/src/web/lib/useApi';
import { decideDisplay } from '@root/src/web/lib/decideDisplay';
import { decideDesign } from '@root/src/web/lib/decideDesign';
import { decideTheme } from '@root/src/web/lib/decideTheme';

type Props = {
	element: RichLinkBlockElement;
	ajaxEndpoint: string;
	richLinkIndex: number;
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
	imageAsset: ImageAsset;
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
	ajaxEndpoint,
	richLinkIndex,
}: Props) => {
	const url = buildUrl(element, ajaxEndpoint);
	const { data, loading, error } = useApi<CAPIRichLinkType>(url);

	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'rich-link');

		return (
			<DefaultRichLink
				index={richLinkIndex}
				headlineText={element.text}
				url={element.url}
			/>
		);
	}

	if (loading || !data) {
		// Only render once data is available
		return null;
	}

	const richLinkImageData: RichLinkImageData = {
		thumbnailUrl: data.thumbnailUrl,
		altText: data.imageAsset?.fields.altText,
		width: data.imageAsset?.fields.width,
		height: data.imageAsset?.fields.height,
	};

	return (
		<RichLink
			richLinkIndex={richLinkIndex}
			cardStyle={data.cardStyle}
			imageData={richLinkImageData}
			headlineText={data.headline}
			contentType={data.contentType}
			url={data.url}
			starRating={data.starRating}
			format={{
				display: decideDisplay(data.format),
				design: decideDesign(data.format),
				theme: decideTheme(data.format),
			}}
			tags={data.tags}
			sponsorName={data.sponsorName}
			contributorImage={data.contributorImage}
		/>
	);
};
