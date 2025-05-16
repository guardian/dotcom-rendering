import { palette as sourcePalette } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../../.storybook/modes';
import { palette } from '../../palette';
import { ValuesWithChange } from './ValuesWithChange';

const meta = {
	title: 'Components/Election Trackers/Values With Change',
	component: ValuesWithChange,
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
} satisfies Meta<typeof ValuesWithChange>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UKGeneral = {
	args: {
		valueDescription: 'Seats',
		changeDescription: 'Change in seats',
		values: [
			{
				name: 'Lab',
				value: 412,
				change: 214,
				colour: palette('--uk-elections-labour'),
			},
			{
				name: 'Con',
				value: 121,
				change: -252,
				colour: palette('--uk-elections-conservative'),
			},
			{
				name: 'Reform',
				value: 5,
				change: 5,
				colour: palette('--uk-elections-reform-uk'),
			},
			{
				name: 'LD',
				value: 72,
				change: 64,
				colour: palette('--uk-elections-liberal-democrat'),
			},
			{
				name: 'Green',
				value: 4,
				change: 3,
				colour: palette('--uk-elections-green'),
			},
			{
				name: 'SNP',
				value: 9,
				change: -38,
				colour: palette('--uk-elections-scottish-national-party'),
			},
			{
				name: 'SF',
				value: 7,
				change: 0,
				colour: palette('--uk-elections-sinn-féin'),
			},
			{
				name: 'WPB',
				value: 0,
				change: 0,
				colour: palette('--uk-elections-workers-party-of-britain'),
			},
			{
				name: 'PC',
				value: 4,
				change: 2,
				colour: palette('--uk-elections-plaid-cymru'),
			},
			{
				name: 'DUP',
				value: 5,
				change: -3,
				colour: palette('--uk-elections-democratic-unionist-party'),
			},
			{
				name: 'Alliance',
				value: 1,
				change: 0,
				colour: palette('--uk-elections-alliance'),
			},
			{
				name: 'UUP',
				value: 1,
				change: 1,
				colour: palette('--uk-elections-ulster-unionist-party'),
			},
			{
				name: 'SDLP',
				value: 2,
				change: 0,
				colour: palette(
					'--uk-elections-social-democratic-and-labour-party',
				),
			},
			{
				name: 'Alba',
				value: 0,
				change: 0,
				colour: palette('--uk-elections-alba'),
			},
			{
				name: 'Others',
				value: 7,
				change: 4,
				colour: palette('--uk-elections-others'),
			},
		],
	},
} satisfies Story;

export const UKLocal = {
	args: {
		valueDescription: 'Seats',
		changeDescription: 'Change in seats',
		values: [
			{
				name: 'Con',
				value: 319,
				change: -635,
				colour: palette('--uk-elections-conservative'),
			},
			{
				name: 'Lab',
				value: 98,
				change: -198,
				colour: palette('--uk-elections-labour'),
			},
			{
				name: 'Lib Dem',
				value: 370,
				change: 146,
				colour: palette('--uk-elections-liberal-democrat'),
			},
			{
				name: 'Green',
				value: 79,
				change: 41,
				colour: palette('--uk-elections-green'),
			},
			{
				name: 'Ind',
				value: 89,
				change: -95,
				colour: palette('--uk-elections-others'),
			},
			{
				name: 'Meb Ker',
				value: 3,
				change: -2,
				colour: palette('--uk-elections-others'),
			},
			{
				name: 'R',
				value: 2,
				change: 0,
				colour: palette('--uk-elections-others'),
			},
			{
				name: 'Reform',
				value: 677,
				change: 648,
				colour: palette('--uk-elections-reform-uk'),
			},
		],
	},
} satisfies Story;

export const EUParliament = {
	args: {
		valueDescription: 'Seats',
		changeDescription: 'Change in seats',
		values: [
			{
				name: 'Left',
				value: 46,
				change: 9,
				colour: palette('--eu-parliament-theleft'),
			},
			{
				name: 'S&D',
				value: 100,
				change: -3,
				colour: palette('--eu-parliament-sd'),
			},
			{
				name: 'Grn/EFA',
				value: 40,
				change: -19,
				colour: palette('--eu-parliament-greensefa'),
			},
			{
				name: 'Renew',
				value: 60,
				change: -25,
				colour: palette('--eu-parliament-renew'),
			},
			{
				name: 'EPP',
				value: 150,
				change: 12,
				colour: palette('--eu-parliament-epp'),
			},
			{
				name: 'ECR',
				value: 60,
				change: 9,
				colour: palette('--eu-parliament-ecr'),
			},
			{
				name: 'NI',
				value: 30,
				change: 0,
				colour: palette('--eu-parliament-ni'),
			},
			{
				name: 'PfE',
				value: 70,
				change: 0,
				colour: palette('--eu-parliament-unknown'),
			},
			{
				name: 'ESN',
				value: 20,
				change: 0,
				colour: palette('--eu-parliament-unknown'),
			},
		],
	},
} satisfies Story;
