import React from 'react';

import { RichLink, DefaultRichLink } from '@root/src/web/components/RichLink';

import { useApi } from '@root/src/web/lib/api';
import { decideTheme } from '@root/src/web/lib/decideTheme';
import { Design, Display } from '@guardian/types';

type Props = {
	element: RichLinkBlockElement;
	pillar: Theme;
	ajaxEndpoint: string;
	richLinkIndex: number;
};

type CardStyle =
	| 'special-report'
	| 'live'
	| 'dead'
	| 'feature'
	| 'editorial'
	| 'comment'
	| 'podcast'
	| 'media'
	| 'analysis'
	| 'review'
	| 'letters'
	| 'external'
	| 'news';

interface CAPIRichLinkType {
	cardStyle: CardStyle;
	thumbnailUrl: string;
	headline: string;
	contentType: ContentType;
	url: string;
	tags: TagType[];
	sponsorName: string;
	pillar: CAPIPillar;
	starRating?: number;
	contributorImage?: string;
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
	return (
		<RichLink
			richLinkIndex={richLinkIndex}
			cardStyle={data.cardStyle}
			thumbnailUrl={data.thumbnailUrl}
			headlineText={data.headline}
			contentType={data.contentType}
			url={data.url}
			starRating={data.starRating}
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: decideTheme({ pillar: data.pillar }),
			}}
			tags={data.tags}
			sponsorName={data.sponsorName}
			contributorImage={data.contributorImage}
		/>
	);
};
