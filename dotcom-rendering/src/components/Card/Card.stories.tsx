import { css } from '@emotion/react';
import { breakpoints, from } from '@guardian/source/foundations';
import React from 'react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../../lib/articleFormat';
import type { Branding } from '../../types/branding';
import type {
	DCRContainerPalette,
	DCRSupportingContent,
} from '../../types/front';
import type { MainMedia } from '../../types/mainMedia';
import { ContainerOverrides } from '../ContainerOverrides';
import { FrontSection } from '../FrontSection';
import { Section } from '../Section';
import type { Props as CardProps } from './Card';
import { Card } from './Card';
import { LI } from './components/LI';
import { UL } from './components/UL';

const basicCardProps: CardProps = {
	linkTo: '',
	format: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	},
	headlineText: 'Headline text',
	trailText:
		'The 29-year-old source behind the biggest intelligence leak in the NSA’s history explains his motives',
	headlineSizes: { desktop: 'xsmall' },
	kickerText: '',
	webPublicationDate: new Date(Date.now() - 60 * 60 * 1000).toString(),
	image: {
		src: 'https://media.guim.co.uk/6537e163c9164d25ec6102641f6a04fa5ba76560/0_210_5472_3283/master/5472.jpg',
		altText: 'alt text',
	},
	mediaPositionOnDesktop: 'top',
	showAge: true,
	isExternalLink: false,
	canPlayInline: true,
	imageLoading: 'eager',
	discussionApiUrl: 'https://discussion.theguardian.com/discussion-api/',
	showVideo: true,
	headlinePosition: 'inner',
};

const aBasicLink = {
	headline: 'Headline',
	url: 'https://www.theguardian.com',
	format: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	},
};

const mainYoutubeVideo: MainMedia = {
	type: 'YoutubeVideo',
	id: '1234-abcdef-09876-xyz',
	videoId: '8M_yH-e9cq8',
	title: '’I care, but I don’t care’: Life after the Queen’s death | Anywhere but Westminster',
	expired: false,
	duration: 200,
	image: `https://i.guim.co.uk/img/media/2eb01d138eb8fba6e59ce7589a60e3ff984f6a7a/0_0_1920_1080/1920.jpg?width=1200&quality=45&dpr=2&s=none`,
	width: 480,
	height: 288,
	origin: 'The Guardian',
};

const mainSelfHostedVideo: MainMedia = {
	type: 'SelfHostedVideo',
	videoStyle: 'Loop',
	atomId: '123',
	sources: [
		{
			src: 'https://uploads.guim.co.uk/2024/10/01/241001HeleneLoop_2.mp4',
			mimeType: 'video/mp4',
		},
	],
	height: 1080,
	width: 1920,
	image: `https://i.guim.co.uk/img/media/2eb01d138eb8fba6e59ce7589a60e3ff984f6a7a/0_0_1920_1080/1920.jpg?width=1200&quality=45&dpr=2&s=none`,
	duration: 100,
};

const mainAudio: MainMedia = {
	type: 'Audio',
	duration: '30:24',
};

const mainGallery: MainMedia = {
	type: 'Gallery',
	count: '5',
};

const twoSublinks: DCRSupportingContent[] = [
	{
		...aBasicLink,
		headline: 'Headline 1',
		kickerText: 'Kicker',
	},
	{
		...aBasicLink,
		headline: 'Headline 2',
		kickerText: 'Kicker',
	},
];

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				max-width: 600px;
				flex-basis: 100%;
				${from.tablet} {
					flex-basis: 1;
				}
				margin: 10px;
			`}
		>
			{children}
		</div>
	);
};

const CardGroup = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				${from.tablet} {
					flex-direction: row;
				}
				max-width: 1000px;
			`}
		>
			{children}
		</div>
	);
};

