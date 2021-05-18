import React, { ReactChild } from 'react';

/* A wrapper component for <Ad /> which makes the ad show in a sticky footer
   Add to article like this:
	<StickyAd>
		<Ad
			isSticky={true}
			...
		/>
	</StickyAd>
*/
export const StickyAd = ({ children }: { children: ReactChild }) => {
	return <amp-sticky-ad layout="nodisplay">{children}</amp-sticky-ad>;
};
