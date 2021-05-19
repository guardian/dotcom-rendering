import React from 'react';
import { Ad } from './Ad';
import type { AdProps } from './Ad';

// This CSS is added to global styles in document.tsx, to add the Advertisment label to the sticky
export const stickyAdLabel = `
amp-sticky-ad:before {
	content: 'Advertisement';
	display: block;
	font-family: GuardianTextSans,Guardian Text Sans Web,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
	font-size: 0.75rem;
	line-height: 1.5;
	font-weight: 400;
	font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;
	padding: 3px 10px;
	color: #767676;
	text-align: right;
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
