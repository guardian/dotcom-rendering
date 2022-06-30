import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { ContainerLayout } from './ContainerLayout';
import { FixedSmallSlowIII } from './FixedSmallSlowIII';

export default {
	component: FixedSmallSlowIII,
	title: 'Components/FixedSmallSlowIII',
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
		title="FixedSmallSlowIII"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallSlowIII
			collectionId="abc"
			trails={trails}
			showAge={true}
			hasMore={false}
		/>
	</ContainerLayout>
);
Default.story = { name: 'FixedSmallSlowIII' };
