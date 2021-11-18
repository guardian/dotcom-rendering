import { breakpoints } from '@guardian/src-foundations/mq';
import type { DesiredWidth } from './Picture';
import { getBestSourceForDesiredWidth, removeRedundantWidths } from './Picture';

const hdpiSources: SrcSetItem[] = [
	{
		src: '1',
		width: 1400,
	},
	{
		src: '2',
		width: 1240,
	},
	{
		src: '3',
		width: 930,
	},
	{
		src: '4',
		width: 1290,
	},
];

const mdpiSources: SrcSetItem[] = [
	{
		src: '1',
		width: 620,
	},
	{
		src: '2',
		width: 700,
	},
	{
		src: '3',
		width: 465,
	},
	{
		src: '4',
		width: 645,
	},
];

/**
 *       mobile: 320
 *       mobileMedium: 375
 *       mobileLandscape: 480
 *       phablet: 660
 *       tablet: 740
 *       desktop: 980
 *       leftCol: 1140
 *       wide: 1300
 */

describe(`Picture`, () => {
	describe('getClosestSetForWidth', () => {
		it('Gets the closest source for a given width (hdpi)', () => {
			// Breakpoints
			expect(
				getBestSourceForDesiredWidth(
					breakpoints.mobile * 2,
					hdpiSources,
				).width,
			).toBe(930);
			expect(
				getBestSourceForDesiredWidth(
					breakpoints.mobileMedium * 2,
					hdpiSources,
				).width,
			).toBe(930);
			expect(
				getBestSourceForDesiredWidth(
					breakpoints.mobileLandscape * 2,
					hdpiSources,
				).width,
			).toBe(1240);
			expect(
				getBestSourceForDesiredWidth(
					breakpoints.phablet * 2,
					hdpiSources,
				).width,
			).toBe(1400);
			expect(
				getBestSourceForDesiredWidth(
					breakpoints.tablet * 2,
					hdpiSources,
				).width,
			).toBe(1400);
			expect(
				getBestSourceForDesiredWidth(
					breakpoints.desktop * 2,
					hdpiSources,
				).width,
			).toBe(1400);
			expect(
				getBestSourceForDesiredWidth(
					breakpoints.leftCol * 2,
					hdpiSources,
				).width,
			).toBe(1400);
			expect(
				getBestSourceForDesiredWidth(breakpoints.wide * 2, hdpiSources)
					.width,
			).toBe(1400);

			// Example widths
			expect(
				getBestSourceForDesiredWidth(620 * 2, hdpiSources).width,
			).toBe(1240);
		});

		it('Gets the closest source for a given width (mdpi)', () => {
			// Breakpoints
			expect(
				getBestSourceForDesiredWidth(breakpoints.mobile, mdpiSources)
					.width,
			).toBe(465);
			expect(
				getBestSourceForDesiredWidth(
					breakpoints.mobileMedium,
					mdpiSources,
				).width,
			).toBe(465);
			expect(
				getBestSourceForDesiredWidth(
					breakpoints.mobileLandscape,
					mdpiSources,
				).width,
			).toBe(620);
			expect(
				getBestSourceForDesiredWidth(breakpoints.phablet, mdpiSources)
					.width,
			).toBe(700);
			expect(
				getBestSourceForDesiredWidth(breakpoints.tablet, mdpiSources)
					.width,
			).toBe(700);
			expect(
				getBestSourceForDesiredWidth(breakpoints.desktop, mdpiSources)
					.width,
			).toBe(700);
			expect(
				getBestSourceForDesiredWidth(breakpoints.leftCol, mdpiSources)
					.width,
			).toBe(700);
			expect(
				getBestSourceForDesiredWidth(breakpoints.wide, mdpiSources)
					.width,
			).toBe(700);

			// Example widths
			expect(getBestSourceForDesiredWidth(620, mdpiSources).width).toBe(
				620,
			);
		});
	});

	describe('optimiseBreakpointSizes', () => {
		it('Leaves un-optimisable breakpointSizes as-is', () => {
			const breakPointSizes: DesiredWidth[] = [
				{ breakpoint: 1000, width: 500 },
				{ breakpoint: 800, width: 400 },
				{ breakpoint: 600, width: 300 },
				{ breakpoint: 400, width: 200 },
			];
			expect(removeRedundantWidths(breakPointSizes)).toEqual(
				breakPointSizes,
			);
		});

		it('Correctly removes optimisable breakpointSizes', () => {
			expect(
				removeRedundantWidths([
					{ breakpoint: 1000, width: 500 },
					{ breakpoint: 800, width: 400 },
					{ breakpoint: 600, width: 400 },
					{ breakpoint: 400, width: 200 },
				]),
			).toEqual([
				{ breakpoint: 1000, width: 500 },
				{ breakpoint: 600, width: 400 },
				{ breakpoint: 400, width: 200 },
			]);

			expect(
				removeRedundantWidths([
					{ breakpoint: 1000, width: 500 },
					{ breakpoint: 800, width: 400 },
					{ breakpoint: 600, width: 200 },
					{ breakpoint: 400, width: 200 },
				]),
			).toEqual([
				{ breakpoint: 1000, width: 500 },
				{ breakpoint: 800, width: 400 },
				{ breakpoint: 400, width: 200 },
			]);

			expect(
				removeRedundantWidths([
					{ breakpoint: 1000, width: 500 },
					{ breakpoint: 800, width: 200 },
					{ breakpoint: 600, width: 200 },
					{ breakpoint: 400, width: 200 },
				]),
			).toEqual([
				{ breakpoint: 1000, width: 500 },
				{ breakpoint: 400, width: 200 },
			]);

			expect(
				removeRedundantWidths([
					{ breakpoint: 1000, width: 500 },
					{ breakpoint: 800, width: 500 },
					{ breakpoint: 600, width: 300 },
					{ breakpoint: 400, width: 200 },
				]),
			).toEqual([
				{ breakpoint: 800, width: 500 },
				{ breakpoint: 600, width: 300 },
				{ breakpoint: 400, width: 200 },
			]);
		});
	});
});