export const CardsWithDifferentThemes = ({
	display,
	design,
	title,
}: {
	display: ArticleDisplay;
	design: ArticleDesign;
	title: string;
}) => {
	const cards = [];
	for (const [pillarName, pillarValue] of Object.entries(Pillar)) {
		// We need to check if numeric here because the values are also exported as keynames
		// See: https://www.typescriptlang.org/play?#code/KYOwrgtgBAggTgFwJYGMA2wAKS1oIZxQDeAsAFBSVQBywA7gM5QC8UADADTlVQDyADkhBIA9iBZQAjFwpUAyvxGIJAJhk8AwmDQIwcYBIDM6qgBkkAM2AMEATwwSALDIC+5cijEMRGAHRoRAHMACl4AIwArYBQEX1AEOCRrYPhkdCwcfDgASmyAbnIAegAqcgBtbioygCI2ao4oatpGaoBdE0oayXrGgSFREDaOqBqVHuqFJQQhys7qw3GtHT1gGdk5x3HzKxt7VfbZkab6Bh62A-WjvuExHskLnhrJxB6VB6rqpd19HsN3ue21jsGHqjla5FaUHIxUKQA
		if (Number.isNaN(Number(pillarName))) {
			cards.push({
				title: pillarName,
				format: {
					display,
					design,
					theme: pillarValue as Pillar,
				},
			});
		}
	}
	for (const [specialName, specialValue] of Object.entries(ArticleSpecial)) {
		if (Number.isNaN(Number(specialName))) {
			cards.push({
				title: specialName,
				format: {
					display,
					design,
					theme: specialValue as ArticleSpecial,
				},
			});
		}
	}

	return (
		<>
			<CardGroup>
				{cards.slice(0, 4).map((card) => {
					return (
						<CardWrapper key={card.title}>
							<Card
								{...basicCardProps}
								format={card.format}
								headlineText={title}
								trailText="The 29-year-old source behind the biggest intelligence leak in the NSA’s history explains his motives"
								kickerText={card.title}
								starRating={
									design === ArticleDesign.Review
										? 3
										: undefined
								}
							/>
						</CardWrapper>
					);
				})}
			</CardGroup>
			<CardGroup>
				{cards.slice(4).map((card) => {
					return (
						<CardWrapper key={card.title}>
							<Card
								{...basicCardProps}
								format={card.format}
								headlineText={title}
								trailText="The 29-year-old source behind the biggest intelligence leak in the NSA’s history explains his motives"
								kickerText={card.title}
								starRating={
									design === ArticleDesign.Review
										? 3
										: undefined
								}
							/>
						</CardWrapper>
					);
				})}
			</CardGroup>
		</>
	);
};

export default {
	title: 'Components/Card',
	component: CardGroup,
	// Export used by dotcom-rendering/stories/Card.stories.tsx
	excludeStories: ['CardsWithDifferentThemes'],
	decorators: [
		splitTheme([basicCardProps.format], { orientation: 'vertical' }),
	],
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.wide],
		},
	},
};

/** TODO : Update stories once initial chromatic check has passed on new font size scale */
export const WithDifferentHeadlineSizes = () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card
					{...basicCardProps}
					headlineSizes={{ desktop: 'tiny' }}
					headlineText="tiny"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					headlineSizes={{ desktop: 'xxsmall' }}
					headlineText="small"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					headlineSizes={{ desktop: 'xsmall' }}
					headlineText="medium"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					headlineSizes={{ desktop: 'small' }}
					headlineText="large"
				/>
			</CardWrapper>
		</CardGroup>
	);
};

export const WithByline = () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card
					{...basicCardProps}
					byline="Byline text"
					showByline={true}
				/>
			</CardWrapper>
		</CardGroup>
	);
};

export const WithExternalLink = () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card
					{...basicCardProps}
					mediaPositionOnDesktop="right"
					kickerText="Instagram"
					headlineSizes={{ desktop: 'medium', tablet: 'small' }}
					headlineText="Follow The Guardian now"
					isExternalLink={true}
				/>
			</CardWrapper>
		</CardGroup>
	);
};

export const WithANewsletter = () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card {...basicCardProps} isNewsletter={true} />
			</CardWrapper>
		</CardGroup>
	);
};

