import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { news } from '@guardian/source-foundations';
import type { StoryObj } from '@storybook/react';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
import { getAllThemes } from '../lib/format';
import { ArticleContainer } from './ArticleContainer';
import { ArticleHeadline } from './ArticleHeadline';
import { mainMediaElements } from './ArticleHeadline.mocks';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { MainMedia } from './MainMedia';
import { Section } from './Section';
import { Standfirst } from './Standfirst';

export default {
	component: ArticleHeadline,
	title: 'Components/ArticleHeadline',
};

type StoryArgs = { format: ArticleFormat };

export const ArticleStory: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is how the default headline looks"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
ArticleStory.storyName = 'Article';
ArticleStory.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
	]),
];

export const Feature: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is a Feature headline, it has colour applied based on pillar"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
Feature.storyName = 'Feature';
Feature.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Feature,
			theme: Pillar.Lifestyle,
		},
	]),
];

export const ShowcaseInterview: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<div
						css={css`
							margin-bottom: -100px;
						`}
					>
						<ArticleHeadline
							headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
							format={format}
							tags={[]}
							webPublicationDateDeprecated=""
							byline="Byline text"
						/>
					</div>
					<MainMedia
						format={format}
						hideCaption={true}
						elements={mainMediaElements}
						pageId="testID"
						webTitle="story article"
						ajaxUrl=""
						isAdFreeUser={false}
						isSensitive={false}
						switches={{}}
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
ShowcaseInterview.storyName = 'Interview (with showcase)';
ShowcaseInterview.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Showcase,
			design: ArticleDesign.Interview,
			theme: Pillar.Culture,
		},
	]),
];

export const ShowcaseInterviewNobyline: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<div
						css={css`
							margin-bottom: -100px;
						`}
					>
						<ArticleHeadline
							headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
							format={format}
							tags={[]}
							webPublicationDateDeprecated=""
							byline=""
						/>
					</div>
					<MainMedia
						format={format}
						hideCaption={true}
						elements={mainMediaElements}
						pageId="testID"
						webTitle="story article"
						ajaxUrl=""
						isAdFreeUser={false}
						isSensitive={false}
						switches={{}}
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
ShowcaseInterviewNobyline.storyName = 'Interview (with showcase and NO BYLINE)';
ShowcaseInterviewNobyline.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Showcase,
			design: ArticleDesign.Interview,
			theme: Pillar.Culture,
		},
	]),
];

export const Interview: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
						byline="Byline text"
					/>
					<Standfirst
						format={format}
						standfirst="This is the standfirst text. We include here to demonstrate spacing in this case where we have a Interview type article that does not have a showcase main media element"
					/>
					<MainMedia
						format={format}
						hideCaption={true}
						elements={mainMediaElements}
						pageId="testID"
						webTitle="story article"
						ajaxUrl=""
						isAdFreeUser={false}
						isSensitive={false}
						switches={{}}
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
Interview.storyName = 'Interview (without showcase)';
Interview.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Interview,
			theme: Pillar.Culture,
		},
	]),
];

export const InterviewSpecialReport: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
						byline="Byline text"
					/>
					<Standfirst
						format={format}
						standfirst="This is the standfirst text. We include here to demonstrate spacing in this case where we have a Interview type article that does not have a showcase main media element"
					/>
					<MainMedia
						format={format}
						hideCaption={true}
						elements={mainMediaElements}
						pageId="testID"
						webTitle="story article"
						ajaxUrl=""
						isAdFreeUser={false}
						isSensitive={false}
						switches={{}}
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
InterviewSpecialReport.storyName =
	'Interview Special Report (without showcase)';
InterviewSpecialReport.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Interview,
			theme: ArticleSpecial.SpecialReport,
		},
	]),
];

export const InterviewNoByline: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
						byline=""
					/>
					<Standfirst
						format={format}
						standfirst="This is the standfirst text. We include here to demonstrate spacing in this case where we have a Interview type article that does not have a showcase main media element"
					/>
					<MainMedia
						format={format}
						hideCaption={true}
						elements={mainMediaElements}
						pageId="testID"
						webTitle="story article"
						ajaxUrl=""
						isAdFreeUser={false}
						isSensitive={false}
						switches={{}}
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
InterviewNoByline.storyName = 'Interview (without showcase with NO BYLINE)';
InterviewNoByline.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Interview,
			theme: Pillar.Culture,
		},
	]),
];

export const Comment: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="Yes, the billionaire club is one we really need to shut down"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
Comment.storyName = 'Comment';
Comment.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Showcase,
			design: ArticleDesign.Comment,
			theme: Pillar.Opinion,
		},
	]),
];

