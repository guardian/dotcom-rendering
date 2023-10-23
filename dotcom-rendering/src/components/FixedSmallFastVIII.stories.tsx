import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { lightDecorator } from '../../.storybook/theme-decorators';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FixedSmallFastVIII } from './FixedSmallFastVIII';
import { FrontSection } from './FrontSection';

const articleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Comment,
	theme: Pillar.Opinion,
};

export default {
	component: FixedSmallFastVIII,
	title: 'Components/FixedSmallFastVIII',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
};

export const Default = () => (
	<FrontSection
		title="Fixed Small Fast VIII"
		showTopBorder={true}
		discussionApiUrl={discussionApiUrl}
	>
		<FixedSmallFastVIII
			trails={trails}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
Default.storyName = 'FixedSmallFastVIII';
Default.decorators = [lightDecorator(articleFormat)];
