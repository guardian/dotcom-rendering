import fetchMock from 'fetch-mock';

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { Flex } from '@root/src/web/components/Flex';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { LeftColumn } from '@root/src/web/components/LeftColumn';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ElementContainer } from '@frontend/web/components/ElementContainer';

import { mockTab1 } from '../MostViewed.mocks';
import { MostViewedRight } from './MostViewedRight';

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
				<LeftColumn
					showPartialRightBorder={true}
					showRightBorder={false}
				>
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
						padded={false}
					>
						<MostViewedRight isAdFreeUser={false} />
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
						padded={false}
					>
						<MostViewedRight limitItems={3} isAdFreeUser={false} />
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
			<MostViewedRight isAdFreeUser={false} />
		</ElementContainer>
	);
};
outsideContextStory.story = {
	name: 'inside responsive wrapper',
};
