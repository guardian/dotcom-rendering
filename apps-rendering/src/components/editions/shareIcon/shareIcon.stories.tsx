// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { Pillar } from '@guardian/types';
import { withKnobs } from '@storybook/addon-knobs';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import { getThemeStyles } from 'themeStyles';
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
	const theme = selectPillar(Pillar.News);
	const { kicker } = getThemeStyles(theme);

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
