import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { lightDecorator } from '../../.storybook/theme-decorators';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FrontSection } from './FrontSection';
import { TagFrontFastMpu } from './TagFrontFastMpu';

const articleFormat: ArticleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export default {
	component: TagFrontFastMpu,
	title: 'Components/TagFrontFastMpu',
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

export const WithTwoCards = () => {
	return (
		<FrontSection
			title="Fast MPU"
			description="With two cards"
			discussionApiUrl={discussionApiUrl}
		>
			<TagFrontFastMpu
				speed="fast"
				injected={true}
				day={21}
				month={7}
				year={2023}
				trails={[trails[0], trails[1]]}
				adIndex={1}
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
WithTwoCards.storyName = 'With two cards';

export const WithFourCards = () => {
	return (
		<FrontSection
			title="Fast MPU"
			description="With four cards"
			discussionApiUrl={discussionApiUrl}
		>
			<TagFrontFastMpu
				speed="fast"
				injected={true}
				day={21}
				month={7}
				year={2023}
				trails={[trails[0], trails[1], trails[2], trails[3]]}
				adIndex={1}
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
WithFourCards.storyName = 'With four cards';

export const WithSixCards = () => {
	return (
		<FrontSection
			title="Fast MPU"
			description="With six cards"
			discussionApiUrl={discussionApiUrl}
		>
			<TagFrontFastMpu
				speed="fast"
				injected={true}
				day={21}
				month={7}
				year={2023}
				trails={[
					trails[0],
					trails[1],
					trails[2],
					trails[3],
					trails[4],
					trails[5],
				]}
				adIndex={1}
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
WithSixCards.storyName = 'With six cards';

export const WithNineCards = () => {
	return (
		<FrontSection
			title="Fast MPU"
			description="With nine cards"
			discussionApiUrl={discussionApiUrl}
		>
			<TagFrontFastMpu
				speed="fast"
				injected={true}
				day={21}
				month={7}
				year={2023}
				trails={[
					trails[0],
					trails[1],
					trails[2],
					trails[3],
					trails[4],
					trails[5],
					trails[6],
					trails[7],
					trails[8],
				]}
				adIndex={1}
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
WithNineCards.storyName = 'With nine cards';
WithNineCards.decorators = [lightDecorator(articleFormat)];
