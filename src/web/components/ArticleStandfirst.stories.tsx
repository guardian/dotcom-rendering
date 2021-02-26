import React from 'react';

import { Display, Design, Pillar } from '@guardian/types';
import { Section } from './Section';

import { ArticleStandfirst } from './ArticleStandfirst';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { ArticleContainer } from './ArticleContainer';
import { decidePalette } from '../lib/decidePalette';

export default {
	component: ArticleStandfirst,
	title: 'Components/ArticleStandfirst',
};

export const defaultStory = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer>
					<ArticleStandfirst
						display={Display.Standard}
						design={Design.Article}
						standfirst="This the default standfirst text. Aut explicabo officia delectus omnis repellendus voluptas"
						pillar={Pillar.News}
						format={{
							display: Display.Standard,
							design: Design.Article,
							theme: Pillar.News,
						}}
						palette={decidePalette({
							display: Display.Standard,
							design: Design.Article,
							theme: Pillar.News,
						})}
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
defaultStory.story = { name: 'default' };
