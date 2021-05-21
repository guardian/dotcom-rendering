import fetchMock from 'fetch-mock';

import { Design, Display, Pillar } from '@guardian/types';

import { Flex } from '@root/src/web/components/Flex';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { LeftColumn } from '@root/src/web/components/LeftColumn';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { Section } from '@frontend/web/components/Section';
import { decidePalette } from '@root/src/web/lib/decidePalette';

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
		<Section>
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
					<Section
						showSideBorders={false}
						showTopBorder={false}
						padded={false}
					>
						<MostViewedRight
							palette={decidePalette({
								display: Display.Standard,
								design: Design.Article,
								theme: Pillar.News,
							})}
						/>
					</Section>
				</RightColumn>
			</Flex>
		</Section>
	);
};
defaultStory.story = { name: 'default' };

export const limitItemsStory = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: mockTab1,
	});

	return (
		<Section>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer>
					<></>
				</ArticleContainer>
				<RightColumn>
					<Section
						showSideBorders={false}
						showTopBorder={false}
						padded={false}
					>
						<MostViewedRight
							palette={decidePalette({
								display: Display.Standard,
								design: Design.Article,
								theme: Pillar.News,
							})}
							limitItems={3}
						/>
					</Section>
				</RightColumn>
			</Flex>
		</Section>
	);
};
limitItemsStory.story = { name: 'with a limit of 3 items' };

export const outsideContextStory = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: mockTab1,
	});

	return (
		<Section>
			<MostViewedRight
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
			/>
		</Section>
	);
};
outsideContextStory.story = {
	name: 'inside responsive wrapper',
};
