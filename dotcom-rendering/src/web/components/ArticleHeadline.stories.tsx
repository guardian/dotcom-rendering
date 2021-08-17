import { css } from '@emotion/react';

import { news } from '@guardian/src-foundations';
import { Display, Design, Pillar, Special } from '@guardian/types';

import { ElementContainer } from './ElementContainer';
import { ArticleHeadline } from './ArticleHeadline';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { ArticleContainer } from './ArticleContainer';
import { MainMedia } from './MainMedia';
import { Standfirst } from './Standfirst';
import { mainMediaElements } from './ArticleHeadline.mocks';
import { decidePalette } from '../lib/decidePalette';

export default {
	component: ArticleHeadline,
	title: 'Components/ArticleHeadline',
};

export const ArticleStory = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is how the default headline looks"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
ArticleStory.story = { name: 'Article' };

export const Feature = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is a Feature headline, it has colour applied based on pillar"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Feature,
						theme: Pillar.Lifestyle,
					})}
					format={{
						display: Display.Standard,
						design: Design.Feature,
						theme: Pillar.Lifestyle,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
Feature.story = { name: 'Feature' };

export const ShowcaseInterview = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<div
					css={css`
						margin-bottom: -100px;
					`}
				>
					<ArticleHeadline
						headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
						palette={decidePalette({
							display: Display.Showcase,
							design: Design.Interview,
							theme: Pillar.Culture,
						})}
						format={{
							display: Display.Showcase,
							design: Design.Interview,
							theme: Pillar.Culture,
						}}
						tags={[]}
						isShowcase={true}
						byline="Byline text"
					/>
				</div>
				<MainMedia
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
					hideCaption={true}
					elements={mainMediaElements}
					pageId="testID"
					webTitle="story article"
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
ShowcaseInterview.story = { name: 'Interview (with showcase)' };

export const ShowcaseInterviewNobyline = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<div
					css={css`
						margin-bottom: -100px;
					`}
				>
					<ArticleHeadline
						headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
						palette={decidePalette({
							display: Display.Showcase,
							design: Design.Interview,
							theme: Pillar.Culture,
						})}
						format={{
							display: Display.Showcase,
							design: Design.Interview,
							theme: Pillar.Culture,
						}}
						tags={[]}
						isShowcase={true}
						byline=""
					/>
				</div>
				<MainMedia
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
					hideCaption={true}
					elements={mainMediaElements}
					pageId="testID"
					webTitle="story article"
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
ShowcaseInterviewNobyline.story = {
	name: 'Interview (with showcase and NO BYLINE)',
};

export const Interview = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Interview,
						theme: Pillar.Culture,
					})}
					format={{
						display: Display.Standard,
						design: Design.Interview,
						theme: Pillar.Culture,
					}}
					tags={[]}
					byline="Byline text"
				/>
				<Standfirst
					format={{
						display: Display.Standard,
						design: Design.Interview,
						theme: Pillar.News,
					}}
					standfirst="This is the standfirst text. We include here to demonstrate spacing in this case where we have a Interview type article that does not have a showcase main media element"
				/>
				<MainMedia
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
					hideCaption={true}
					elements={mainMediaElements}
					pageId="testID"
					webTitle="story article"
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
Interview.story = { name: 'Interview (without showcase)' };

export const InterviewSpecialReport = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Interview,
						theme: Special.SpecialReport,
					})}
					format={{
						display: Display.Standard,
						design: Design.Interview,
						theme: Special.SpecialReport,
					}}
					tags={[]}
					byline="Byline text"
				/>
				<Standfirst
					format={{
						display: Display.Standard,
						design: Design.Interview,
						theme: Special.SpecialReport,
					}}
					standfirst="This is the standfirst text. We include here to demonstrate spacing in this case where we have a Interview type article that does not have a showcase main media element"
				/>
				<MainMedia
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Special.SpecialReport,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Special.SpecialReport,
					})}
					hideCaption={true}
					elements={mainMediaElements}
					pageId="testID"
					webTitle="story article"
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
InterviewSpecialReport.story = {
	name: 'Interview Special Report (without showcase)',
};

