import type { StoryObj } from '@storybook/react';
import {
	splitTheme,
	type StoryProps,
} from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { customMockFetch } from '../lib/mockRESTCalls';
import { ArticleContainer } from './ArticleContainer';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { responseWithTwoTabs } from './MostViewed.mocks';
import { MostViewedRight } from './MostViewedRight';
import { RightColumn } from './RightColumn';
import { Section } from './Section';

const standardFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export default {
	component: MostViewedRight,
	title: 'Components/MostViewedRight',
	parameters: {
		chromatic: { diffThreshold: 0.2 },
	},
	decorators: [splitTheme([standardFormat], { orientation: 'vertical' })],
};

const mockMostViewedRequestFetch = customMockFetch([
	{
		mockedMethod: 'GET',
		mockedUrl:
			'https://api.nextgen.guardianapps.co.uk/most-read-with-deeply-read.json',
		mockedStatus: 200,
		mockedBody: responseWithTwoTabs,
	},
]);

export const defaultStory: StoryObj = ({ format }: StoryProps) => {
	global.fetch = mockMostViewedRequestFetch;

	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="partial">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<></>
				</ArticleContainer>
				<RightColumn>
					<Section
						fullWidth={true}
						showSideBorders={false}
						showTopBorder={false}
						padSides={false}
					>
						<MostViewedRight />
					</Section>
				</RightColumn>
			</Flex>
		</Section>
	);
};
defaultStory.storyName = 'default';

export const limitItemsStory: StoryObj = ({ format }: StoryProps) => {
	global.fetch = mockMostViewedRequestFetch;

	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<></>
				</ArticleContainer>
				<RightColumn>
					<Section
						fullWidth={true}
						showSideBorders={false}
						showTopBorder={false}
						padSides={false}
					>
						<MostViewedRight limitItems={3} />
					</Section>
				</RightColumn>
			</Flex>
		</Section>
	);
};
limitItemsStory.storyName = 'with a limit of 3 items';

export const outsideContextStory: StoryObj = () => {
	global.fetch = mockMostViewedRequestFetch;

	return (
		<Section fullWidth={true}>
			<MostViewedRight />
		</Section>
	);
};
outsideContextStory.storyName = 'inside responsive wrapper';
