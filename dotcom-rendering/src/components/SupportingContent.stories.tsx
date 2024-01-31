import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import type { Props as CardProps } from './Card/Card';
import { Card } from './Card/Card';
import { SupportingContent } from './SupportingContent';

export default {
	component: SupportingContent,
	title: 'Components/SupportingContent',
};

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
	image: {
		src: 'https://media.guim.co.uk/6537e163c9164d25ec6102641f6a04fa5ba76560/0_0_5472_3648/master/5472.jpg',
		altText: 'some alt text',
	},
	imagePosition: 'top',
	isExternalLink: false,
	showLivePlayable: false,
	isPlayableMediaCard: true,
	imageLoading: 'eager',
	discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
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

export const Default = () => {
	return (
		<SupportingContent
			supportingContent={[aBasicLink]}
			alignment="horizontal"
			parentFormat={aBasicLink.format}
		/>
	);
};

export const WithKicker = () => {
	return (
		<SupportingContent
			supportingContent={[{ ...aBasicLink, kickerText: 'Kicker text' }]}
			alignment="horizontal"
			parentFormat={aBasicLink.format}
		/>
	);
};

export const Themes = () => {
	return (
		<div
			css={css`
				width: 300px;
			`}
		>
			<Card
				{...basicCardProps}
				supportingContent={[
					{
						...aBasicLink,
						kickerText: 'News',
						format: {
							...aBasicLink.format,
							theme: Pillar.News,
						},
					},
					{
						...aBasicLink,
						kickerText: 'Sport',
						format: {
							...aBasicLink.format,
							theme: Pillar.Sport,
						},
					},
					{
						...aBasicLink,
						kickerText: 'Lifestyle',
						format: {
							...aBasicLink.format,
							theme: Pillar.Lifestyle,
						},
					},
					{
						...aBasicLink,
						kickerText: 'Opinion',
						format: {
							...aBasicLink.format,
							theme: Pillar.Opinion,
						},
					},
					{
						...aBasicLink,
						kickerText: 'Culture',
						format: {
							...aBasicLink.format,
							theme: Pillar.Culture,
						},
					},
					{
						...aBasicLink,
						kickerText: 'SpecialReport',
						format: {
							...aBasicLink.format,
							theme: ArticleSpecial.SpecialReport,
						},
					},
					{
						...aBasicLink,
						kickerText: 'Labs',
						format: {
							...aBasicLink.format,
							theme: ArticleSpecial.Labs,
						},
					},
				]}
				imagePosition="top"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				linkTo=""
				headlineText="Different themes"
			/>
		</div>
	);
};

export const Vertical = () => {
	return (
		<div
			css={css`
				width: 300px;
			`}
		>
			<Card
				{...basicCardProps}
				supportingContent={[
					{
						...aBasicLink,
						headline: 'Vertical 1',
					},
					{
						...aBasicLink,
						headline: 'Vertical 2',
					},
					{
						...aBasicLink,
						headline: 'Vertical 3',
					},
				]}
				imagePosition="top"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				linkTo=""
				headlineText="Vertical"
			/>
		</div>
	);
};

export const Horizontal = () => {
	return (
		<div
			css={css`
				width: 700px;
			`}
		>
			<Card
				{...basicCardProps}
				supportingContentAlignment="horizontal"
				supportingContent={[
					{
						...aBasicLink,
						headline: 'Horizontal 1',
					},
					{
						...aBasicLink,
						headline: 'Horizontal 2',
					},
					{
						...aBasicLink,
						headline: 'Horizontal 3',
					},
				]}
				imagePosition="right"
				imageSize="large"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				linkTo=""
				headlineText="Horizontal"
			/>
		</div>
	);
};

