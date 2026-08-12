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
			total: 435,
			democrats: {
				value: 0,
				change: 0,
			},
			caucusWithDemocrats: {
				value: 0,
				change: 0,
			},
			republicans: {
				value: 0,
				change: 0,
			},
			caucusWithRepublicans: {
				value: 0,
				change: 0,
			},
			others: {
				value: 0,
				change: 0,
			},
		},
		senate: {
			total: 34,
			democrats: {
				value: 0,
				change: 0,
				holdovers: 28,
			},
			caucusWithDemocrats: {
				value: 0,
				change: 0,
				holdovers: 0,
			},
			republicans: {
				value: 0,
				change: 0,
				holdovers: 38,
			},
			caucusWithRepublicans: {
				value: 0,
				change: 0,
				holdovers: 0,
			},
			others: {
				value: 0,
				change: 0,
				holdovers: 0,
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
			args.senate.total.toString(),
		);
		await expect(bars[1]).toHaveValue(0);
		await expect(bars[1]).toHaveAttribute(
			'aria-valuemax',
			args.house.total.toString(),
		);

		// Link
		const link = canvas.getByRole('link');
		await expect(link.textContent).toBe(args.linkText);
		await expect(link).toHaveAttribute('href', args.link.href);
	},
});

export const Final = Empty.extend({
	args: {
		house: {
			total: Empty.composed.args.house.total,
			democrats: {
				value: 215,
				change: 1,
			},
			caucusWithDemocrats: {
				value: 0,
				change: 0,
			},
			republicans: {
				value: 220,
				change: -1,
			},
			caucusWithRepublicans: {
				value: 0,
				change: 0,
			},
			others: {
				value: 0,
				change: 0,
			},
		},
		senate: {
			total: Empty.composed.args.senate.total,
			democrats: {
				value: 17,
				change: -2,
				holdovers: Empty.composed.args.senate.democrats.holdovers,
			},
			caucusWithDemocrats: {
				value: 2,
				change: -2,
				holdovers:
					Empty.composed.args.senate.caucusWithDemocrats.holdovers,
			},
			republicans: {
				value: 15,
				change: 4,
				holdovers: Empty.composed.args.senate.republicans.holdovers,
			},
			caucusWithRepublicans: {
				value: 0,
				change: 0,
				holdovers:
					Empty.composed.args.senate.caucusWithRepublicans.holdovers,
			},
			others: {
				value: 0,
				change: 0,
				holdovers: Empty.composed.args.senate.others.holdovers,
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
		await expect(bars[0]).toHaveValue(args.senate.total);
		await expect(bars[0]).toHaveAttribute(
			'aria-valuemax',
			args.senate.total.toString(),
		);
		await expect(bars[1]).toHaveValue(args.house.total);
		await expect(bars[1]).toHaveAttribute(
			'aria-valuemax',
			args.house.total.toString(),
		);

		// Link
		const link = canvas.getByRole('link');
		await expect(link.textContent).toBe(args.linkText);
		await expect(link).toHaveAttribute('href', args.link.href);
	},
});
