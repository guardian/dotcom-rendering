import { breakpoints } from '@guardian/src-foundations/mq';

import { getClosestSetForWidth, getDesiredWidth, getSourcesFromSrcSets } from './Picture'

const hdpiSources: SrcSetItem[] = [
	{
		src: '1',
		width: 1400
	},
	{
		src: '2',
		width: 1240
	},
	{
		src: '3',
		width: 930
	},
	{
		src: '4',
		width: 1290
	},
]

const mdpiSources: SrcSetItem[] = [
	{
		src: '1',
		width: 620
	},
	{
		src: '2',
		width: 700
	},
	{
		src: '3',
		width: 465
	},
	{
		src: '4',
		width: 645
	},
]

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
			expect(getClosestSetForWidth(breakpoints.mobile * 2, hdpiSources).width).toBe(930)
			expect(getClosestSetForWidth(breakpoints.mobileMedium * 2, hdpiSources).width).toBe(930)
			expect(getClosestSetForWidth(breakpoints.mobileLandscape * 2, hdpiSources).width).toBe(1240)
			expect(getClosestSetForWidth(breakpoints.phablet * 2, hdpiSources).width).toBe(1400)
			expect(getClosestSetForWidth(breakpoints.tablet * 2, hdpiSources).width).toBe(1400)
			expect(getClosestSetForWidth(breakpoints.desktop * 2, hdpiSources).width).toBe(1400)
			expect(getClosestSetForWidth(breakpoints.leftCol * 2, hdpiSources).width).toBe(1400)
			expect(getClosestSetForWidth(breakpoints.wide * 2, hdpiSources).width).toBe(1400)

			// Example widths
			expect(getClosestSetForWidth(620 * 2, hdpiSources).width).toBe(1240)
		})

		it('Gets the closest source for a given width (mdpi)', () => {
			// Breakpoints
			expect(getClosestSetForWidth(breakpoints.mobile, mdpiSources).width).toBe(465)
			expect(getClosestSetForWidth(breakpoints.mobileMedium, mdpiSources).width).toBe(465)
			expect(getClosestSetForWidth(breakpoints.mobileLandscape, mdpiSources).width).toBe(620)
			expect(getClosestSetForWidth(breakpoints.phablet, mdpiSources).width).toBe(700)
			expect(getClosestSetForWidth(breakpoints.tablet, mdpiSources).width).toBe(700)
			expect(getClosestSetForWidth(breakpoints.desktop, mdpiSources).width).toBe(700)
			expect(getClosestSetForWidth(breakpoints.leftCol, mdpiSources).width).toBe(700)
			expect(getClosestSetForWidth(breakpoints.wide, mdpiSources).width).toBe(700)

			// Example widths
			expect(getClosestSetForWidth(620, mdpiSources).width).toBe(620)
		})
	})

	describe('getDesiredWidth', () => {
		it('Returns the correct with for HDPI', () => {
			expect(getDesiredWidth(200, true)).toBe(400)
		})
		it('Returns the correct with for MDPI', () => {
			expect(getDesiredWidth(200, false)).toBe(200)
		})
	})

	describe('getSourcesFromSrcSets', () => {
		it('Constructs the string correctly', () => {
			expect(getSourcesFromSrcSets(hdpiSources)).toBe(
				'1 1400w,2 1240w,3 930w,4 1290w'
			)
			expect(getSourcesFromSrcSets(mdpiSources)).toBe(
				'1 620w,2 700w,3 465w,4 645w'
			)
		})
	})



});
