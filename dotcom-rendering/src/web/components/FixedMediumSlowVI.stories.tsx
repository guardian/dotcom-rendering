import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { ContainerLayout } from './ContainerLayout';
import { FixedMediumSlowVI } from './FixedMediumSlowVI';

export default {
	component: FixedMediumSlowVI,
	title: 'Components/FixedMediumSlowVI',
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
		title="FixedSmallSlowVI"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowVI
			collectionId="abc"
			trails={trails}
			showAge={true}
			hasMore={false}
		/>
	</ContainerLayout>
);
Default.story = { name: 'FixedSmallSlowVI' };
