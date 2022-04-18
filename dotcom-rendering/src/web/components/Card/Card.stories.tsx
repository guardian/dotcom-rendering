/* eslint-disable react/jsx-props-no-spreading */
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
import { Card } from './Card';

const basicCardProps = {
	linkTo: '',
	format: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	},
	headlineText: 'Headline text',
	standfirst: 'This is the standfirst/trail text',
	headlineSize: 'medium' as SmallHeadlineSize,
	kickerText: '',
	webPublicationDate: '2019-11-11T09:45:30.000Z',
	imageUrl:
		'https://i.guim.co.uk/img/media/6537e163c9164d25ec6102641f6a04fa5ba76560/0_0_5472_3648/master/5472.jpg?width=1140&quality=85&s=15053eb16d6829d670fb348d8d26aabd',
	imagePosition: 'top' as ImagePositionType,
};

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				max-height: 300px;
				width: 100%;
				${from.tablet} {
					max-width: 240px;
				}
				padding: 20px;
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
				max-width: 800px;
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
		if (Number.isNaN(Number(pillarName))) {
			cards.push({
				title: pillarName,
				format: {
					display,
					design,
					theme: pillarValue as ArticleTheme,
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
						<div
							css={css`
								height: 300px;
								max-width: 240px;
								padding: 20px;
								display: flex;
								flex-direction: row;
							`}
						>
							<Card
								{...basicCardProps}
								format={card.format}
								headlineText={title}
								standfirst="This is the standfirst/trail text"
								kickerText={card.title}
								starRating={
									design === ArticleDesign.Review
										? 3
										: undefined
								}
							/>
						</div>
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
								standfirst="This is the standfirst/trail text"
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
				// eslint-disable-next-line @typescript-eslint/no-loop-func
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
		<CardWrapper>
			<Card {...basicCardProps} byline="Byline text" showByline={true} />
		</CardWrapper>
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
						design: ArticleDesign.Media,
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
						design: ArticleDesign.Media,
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
						design: ArticleDesign.Media,
						theme: ArticlePillar.Sport,
					}}
					mediaType="Gallery"
					mediaDuration={360}
					headlineText="Gallery"
				/>
			</CardWrapper>
		</CardGroup>
	);
});

cardStories.add('with different image positions', () => {
	return (
		<>
			<div
				css={css`
					width: 100%;
					${from.tablet} {
						max-width: 500px;
					}
					padding: 20px;
				`}
			>
				<Card
					{...basicCardProps}
					imagePosition="left"
					headlineText="left"
				/>
			</div>
			<div
				css={css`
					width: 100%;
					${from.tablet} {
						max-width: 500px;
					}
					padding: 20px;
				`}
			>
				<Card
					{...basicCardProps}
					imagePosition="right"
					headlineText="right"
				/>
			</div>
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
			<div
				css={css`
					max-height: 80px;
					max-width: 340px;
					padding: 10px;
					margin-bottom: 20px;
				`}
			>
				<Card
					{...basicCardProps}
					imagePosition="left"
					headlineText="small"
					imageSize="small"
				/>
			</div>
			<div
				css={css`
					max-height: 100px;
					max-width: 340px;
					padding: 10px;
					margin-bottom: 20px;
				`}
			>
				<Card
					{...basicCardProps}
					imagePosition="left"
					headlineText="medium"
					imageSize="medium"
				/>
			</div>
			<div
				css={css`
					max-height: 200px;
					max-width: 440px;
					padding: 10px;
					margin-bottom: 20px;
				`}
			>
				<Card
					{...basicCardProps}
					imagePosition="left"
					headlineText="large"
					imageSize="large"
				/>
			</div>
			<div
				css={css`
					max-height: 240px;
					max-width: 540px;
					padding: 10px;
					margin-bottom: 20px;
				`}
			>
				<Card
					{...basicCardProps}
					imagePosition="left"
					headlineText="jumbo"
					imageSize="jumbo"
				/>
			</div>
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

cardStories.add('with an avatar', () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card
					{...basicCardProps}
					imageUrl=""
					avatar={{
						src: 'https://i.guim.co.uk/img/uploads/2017/10/06/George-Monbiot,-L.png?width=173&quality=85&auto=format&fit=max&s=be5b0d3f3aa55682e4930057fc3929a3',
						alt: '',
					}}
				/>
			</CardWrapper>
		</CardGroup>
	);
});

cardStories.add('with comments', () => {
	return (
		<CardGroup>
			<CardWrapper>
				<Card {...basicCardProps} commentCount={894} />
			</CardWrapper>
		</CardGroup>
	);
});
