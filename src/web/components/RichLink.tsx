import React from 'react';
import { css, cx } from 'emotion';

import {
	text,
	brandAltBackground,
	neutral,
} from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { from, until, between } from '@guardian/src-foundations/mq';

import ArrowInCircle from '@frontend/static/icons/arrow-in-circle.svg';

import { pillarPalette } from '@frontend/lib/pillars';
import { StarRating } from '@root/src/web/components/StarRating/StarRating';
import { QuoteIcon } from '@root/src/web/components/QuoteIcon';
import { Hide } from '@root/src/web/components/Hide';
import { Avatar } from '@frontend/web/components/Avatar';

type CardStyle =
	| 'special-report'
	| 'live'
	| 'dead'
	| 'feature'
	| 'editorial'
	| 'comment'
	| 'podcast'
	| 'media'
	| 'analysis'
	| 'review'
	| 'letters'
	| 'external'
	| 'news';

type colour = string;

interface Props {
	richLinkIndex: number;
	cardStyle: CardStyle;
	thumbnailUrl: string;
	headlineText: string;
	contentType: ContentType;
	url: string;
	starRating?: number;
	pillar: CAPIPillar;
	tags: TagType[];
	sponsorName: string;
	contributorImage?: string;
	isPlaceholder?: boolean; // use 'true' for server-side default prior to client-side enrichment
}

const richLinkContainer = css`
	/*
        TODO: avoid this edge case from appearing in editorials
        edge case:
        If rich link div is pushed further inline to the page the "margin-left: -240px;" wont work.
        Using "clear: left;" allows us to igrnore the effects of other elements on the left.
    */
	clear: left;

	${until.wide} {
		width: 140px;
	}
	float: left;
	margin-right: 20px;
	margin-bottom: 5px;
	margin-left: 0px;
	${between.leftCol.and.wide} {
		margin-left: -160px;
	}
	${from.wide} {
		margin-left: -240px;
		width: 220px;
	}
`;

const neutralBackground = css`
	background-color: ${neutral[97]};
	a {
		color: inherit;
	}
	:hover {
		background-color: ${neutral[93]};
	}
`;

const richLinkPillarColour: (pillar: CAPIPillar) => colour = (pillar) => {
	if (pillar) {
		return pillarPalette[pillar].main;
	}
	return pillarPalette.news[400];
};

const pillarBackground: (pillar: CAPIPillar) => colour = (pillar) => {
	return css`
		background-color: ${richLinkPillarColour(pillar)};
	`;
};

const textColour: (pillar: CAPIPillar) => colour = (pillar) => {
	return css`
		color: ${richLinkPillarColour(pillar)};
	`;
};

const richLinkTopBorder: (pillar: CAPIPillar) => colour = (pillar) => {
	return css`
		border-top: 1px;
		border-top-style: solid;
		border-top-color: ${richLinkPillarColour(pillar)};
	`;
};

const richLinkLink = css`
	text-decoration: none;
`;

const richLinkElements = css`
	padding-top: 2px;
	padding-right: 5px;
	padding-left: 5px;
	padding-bottom: 5px;
`;

const richLinkHeader = css`
	padding-bottom: 10px;
	color: ${neutral[0]};
`;

const richLinkTitle = css`
	${headline.xxxsmall()};
	font-size: 14px;
	padding-top: 1px;
	padding-bottom: 1px;
	font-weight: 400;
	${from.wide} {
		${headline.xxsmall()};
		padding-bottom: 5px;
	}
`;

const richLinkReadMore: (pillar: CAPIPillar) => colour = (pillar) => {
	return css`
		fill: ${richLinkPillarColour(pillar)};
		color: ${richLinkPillarColour(pillar)};
		padding-top: 2px;
	`;
};

const readMoreTextStyle = css`
	${headline.xxxsmall()};
	font-size: 14px;
	${from.wide} {
		${headline.xxxsmall()}
		line-height: 25px;
	}
	display: inline-block;
	height: 30px;
	line-height: 25px;
	padding-left: 4px;
	vertical-align: top;
	font-weight: 500;
	text-decoration: none;
`;

const byline = css`
	${headline.xxxsmall()};
	font-size: 14px;
	font-style: italic;
	${from.wide} {
		${headline.xxsmall()};
	}
`;

