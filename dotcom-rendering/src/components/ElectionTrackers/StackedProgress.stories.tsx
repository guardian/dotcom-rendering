import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../../.storybook/modes';
import { palette } from '../../palette';
import { StackedProgress } from './StackedProgress';

const meta = {
	title: 'Components/Election Trackers/Stacked Progress',
	component: StackedProgress,
	decorators: (Story) => (
		<div css={{ paddingTop: 60, paddingBottom: 30 }}>
			<Story />
		</div>
	),
	parameters: {
		viewport: {
			defaultViewport: 'mobileLandscape',
		},
		chromatic: {
			modes: {
				'vertical mobileLandscape':
					allModes['vertical mobileLandscape'],
			},
		},
	},
} satisfies Meta<typeof StackedProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UKGeneral = {
	args: {
		total: 650,
		toWinCopy: 'for majority',
		sections: [
			{
				name: 'Labour',
				colour: palette('--uk-elections-labour'),
				value: 400,
				align: 'left',
			},
			{
				name: 'Conservative',
				colour: palette('--uk-elections-conservative'),
				value: 100,
				align: 'right',
			},
			{
				name: 'Lib Dem',
				colour: palette('--uk-elections-lib-dem'),
				value: 70,
				align: 'left',
			},
			{
				name: 'SNP',
				colour: palette('--uk-elections-snp'),
				value: 10,
				align: 'left',
			},
			{
				name: 'Reform',
				colour: palette('--uk-elections-reform'),
				value: 5,
				align: 'right',
			},
		],
	},
} satisfies Story;

export const USPresidential = {
	args: {
		total: 538,
		toWinCopy: 'to win',
		sections: [
			{
				name: 'Harris',
				colour: palette('--us-elections-democrats'),
				value: 200,
				align: 'left',
			},
			{
				name: 'Trump',
				colour: palette('--us-elections-republicans'),
				value: 200,
				align: 'right',
			},
		],
	},
} satisfies Story;

export const EUParliament = {
	args: {
		total: 720,
		toWinCopy: undefined,
		sections: [
			{
				colour: palette('--eu-parliament-theleft'),
				name: 'Left',
				value: 40,
				align: 'left',
			},
			{
				name: 'S&D',
				colour: palette('--eu-parliament-sd'),
				value: 100,
				align: 'left',
			},
			{
				name: 'Grn/EFA',
				colour: palette('--eu-parliament-greensefa'),
				value: 40,
				align: 'left',
			},
			{
				name: 'Renew',
				colour: palette('--eu-parliament-renew'),
				value: 60,
				align: 'left',
			},
			{
				name: 'EPP',
				colour: palette('--eu-parliament-epp'),
				value: 150,
				align: 'left',
			},
			{
				name: 'ECR',
				colour: palette('--eu-parliament-ecr'),
				value: 60,
				align: 'left',
			},
			{
				name: 'NI',
				colour: palette('--eu-parliament-ni'),
				value: 30,
				align: 'left',
			},
			{
				name: 'PfE',
				colour: palette('--eu-parliament-unknown'),
				value: 70,
				align: 'left',
			},
			{
				name: 'ESN',
				colour: palette('--eu-parliament-unknown'),
				value: 20,
				align: 'left',
			},
		],
	},
} satisfies Story;
