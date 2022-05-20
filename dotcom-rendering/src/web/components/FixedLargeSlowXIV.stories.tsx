import { breakpoints } from '@guardian/source-foundations';
import { ContainerLayout } from './ContainerLayout';
import { FixedLargeSlowXIV } from './FixedLargeSlowXIV';

import { trails } from '../../../fixtures/manual/trails';

export default {
	component: FixedLargeSlowXIV,
	title: 'Components/FixedLargeSlowXIV',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileMedium,
				breakpoints.mobileLandscape,
				breakpoints.phablet,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

export const Default = () => (
	<ContainerLayout
		title="FixedLargeSlowXIV"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedLargeSlowXIV trails={trails} containerDisplayName="Spotlight" />
	</ContainerLayout>
);
Default.story = { name: 'FixedLargeSlowXIV' };
