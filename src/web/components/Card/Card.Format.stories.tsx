/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Section } from '@frontend/web/components/Section';
import { Flex } from '@frontend/web/components/Flex';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { ArticleContainer } from '@frontend/web/components/ArticleContainer';
import { decidePalette } from '@root/src/web/lib/decidePalette';
import { Pillar, Special } from '@guardian/types';

import { Card } from './Card';
import { UL } from './components/UL';
import { LI } from './components/LI';
import { images, standfirsts } from './Card.mocks';

export const Format = (format: Format, title: string) => () => (
	<Section>
		<Flex>
			<LeftColumn showRightBorder={false}>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<UL direction="row" bottomMargin={true}>
					<LI padSides={true}>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{ ...format, theme: Pillar.News }}
							palette={decidePalette({
								...format,
								theme: Pillar.News,
							})}
							headlineText="News"
							standfirst={standfirsts[0]}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
						/>
					</LI>
					<LI
						padSides={true}
						showDivider={true}
						showTopMarginWhenStacked={true}
					>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{ ...format, theme: Pillar.Culture }}
							palette={decidePalette({
								...format,
								theme: Pillar.Culture,
							})}
							headlineText="Culture"
							standfirst={standfirsts[0]}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
						/>
					</LI>
					<LI
						padSides={true}
						showDivider={true}
						showTopMarginWhenStacked={true}
					>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{ ...format, theme: Pillar.Sport }}
							palette={decidePalette({
								...format,
								theme: Pillar.Sport,
							})}
							headlineText="Sport"
							standfirst={standfirsts[0]}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
						/>
					</LI>
					<LI
						padSides={true}
						showDivider={true}
						showTopMarginWhenStacked={true}
					>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{ ...format, theme: Pillar.Opinion }}
							palette={decidePalette({
								...format,
								theme: Pillar.Opinion,
							})}
							headlineText="Opinion"
							standfirst={standfirsts[0]}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
						/>
					</LI>
				</UL>
				<UL direction="row">
					<LI padSides={true}>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{ ...format, theme: Pillar.Lifestyle }}
							palette={decidePalette({
								...format,
								theme: Pillar.Lifestyle,
							})}
							headlineText="Lifestyle"
							standfirst={standfirsts[0]}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
						/>
					</LI>
					<LI
						padSides={true}
						showDivider={true}
						showTopMarginWhenStacked={true}
					>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{ ...format, theme: Special.Labs }}
							palette={decidePalette({
								...format,
								theme: Special.Labs,
							})}
							headlineText="Labs"
							standfirst={standfirsts[0]}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
						/>
					</LI>
					<LI
						padSides={true}
						showDivider={true}
						showTopMarginWhenStacked={true}
					>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{ ...format, theme: Special.SpecialReport }}
							palette={decidePalette({
								...format,
								theme: Special.SpecialReport,
							})}
							headlineText="SpecialReport"
							standfirst={standfirsts[0]}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
						/>
					</LI>
				</UL>
			</ArticleContainer>
		</Flex>
	</Section>
);