export const WithMediaType = () => {
	return (
		<>
			<CardGroup>
				<CardWrapper>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Video,
							theme: Pillar.Sport,
						}}
						mainMedia={{ ...mainYoutubeVideo, duration: 30 }}
						articleMainMedia={{ ...mainYoutubeVideo, duration: 30 }}
						headlineText="Video"
					/>
				</CardWrapper>
				<CardWrapper>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Video,
							theme: Pillar.Sport,
						}}
						mainMedia={{ ...mainYoutubeVideo, duration: 0 }}
						articleMainMedia={{ ...mainYoutubeVideo, duration: 0 }}
						headlineText="Video without duration"
					/>
				</CardWrapper>
				<CardWrapper>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Video,
							theme: Pillar.Sport,
						}}
						mainMedia={{
							...mainYoutubeVideo,
							duration: 0,
							isLive: true,
						}}
						headlineText="Live video"
					/>
				</CardWrapper>
				<CardWrapper>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Video,
							theme: Pillar.Sport,
						}}
						mainMedia={{ ...mainSelfHostedVideo }}
						articleMainMedia={{ ...mainYoutubeVideo, duration: 30 }}
						headlineText="Video with self-hosted video main media"
					/>
				</CardWrapper>
			</CardGroup>
			<CardGroup>
				<CardWrapper>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Audio,
							theme: Pillar.Sport,
						}}
						mainMedia={mainAudio}
						articleMainMedia={mainAudio}
						headlineText="Audio"
					/>
				</CardWrapper>
				<CardWrapper>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Audio,
							theme: Pillar.Sport,
						}}
						mainMedia={{ ...mainSelfHostedVideo }}
						articleMainMedia={mainAudio}
						headlineText="Audio with self-hosted video main media"
					/>
				</CardWrapper>
			</CardGroup>
			<CardGroup>
				<CardWrapper>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Gallery,
							theme: Pillar.Sport,
						}}
						mainMedia={mainGallery}
						articleMainMedia={mainGallery}
						headlineText="Gallery"
					/>
				</CardWrapper>
				<CardWrapper>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Gallery,
							theme: Pillar.Sport,
						}}
						mainMedia={{ ...mainSelfHostedVideo }}
						articleMainMedia={mainGallery}
						headlineText="Gallery with self-hosted video main media"
					/>
				</CardWrapper>
			</CardGroup>
		</>
	);
};

export const WithMediaTypeAndSublinks = () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Video,
						theme: Pillar.Sport,
					}}
					mainMedia={{ ...mainYoutubeVideo, duration: 30 }}
					articleMainMedia={{ ...mainYoutubeVideo, duration: 30 }}
					headlineText="Video"
					supportingContent={twoSublinks}
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Video,
						theme: Pillar.Sport,
					}}
					mainMedia={{ ...mainYoutubeVideo, duration: 0 }}
					articleMainMedia={{ ...mainYoutubeVideo, duration: 0 }}
					headlineText="Video without duration"
					supportingContent={twoSublinks}
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Audio,
						theme: Pillar.Sport,
					}}
					mainMedia={mainAudio}
					articleMainMedia={mainAudio}
					headlineText="Audio"
					supportingContent={twoSublinks}
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Gallery,
						theme: Pillar.Sport,
					}}
					mainMedia={mainGallery}
					articleMainMedia={mainGallery}
					headlineText="Gallery"
					supportingContent={twoSublinks}
				/>
			</CardWrapper>
		</CardGroup>
	);
};

export const WithMediaTypeSpecialReportAlt = () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Video,
						theme: ArticleSpecial.SpecialReportAlt,
					}}
					mainMedia={{ ...mainYoutubeVideo, duration: 30 }}
					articleMainMedia={{ ...mainYoutubeVideo, duration: 30 }}
					headlineText="Video"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Audio,
						theme: ArticleSpecial.SpecialReportAlt,
					}}
					mainMedia={mainAudio}
					articleMainMedia={mainAudio}
					headlineText="Audio"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Gallery,
						theme: ArticleSpecial.SpecialReportAlt,
					}}
					mainMedia={mainGallery}
					articleMainMedia={mainGallery}
					headlineText="Gallery"
				/>
			</CardWrapper>
		</CardGroup>
	);
};

export const WithDifferentImagePositions = () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					mediaPositionOnDesktop="left"
					mediaSize="large"
					headlineText="left"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					mediaPositionOnDesktop="right"
					mediaSize="large"
					headlineText="right"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					mediaPositionOnDesktop="top"
					headlineText="top"
				/>
			</CardWrapper>
		</>
	);
};

WithDifferentImagePositions.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.wide,
			],
		},
	},
};

export const WithDifferentImageSizes = () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					mediaPositionOnDesktop="left"
					headlineText="small"
					mediaSize="small"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					mediaPositionOnDesktop="left"
					headlineText="medium"
					mediaSize="medium"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					mediaPositionOnDesktop="left"
					headlineText="large"
					mediaSize="large"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					mediaPositionOnDesktop="left"
					headlineText="jumbo"
					mediaSize="jumbo"
				/>
			</CardWrapper>
		</>
	);
};

export const WithPulsingDot = () => {
	return (
		<CardWrapper>
			<Card
				{...basicCardProps}
				showPulsingDot={true}
				kickerText="Pulsing Dot"
			/>
		</CardWrapper>
	);
};

export const WithPulsingDotSpecialReportAlt = () => {
	return (
		<CardWrapper>
			<Card
				{...basicCardProps}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: ArticleSpecial.SpecialReportAlt,
				}}
				showPulsingDot={true}
			/>
		</CardWrapper>
	);
};