export const Analysis: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString={`This is an Analysis headline in ${
							Pillar[format.theme] ??
							ArticleSpecial[format.theme] ??
							''
						}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor`}
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
const analysisFormats = getAllThemes({
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Analysis,
});
Analysis.storyName = 'Analysis';
Analysis.decorators = [lightDecorator(analysisFormats)];

export const Gallery: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when design type is Gallery"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
Gallery.storyName = 'Gallery';
Gallery.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Gallery,
			theme: Pillar.News,
		},
	]),
];

export const Review: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when design type is Review"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
Review.storyName = 'Review';
Review.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Review,
			theme: Pillar.News,
		},
	]),
];

export const PhotoEssay: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when design type is PhotoEssay"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
PhotoEssay.storyName = 'PhotoEssay';
PhotoEssay.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.PhotoEssay,
			theme: Pillar.News,
		},
	]),
];

export const Explainer: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when design type is Explainer"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
Explainer.storyName = 'Review';
Explainer.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Explainer,
			theme: Pillar.News,
		},
	]),
];

export const Quiz: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when design type is Quiz"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
Quiz.storyName = 'Quiz';
Quiz.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Quiz,
			theme: Pillar.News,
		},
	]),
];

export const Recipe: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when design type is Recipe"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
Recipe.storyName = 'Recipe';
Recipe.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Recipe,
			theme: Pillar.News,
		},
	]),
];

export const Immersive: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when display type is Immersive"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
Immersive.storyName = 'Immersive';
Immersive.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
	]),
];

export const ImmersiveNoMainMedia: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when design type is PrintShop, which has no main media"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
ImmersiveNoMainMedia.storyName = 'Printshop (with no main media)';
ImmersiveNoMainMedia.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.PrintShop,
			theme: Pillar.News,
		},
	]),
];

export const ImmersiveComment: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section
			fullWidth={true}
			showSideBorders={false}
			showTopBorder={false}
			backgroundColour="orange"
		>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when display type is Immersive and design Comment"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
ImmersiveComment.storyName = 'Immersive opinion piece';
ImmersiveComment.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Comment,
			theme: Pillar.News,
		},
	]),
];

export const Editorial: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when design type is Editorial"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
Editorial.storyName = 'Editorial';
Editorial.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Editorial,
			theme: Pillar.News,
		},
	]),
];

export const MatchReport: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when design type is MatchReport"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
MatchReport.storyName = 'MatchReport';
MatchReport.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.MatchReport,
			theme: Pillar.Sport,
		},
	]),
];

export const SpecialReport: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when pillar is SpecialReport"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
SpecialReport.storyName = 'SpecialReport';
SpecialReport.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.SpecialReport,
		},
	]),
];

export const SpecialReportAlt: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when pillar is SpecialReportAlt"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
SpecialReportAlt.storyName = 'SpecialReportAlt';
SpecialReportAlt.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.SpecialReportAlt,
		},
	]),
];

export const LiveBlog: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when design type is LiveBlog"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
LiveBlog.storyName = 'LiveBlog';
LiveBlog.story = {
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
LiveBlog.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
			theme: Pillar.News,
		},
	]),
];

export const DeadBlog: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when design type is DeadBlog"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
DeadBlog.storyName = 'DeadBlog';
DeadBlog.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.DeadBlog,
			theme: Pillar.News,
		},
	]),
];

export const ReviewWithoutStars: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is a Review headline."
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
						byline="Byline text"
					/>
					<Standfirst
						format={format}
						standfirst="This is the standfirst text. We include here to demonstrate we have the correct amount of padding below the headline when there are no stars."
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
ReviewWithoutStars.storyName = 'Review without stars';
ReviewWithoutStars.decorators = [
	lightDecorator([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Review,
			theme: Pillar.Culture,
		},
	]),
];

export const AgeWarning: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString={`This is a headline in ${
							ArticleDesign[format.design]
						} with an age warning showing`}
						format={format}
						tags={[
							{
								id: 'tone/news',
								type: '',
								title: '',
							},
						]}
						webPublicationDateDeprecated="2020-03-28T07:27:19.000Z"
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
const ageWarningFormats = [
	ArticleDesign.Comment,
	ArticleDesign.Interview,
	ArticleDesign.MatchReport,
	ArticleDesign.Feature,
	ArticleDesign.Interactive,
	ArticleDesign.Gallery,
	ArticleDesign.Analysis,
	ArticleDesign.Review,
].map((design) => ({
	display: ArticleDisplay.Standard,
	design,
	theme: Pillar.News,
}));
AgeWarning.storyName = 'with age warning';
AgeWarning.decorators = [lightDecorator(ageWarningFormats)];
