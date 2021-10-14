import { css } from '@emotion/react';

import { renderArticleElement } from '@root/src/web/lib/renderElement';
import { withSignInGateSlot } from '@root/src/web/lib/withSignInGateSlot';
import { ArticleDesign, ArticleFormat } from '@guardian/libs';
import { from } from '@guardian/src-foundations/mq';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { labelStyles as adLabelStyles } from '../components/AdSlot';

// This is required for spacefinder to work!
const commercialPosition = css`
	position: relative;
`;

// These styles are applied to dynamic ad slots (i.e. slots that are not fixed), e.g. ads inserted
// by spacefinder across all layout types (articles, comments, etc)
//
// spacefinder is scoped to placing elements in spaces within the .article-body-commercial-selector
// hence we scope the styles at the same level
const adStylesDynamic = css`
	${adLabelStyles}

	& .ad-slot.ad-slot--collapse {
		display: none;
	}

	.ad-slot--im {
		float: left;
		width: 130px;
		${from.mobileLandscape} {
			width: 220px;
		}

		&:not(.ad-slot--rendered) {
			width: 0;
			height: 0;
		}

		&.ad-slot--rendered {
			margin: 5px 10px 6px 0;
			${from.mobileLandscape} {
				margin-bottom: 12px;
				margin-right: 20px;
			}
		}
	}
`;

export const ArticleRenderer: React.FC<{
	format: ArticleFormat;
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
				format.design === ArticleDesign.Interactive
					? interactiveLegacyClasses.contentMainColumn
					: '',
			].join(' ')}
			css={[adStylesDynamic, commercialPosition]}
		>
			{/* Insert the placeholder for the sign in gate on the 2nd article element */}
			{withSignInGateSlot(output)}
		</div>
	); // classname that space finder is going to target for in-body ads in DCR
};
