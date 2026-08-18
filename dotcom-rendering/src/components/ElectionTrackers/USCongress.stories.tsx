import { expect, within } from 'storybook/test';
import { allModes } from '../../../.storybook/modes';
import preview from '../../../.storybook/preview';
import { palette } from '../../palette';
import { USCongress } from './USCongress';

/**
 * Results from 2024:
 * https://www.theguardian.com/us-news/ng-interactive/2024/nov/14/us-house-senate-and-governor-elections-2024-results-from-all-50-states
 */
const meta = preview.meta({
	title: 'Components/Election Trackers/US Congress',
	component: USCongress,
	parameters: {
		colourSchemeBackground: {
			light: palette('--article-background'),
			dark: palette('--article-background'),
		},
		chromatic: {
			modes: {
				'vertical mobile': allModes['vertical mobileMedium'],
				'vertical tablet': allModes['vertical tablet'],
				'vertical wide': allModes['vertical tablet'],
			},
		},
	},
});

export const Empty = meta.story({
	args: {
		house: {
			versus: {
				democrats: {
					includesIndependents: false,
					value: 0,
					change: 0,
				},
				republicans: {
					includesIndependents: false,
					value: 0,
					change: 0,
				},
			},
			stackedProgress: {
				total: 435,
				democratValue: 0,
				othersValue: 0,
				republicanValue: 0,
			},
			progressNumber: {
				progress: 0,
				total: 435,
				includesIndependents: false,
			},
		},
		senate: {
			versus: {
				democrats: {
					includesIndependents: false,
					value: 28,
					change: 0,
				},
				republicans: {
					includesIndependents: false,
					value: 38,
					change: 0,
				},
			},
			stackedProgress: {
				total: 34,
				democratHoldovers: 28,
				democratValue: 0,
				othersHoldovers: 0,
				othersValue: 0,
				republicanHoldovers: 38,
				republicanValue: 0,
			},
			progressNumber: {
				progress: 0,
				total: 34,
				includesIndependents: false,
			},
		},
		link: new URL('https://www.theguardian.com'),
		linkText: 'Full results',
	},
	async play({ args, canvasElement }) {
		const canvas = within(canvasElement);

		// Numbers
		const p = canvas.getAllByRole('paragraph');
		await expect(p[0]?.textContent).toBe('DemocratsDemocrats280');
		await expect(p[1]?.textContent).toBe('RepublicansRepublicans380');
		await expect(p[2]?.textContent).toBe('0/34 races called');
		await expect(p[3]?.textContent).toBe('DemocratsDemocrats00');
		await expect(p[4]?.textContent).toBe('RepublicansRepublicans00');
		await expect(p[5]?.textContent).toBe('0/435 races called');

		// Progress bars
		const bars = canvas.getAllByRole('progressbar');
		await expect(bars[0]).toHaveValue(0);
		await expect(bars[0]).toHaveAttribute(
			'aria-valuemax',
			args.senate.stackedProgress.total.toString(),
		);
		await expect(bars[1]).toHaveValue(0);
		await expect(bars[1]).toHaveAttribute(
			'aria-valuemax',
			args.house.stackedProgress.total.toString(),
		);

		// Link
		const links = canvas.getAllByRole('link');
		for (const link of links) {
			await expect(link.textContent).toBe(args.linkText);
			await expect(link).toHaveAttribute('href', args.link.href);
		}
	},
});

export const Final = Empty.extend({
	args: {
		house: {
			versus: {
				democrats: {
					includesIndependents: false,
					value: 215,
					change: 1,
				},
				republicans: {
					includesIndependents: false,
					value: 220,
					change: -1,
				},
			},
			stackedProgress: {
				total: Empty.composed.args.house.stackedProgress.total,
				democratValue: 215,
				othersValue: 0,
				republicanValue: 220,
			},
			progressNumber: {
				progress: 435,
				total: Empty.composed.args.house.progressNumber.total,
				includesIndependents: false,
			},
		},
		senate: {
			versus: {
				democrats: {
					includesIndependents: true,
					value: 47,
					change: -4,
				},
				republicans: {
					includesIndependents: false,
					value: 53,
					change: 4,
				},
			},
			stackedProgress: {
				...Empty.composed.args.senate.stackedProgress,
				democratValue: 19,
				othersValue: 0,
				republicanValue: 15,
			},
			progressNumber: {
				progress: 34,
				total: Empty.composed.args.senate.progressNumber.total,
				includesIndependents: true,
			},
		},
	},
	async play({ args, canvasElement }) {
		const canvas = within(canvasElement);

		// Numbers
		const p = canvas.getAllByRole('paragraph');
		await expect(p[0]?.textContent).toBe('Democrats*Democrats*47-4');
		await expect(p[1]?.textContent).toBe('RepublicansRepublicans53+4');
		await expect(p[2]?.textContent).toBe('*includes independents');
		await expect(p[3]?.textContent).toBe('34/34 races called');
		await expect(p[4]?.textContent).toBe('DemocratsDemocrats215+1');
		await expect(p[5]?.textContent).toBe('RepublicansRepublicans220-1');
		await expect(p[6]?.textContent).toBe('435/435 races called');

		// Progress bars
		const bars = canvas.getAllByRole('progressbar');
		await expect(bars[0]).toHaveValue(args.senate.stackedProgress.total);
		await expect(bars[0]).toHaveAttribute(
			'aria-valuemax',
			args.senate.stackedProgress.total.toString(),
		);
		await expect(bars[1]).toHaveValue(args.house.stackedProgress.total);
		await expect(bars[1]).toHaveAttribute(
			'aria-valuemax',
			args.house.stackedProgress.total.toString(),
		);

		// Link
		const links = canvas.getAllByRole('link');
		for (const link of links) {
			await expect(link.textContent).toBe(args.linkText);
			await expect(link).toHaveAttribute('href', args.link.href);
		}
	},
});
