import React from 'react';
import { css } from 'emotion';

import { Display, Design, Pillar } from '@guardian/types';
import { Section } from './Section';
import { ArticleHeadline } from './ArticleHeadline';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { ArticleContainer } from './ArticleContainer';
import { MainMedia } from './MainMedia';
import { Standfirst } from './Standfirst';
import { mainMediaElements } from './ArticleHeadline.mocks';

export default {
	component: ArticleHeadline,
	title: 'Components/ArticleHeadline',
};

export const ArticleStory = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is how the default headline looks"
					display={Display.Standard}
					design={Design.Article}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
ArticleStory.story = { name: 'Article' };

export const oldHeadline = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is an old headline"
					display={Display.Standard}
					design={Design.Article}
					pillar={Pillar.News}
					tags={[
						// Age warnings only show for old articles when the tone/news tag is present
						{
							id: 'tone/news',
							type: '',
							title: '',
						},
					]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
oldHeadline.story = { name: 'Article, with age warning' };

export const Feature = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is a Feature headline, it has colour applied based on pillar"
					display={Display.Standard}
					design={Design.Feature}
					pillar={Pillar.Lifestyle}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
Feature.story = { name: 'Feature' };

export const ShowcaseInterview = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<div
					className={css`
						margin-bottom: -100px;
					`}
				>
					<ArticleHeadline
						headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
						display={Display.Showcase}
						design={Design.Interview}
						pillar={Pillar.Culture}
						tags={[]}
						isShowcase={true}
						byline="Byline text"
					/>
				</div>
				<MainMedia
					display={Display.Standard}
					design={Design.Article}
					hideCaption={true}
					elements={mainMediaElements}
					pillar={Pillar.News}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
ShowcaseInterview.story = { name: 'Interview (with showcase)' };

export const ShowcaseInterviewNobyline = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<div
					className={css`
						margin-bottom: -100px;
					`}
				>
					<ArticleHeadline
						headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
						display={Display.Showcase}
						design={Design.Interview}
						pillar={Pillar.Culture}
						tags={[]}
						isShowcase={true}
						byline=""
					/>
				</div>
				<MainMedia
					display={Display.Standard}
					design={Design.Article}
					hideCaption={true}
					elements={mainMediaElements}
					pillar={Pillar.News}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
ShowcaseInterviewNobyline.story = {
	name: 'Interview (with showcase and NO BYLINE)',
};

export const Interview = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
					display={Display.Standard}
					design={Design.Interview}
					pillar={Pillar.Culture}
					tags={[]}
					byline="Byline text"
				/>
				<Standfirst
					display={Display.Standard}
					design={Design.Interview}
					standfirst="This is the standfirst text. We include here to demonstrate spacing in this case where we have a Interview type article that does not have a showcase main media element"
				/>
				<MainMedia
					display={Display.Standard}
					design={Design.Article}
					hideCaption={true}
					elements={mainMediaElements}
					pillar={Pillar.News}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
Interview.story = { name: 'Interview (without showcase)' };

export const InterviewNoByline = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
					display={Display.Standard}
					design={Design.Interview}
					pillar={Pillar.Culture}
					tags={[]}
					byline=""
				/>
				<Standfirst
					display={Display.Standard}
					design={Design.Interview}
					standfirst="This is the standfirst text. We include here to demonstrate spacing in this case where we have a Interview type article that does not have a showcase main media element"
				/>
				<MainMedia
					display={Display.Standard}
					design={Design.Article}
					hideCaption={true}
					elements={mainMediaElements}
					pillar={Pillar.News}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
InterviewNoByline.story = {
	name: 'Interview (without showcase with NO BYLINE)',
};

export const Comment = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="Yes, the billionaire club is one we really need to shut down"
					display={Display.Standard}
					design={Design.Comment}
					pillar={Pillar.Opinion}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
Comment.story = { name: 'Comment' };

export const Analysis = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is an Analysis headline, it's underlined. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
					display={Display.Standard}
					design={Design.Analysis}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
Analysis.story = { name: 'Analysis' };

export const Media = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is Media"
					display={Display.Standard}
					design={Design.Media}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
Media.story = { name: 'Media' };

export const Review = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is Review"
					display={Display.Standard}
					design={Design.Review}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
Review.story = { name: 'Review' };

export const PhotoEssay = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is PhotoEssay"
					display={Display.Standard}
					design={Design.PhotoEssay}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
PhotoEssay.story = { name: 'PhotoEssay' };

export const Quiz = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is Quiz"
					display={Display.Standard}
					design={Design.Quiz}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
Quiz.story = { name: 'Quiz' };

export const Recipe = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is Recipe"
					display={Display.Standard}
					design={Design.Recipe}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
Recipe.story = { name: 'Recipe' };

export const Immersive = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when display type is Immersive"
					display={Display.Immersive}
					design={Design.Article}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
Immersive.story = { name: 'Immersive' };

export const ImmersiveNoMainMedia = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is PrintShop, which has no main media"
					display={Display.Immersive}
					design={Design.PrintShop}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
ImmersiveNoMainMedia.story = { name: 'Printshop (with no main media)' };

export const ImmersiveComment = () => (
	<Section
		showSideBorders={false}
		showTopBorder={false}
		backgroundColour="orange"
	>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when display type is Immersive and design Comment"
					display={Display.Immersive}
					design={Design.Comment}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
ImmersiveComment.story = { name: 'Immersive opinion piece' };

export const GuardianView = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is GuardianView"
					display={Display.Standard}
					design={Design.GuardianView}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
GuardianView.story = { name: 'GuardianView' };

export const MatchReport = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is MatchReport"
					display={Display.Standard}
					design={Design.MatchReport}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
MatchReport.story = { name: 'MatchReport' };

export const SpecialReport = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when pillar is SpecialReport"
					display={Display.Standard}
					design={Design.Article}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
SpecialReport.story = { name: 'SpecialReport' };

export const Live = () => (
	<Section>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is Live"
					display={Display.Standard}
					design={Design.Live}
					pillar={Pillar.News}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</Section>
);
Live.story = { name: 'Live' };
