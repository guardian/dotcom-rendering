import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { until } from '@guardian/source-foundations';
import { getZIndex } from '../lib/getZIndex';
import { RenderArticleElement } from '../lib/renderElement';

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

const chooseWrapper = (
	format: ArticleFormat,
	showMediaAboveHeadline?: boolean,
) => {
	switch (format.display) {
		case ArticleDisplay.Immersive:
			return immersiveWrapper;
		case ArticleDisplay.Standard: {
			switch (format.design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					if (showMediaAboveHeadline) {
						return noGutters;
					} else {
						return '';
					}
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
	elements: CAPIElement[];
	hideCaption?: boolean;
	adTargeting?: AdTargeting;
	starRating?: number;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	switches: { [key: string]: boolean };
	showOverlayCaption?: boolean;
	showMediaAboveHeadline?: boolean;
}> = ({
	elements,
	format,
	hideCaption,
	adTargeting,
	starRating,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	isAdFreeUser,
	isSensitive,
	switches,
	showOverlayCaption,
	showMediaAboveHeadline,
}) => {
	return (
		<div css={[mainMedia, chooseWrapper(format, showMediaAboveHeadline)]}>
			{elements.map((element, index) => (
				<RenderArticleElement
					// eslint-disable-next-line react/no-array-index-key -- This is only rendered once so we can safely use index to suppress the warning
					key={index}
					format={format}
					element={element}
					adTargeting={adTargeting}
					ajaxUrl={ajaxUrl}
					host={host}
					index={index}
					isMainMedia={true}
					pageId={pageId}
					webTitle={webTitle}
					isAdFreeUser={isAdFreeUser}
					isSensitive={isSensitive}
					switches={switches}
					hideCaption={hideCaption}
					starRating={starRating}
					showOverlayCaption={showOverlayCaption}
					showMediaAboveHeadline={showMediaAboveHeadline}
				/>
			))}
		</div>
	);
};
