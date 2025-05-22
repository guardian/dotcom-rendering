import { palette as sourcePalette } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../../.storybook/modes';
import { palette } from '../../palette';
import { ChangeBars } from './ChangeBars';

const meta = {
	title: 'Components/Election Trackers/Change Bars',
	component: ChangeBars,
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
} satisfies Meta<typeof ChangeBars>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UKLocal = {
	args: {
		changes: [
			{
				name: 'Conservative',
				abbreviation: 'Con',
				change: -635,
				colour: palette('--uk-elections-conservative'),
			},
			{
				name: 'Labour',
				abbreviation: 'Lab',
				change: -198,
				colour: palette('--uk-elections-labour'),
			},
			{
				name: 'Liberal Democrat',
				abbreviation: 'Lib Dem',
				change: 146,
				colour: palette('--uk-elections-liberal-democrat'),
			},
			{
				name: 'Reform UK',
				abbreviation: 'Reform',
				change: 648,
				colour: palette('--uk-elections-reform-uk'),
			},
			{
				name: 'Other',
				abbreviation: 'Other',
				change: -56,
				colour: palette('--uk-elections-others'),
			},
		],
	},
} satisfies Story;
