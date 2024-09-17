import { css } from '@emotion/react';
import type { Pillar } from '@guardian/libs';
import { palette as sourcePalette } from '@guardian/source/foundations';
import type { Meta } from '@storybook/react';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { nav } from './Nav.mock';
import { Pillars } from './Pillars';

const wrapperStyles = css`
	padding: 20px;
	background-color: ${sourcePalette.brand[400]};
`;

const meta = {
	title: 'Components/Masthead/Titlepiece/Pillars',
	args: {
		pillars: nav.pillars,
		selectedPillar: nav.pillars[0]?.pillar as Pillar,
		dataLinkName: nestedOphanComponents('header', 'titlepiece', 'nav'),
		hasPageSkin: false,
	},
	render: (args) => (
		<div css={wrapperStyles}>
			<Pillars {...args} />
		</div>
	),
} satisfies Meta<typeof Pillars>;

export default meta;

export const Default = {};
