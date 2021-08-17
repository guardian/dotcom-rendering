import fetchMock from 'fetch-mock';

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
				<ArticleContainer>
					<></>
				</ArticleContainer>
				<RightColumn>
					<ElementContainer
						showSideBorders={false}
						showTopBorder={false}
						padded={false}
					>
						<MostViewedRight />
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
				<ArticleContainer>
					<></>
				</ArticleContainer>
				<RightColumn>
					<ElementContainer
						showSideBorders={false}
						showTopBorder={false}
						padded={false}
					>
						<MostViewedRight limitItems={3} />
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
			<MostViewedRight />
		</ElementContainer>
	);
};
outsideContextStory.story = {
	name: 'inside responsive wrapper',
};