export const HorizontalOnMobile = () => {
	return (
		<div
			css={css`
				max-width: 700px;
			`}
		>
			<Card
				{...basicCardProps}
				supportingContentAlignment="horizontal"
				supportingContent={[
					{
						...aBasicLink,
						headline: 'Horizontal 1',
					},
					{
						...aBasicLink,
						headline: 'Horizontal 2',
					},
					{
						...aBasicLink,
						headline: 'Horizontal 3',
					},
				]}
				imagePosition="right"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				linkTo=""
				headlineText="Horizontal"
			/>
		</div>
	);
};
HorizontalOnMobile.story = {
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile],
		},
		viewport: {
			defaultViewport: 'mobileMedium',
		},
	},
};

export const LongText = () => {
	return (
		<div
			css={css`
				width: 700px;
			`}
		>
			<Card
				{...basicCardProps}
				supportingContentAlignment="horizontal"
				supportingContent={[
					{
						...aBasicLink,
						headline:
							'The 29-year-old source behind the biggest intelligence leak in the NSA’s history explains his motives',
						kickerText: 'Long',
					},
					{
						...aBasicLink,
						headline:
							'The 29-year-old source behind the biggest intelligence leak in the NSA’s history explains his motives',
						kickerText: 'Long',
					},
					{
						...aBasicLink,
						headline:
							'The 29-year-old source behind the biggest intelligence leak in the NSA’s history explains his motives',
						kickerText: 'Long',
					},
				]}
				imagePosition="left"
				imageSize="large"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				linkTo=""
				headlineText="Very long sublinks"
			/>
		</div>
	);
};

export const MoreThanThree = () => {
	return (
		<div
			css={css`
				width: 700px;
			`}
		>
			<Card
				{...basicCardProps}
				supportingContentAlignment="horizontal"
				supportingContent={[
					{
						...aBasicLink,
						headline: 'Lots of links',
						kickerText: 'Kicker',
					},
					{
						...aBasicLink,
						headline: 'Lots of links',
						kickerText: 'Kicker',
					},
					{
						...aBasicLink,
						headline: 'Lots of links',
						kickerText: 'Kicker',
					},
					{
						...aBasicLink,
						headline: 'Lots of links',
						kickerText: 'Kicker',
					},
					{
						...aBasicLink,
						headline: 'Lots of links',
						kickerText: 'Kicker',
					},
				]}
				imagePosition="left"
				imageSize="large"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				linkTo=""
				headlineText="With five links"
			/>
		</div>
	);
};

export const OneSublink = () => {
	return (
		<div
			css={css`
				width: 700px;
			`}
		>
			<Card
				{...basicCardProps}
				supportingContent={[
					{
						...aBasicLink,
						headline: 'Headline',
						kickerText: 'Kicker',
					},
				]}
				imagePosition="left"
				imageSize="large"
				trailText="When the image is positioned horizontally and there is only one sublink, it appears under the headline"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				linkTo=""
				headlineText="With one link"
			/>
		</div>
	);
};

export const TwoSublinks = () => {
	return (
		<div
			css={css`
				width: 700px;
			`}
		>
			<Card
				{...basicCardProps}
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
				]}
				imagePosition="left"
				imageSize="large"
				trailText="When there are only two sublinks they appear under the headline vertically stacked"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				linkTo=""
				headlineText="With two links"
			/>
		</div>
	);
};

export const LiveSublink = () => {
	return (
		<div
			css={css`
				width: 700px;
			`}
		>
			<Card
				{...basicCardProps}
				supportingContent={[
					{
						headline: 'Headline',
						kickerText: 'Kicker',
						url: 'https://www.theguardian.com',
						format: {
							display: ArticleDisplay.Standard,
							design: ArticleDesign.LiveBlog,
							theme: Pillar.News,
						},
					},
				]}
				imagePosition="left"
				imageSize="large"
				trailText="When the image is positioned horizontally and there is only one sublink, it appears under the headline"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: Pillar.News,
				}}
				linkTo=""
				headlineText="With one link"
			/>
		</div>
	);
};
