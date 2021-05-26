import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import type { AdProps } from './Ad';
import { Ad } from './Ad';

// This CSS should be imported and added to global styles in amp/server/document.tsx to add the Advertisment label to the sticky
export const stickyAdLabelCss = `
amp-sticky-ad:before {
	content: 'Advertisement';
	display: block;
	${textSans.xsmall()};
	font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;
	padding: 3px 10px 0;
	color: ${text.supporting};
	text-align: right;
	line-height: 1;
	font-size: 0.75rem;
}`;

export const StickyAd = ({
	adRegion,
	edition,
	section,
	contentType,
	config,
	commercialProperties,
}: AdProps) => {
	return (
		<amp-sticky-ad layout="nodisplay">
			<Ad
				isSticky={true}
				adRegion={adRegion}
				edition={edition}
				section={section}
				contentType={contentType}
				config={config}
				commercialProperties={commercialProperties}
			/>
		</amp-sticky-ad>
	);
};
