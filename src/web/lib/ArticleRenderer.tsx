import React from 'react';
import { css } from 'emotion';

import { renderArticleElement } from '@root/src/web/lib/renderElement';
import { withSignInGateSlot } from '@root/src/web/lib/withSignInGateSlot';
import { Format } from '@guardian/types';

// This is required for spacefinder to work!
const commercialPosition = css`
	position: relative;
`;

export const ArticleRenderer: React.FC<{
	format: Format;
	palette: Palette;
	elements: CAPIElement[];
	adTargeting?: AdTargeting;
	host?: string;
}> = ({ format, palette, elements, adTargeting, host }) => {
	const output = elements.map((element, index) => {
		return renderArticleElement({
			format,
			palette,
			element,
			adTargeting,
			host,
			index,
			isMainMedia: false,
		});
	});

	// const cleanedElements = elements.map(element =>
	//     'html' in element ? { ...element, html: clean(element.html) } : element,
	// );
	// ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
	//    But should be soon.
	return (
		<div
			className={`article-body-commercial-selector ${commercialPosition} article-body-viewer-selector`}
		>
			{/* Insert the placeholder for the sign in gate on the 2nd article element */}
			{withSignInGateSlot(output)}
		</div>
	); // classname that space finder is going to target for in-body ads in DCR
};