export const WithQuotes = () => {
	return (
		<CardWrapper>
			<Card
				{...basicCardProps}
				showQuotedHeadline={true}
				kickerText="Quotes"
			/>
		</CardWrapper>
	);
};

export const CommentThemeWithoutQuotes = () => {
	return (
		<CardWrapper>
			<Card
				{...basicCardProps}
				kickerText="No quotes"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Comment,
					theme: Pillar.Opinion,
				}}
			/>
		</CardWrapper>
	);
};

export const WithQuotesSpecialReportAlt = () => {
	return (
		<CardWrapper>
			<Card
				{...basicCardProps}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.SpecialReportAlt,
				}}
				showQuotedHeadline={true}
				kickerText="Quotes"
			/>
		</CardWrapper>
	);
};

export const WithAnAvatar = () => {
	return (
		<>
			<CardWrapper>
				<div
					css={css`
						width: 280px;
					`}
				>
					<Card
						{...basicCardProps}
						avatarUrl="https://uploads.guim.co.uk/2017/10/06/George-Monbiot,-L.png"
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Comment,
							theme: Pillar.Opinion,
						}}
					/>
				</div>
			</CardWrapper>
		</>
	);
};

export const WhenVerticalAndThemeOpinion = () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="top"
					showQuotedHeadline={true}
				/>
			</CardWrapper>
		</>
	);
};

export const WithSublinksWhenVerticalAndSpecialReport = () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: ArticleSpecial.SpecialReport,
					}}
					mediaPositionOnDesktop="top"
					supportingContent={[
						{
							...aBasicLink,
							headline: 'Headline 1',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline: 'Headline 2',
							kickerText: 'Kicker',
							format: {
								theme: Pillar.Sport,
								design: ArticleDesign.Gallery,
								display: ArticleDisplay.Standard,
							},
						},
						{
							...aBasicLink,
							headline: 'Headline 3',
							kickerText: 'Kicker',
						},
					]}
					showQuotedHeadline={true}
				/>
			</CardWrapper>
		</>
	);
};

export const WhenHorizontalAndOpinion = () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="right"
					showQuotedHeadline={true}
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="right"
					supportingContentAlignment="horizontal"
					supportingContent={[
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
					]}
					showQuotedHeadline={true}
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="right"
					supportingContent={[
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
					]}
					showQuotedHeadline={true}
				/>
			</CardWrapper>
		</>
	);
};

export const WhenNewsWithMoreThanTwoSublinks = () => {
	return (
		<CardWrapper>
			<Card
				{...basicCardProps}
				mediaPositionOnDesktop="right"
				mediaSize="large"
				supportingContentAlignment="horizontal"
				supportingContent={[
					{
						...aBasicLink,
						headline: 'A longer headline to see how wrapping works',
						kickerText: 'Kicker',
					},
					{
						...aBasicLink,
						headline: 'A longer headline to see how wrapping works',
						kickerText: 'Kicker',
					},
					{
						...aBasicLink,
						headline: 'A longer headline to see how wrapping works',
						kickerText: 'Kicker',
					},
				]}
			/>
		</CardWrapper>
	);
};

export const WhenHorizontalOpinionWithSmallImage = () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="left"
					mediaSize="small"
					showQuotedHeadline={true}
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="left"
					mediaSize="small"
					supportingContentAlignment="horizontal"
					supportingContent={[
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
					]}
					showQuotedHeadline={true}
				/>
			</CardWrapper>
		</>
	);
};

export const WhenHorizontalOpinionWithMediumImage = () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="left"
					mediaSize="medium"
					showQuotedHeadline={true}
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="left"
					mediaSize="medium"
					supportingContentAlignment="horizontal"
					supportingContent={[
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
					]}
					showQuotedHeadline={true}
				/>
			</CardWrapper>
		</>
	);
};

export const WhenHorizontalOpinionWithLargeImage = () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="left"
					mediaSize="large"
					showQuotedHeadline={true}
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="left"
					mediaSize="large"
					supportingContentAlignment="horizontal"
					supportingContent={[
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
					]}
					showQuotedHeadline={true}
				/>
			</CardWrapper>
		</>
	);
};

export const WhenHorizontalOpinionWithJumboImage = () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="left"
					mediaSize="jumbo"
					showQuotedHeadline={true}
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="left"
					mediaSize="jumbo"
					supportingContentAlignment="horizontal"
					supportingContent={[
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
					]}
					showQuotedHeadline={true}
				/>
			</CardWrapper>
		</>
	);
};

