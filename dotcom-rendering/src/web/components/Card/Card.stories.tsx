import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { breakpoints, from } from '@guardian/source-foundations';
import { storiesOf } from '@storybook/react';
import React from 'react';
import type { Props as CardProps } from './Card';
import { Card } from './Card';

const basicCardProps: CardProps = {
	linkTo: '',
	format: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	},
	headlineText: 'Headline text',
	trailText:
		'The 29-year-old source behind the biggest intelligence leak in the NSA’s history explains his motives',
	headlineSize: 'medium',
	kickerText: '',
	webPublicationDate: '2019-11-11T09:45:30.000Z',
	imageUrl:
		'https://i.guim.co.uk/img/media/6537e163c9164d25ec6102641f6a04fa5ba76560/0_0_5472_3648/master/5472.jpg?width=1140&quality=85&s=15053eb16d6829d670fb348d8d26aabd',
	imagePosition: 'top',
	showAge: true,
};

const aBasicLink = {
	headline: 'Headline',
	url: 'https://www.theguardian.com',
	format: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	},
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

const CardsWithDifferentThemes = ({
	display,
	design,
	title,
}: {
	display: ArticleDisplay;
	design: ArticleDesign;
	title: string;
}) => {
	const cards = [];
	for (const [pillarName, pillarValue] of Object.entries(ArticlePillar)) {
		// We need to check if numeric here because the values are also exported as keynames
		// See: https://www.typescriptlang.org/play?#code/KYOwrgtgBAggTgFwJYGMA2wAKS1oIZxQDeAsAFBSVQBywA7gM5QC8UADADTlVQDyADkhBIA9iBZQAjFwpUAyvxGIJAJhk8AwmDQIwcYBIDM6qgBkkAM2AMEATwwSALDIC+5cijEMRGAHRoRAHMACl4AIwArYBQEX1AEOCRrYPhkdCwcfDgASmyAbnIAegAqcgBtbioygCI2ao4oatpGaoBdE0oayXrGgSFREDaOqBqVHuqFJQQhys7qw3GtHT1gGdk5x3HzKxt7VfbZkab6Bh62A-WjvuExHskLnhrJxB6VB6rqpd19HsN3ue21jsGHqjla5FaUHIxUKQA
		if (Number.isNaN(Number(pillarName))) {
			cards.push({
				title: pillarName,
				format: {
					display,
					design,
					theme: pillarValue as ArticlePillar,
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
						<CardWrapper>
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
						<CardWrapper>
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

for (const [displayName, displayValue] of Object.entries(ArticleDisplay)) {
	if (Number.isNaN(Number(displayName))) {
		const stories = storiesOf(
			`Components/Card/Format variations/${displayName}`,
			module,
		);
		for (const [designName, designValue] of Object.entries(ArticleDesign)) {
			if (Number.isNaN(Number(designName))) {
				stories.add(designName, () => {
					return CardsWithDifferentThemes({
						display: displayValue as ArticleDisplay,
						design: designValue as ArticleDesign,
						title: designName,
					});
				});
			}
		}
	}
}

const cardStories = storiesOf(`Components/Card`, module).addParameters({
	chromatic: {
		viewports: [breakpoints.mobile, breakpoints.wide],
	},
});

cardStories.add('with different headline sizes', () => {
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
});

cardStories.add('with byline', () => {
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
});

cardStories.add('with media type', () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Video,
						theme: ArticlePillar.Sport,
					}}
					mediaType="Video"
					mediaDuration={30}
					headlineText="Video"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Audio,
						theme: ArticlePillar.Sport,
					}}
					mediaType="Audio"
					mediaDuration={90}
					headlineText="Audio"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Gallery,
						theme: ArticlePillar.Sport,
					}}
					mediaType="Gallery"
					headlineText="Gallery"
				/>
			</CardWrapper>
		</CardGroup>
	);
});

cardStories.add('with different image positions', () => {
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
});

cardStories.add('with different image sizes', () => {
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
});

cardStories.add('with pulsing dot', () => {
	return (
		<CardWrapper>
			<Card
				{...basicCardProps}
				showPulsingDot={true}
				kickerText="Pulsing Dot"
			/>
		</CardWrapper>
	);
});

cardStories.add('with no slash', () => {
	return (
		<CardWrapper>
			<Card {...basicCardProps} showSlash={false} kickerText="No slash" />
		</CardWrapper>
	);
});

cardStories.add('with an avatar when vertical', () => {
	return (
		<>
			<CardWrapper>
				<div
					css={css`
						width: 260px;
					`}
				>
					<Card
						{...basicCardProps}
						imageUrl=""
						avatar={{
							src: 'https://i.guim.co.uk/img/uploads/2017/10/06/George-Monbiot,-L.png?width=173&quality=85&auto=format&fit=max&s=be5b0d3f3aa55682e4930057fc3929a3',
							alt: '',
						}}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Comment,
							theme: ArticlePillar.Opinion,
						}}
					/>
				</div>
			</CardWrapper>
		</>
	);
});

cardStories.add('with an avatar when horizontal', () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					imageUrl=""
					avatar={{
						src: 'https://i.guim.co.uk/img/uploads/2017/10/06/George-Monbiot,-L.png?width=173&quality=85&auto=format&fit=max&s=be5b0d3f3aa55682e4930057fc3929a3',
						alt: '',
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: ArticlePillar.Opinion,
					}}
				/>
			</CardWrapper>
		</>
	);
});

cardStories.add('when vertical and theme opinion', () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: ArticlePillar.Opinion,
					}}
					imagePosition="top"
				/>
			</CardWrapper>
		</>
	);
});

cardStories.add('when vertical, opinion and with comments', () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: ArticlePillar.Opinion,
					}}
					imagePosition="top"
					commentCount={99}
				/>
			</CardWrapper>
		</>
	);
});

cardStories.add('with sublinks when vertical and opinion', () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: ArticlePillar.Opinion,
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
				/>
			</CardWrapper>
		</>
	);
});

cardStories.add('when horizontal and opinion', () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					commentCount={99}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: ArticlePillar.Opinion,
					}}
					imagePosition="right"
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					commentCount={99}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: ArticlePillar.Opinion,
					}}
					imagePosition="right"
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
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					commentCount={99}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: ArticlePillar.Opinion,
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
				/>
			</CardWrapper>
		</>
	);
});

cardStories.add('when news, with comments', () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					imagePosition="right"
					imageSize="large"
					commentCount={99}
				/>
			</CardWrapper>
			<CardWrapper>
				<Card
					{...basicCardProps}
					imagePosition="right"
					imageSize="large"
					commentCount={99}
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
					]}
				/>
			</CardWrapper>
		</>
	);
});

cardStories.add('when news, with more than two sublinks', () => {
	return (
		<CardWrapper>
			<Card
				{...basicCardProps}
				imagePosition="right"
				imageSize="large"
				commentCount={99}
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
});

cardStories.add('when vertical, news and with comments', () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card {...basicCardProps} commentCount={894} />
			</CardWrapper>
		</CardGroup>
	);
});

cardStories.add('when horizontal, opinion, with a small image', () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: ArticlePillar.Opinion,
					}}
					imagePosition="left"
					imageSize="small"
				/>
			</CardWrapper>
		</>
	);
});

cardStories.add('when opinion, with the image at the bottom', () => {
	return (
		<>
			<CardWrapper>
				<Card
					{...basicCardProps}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Comment,
						theme: ArticlePillar.Opinion,
					}}
					imagePosition="bottom"
					commentCount={99}
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
				/>
			</CardWrapper>
		</>
	);
});
