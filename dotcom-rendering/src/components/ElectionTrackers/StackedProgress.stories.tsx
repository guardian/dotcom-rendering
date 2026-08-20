import { expect, within } from 'storybook/test';
import { allModes } from '../../../.storybook/modes';
import preview from '../../../.storybook/preview';
import { palette } from '../../palette';
import { StackedProgress } from './StackedProgress';

const meta = preview.meta({
	title: 'Components/Election Trackers/Stacked Progress',
	component: StackedProgress,
	decorators: (Story) => (
		<div css={{ paddingTop: 60, paddingBottom: 30 }}>
			<Story />
		</div>
	),
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileLandscape':
					allModes['vertical mobileLandscape'],
			},
		},
	},
});

export const UKGeneral = meta.story({
	args: {
		total: 650,
		label: 'for majority',
		calculateWinner: true,
		excludedCopy: undefined,
		sections: [
			{
				name: 'Labour',
				colour: palette('--uk-elections-labour'),
				value: 400,
				align: 'left',
				exclude: false,
			},
			{
				name: 'Conservative',
				colour: palette('--uk-elections-conservative'),
				value: 100,
				align: 'right',
				exclude: false,
			},
			{
				name: 'Lib Dem',
				colour: palette('--uk-elections-liberal-democrat'),
				value: 70,
				align: 'left',
				exclude: false,
			},
			{
				name: 'SNP',
				colour: palette('--uk-elections-scottish-national-party'),
				value: 10,
				align: 'left',
				exclude: false,
			},
			{
				name: 'Reform',
				colour: palette('--uk-elections-reform-uk'),
				value: 5,
				align: 'right',
				exclude: false,
			},
		],
	},
	async play({ args, canvasElement }) {
		const canvas = within(canvasElement);
		const bars = canvas.getAllByRole('progressbar');

		for (const bar of bars) {
			// Label
			const label = bar.parentElement;
			await expect(label?.nodeName).toBe('LABEL');
			await expect(label?.textContent).toBe(`326 ${args.label}`);

			// Sections
			await expect(bar.children).toHaveLength(args.sections.length + 1);
		}
	},
});

export const USPresidential = meta.story({
	args: {
		total: 538,
		label: 'to win',
		calculateWinner: true,
		excludedCopy: undefined,
		sections: [
			{
				name: 'Harris',
				colour: palette('--us-elections-democrats'),
				value: 200,
				align: 'left',
				exclude: false,
			},
			{
				name: 'Trump',
				colour: palette('--us-elections-republicans'),
				value: 200,
				align: 'right',
				exclude: false,
			},
		],
	},
});

/**
 * Results from 2024:
 * https://www.theguardian.com/us-news/ng-interactive/2024/nov/14/us-house-senate-and-governor-elections-2024-results-from-all-50-states
 */
export const USSenate = meta.story({
	args: {
		total: 34,
		label: '50',
		calculateWinner: false,
		excludedCopy: 'No election',
		sections: [
			{
				name: 'Democrats',
				colour: palette('--us-elections-democrats-alt'),
				value: 28,
				align: 'left',
				exclude: true,
			},
			{
				name: 'Democrats',
				colour: palette('--us-elections-democrats'),
				value: 19,
				align: 'left',
				exclude: false,
			},
			{
				name: 'Republicans',
				colour: palette('--us-elections-republicans-alt'),
				value: 38,
				align: 'right',
				exclude: true,
			},
			{
				name: 'Republicans',
				colour: palette('--us-elections-republicans'),
				value: 15,
				align: 'right',
				exclude: false,
			},
		],
	},
	async play({ args, canvasElement }) {
		const canvas = within(canvasElement);
		const bars = canvas.getAllByRole('progressbar');

		for (const bar of bars) {
			// Progress bar
			await expect(bar.ariaLabel).toBe(
				`Progress to ${args.total.toString()}`,
			);
			await expect(bar).toHaveValue(
				args.sections[1]!.value + args.sections[3]!.value,
			);
			await expect(bar).toHaveAttribute(
				'aria-valuemax',
				args.total.toString(),
			);
			await expect(bar).toHaveAttribute(
				'aria-valuetext',
				`Progress so far: 34, values: Democrats ${args.sections[1]?.value}, Republicans ${args.sections[3]?.value}, No election: Democrats ${args.sections[0]?.value}, Republicans ${args.sections[2]?.value}.`,
			);

			// Label
			const label = bar.parentElement;
			await expect(label?.nodeName).toBe('LABEL');
			await expect(label?.textContent).toBe(args.label);

			// Sections
			await expect(bar.children).toHaveLength(args.sections.length + 1);
		}
	},
});

export const EUParliament = meta.story({
	args: {
		total: 720,
		label: undefined,
		calculateWinner: false,
		excludedCopy: undefined,
		sections: [
			{
				colour: palette('--eu-parliament-theleft'),
				name: 'Left',
				value: 40,
				align: 'left',
				exclude: false,
			},
			{
				name: 'S&D',
				colour: palette('--eu-parliament-sd'),
				value: 100,
				align: 'left',
				exclude: false,
			},
			{
				name: 'Grn/EFA',
				colour: palette('--eu-parliament-greensefa'),
				value: 40,
				align: 'left',
				exclude: false,
			},
			{
				name: 'Renew',
				colour: palette('--eu-parliament-renew'),
				value: 60,
				align: 'left',
				exclude: false,
			},
			{
				name: 'EPP',
				colour: palette('--eu-parliament-epp'),
				value: 150,
				align: 'left',
				exclude: false,
			},
			{
				name: 'ECR',
				colour: palette('--eu-parliament-ecr'),
				value: 60,
				align: 'left',
				exclude: false,
			},
			{
				name: 'NI',
				colour: palette('--eu-parliament-ni'),
				value: 30,
				align: 'left',
				exclude: false,
			},
			{
				name: 'PfE',
				colour: palette('--eu-parliament-unknown'),
				value: 70,
				align: 'left',
				exclude: false,
			},
			{
				name: 'ESN',
				colour: palette('--eu-parliament-unknown'),
				value: 20,
				align: 'left',
				exclude: false,
			},
		],
	},
	async play({ args, canvasElement }) {
		const canvas = within(canvasElement);
		const bars = canvas.getAllByRole('progressbar');

		for (const bar of bars) {
			// No label
			const noLabel = bar.parentElement;
			await expect(noLabel?.nodeName).toBe('DIV');
			await expect(noLabel?.textContent).toBe('');

			// Sections
			await expect(bar.children).toHaveLength(args.sections.length + 1);
		}
	},
});