export const WhenOpinionWithImageAtBottom = () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: Pillar.Opinion,
					}}
					mediaPositionOnDesktop="bottom"
					supportingContent={[
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
						{
							...aBasicLink,
							headline:
								'A longer headline to see how wrapping works',
							kickerText: 'Kicker',
						},
					]}
					showQuotedHeadline={true}
				/>
			</CardWrapper>
		</>
	);
};

export const WhenYoutubeVideoWithPlayButton = () => {
	return (
		<Section title="Play icons" padContent={false} centralBorder="partial">
			<UL direction="row" padBottom={true}>
				<LI percentage={'100%'} padSides={true}>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Video,
							theme: Pillar.News,
						}}
						mediaPositionOnDesktop="top"
						mediaSize="jumbo"
						mediaPositionOnMobile="top"
						mainMedia={mainYoutubeVideo}
						articleMainMedia={mainYoutubeVideo}
					/>
				</LI>
			</UL>
			<UL direction="row" padBottom={true}>
				<LI percentage={'75%'} padSides={true}>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Video,
							theme: Pillar.News,
						}}
						mediaPositionOnDesktop="right"
						mediaSize="large"
						mediaPositionOnMobile="top"
						mainMedia={mainYoutubeVideo}
						articleMainMedia={mainYoutubeVideo}
					/>
				</LI>
				<LI percentage={'25%'} padSides={true} showDivider={true}>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Video,
							theme: Pillar.News,
						}}
						mediaPositionOnDesktop="top"
						mainMedia={mainYoutubeVideo}
						articleMainMedia={mainYoutubeVideo}
						canPlayInline={false}
					/>
				</LI>
			</UL>
			<UL direction="row" padBottom={true}>
				<LI percentage={'50%'} padSides={true}>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Video,
							theme: Pillar.News,
						}}
						mediaPositionOnDesktop="top"
						mediaSize="medium"
						mediaPositionOnMobile="bottom"
						mainMedia={mainYoutubeVideo}
						articleMainMedia={mainYoutubeVideo}
					/>
				</LI>
				<LI percentage="50%">
					<UL direction="column" showDivider={true}>
						<LI padSides={true}>
							<Card
								{...basicCardProps}
								format={{
									display: ArticleDisplay.Standard,
									design: ArticleDesign.Video,
									theme: Pillar.News,
								}}
								mediaPositionOnDesktop="left"
								mainMedia={mainYoutubeVideo}
								articleMainMedia={mainYoutubeVideo}
								canPlayInline={false}
							/>
						</LI>
						<LI padSides={true}>
							<Card
								{...basicCardProps}
								format={{
									display: ArticleDisplay.Standard,
									design: ArticleDesign.Video,
									theme: Pillar.News,
								}}
								mediaPositionOnDesktop="right"
								mainMedia={mainYoutubeVideo}
								articleMainMedia={mainYoutubeVideo}
								canPlayInline={false}
							/>
						</LI>

						<LI padSides={true}>
							<Card
								{...basicCardProps}
								format={{
									display: ArticleDisplay.Standard,
									design: ArticleDesign.Video,
									theme: Pillar.News,
								}}
								mediaPositionOnDesktop="right"
								mainMedia={mainYoutubeVideo}
								articleMainMedia={mainYoutubeVideo}
								canPlayInline={false}
							/>
						</LI>
					</UL>
				</LI>
			</UL>

			<UL direction="row" padBottom={true}>
				<LI percentage={'66.666%'} padSides={true}>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Video,
							theme: Pillar.News,
						}}
						mediaPositionOnDesktop="right"
						mediaSize="large"
						mediaPositionOnMobile="top"
						mainMedia={mainYoutubeVideo}
						articleMainMedia={mainYoutubeVideo}
					/>
				</LI>
				<LI percentage={'33.333%'} padSides={true} showDivider={true}>
					<Card
						{...basicCardProps}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Video,
							theme: Pillar.News,
						}}
						mediaPositionOnDesktop="top"
						mediaPositionOnMobile="left"
						mediaSize="medium"
						mainMedia={mainYoutubeVideo}
						articleMainMedia={mainYoutubeVideo}
					/>
				</LI>
			</UL>
		</Section>
	);
};
export const WithLetterDesign = () => {
	return (
		<CardWrapper>
			<Card
				{...basicCardProps}
				headlineSizes={{ desktop: 'xxsmall' }}
				headlineText="Culture"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Letter,
					theme: Pillar.Culture,
				}}
			/>
		</CardWrapper>
	);
};

