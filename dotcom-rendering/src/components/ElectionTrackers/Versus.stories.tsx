import { palette as sourcePalette } from '@guardian/source/foundations';
import { allModes } from '../../../.storybook/modes';
import preview from '../../../.storybook/preview';
import { palette } from '../../palette';
import { Versus } from './Versus';

const meta = preview.meta({
	title: 'Components/Election Trackers/Versus',
	component: Versus,
	parameters: {
		colourSchemeBackground: {
			dark: sourcePalette.neutral[20],
		},
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
});

export const UKGeneral = meta.story({
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
});

export const UKExitPoll = meta.story({
	args: {
		left: {
			name: UKGeneral.composed.args.left.name,
			abbreviation: UKGeneral.composed.args.left.abbreviation,
			image: UKGeneral.composed.args.left.image,
			colour: UKGeneral.composed.args.left.colour,
			value: 0,
			description: 'seats declared',
		},
		right: {
			name: UKGeneral.composed.args.right.name,
			abbreviation: UKGeneral.composed.args.right.abbreviation,
			image: UKGeneral.composed.args.right.image,
			colour: UKGeneral.composed.args.right.colour,
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
});

export const USPresidential = meta.story({
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
});

/**
 * Results from 2024:
 * https://www.theguardian.com/us-news/ng-interactive/2024/nov/14/us-house-senate-and-governor-elections-2024-results-from-all-50-states
 */
export const USHouse = meta.story({
	args: {
		left: {
			name: 'Democrats',
			abbreviation: 'Democrats',
			value: 215,
			change: 1,
			image: undefined,
			colour: palette('--us-elections-democrats'),
		},
		right: {
			name: 'Republicans',
			abbreviation: 'Republicans',
			value: 220,
			change: -1,
			image: undefined,
			colour: palette('--us-elections-republicans'),
		},
		colour: 'none',
		faded: false,
		banner: undefined,
	},
});
