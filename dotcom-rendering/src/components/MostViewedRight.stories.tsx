import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import fetchMock from 'fetch-mock';
import { ArticleContainer } from './ArticleContainer';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { mockTab1 } from './MostViewed.mocks';
import { MostViewedRight } from './MostViewedRight';
import { RightColumn } from './RightColumn';
import { Section } from './Section';

export default {
	component: MostViewedRight,
	title: 'Components/MostViewedRight',
	parameters: {
		chromatic: { diffThreshold: 0.2 },
	},
};

export const defaultStory = () => {
	fetchMock
		.restore()
		.getOnce('*', {
			status: 200,
			body: mockTab1,
		})
		.spy('end:.hot-update.json');

	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="partial">
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
				>
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

export const limitItemsStory = () => {
	fetchMock
		.restore()
		.getOnce('*', {
			status: 200,
			body: mockTab1,
		})
		.spy('end:.hot-update.json');

	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
				>
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

export const outsideContextStory = () => {
	fetchMock
		.restore()
		.getOnce('*', {
			status: 200,
			body: mockTab1,
		})
		.spy('end:.hot-update.json');

	return (
		<Section fullWidth={true}>
			<MostViewedRight />
		</Section>
	);
};
outsideContextStory.storyName = 'inside responsive wrapper';
