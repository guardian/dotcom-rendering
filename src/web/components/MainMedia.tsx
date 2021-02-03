import React from 'react';
import { css, cx } from 'emotion';

import { until } from '@guardian/src-foundations/mq';

import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';
import { YoutubeBlockComponent } from '@root/src/web/components/elements/YoutubeBlockComponent';
import { YoutubeEmbedBlockComponent } from '@root/src/web/components/elements/YoutubeEmbedBlockComponent';
import { GuVideoBlockComponent } from '@root/src/web/components/elements/GuVideoBlockComponent';
import { EmbedBlockComponent } from '@root/src/web/components/elements/EmbedBlockComponent';
import { Display } from '@guardian/types';

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
	element: CAPIElement,
	format: Format,
	palette: Palette,
	i: number,
	hideCaption?: boolean,
	adTargeting?: AdTargeting,
	starRating?: number,
	host?: string,
) {
	switch (element._type) {
		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			return (
				<ImageComponent
					key={i}
					element={element}
					format={format}
					palette={palette}
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
						key={i}
						format={format}
						palette={palette}
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
						origin={host}
					/>
				</div>
			);
		case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
			return (
				<YoutubeEmbedBlockComponent
					format={format}
					palette={palette}
					embedUrl={element.embedUrl}
					height={element.height}
					width={element.width}
					caption={element.caption}
					credit={element.credit}
					title={element.title}
				/>
			);
		case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
			return (
				<GuVideoBlockComponent
					html={element.html}
					format={format}
					palette={palette}
					credit={element.source}
					caption={element.caption}
				/>
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
	format: Format;
	palette: Palette;
	elements: CAPIElement[];
	hideCaption?: boolean;
	adTargeting?: AdTargeting;
	starRating?: number;
	host?: string;
}> = ({
	elements,
	format,
	palette,
	hideCaption,
	adTargeting,
	starRating,
	host,
}) => (
	<div
		className={cx(
			mainMedia,
			format.display === Display.Immersive ? immersiveWrapper : noGutters,
		)}
	>
		{elements.map((element, i) =>
			renderElement(
				element,
				format,
				palette,
				i,
				hideCaption,
				adTargeting,
				starRating,
				host,
			),
		)}
	</div>
);
