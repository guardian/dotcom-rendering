import { space } from '@guardian/source/foundations';
import type { ImagePositionType } from '../components/Card/components/ImageWrapper';
import { decideCardContentPadding } from './decideCardContentPadding';

describe('decideCardContentPadding', () => {
	const testCases = [
		{
			args: {
				imagePositionOnMobile: 'none' as ImagePositionType,
				imagePositionOnDesktop: 'top' as ImagePositionType,
				addAdditionalPadding: false,
			},
			expectedResult: {
				mobilePadding: '0px',
				desktopPadding: `${space[2]}px 0px 0px 0px`,
			},
		},
		{
			args: {
				imagePositionOnMobile: 'bottom' as ImagePositionType,
				imagePositionOnDesktop: 'left' as ImagePositionType,
				addAdditionalPadding: false,
			},
			expectedResult: {
				mobilePadding: `0px 0px ${space[2]}px 0px`,
				desktopPadding: `0px 0px 0px ${space[2]}px`,
			},
		},
		{
			args: {
				imagePositionOnMobile: 'right' as ImagePositionType,
				imagePositionOnDesktop: 'left' as ImagePositionType,
				addAdditionalPadding: true,
			},
			expectedResult: {
				mobilePadding: `${space[1]}px ${space[2]}px ${space[1]}px ${space[1]}px`,
				desktopPadding: `${space[1]}px ${space[1]}px ${space[1]}px ${space[2]}px`,
			},
		},
		{
			args: {
				imagePositionOnMobile: 'top' as ImagePositionType,
				imagePositionOnDesktop: 'right' as ImagePositionType,
				addAdditionalPadding: true,
			},
			expectedResult: {
				mobilePadding: `${space[2]}px ${space[1]}px ${space[1]}px ${space[1]}px`,
				desktopPadding: `${space[1]}px ${space[2]}px ${space[1]}px ${space[1]}px`,
			},
		},
	];

	it.each(testCases)(
		'should return the correct css for args $args',
		({ args, expectedResult }) => {
			const result = decideCardContentPadding(args);

			expect(result).toMatchObject(expectedResult);
		},
	);
});
