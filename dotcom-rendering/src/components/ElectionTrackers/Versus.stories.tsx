import { palette as sourcePalette } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../../.storybook/modes';
import { palette } from '../../palette';
import { Versus } from './Versus';

const meta = {
	title: 'Components/Election Trackers/Versus',
	component: Versus,
	parameters: {
		viewport: {
			defaultViewport: 'mobileMedium',
		},
		colourSchemeBackground: {
			dark: sourcePalette.neutral[20],
		},
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
} satisfies Meta<typeof Versus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UKGeneral = {
	args: {
		left: {
			name: 'Labour',
			abbreviation: 'Lab',
			value: 412,
			change: 214,
			image: {
				url: new URL(
					'https://uploads.guim.co.uk/2024/06/24/Starmer.png',
				),
				alt: 'Watercolour portrait of Sir Keir Starmer',
			},
			colour: palette('--uk-elections-labour'),
		},
		right: {
			name: 'Conservatives',
			abbreviation: 'Con',
			value: 121,
			change: -252,
			image: {
				url: new URL('https://uploads.guim.co.uk/2024/06/24/Sunak.png'),
				alt: 'Watercolour portrait of Rishi Sunak',
			},
			colour: palette('--uk-elections-conservative'),
		},
		colour: 'name',
		faded: false,
		banner: undefined,
	},
} satisfies Story;

export const UKExitPoll = {
	args: {
		left: {
			name: UKGeneral.args.left.name,
			abbreviation: UKGeneral.args.left.abbreviation,
			image: UKGeneral.args.left.image,
			colour: UKGeneral.args.left.colour,
			value: 0,
			description: 'seats declared',
		},
		right: {
			name: UKGeneral.args.right.name,
			abbreviation: UKGeneral.args.right.abbreviation,
			image: UKGeneral.args.right.image,
			colour: UKGeneral.args.right.colour,
			value: 0,
			description: 'seats declared',
		},
		colour: 'name',
		faded: true,
		banner: 'Exit poll',
	},
	decorators: (Story) => (
		<div css={{ paddingBottom: 20 }}>
			<Story />
		</div>
	),
} satisfies Story;

export const USPresidential = {
	args: {
		left: {
			name: 'Kamala Harris',
			abbreviation: 'Harris',
			value: 226,
			description: 'Electoral college votes',
			image: {
				url: new URL(
					'https://uploads.guim.co.uk/2024/08/27/kamala-harris-watercolour.png',
				),
				alt: 'Watercolour portrait of Kamala Harris',
			},
			colour: palette('--us-elections-democrats'),
		},
		right: {
			name: 'Donald Trump',
			abbreviation: 'Trump',
			value: 312,
			description: 'Electoral college votes',
			image: {
				url: new URL(
					'https://uploads.guim.co.uk/2024/08/27/donald-trump-watercolour.png',
				),
				alt: 'Watercolour portrait of Donald Trump',
			},
			colour: palette('--us-elections-republicans'),
		},
		colour: 'value',
		faded: false,
		banner: undefined,
	},
} satisfies Story;
