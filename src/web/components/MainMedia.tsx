import React from 'react';
import { css, cx } from 'emotion';

import { until } from '@guardian/src-foundations/mq';

import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';
import { YoutubeBlockComponent } from '@root/src/web/components/elements/YoutubeBlockComponent';
import { EmbedBlockComponent } from '@root/src/web/components/elements/EmbedBlockComponent';
import { Display } from '@guardian/types/Format';
import { getZIndex } from '@frontend/web/lib/getZIndex';

const mainMedia = css`
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

function renderElement(
	display: Display,
	designType: DesignType,
	element: CAPIElement,
	pillar: CAPIPillar,
	i: number,
	hideCaption?: boolean,
	adTargeting?: AdTargeting,
	starRating?: number,
) {
	switch (element._type) {
		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			return (
				<ImageComponent
					display={display}
					designType={designType}
					key={i}
					element={element}
					pillar={pillar}
					hideCaption={hideCaption}
					isMainMedia={true}
					role={element.role}
					starRating={starRating}
				/>
			);
		case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
			return (
				<div
					key={i}
					id={`youtube-block-main-media-${i}`}
					data-cy="main-media-youtube-atom"
				>
					<YoutubeBlockComponent
						display={display}
						designType={designType}
						key={i}
						pillar={pillar}
						hideCaption={hideCaption}
						// eslint-disable-next-line jsx-a11y/aria-role
						role="inline"
						adTargeting={adTargeting}
						isMainMedia={true}
						id={element.id}
						assetId={element.assetId}
						channelId={element.channelId}
						expired={element.expired}
						overrideImage={element.overrideImage}
						posterImage={element.posterImage}
						duration={element.duration}
					/>
				</div>
			);
		case 'model.dotcomrendering.pageElements.EmbedBlockElement':
			return (
				<EmbedBlockComponent html={element.html} alt={element.alt} />
			);
		default:
			// eslint-disable-next-line no-console
			console.warn(
				`The following main media element is not supported by DCR ${element._type}`,
			);
			return null;
	}
}

export const MainMedia: React.FC<{
	display: Display;
	designType: DesignType;
	elements: CAPIElement[];
	pillar: CAPIPillar;
	hideCaption?: boolean;
	adTargeting?: AdTargeting;
	starRating?: number;
}> = ({
	display,
	designType,
	elements,
	pillar,
	hideCaption,
	adTargeting,
	starRating,
}) => (
	<div
		className={cx(
			mainMedia,
			display === Display.Immersive ? immersiveWrapper : noGutters,
		)}
	>
		{elements.map((element, i) =>
			renderElement(
				display,
				designType,
				element,
				pillar,
				i,
				hideCaption,
				adTargeting,
				starRating,
			),
		)}
	</div>
);
