import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { customSubnav } from '../../fixtures/manual/customSubnav';
import { trails as highlightsTrails } from '../../fixtures/manual/highlights-trails';
import { trails } from '../../fixtures/manual/trails';
import type { DCRFrontCard } from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

const trail = {
	...highlightsTrails[6]!,
	showMiniNav: true,
	boostLevel: 'boost',
	miniNavData: { ...customSubnav, format: 'compact' },
} satisfies DCRFrontCard;

const meta = {
	component: FrontCard,
	title: 'Components/FrontCard/MiniNav',
	args: {
		trail,
		containerType: 'flexible/general',
		mediaPositionOnMobile: 'left',
		mediaPositionOnDesktop: 'right',
		mediaSize: 'small',
		imageLoading: 'eager',
		serverTime: 1641038400000,
	},
	decorators: [
		(Story) => (
			<div
				css={css`
					max-width: 620px;
					margin: 20px;
				`}
			>
				<UL>
					<LI>
						<Story />
					</LI>
					<LI>
						<FrontCard
							trail={{
								...trails[5],
								showMiniNav: false,
								miniNavData: undefined,
							}}
							imageLoading="eager"
							mediaPositionOnMobile="left"
							mediaPositionOnDesktop="right"
							mediaSize="small"
							serverTime={1641038400000}
						/>
					</LI>
				</UL>
			</div>
		),
	],
} satisfies Meta<typeof FrontCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BelowBoostedLevel = {
	args: {
		trail: {
			...trail,
			boostLevel: 'default',
		},
	},
} satisfies Story;

export const HeaderIsLink = {} satisfies Story;

export const HeaderIsNotLink = {
	args: {
		trail: {
			...trail,
			miniNavData: {
				...trail.miniNavData,
				header: {
					...customSubnav.header,
					dotcomPath: undefined,
				},
			},
		},
	},
} satisfies Story;

export const HiddenHeader = {
	args: {
		trail: {
			...trail,
			miniNavData: {
				...trail.miniNavData,
				header: {
					...customSubnav.header,
					showHeaderText: false,
				},
			},
		},
	},
} satisfies Story;
