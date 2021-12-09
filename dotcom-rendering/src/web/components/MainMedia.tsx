import { css } from '@emotion/react';

import { until } from '@guardian/source-foundations';
import { ArticleDisplay, ArticleDesign } from '@guardian/libs';

import { renderArticleElement } from '@root/src/web/lib/renderElement';
import { getZIndex } from '@frontend/web/lib/getZIndex';

const mainMedia = css`
	height: 100%;
	min-height: 1px;
	/*
    Thank you IE11, broken in stasis for all eternity.

    https://github.com/philipwalton/flexbugs/issues/75#issuecomment-161800607
    */

	${until.tablet} {
		margin: 0;
		order: 2;
	}

	img {
		flex: 0 0 auto; /* IE */
		width: 100%;
		height: 100%;
	}
`;

const noGutters = css`
	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
	}

	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const immersiveWrapper = css`
	/*
        Immersive main media is wrapped in a flex div with height 100vw and then
        we use this grow here to ensure the content fills the available height
    */
	flex-grow: 1;
	${getZIndex('mainMedia')}
	/* Prevent the immersive image 100vh from spilling into main content */
    overflow: hidden;
`;

const chooseWrapper = (format: ArticleFormat) => {
	switch (format.display) {
		case ArticleDisplay.Immersive:
			return immersiveWrapper;
		case ArticleDisplay.Standard: {
			switch (format.design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return '';
				default:
					return noGutters;
			}
		}
		default:
			return noGutters;
	}
};

export const MainMedia: React.FC<{
	format: ArticleFormat;
	palette: Palette;
	elements: CAPIElement[];
	hideCaption?: boolean;
	adTargeting?: AdTargeting;
	starRating?: number;
	host?: string;
	pageId: string;
	webTitle: string;
}> = ({
	elements,
	format,
	palette,
	hideCaption,
	adTargeting,
	starRating,
	host,
	pageId,
	webTitle,
}) => {
	return (
		<div css={[mainMedia, chooseWrapper(format)]}>
			{elements.map((element, index) =>
				renderArticleElement({
					format,
					palette,
					element,
					adTargeting,
					host,
					index,
					isMainMedia: true,
					starRating,
					hideCaption,
					pageId,
					webTitle,
				}),
			)}
		</div>
	);
};
