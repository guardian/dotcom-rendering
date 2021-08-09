import { css } from '@emotion/react';

import { renderArticleElement } from '@root/src/web/lib/renderElement';
import { withSignInGateSlot } from '@root/src/web/lib/withSignInGateSlot';
import { Design, Format } from '@guardian/types';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';

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
	pageId: string;
	webTitle: string;
}> = ({ format, palette, elements, adTargeting, host, pageId, webTitle }) => {
	const output = elements.map((element, index) => {
		return renderArticleElement({
			format,
			palette,
			element,
			adTargeting,
			host,
			index,
			isMainMedia: false,
			pageId,
			webTitle,
		});
	});

	// const cleanedElements = elements.map(element =>
	//     'html' in element ? { ...element, html: clean(element.html) } : element,
	// );
	// ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
	//    But should be soon.
	return (
		<div
			className={[
				'article-body-commercial-selector',
				'article-body-viewer-selector',

				// Note, this class MUST be on the *direct parent* of the
				// elements for some legacy interactive styling to work.
				format.design === Design.Interactive
					? interactiveLegacyClasses.contentMainColumn
					: '',
			].join(' ')}
			css={commercialPosition}
		>
			{/* Insert the placeholder for the sign in gate on the 2nd article element */}
			{withSignInGateSlot(output)}
		</div>
	); // classname that space finder is going to target for in-body ads in DCR
};