WithLetterDesign.storyName = 'WithLetterDesign';

export const WithLetterDesignAndShowQuotedHeadline = () => {
	return (
		<CardWrapper>
			<Card
				{...basicCardProps}
				headlineSizes={{ desktop: 'xxsmall' }}
				headlineText="Culture"
				showQuotedHeadline={true}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Letter,
					theme: Pillar.Culture,
				}}
			/>
		</CardWrapper>
	);
};

WithLetterDesignAndShowQuotedHeadline.storyName =
	'WithLetterDesignAndShowQuotedHeadline';

const containerPalettes = [
	'InvestigationPalette',
	'LongRunningPalette',
	'SombrePalette',
	'BreakingPalette',
	'EventPalette',
	'EventAltPalette',
	'LongRunningAltPalette',
	'SombreAltPalette',
	'SpecialReportAltPalette',
	'Branded',
] as const satisfies readonly DCRContainerPalette[];

const branding = {
	brandingType: {
		name: 'sponsored',
	},
	sponsorName: 'theguardian.org',
	logo: {
		src: 'https://static.theguardian.com/commercial/sponsor/22/Feb/2024/17ea91fc-659b-4c51-8410-9907241c1710-Guardian.orglogos-for badge.png',
		dimensions: {
			width: 280,
			height: 180,
		},
		link: 'https://theguardian.org/',
		label: 'Supported by',
	},
	logoForDarkBackground: {
		src: 'https://static.theguardian.com/commercial/sponsor/22/Feb/2024/21f5a3a5-30e7-4db7-a09f-031af569454d-guardian.org new logo - white version (3).png',
		dimensions: {
			width: 280,
			height: 180,
		},
		link: 'https://theguardian.org/',
		label: 'Supported by',
	},
	aboutThisLink:
		'https://www.theguardian.com/environment/2023/jan/06/about-animals-farmed-investigating-modern-farming-around-the-world',
} satisfies Branding;

export const WithBranding = () => {
	return [undefined, ...containerPalettes].map((containerPalette) => (
		<ContainerOverrides
			key={containerPalette}
			containerPalette={containerPalette}
		>
			<Section title={containerPalette ?? 'Standard'}>
				<UL direction="row" padBottom={true}>
					<LI percentage={'33.333%'} padSides={true}>
						<Card
							{...basicCardProps}
							format={{
								display: ArticleDisplay.Standard,
								design: ArticleDesign.Standard,
								theme: ArticleSpecial.Labs,
							}}
							headlineText="guardian.org branding on a Standard card"
							kickerText="Kicker"
							trailText=""
							mediaPositionOnDesktop="top"
							mediaPositionOnMobile="left"
							mediaSize="small"
							containerPalette={containerPalette}
							branding={branding}
						/>
					</LI>
					<LI percentage={'33.333%'} padSides={true}>
						<Card
							{...basicCardProps}
							format={{
								display: ArticleDisplay.Standard,
								design: ArticleDesign.Gallery,
								theme: ArticleSpecial.Labs,
							}}
							kickerText="Kicker"
							headlineText="guardian.org branding on a Gallery card"
							trailText=""
							mediaPositionOnDesktop="top"
							mediaPositionOnMobile="left"
							mediaSize="small"
							mainMedia={mainGallery}
							articleMainMedia={mainGallery}
							containerPalette={containerPalette}
							branding={branding}
						/>
					</LI>
					<LI percentage={'33.333%'} padSides={true}>
						<Card
							{...basicCardProps}
							format={{
								display: ArticleDisplay.Standard,
								design: ArticleDesign.Standard,
								theme: Pillar.News,
							}}
							headlineText="guardian.org branding does not appear on non Labs articles"
							kickerText="Kicker"
							trailText=""
							mediaPositionOnDesktop="top"
							mediaPositionOnMobile="left"
							mediaSize="small"
							containerPalette={containerPalette}
							branding={branding}
						/>
					</LI>
				</UL>
			</Section>
		</ContainerOverrides>
	));
};

