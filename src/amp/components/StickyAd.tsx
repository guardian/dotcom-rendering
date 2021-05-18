import React from 'react';
import { Ad } from './Ad';
import type { AdProps } from './Ad';

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
