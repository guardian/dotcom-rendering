import { css } from '@emotion/react';

import { news } from '@guardian/source-foundations';
import {
	ArticleDisplay,
	ArticleDesign,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';

import { ElementContainer } from './ElementContainer';
import { ArticleHeadline } from './ArticleHeadline';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { ArticleContainer } from './ArticleContainer';
import { MainMedia } from './MainMedia';
import { Standfirst } from './Standfirst';
import { mainMediaElements } from './ArticleHeadline.mocks';
import { ArticleHeadlinePadding } from './ArticleHeadlinePadding';

export default {
	component: ArticleHeadline,
	title: 'Components/ArticleHeadline',
};

export const ArticleStory = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
ArticleStory.story = { name: 'Article' };

export const Feature = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Feature,
		theme: ArticlePillar.Lifestyle,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
Feature.story = { name: 'Feature' };

export const ShowcaseInterview = () => {
	const format = {
		display: ArticleDisplay.Showcase,
		design: ArticleDesign.Interview,
		theme: ArticlePillar.Culture,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
ShowcaseInterview.story = { name: 'Interview (with showcase)' };

export const ShowcaseInterviewNobyline = () => {
	const format = {
		display: ArticleDisplay.Showcase,
		design: ArticleDesign.Interview,
		theme: ArticlePillar.Culture,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
ShowcaseInterviewNobyline.story = {
	name: 'Interview (with showcase and NO BYLINE)',
};

export const Interview = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Interview,
		theme: ArticlePillar.Culture,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
Interview.story = { name: 'Interview (without showcase)' };

export const InterviewSpecialReport = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Interview,
		theme: ArticleSpecial.SpecialReport,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
InterviewSpecialReport.story = {
	name: 'Interview Special Report (without showcase)',
};

export const InterviewNoByline = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Interview,
		theme: ArticlePillar.Culture,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
InterviewNoByline.story = {
	name: 'Interview (without showcase with NO BYLINE)',
};

export const Comment = () => {
	const format = {
		display: ArticleDisplay.Showcase,
		design: ArticleDesign.Comment,
		theme: ArticlePillar.Opinion,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
Comment.story = { name: 'Comment' };

export const Analysis = () => {
	const themes: [string, ArticleTheme][] = [
		['News', ArticlePillar.News],
		['Opinion', ArticlePillar.Opinion],
		['Sport', ArticlePillar.Sport],
		['Culture', ArticlePillar.Culture],
		['Lifestyle', ArticlePillar.Lifestyle],
	];
	const format = (theme: ArticleTheme): ArticleFormat => ({
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Analysis,
		theme,
	});

	return (
		<>
			{themes.map(([themeName, theme]) => (
				<>
					<ElementContainer>
						<Flex>
							<LeftColumn borderType="full">
								<></>
							</LeftColumn>
							<ArticleContainer format={format(theme)}>
								<ArticleHeadline
									headlineString={`This is an Analysis headline in ${themeName}, it's underlined. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor`}
									format={format(theme)}
									tags={[]}
									webPublicationDateDeprecated=""
								/>
							</ArticleContainer>
						</Flex>
					</ElementContainer>
					<br />
				</>
			))}
		</>
	);
};
Analysis.story = { name: 'Analysis' };

export const Media = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Media,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadline
						headlineString="This is the headline you see when design type is Media"
						format={format}
						tags={[]}
						webPublicationDateDeprecated=""
					/>
				</ArticleContainer>
			</Flex>
		</ElementContainer>
	);
};
Media.story = { name: 'Media' };

export const Review = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Review,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
Review.story = { name: 'Review' };

export const PhotoEssay = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.PhotoEssay,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
PhotoEssay.story = { name: 'PhotoEssay' };

export const Quiz = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Quiz,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
Quiz.story = { name: 'Quiz' };

export const Recipe = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Recipe,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
Recipe.story = { name: 'Recipe' };

export const Immersive = () => {
	const format = {
		display: ArticleDisplay.Immersive,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
Immersive.story = { name: 'Immersive' };

export const ImmersiveNoMainMedia = () => {
	const format = {
		display: ArticleDisplay.Immersive,
		design: ArticleDesign.PrintShop,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
ImmersiveNoMainMedia.story = { name: 'Printshop (with no main media)' };

export const ImmersiveComment = () => {
	const format = {
		display: ArticleDisplay.Immersive,
		design: ArticleDesign.Comment,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer
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
		</ElementContainer>
	);
};
ImmersiveComment.story = { name: 'Immersive opinion piece' };

export const Editorial = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Editorial,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
Editorial.story = { name: 'Editorial' };

export const MatchReport = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.MatchReport,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
MatchReport.story = { name: 'MatchReport' };

export const SpecialReport = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.SpecialReport,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
SpecialReport.story = { name: 'SpecialReport' };

export const LiveBlog = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.LiveBlog,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
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

export const DeadBlog = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.DeadBlog,
		theme: ArticlePillar.News,
	};
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
DeadBlog.story = { name: 'DeadBlog' };

export const ReviewWithoutStars = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Review,
		theme: ArticlePillar.Culture,
	};
	return (
		<ElementContainer>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadlinePadding
						design={format.design}
						starRating={undefined}
					>
						<ArticleHeadline
							headlineString="This is a Review headline."
							format={format}
							tags={[]}
							webPublicationDateDeprecated=""
							byline="Byline text"
						/>
					</ArticleHeadlinePadding>
					<Standfirst
						format={format}
						standfirst="This is the standfirst text. We include here to demonstrate we have the correct amount of padding below the headline when there are no stars."
					/>
				</ArticleContainer>
			</Flex>
		</ElementContainer>
	);
};
ReviewWithoutStars.story = { name: 'Review without stars' };

export const AgeWarning = () => {
	const designs: [string, ArticleDesign][] = [
		['Comment', ArticleDesign.Comment],
		['Interview', ArticleDesign.Interview],
		['MatchReport', ArticleDesign.MatchReport],
		['Feature', ArticleDesign.Feature],
		['Interactive', ArticleDesign.Interactive],
		['Media', ArticleDesign.Media],
		['Analysis', ArticleDesign.Analysis],
		['Review', ArticleDesign.Review],
	];
	const format = (design: ArticleDesign): ArticleFormat => ({
		display: ArticleDisplay.Standard,
		design,
		theme: ArticlePillar.News,
	});

	return (
		<>
			{designs.map(([themeName, design]) => (
				<>
					<ElementContainer>
						<Flex>
							<LeftColumn>
								<></>
							</LeftColumn>
							<ArticleContainer format={format(design)}>
								<ArticleHeadline
									headlineString={`This is a headline in ${themeName} with an age warning showing`}
									format={format(design)}
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
					</ElementContainer>
					<br />
				</>
			))}
		</>
	);
};
AgeWarning.story = { name: 'with age warning' };