const contributorImageWrapper = css`
	width: 5rem;
	height: 5rem;
	margin-left: auto;
	margin-right: 0.3rem;
	${from.wide} {
		width: 8.5rem;
		height: 8.5rem;
	}

	/* TODO remove the default img styling in ArticleBody.tsx - do we need direct element styling? */
	img {
		width: 100%;
		height: 100%;
	}
`;

const paidForBranding = css`
	${textSans.xsmall()};
	font-weight: bold;
	color: ${text.supporting};
`;

const starWrapper = css`
	background-color: ${brandAltBackground.primary};
	display: inline-block;
`;

const readMoreText: (contentType: string) => string = (contentType) => {
	switch (contentType) {
		case 'audio':
			return 'Listen';
		case 'gallery':
			return 'View Gallery';
		case 'video':
			return 'Watch';
		default:
			return 'Read more';
	}
};

const getMainContributor: (tags: TagType[]) => string = (tags) => {
	const contributorTags = tags.filter((t) => t.type === 'Contributor');
	return contributorTags.length > 0 ? contributorTags[0].title : '';
};

const imageStyles = css`
	width: 100%;
	height: auto;
`;

type DefaultProps = {
	index: number;
	headlineText: string;
	url: string;
	isPlaceholder?: boolean;
};

export const DefaultRichLink: React.FC<DefaultProps> = ({
	index,
	headlineText,
	url,
	isPlaceholder,
}) => {
	return (
		<RichLink
			richLinkIndex={index}
			cardStyle="news"
			thumbnailUrl=""
			headlineText={headlineText}
			contentType="article"
			url={url}
			pillar="news"
			tags={[]}
			sponsorName=""
			isPlaceholder={isPlaceholder}
		/>
	);
};

export const RichLink = ({
	richLinkIndex,
	cardStyle,
	thumbnailUrl,
	headlineText,
	contentType,
	url,
	starRating,
	pillar,
	tags,
	sponsorName,
	contributorImage,
	isPlaceholder,
}: Props) => {
	const linkText =
		cardStyle === 'letters' ? `${headlineText} | Letters ` : headlineText;

	const imageCardStyles = ['news', 'letters', 'media', 'feature'];
	const showImage = thumbnailUrl && imageCardStyles.includes(cardStyle);
	const isPaidContent = tags
		? tags.filter((t) => t.id === 'tone/advertisement-features').length > 0
		: false;
	const isOpinion = cardStyle === 'comment';
	const mainContributor = getMainContributor(tags);

	return (
		<div
			data-print-layout="hide"
			data-link-name={`rich-link-${richLinkIndex} | ${richLinkIndex}`}
			data-component="rich-link"
			className={pillarBackground(pillar)}
			data-name={(isPlaceholder && 'placeholder') || ''}
		>
			<div className={cx(richLinkContainer, neutralBackground)}>
				<a className={richLinkLink} href={url}>
					<div className={richLinkTopBorder(pillar)} />
					{showImage && (
						<div>
							<img
								className={imageStyles}
								src={thumbnailUrl}
								alt=""
							/>
						</div>
					)}
					<div className={richLinkElements}>
						<div className={richLinkHeader}>
							<div className={richLinkTitle}>
								{isOpinion && (
									<>
										<Hide when="above" breakpoint="wide">
											<QuoteIcon
												colour={
													pillarPalette[pillar].main
												}
												size="small"
											/>
										</Hide>
										<Hide when="below" breakpoint="wide">
											<QuoteIcon
												colour={
													pillarPalette[pillar].main
												}
												size="medium"
											/>
										</Hide>
									</>
								)}
								{linkText}
							</div>
							{isOpinion && (
								<div className={cx(byline, textColour(pillar))}>
									{mainContributor}
								</div>
							)}
							{starRating && starRating > 0 && (
								<div className={starWrapper}>
									<StarRating
										rating={starRating}
										size="medium"
									/>
								</div>
							)}
							{isPaidContent && sponsorName && (
								<div className={paidForBranding}>
									Paid for by {sponsorName}
								</div>
							)}
						</div>
						{isOpinion && contributorImage && (
							<div className={contributorImageWrapper}>
								<Avatar
									imageSrc={contributorImage}
									imageAlt={mainContributor}
									pillar={pillar}
								/>
							</div>
						)}
						<div className={richLinkReadMore(pillar)}>
							<ArrowInCircle />
							<div className={readMoreTextStyle}>
								{readMoreText(contentType)}
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>
	);
};
