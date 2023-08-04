import { text, textSans } from '@guardian/source-foundations';
import type { BaseAdProps } from './Ad.amp.tsx';
import { Ad } from './Ad.amp.tsx';

// This CSS should be imported and added to global styles in amp/server/document.tsx to add the Advertisement label to the sticky
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
	id,
	editionId,
	section,
	contentType,
	config,
	commercialProperties,
	adTargeting,
}: BaseAdProps) => {
	return (
		<amp-sticky-ad layout="nodisplay">
			<Ad
				id={id}
				editionId={editionId}
				section={section}
				contentType={contentType}
				commercialProperties={commercialProperties}
				config={config}
				adTargeting={adTargeting}
				adType={{ isSticky: true }}
			/>
		</amp-sticky-ad>
	);
};
