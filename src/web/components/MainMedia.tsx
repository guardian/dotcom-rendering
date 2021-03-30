import React from 'react';
import { css, cx } from 'emotion';

import { until } from '@guardian/src-foundations/mq';
import { Design, Display } from '@guardian/types';

import { ElementRenderer } from '@root/src/web/lib/ElementRenderer';
import { getZIndex } from '@frontend/web/lib/getZIndex';

const ieWorkaround = css`
	min-height: 1px;
	/*
    Thank you IE11, broken in stasis for all eternity.

    https://github.com/philipwalton/flexbugs/issues/75#issuecomment-161800607
    */
`;

const mobileStyles = css`
	${until.tablet} {
		margin: 0;
		order: 2;
	}
`;

const imgStyles = css`
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

export const MainMedia: React.FC<{
	format: Format;
	palette: Palette;
	elements: CAPIElement[];
	hideCaption?: boolean;
	adTargeting?: AdTargeting;
	starRating?: number;
	host?: string;
	abTests: CAPIType['config']['abTests'];
}> = ({
	elements,
	format,
	palette,
	hideCaption,
	adTargeting,
	starRating,
	host,
	abTests,
}) => (
	<div
		className={cx(
			ieWorkaround,
			imgStyles,
			format.display !== Display.Immersive &&
				format.design !== Design.Comment &&
				mobileStyles,
			format.display === Display.Immersive ? immersiveWrapper : noGutters,
		)}
	>
		{elements.map((element, index) => (
			<ElementRenderer
				element={element}
				format={format}
				palette={palette}
				index={index}
				hideCaption={hideCaption}
				adTargeting={adTargeting}
				starRating={starRating}
				host={host}
				abTests={abTests}
				isMainMedia={true}
			/>
		))}
	</div>
);
