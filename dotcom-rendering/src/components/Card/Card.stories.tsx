import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import React from 'react';
import { lightDecorator } from '../../../.storybook/decorators/themeDecorator';
import type { MainMedia } from '../../types/mainMedia';
import { Section } from '../Section';
import type { Props as CardProps } from './Card';
import { Card } from './Card';
import { LI } from './components/LI';
import { UL } from './components/UL';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';

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
	headlineSize: 'medium',
	kickerText: '',
	webPublicationDate: new Date(Date.now() - 60 * 60 * 1000).toString(),
	imageUrl:
		'https://media.guim.co.uk/6537e163c9164d25ec6102641f6a04fa5ba76560/0_210_5472_3283/master/5472.jpg',
	imagePosition: 'top',
	showAge: true,
	isExternalLink: false,
	isPlayableMediaCard: true,
	imageLoading: 'eager',
	discussionApiUrl: 'https://discussion.theguardian.com/discussion-api/',
	showMainVideo: true,
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

const mainVideo: MainMedia = {
	type: 'Video',
	elementId: '1234-abcdef-09876-xyz',
	videoId: '8M_yH-e9cq8',
	title: '’I care, but I don’t care’: Life after the Queen’s death | Anywhere but Westminster',
	expired: false,
	duration: 200,
	images: [480, 640, 960, 1024, 1200].map((width) => ({
		url: `https://i.guim.co.uk/img/media/2eb01d138eb8fba6e59ce7589a60e3ff984f6a7a/0_0_1920_1080/1920.jpg?width=${width}&quality=45&dpr=2&s=none`,
		width,
	})),
	width: 480,
	height: 288,
	origin: 'The Guardian',
};

const mainAudio: MainMedia = {
	type: 'Audio',
	duration: 24,
};

const mainGallery: MainMedia = {
	type: 'Gallery',
};

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				max-height: 360px;
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
	decorators: [splitTheme([basicCardProps.format])],
};

export const WithDifferentHeadlineSizes = () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card
					{...basicCardProps}
					headlineSize="tiny"
					headlineText="tiny"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					headlineSize="small"
					headlineText="small"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					headlineSize="medium"
					headlineText="medium"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					headlineSize="large"
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
					imagePosition="right"
					kickerText="Instagram"
					headlineSize="huge"
					headlineText="Follow The Guardian now"
					isExternalLink={true}
				/>
			</CardWrapper>
		</CardGroup>
	);
};

export const WithMediaType = () => {
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
					mainMedia={{ ...mainVideo, duration: 30 }}
					headlineText="Video"
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
					headlineText="Audio"
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
					headlineText="Gallery"
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
					mainMedia={{ ...mainVideo, duration: 30 }}
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
					mainMedia={{ ...mainAudio, duration: 90 }}
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
					imagePosition="left"
					imageSize="large"
					headlineText="left"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					imagePosition="right"
					imageSize="large"
					headlineText="right"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					imagePosition="top"
					headlineText="top"
				/>
			</CardWrapper>
		</>
	);
};

export const WithDifferentImageSizes = () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					imagePosition="left"
					headlineText="small"
					imageSize="small"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					imagePosition="left"
					headlineText="medium"
					imageSize="medium"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					imagePosition="left"
					headlineText="large"
					imageSize="large"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					imagePosition="left"
					headlineText="jumbo"
					imageSize="jumbo"
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
WithAnAvatar.decorators = [
	lightDecorator({
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Comment,
		theme: Pillar.Opinion,
	}),
];

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
					imagePosition="top"
					showQuotedHeadline={true}
				/>
			</CardWrapper>
		</>
	);
};

export const WithSublinksWhenVerticalAndOpinion = () => {
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
					imagePosition="top"
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
					imagePosition="right"
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
					imagePosition="right"
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
					imagePosition="right"
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
				imagePosition="right"
				imageSize="large"
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
					imagePosition="left"
					imageSize="small"
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
					imagePosition="left"
					imageSize="small"
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
					imagePosition="left"
					imageSize="medium"
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
					imagePosition="left"
					imageSize="medium"
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
					imagePosition="left"
					imageSize="large"
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
					imagePosition="left"
					imageSize="large"
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
					imagePosition="left"
					imageSize="jumbo"
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
					imagePosition="left"
					imageSize="jumbo"
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
					imagePosition="bottom"
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

export const WhenVideoWithPlayButton = () => {
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
						imagePosition="top"
						imageSize="jumbo"
						imagePositionOnMobile="top"
						mainMedia={mainVideo}
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
						imagePosition="right"
						imageSize="large"
						imagePositionOnMobile="top"
						mainMedia={mainVideo}
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
						imagePosition="top"
						mainMedia={mainVideo}
						isPlayableMediaCard={false}
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
						imagePosition="top"
						imageSize="medium"
						imagePositionOnMobile="bottom"
						mainMedia={mainVideo}
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
								imagePosition="left"
								mainMedia={mainVideo}
								isPlayableMediaCard={false}
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
								imagePosition="right"
								mainMedia={mainVideo}
								isPlayableMediaCard={false}
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
								imagePosition="right"
								mainMedia={mainVideo}
								isPlayableMediaCard={false}
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
						imagePosition="right"
						imageSize="large"
						imagePositionOnMobile="top"
						mainMedia={mainVideo}
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
						imagePosition="top"
						imagePositionOnMobile="left"
						imageSize="medium"
						mainMedia={mainVideo}
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
				headlineSize="small"
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
				headlineSize="small"
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
