import { css } from '@emotion/react';
import type { Pillar } from '@guardian/libs';
import { palette as sourcePalette } from '@guardian/source/foundations';
import type { Meta } from '@storybook/react';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { nav } from '../../Nav/Nav.mock';
import { TitlepiecePillars } from './TitlepiecePillars';

const wrapperStyles = css`
	padding: 20px;
	background-color: ${sourcePalette.brand[400]};
`;

const meta = {
	title: 'Components/Masthead/Titlepiece/Pillars',
	args: {
		nav,
		editionId: 'UK',
		selectedPillar: nav.pillars[0]?.pillar as Pillar,
		dataLinkName: nestedOphanComponents('header', 'titlepiece', 'nav'),
		isImmersive: false,
		showBurgerMenu: false,
		hasPageSkin: false,
	},
	render: (args) => (
		<div css={wrapperStyles}>
			<TitlepiecePillars {...args} />
		</div>
	),
} satisfies Meta<typeof TitlepiecePillars>;

export default meta;

export const Default = {};

export const WithBurgerMenu = { args: { showBurgerMenu: true } };