export const InterviewNoByline = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Interview,
						theme: Pillar.Culture,
					})}
					format={{
						display: Display.Standard,
						design: Design.Interview,
						theme: Pillar.Culture,
					}}
					tags={[]}
					byline=""
				/>
				<Standfirst
					format={{
						display: Display.Standard,
						design: Design.Interview,
						theme: Pillar.News,
					}}
					standfirst="This is the standfirst text. We include here to demonstrate spacing in this case where we have a Interview type article that does not have a showcase main media element"
				/>
				<MainMedia
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
					hideCaption={true}
					elements={mainMediaElements}
					pageId="testID"
					webTitle="story article"
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
InterviewNoByline.story = {
	name: 'Interview (without showcase with NO BYLINE)',
};

export const Comment = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="Yes, the billionaire club is one we really need to shut down"
					palette={decidePalette({
						display: Display.Showcase,
						design: Design.Comment,
						theme: Pillar.Opinion,
					})}
					format={{
						display: Display.Showcase,
						design: Design.Comment,
						theme: Pillar.Opinion,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
Comment.story = { name: 'Comment' };

export const Analysis = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is an Analysis headline, it's underlined. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Analysis,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Standard,
						design: Design.Analysis,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
Analysis.story = { name: 'Analysis' };

export const Media = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is Media"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Media,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Standard,
						design: Design.Media,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
Media.story = { name: 'Media' };

export const Review = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is Review"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Review,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Standard,
						design: Design.Review,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
Review.story = { name: 'Review' };

export const PhotoEssay = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is PhotoEssay"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.PhotoEssay,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Standard,
						design: Design.PhotoEssay,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
PhotoEssay.story = { name: 'PhotoEssay' };

export const Quiz = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is Quiz"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Quiz,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Standard,
						design: Design.Quiz,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
Quiz.story = { name: 'Quiz' };

export const Recipe = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is Recipe"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Recipe,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Standard,
						design: Design.Recipe,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
Recipe.story = { name: 'Recipe' };

export const Immersive = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when display type is Immersive"
					palette={decidePalette({
						display: Display.Immersive,
						design: Design.Article,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Immersive,
						design: Design.Article,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
Immersive.story = { name: 'Immersive' };

export const ImmersiveNoMainMedia = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is PrintShop, which has no main media"
					palette={decidePalette({
						display: Display.Immersive,
						design: Design.PrintShop,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Immersive,
						design: Design.PrintShop,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
ImmersiveNoMainMedia.story = { name: 'Printshop (with no main media)' };

export const ImmersiveComment = () => (
	<ElementContainer
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
					palette={decidePalette({
						display: Display.Immersive,
						design: Design.Comment,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Immersive,
						design: Design.Comment,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
ImmersiveComment.story = { name: 'Immersive opinion piece' };

export const Editorial = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is Editorial"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Editorial,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Standard,
						design: Design.Editorial,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
Editorial.story = { name: 'Editorial' };

export const MatchReport = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is MatchReport"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.MatchReport,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Standard,
						design: Design.MatchReport,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
MatchReport.story = { name: 'MatchReport' };

export const SpecialReport = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when pillar is SpecialReport"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Special.SpecialReport,
					})}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Special.SpecialReport,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
SpecialReport.story = { name: 'SpecialReport' };

export const LiveBlog = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is LiveBlog"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.LiveBlog,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Standard,
						design: Design.LiveBlog,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
LiveBlog.story = {
	name: 'LiveBlog',
	parameters: {
		backgrounds: {
			default: 'red',
			values: [
				{
					name: 'red',
					value: news[300],
				},
			],
		},
	},
};

export const DeadBlog = () => (
	<ElementContainer>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<ArticleContainer>
				<ArticleHeadline
					headlineString="This is the headline you see when design type is DeadBlog"
					palette={decidePalette({
						display: Display.Standard,
						design: Design.DeadBlog,
						theme: Pillar.News,
					})}
					format={{
						display: Display.Standard,
						design: Design.DeadBlog,
						theme: Pillar.News,
					}}
					tags={[]}
				/>
			</ArticleContainer>
		</Flex>
	</ElementContainer>
);
DeadBlog.story = { name: 'DeadBlog' };
