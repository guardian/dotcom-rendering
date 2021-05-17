import React, { ReactChild } from 'react';

export const StickyAd = ({ children }: { children: ReactChild }) => {
	return <amp-sticky-ad layout="nodisplay">{children}</amp-sticky-ad>;
};