export const WithSpecialPaletteVariations = () => {
	const Cards = ({
		containerPalette,
		isLabs = false,
	}: {
		containerPalette: DCRContainerPalette;
		isLabs?: boolean;
	}) => (
		<UL direction="row" padBottom={true}>
			<LI percentage={'66.666%'} padSides={true}>
				<Card
					{...basicCardProps}
					format={
						isLabs
							? {
									...basicCardProps.format,
									theme: ArticleSpecial.Labs,
							  }
							: basicCardProps.format
					}
					kickerText="Live kicker"
					showPulsingDot={true}
					mediaPositionOnDesktop="right"
					mediaSize="large"
					mediaPositionOnMobile="top"
					containerPalette={containerPalette}
					discussionId="/p/d8ex5"
					discussionApiUrl="https://discussion.theguardian.com/discussion-api"
					branding={branding}
				/>
			</LI>
			<LI percentage={'33.333%'} padSides={true} showDivider={true}>
				<Card
					{...basicCardProps}
					format={
						isLabs
							? {
									display: ArticleDisplay.Standard,
									design: ArticleDesign.Audio,
									theme: ArticleSpecial.Labs,
							  }
							: {
									display: ArticleDisplay.Standard,
									design: ArticleDesign.Audio,
									theme: Pillar.Lifestyle,
							  }
					}
					headlineText="Audio"
					kickerText="Kicker"
					trailText=""
					mediaPositionOnDesktop="top"
					mediaPositionOnMobile="left"
					mediaSize="medium"
					mainMedia={mainAudio}
					articleMainMedia={mainAudio}
					containerPalette={containerPalette}
					branding={branding}
				/>
			</LI>
		</UL>
	);
	return (
		<>
			{containerPalettes.map((containerPalette) => (
				<FrontSection
					title={containerPalette}
					discussionApiUrl=""
					editionId={'UK'}
					containerPalette={containerPalette}
					key={containerPalette}
					isLabs={containerPalette === 'Branded'}
					collectionBranding={
						containerPalette === 'Branded'
							? {
									kind: 'paid-content',
									branding,
									isContainerBranding: true,
									hasMultipleBranding: false,
									isFrontBranding: false,
							  }
							: undefined
					}
				>
					<Cards containerPalette={containerPalette} />
				</FrontSection>
			))}
		</>
	);
};

export const DynamoWithSpecialPaletteVariations = () => {
	const DynamoCard = ({
		containerPalette,
		isLabs = false,
	}: {
		containerPalette: DCRContainerPalette;
		isLabs?: boolean;
	}) => (
		<CardWrapper>
			<Card
				{...basicCardProps}
				format={
					isLabs
						? {
								...basicCardProps.format,
								theme: ArticleSpecial.Labs,
						  }
						: basicCardProps.format
				}
				containerPalette={containerPalette}
				containerType="dynamic/package"
				isDynamo={true}
				kickerText="Main kicker"
				headlineSizes={{ desktop: 'medium', tablet: 'small' }}
				mediaPositionOnDesktop="bottom"
				mediaPositionOnMobile="bottom"
				mediaSize="large"
				supportingContent={[
					{
						...aBasicLink,
						headline: 'Headline 1',
						kickerText: `${isLabs ? 'Labs' : 'News'} kicker`,
						format: isLabs
							? {
									...basicCardProps.format,
									theme: ArticleSpecial.Labs,
							  }
							: basicCardProps.format,
					},
					{
						...aBasicLink,
						headline: 'Headline 2',
						kickerText: `${isLabs ? 'Labs' : 'Sport'} kicker`,
						format: {
							theme: isLabs ? ArticleSpecial.Labs : Pillar.Sport,
							design: ArticleDesign.Gallery,
							display: ArticleDisplay.Standard,
						},
					},
					{
						...aBasicLink,
						headline: 'Headline 3',
						kickerText: `${isLabs ? 'Labs' : 'Culture'} kicker`,
						format: {
							theme: isLabs
								? ArticleSpecial.Labs
								: Pillar.Culture,
							design: ArticleDesign.Standard,
							display: ArticleDisplay.Standard,
						},
					},
				]}
			/>
		</CardWrapper>
	);

	return (
		<>
			{containerPalettes.map((containerPalette) => (
				<FrontSection
					title={containerPalette}
					discussionApiUrl=""
					editionId={'UK'}
					containerPalette={containerPalette}
					key={containerPalette}
					isLabs={containerPalette === 'Branded'}
					collectionBranding={
						containerPalette === 'Branded'
							? {
									kind: 'paid-content',
									branding,
									isContainerBranding: true,
									hasMultipleBranding: false,
									isFrontBranding: false,
							  }
							: undefined
					}
				>
					<DynamoCard containerPalette={containerPalette} />
				</FrontSection>
			))}
		</>
	);
};

