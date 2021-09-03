/* eslint-disable react/jsx-props-no-spreading */

import { ElementContainer } from '@frontend/web/components/ElementContainer';
import { Flex } from '@frontend/web/components/Flex';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { ArticleContainer } from '@frontend/web/components/ArticleContainer';
import { ArticleDisplay, ArticlePillar, ArticleSpecial } from '@guardian/libs';

import { Card } from './Card';
import { UL } from './components/UL';
import { LI } from './components/LI';
import { images, standfirsts } from './Card.mocks';

export const Format = (
	format: ArticleFormat,
	title: string,
	starRating?: number,
) => () => (
	<ElementContainer>
		<Flex>
			<LeftColumn showRightBorder={false}>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<UL direction="row" bottomMargin={true}>
					<LI padSides={true} percentage="25%">
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{ ...format, theme: ArticlePillar.News }}
							headlineText="News"
							standfirst={
								format.display === ArticleDisplay.Immersive
									? ''
									: standfirsts[0]
							}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
							isFullCardImage={
								format.display === ArticleDisplay.Immersive
							}
							starRating={starRating}
						/>
					</LI>
					<LI
						percentage="25%"
						padSides={true}
						showDivider={true}
						showTopMarginWhenStacked={true}
					>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{ ...format, theme: ArticlePillar.Culture }}
							headlineText="Culture"
							standfirst={
								format.display === ArticleDisplay.Immersive
									? ''
									: standfirsts[0]
							}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
							isFullCardImage={
								format.display === ArticleDisplay.Immersive
							}
							starRating={starRating}
						/>
					</LI>
					<LI
						percentage="25%"
						padSides={true}
						showDivider={true}
						showTopMarginWhenStacked={true}
					>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{ ...format, theme: ArticlePillar.Sport }}
							headlineText="Sport"
							standfirst={
								format.display === ArticleDisplay.Immersive
									? ''
									: standfirsts[0]
							}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
							isFullCardImage={
								format.display === ArticleDisplay.Immersive
							}
							starRating={starRating}
						/>
					</LI>
					<LI
						percentage="25%"
						padSides={true}
						showDivider={true}
						showTopMarginWhenStacked={true}
					>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{ ...format, theme: ArticlePillar.Opinion }}
							headlineText="Opinion"
							standfirst={
								format.display === ArticleDisplay.Immersive
									? ''
									: standfirsts[0]
							}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
							isFullCardImage={
								format.display === ArticleDisplay.Immersive
							}
							starRating={starRating}
						/>
					</LI>
				</UL>
				<UL direction="row">
					<LI percentage="33%" padSides={true}>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{
								...format,
								theme: ArticlePillar.Lifestyle,
							}}
							headlineText="Lifestyle"
							standfirst={
								format.display === ArticleDisplay.Immersive
									? ''
									: standfirsts[0]
							}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
							isFullCardImage={
								format.display === ArticleDisplay.Immersive
							}
							starRating={starRating}
						/>
					</LI>
					<LI
						percentage="33%"
						padSides={true}
						showDivider={true}
						showTopMarginWhenStacked={true}
					>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{ ...format, theme: ArticleSpecial.Labs }}
							headlineText="Labs"
							standfirst={
								format.display === ArticleDisplay.Immersive
									? ''
									: standfirsts[0]
							}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
							isFullCardImage={
								format.display === ArticleDisplay.Immersive
							}
							starRating={starRating}
						/>
					</LI>
					<LI
						percentage="33%"
						padSides={true}
						showDivider={true}
						showTopMarginWhenStacked={true}
					>
						<Card
							linkTo="/lifeandstyle/2018/mar/10/meera-sodhas-vegan-recipe-for-peanut-and-broccoli-pad-thai"
							format={{
								...format,
								theme: ArticleSpecial.SpecialReport,
							}}
							headlineText="SpecialReport"
							standfirst={
								format.display === ArticleDisplay.Immersive
									? ''
									: standfirsts[0]
							}
							headlineSize="medium"
							kickerText={title}
							webPublicationDate="2019-11-11T09:45:30.000Z"
							imageUrl={images[4]}
							imagePosition="top"
							showClock={true}
							commentCount={99}
							isFullCardImage={
								format.display === ArticleDisplay.Immersive
							}
							starRating={starRating}
						/>
					</LI>
				</UL>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
