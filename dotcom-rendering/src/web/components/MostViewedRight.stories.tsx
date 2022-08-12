import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import fetchMock from 'fetch-mock';
import { ArticleContainer } from './ArticleContainer';
import { ElementContainer } from './ElementContainer';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { mockTab1 } from './MostViewed.mocks';
import { MostViewedRight } from './MostViewedRight';
import { RightColumn } from './RightColumn';

export default {
	component: MostViewedRight,
	title: 'Components/MostViewedRight',
	parameters: {
		chromatic: { diffThreshold: 0.2 },
	},
};

export const defaultStory = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: mockTab1,
	});

	return (
		<ElementContainer>
			<Flex>
				<LeftColumn borderType="partial">
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				>
					<></>
				</ArticleContainer>
				<RightColumn>
					<ElementContainer
						showSideBorders={false}
						showTopBorder={false}
						padSides={false}
					>
						<MostViewedRight
							isAdFreeUser={false}
							adBlockerDetected={false}
						/>
					</ElementContainer>
				</RightColumn>
			</Flex>
		</ElementContainer>
	);
};
defaultStory.story = { name: 'default' };

export const limitItemsStory = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: mockTab1,
	});

	return (
		<ElementContainer>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				>
					<></>
				</ArticleContainer>
				<RightColumn>
					<ElementContainer
						showSideBorders={false}
						showTopBorder={false}
						padSides={false}
					>
						<MostViewedRight
							limitItems={3}
							isAdFreeUser={false}
							adBlockerDetected={false}
						/>
					</ElementContainer>
				</RightColumn>
			</Flex>
		</ElementContainer>
	);
};
limitItemsStory.story = { name: 'with a limit of 3 items' };

export const outsideContextStory = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: mockTab1,
	});

	return (
		<ElementContainer>
			<MostViewedRight isAdFreeUser={false} adBlockerDetected={false} />
		</ElementContainer>
	);
};
outsideContextStory.story = {
	name: 'inside responsive wrapper',
};