export const WithAFiveFourAspectRatio = () => {
	return (
		<>
			<CardWrapper>
				<div
					css={css`
						width: 280px;
					`}
				>
					<Card
						{...basicCardProps}
						image={{
							src: 'https://s3-eu-west-1.amazonaws.com/media-origin.test.dev-guim.co.uk/2db0f6baf3eac423bfeb07cf04d95a7f810c2f6c/554_0_2946_2356/master/2946.jpg',
							altText: '5:4 aspect ratio',
						}}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.News,
						}}
						aspectRatio="5:4"
					/>
				</div>
			</CardWrapper>
		</>
	);
};

export const WithNoGap = () => {
	return (
		<>
			<CardWrapper>
				<div
					css={css`
						width: 280px;
					`}
				>
					<Card
						{...basicCardProps}
						mediaPositionOnDesktop="left"
						isOnwardContent={true}
						showTopBarDesktop={false}
						showTopBarMobile={false}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.Opinion,
						}}
					/>
				</div>
			</CardWrapper>
		</>
	);
};

export const WithATinyGap = () => {
	return (
		<>
			<CardWrapper>
				<div
					css={css`
						width: 280px;
					`}
				>
					<Card
						{...basicCardProps}
						mediaPositionOnDesktop="left"
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.Sport,
						}}
					/>
				</div>
			</CardWrapper>
		</>
	);
};

export const WithASmallGap = () => {
	return (
		<>
			<CardWrapper>
				<div
					css={css`
						width: 280px;
					`}
				>
					<Card
						{...basicCardProps}
						mediaPositionOnDesktop="left"
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.Opinion,
						}}
					/>
				</div>
			</CardWrapper>
		</>
	);
};

export const WithAMediumGap = () => {
	return (
		<>
			<CardWrapper>
				<div
					css={css`
						width: 280px;
					`}
				>
					<Card
						{...basicCardProps}
						containerType={'scrollable/small'}
						mediaPositionOnDesktop="left"
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.Opinion,
						}}
					/>
				</div>
			</CardWrapper>
		</>
	);
};

export const WithALargeGap = () => {
	return (
		<>
			<CardWrapper>
				<div
					css={css`
						width: 280px;
					`}
				>
					<Card
						{...basicCardProps}
						containerType={'flexible/special'}
						mediaPositionOnDesktop="left"
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.Opinion,
						}}
						showTopBarDesktop={false}
						showTopBarMobile={true}
					/>
				</div>
			</CardWrapper>
		</>
	);
};

export const WithNoVerticalGap = () => {
	return (
		<>
			<CardWrapper>
				<div
					css={css`
						width: 280px;
					`}
				>
					<Card
						{...basicCardProps}
						isOnwardContent={true}
						showTopBarDesktop={false}
						showTopBarMobile={false}
						mediaPositionOnDesktop="bottom"
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.Opinion,
						}}
					/>
				</div>
			</CardWrapper>
		</>
	);
};

export const WithAVerticalGapWhenLegacyContainer = () => {
	return (
		<>
			<CardWrapper>
				<div
					css={css`
						width: 280px;
					`}
				>
					<Card
						{...basicCardProps}
						containerType={'dynamic/fast'}
						mediaPositionOnDesktop="bottom"
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.Opinion,
						}}
						discussionId={'p/d8ex5'}
					/>
				</div>
			</CardWrapper>
		</>
	);
};

export const WithAVerticalGapWhenBetaContainer = () => {
	return (
		<>
			<CardWrapper>
				<div
					css={css`
						width: 280px;
					`}
				>
					<Card
						{...basicCardProps}
						containerType={'flexible/special'}
						mediaPositionOnDesktop="bottom"
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.Opinion,
						}}
						discussionId={'p/d8ex5'}
					/>
				</div>
			</CardWrapper>
		</>
	);
};

export const WithAVerticalGapWhenScrollableSmallContainer = () => {
	return (
		<>
			<CardWrapper>
				<div
					css={css`
						width: 280px;
					`}
				>
					<Card
						{...basicCardProps}
						containerType={'scrollable/small'}
						mediaPositionOnDesktop="bottom"
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.Opinion,
						}}
						discussionId={'p/d8ex5'}
					/>
				</div>
			</CardWrapper>
		</>
	);
};

export const WithBetaContainerAndSublinks = () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card
					{...basicCardProps}
					containerType="flexible/general"
					mediaPositionOnMobile="bottom"
					supportingContent={twoSublinks}
				/>
			</CardWrapper>
		</CardGroup>
	);
};

export const WithBetaContainerAndSublinksNoImage = () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card
					{...basicCardProps}
					image={undefined}
					containerType="flexible/general"
					mediaPositionOnMobile="bottom"
					supportingContent={twoSublinks}
				/>
			</CardWrapper>
		</CardGroup>
	);
};
