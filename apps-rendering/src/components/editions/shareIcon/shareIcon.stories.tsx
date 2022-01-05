// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { withKnobs } from '@storybook/addon-knobs';
import type { ReactElement } from 'react';
import ShareIcon from '.';

// ----- Setup ----- //

const styles = (kickerColor: string): SerializedStyles => {
	return css`
		svg {
			flex: 0 0 1.875rem;
			padding-top: 0.375rem;
			width: 1.875rem;
			height: 1.875rem;

			circle {
				stroke: ${kickerColor};
			}

			path {
				fill: ${kickerColor};
			}
		}
	`;
};

// ----- Stories ----- //

const Default = (): ReactElement => {
	const kicker = text.kicker({
		theme: ArticlePillar.News,
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
	});

	return (
		<div css={styles(kicker)}>
			<ShareIcon />
		</div>
	);
};

// ----- Exports ----- //

export default {
	component: ShareIcon,
	title: 'AR/Editions/ShareIcon',
	decorators: [withKnobs],
};

export { Default };
