import { css } from '@emotion/react';
import {
	between,
	from,
	space,
	textSansBold17,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import { type OnwardsSource } from '../types/onwards';
import { type TrailType } from '../types/trails';
import { Card } from './Card/Card';
import type { Props as CardProps } from './Card/Card';
import { ScrollableCarousel } from './ScrollableCarousel';

type Props = {
	serverTime?: number;
	trails: TrailType[];
	discussionApiUrl: string;
	heading: string;
	onwardsSource: OnwardsSource;
	format: ArticleFormat;
	headingUrl?: string;
};

const cardsContainerStyles = css`
	${grid.column.centre}
	position: relative;
	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
	${from.leftCol} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
	${from.leftCol} {
		&::before {
			content: '';
			position: absolute;
			left: -11px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--onward-content-border')};
		}
		ol {
			padding-left: 0;
		}
	}
`;

export const ScrollableSmallOnwards = (props: Props) => {
	const trails = props.trails.slice(0, 4); // Limit to 4 cards
	if (trails.length !== 4) return null;

	const mobileBottomCards = [1, 3];
	const desktopBottomCards = [2, 3];

	return (
		<section
			data-component={props.onwardsSource}
			data-link={props.onwardsSource}
			css={css`
				${grid.paddedContainer}
				background-color: ${palette('--onward-background')};
				padding-top: ${space[1]}px;
				padding-bottom: ${space[6]}px;
				${from.tablet} {
					padding-top: 0;
					border-left: 1px solid ${palette('--onward-content-border')};
					border-right: 1px solid
						${palette('--onward-content-border')};
				}
			`}
		>
			<StraightLines
				cssOverrides={[
					css`
						${grid.column.all}
						padding-left: ${space[5]}px;
						padding-right: ${space[5]}px;
						margin-bottom: ${space[2]}px;
						${until.tablet} {
							display: none;
						}
					`,
				]}
				count={1}
				color={palette('--card-border-top')}
			/>
			<Title title={props.heading} headingUrl={props.headingUrl} />
			<div css={cardsContainerStyles}>
				<ScrollableCarousel
					carouselLength={Math.ceil(trails.length / 2)}
					visibleCarouselSlidesOnMobile={1}
					visibleCarouselSlidesOnTablet={2}
					sectionId={'some-section-id-12'}
					shouldStackCards={{
						desktop: true,
						mobile: true,
					}}
					gapSizes={{ column: 'large', row: 'medium' }}
				>
					{trails.map((trail, index) => {
						return (
							<ScrollableCarousel.Item
								key={trail.url}
								isStackingCarousel={true}
								colour={palette('--onward-content-border')}
							>
								<Card
									{...getDefaultCardProps(
										trail,
										props.discussionApiUrl,
										props.onwardsSource,
										props.format,
										props.serverTime,
									)}
									showTopBarDesktop={desktopBottomCards.includes(
										index,
									)}
									showTopBarMobile={mobileBottomCards.includes(
										index,
									)}
								/>
							</ScrollableCarousel.Item>
						);
					})}
				</ScrollableCarousel>
			</div>
		</section>
	);
};

const Title = ({
	title,
	headingUrl,
}: {
	title: string;
	headingUrl?: string;
}) =>
	headingUrl ? (
		<a
			css={headerGridStyles}
			href={`${headingUrl}/inpictures/all`}
			data-link-name="section heading"
		>
			<h2 css={headerStyles}>{title}</h2>
		</a>
	) : (
		<h2 css={[headerGridStyles, headerStyles]}>{title}</h2>
	);

const headerGridStyles = css`
	${grid.column.centre}
	color: ${palette('--onward-caption-text')};
	text-decoration: none;
	align-self: start;
	${between.tablet.and.leftCol} {
		margin-left: 10px;
	}
	${from.leftCol} {
		${grid.column.left}
	}
`;

const headerStyles = css`
	color: ${palette('--onward-caption-text')};
	${textSansBold17};
	padding-bottom: ${space[3]}px;
	padding-top: ${space[1]}px;
	:hover {
		text-decoration: underline;
	}
	${from.tablet} {
		${textSansBold20};
	}
`;

const getDefaultCardProps = (
	trail: TrailType,
	discussionApiUrl: string,
	onwardsSource: OnwardsSource,
	format: ArticleFormat,
	serverTime?: number,
) => {
	const defaultProps: CardProps = {
		linkTo: trail.url,
		imageLoading: 'lazy',
		serverTime,
		format: trail.format,
		contextFormat: format,
		containerType: 'scrollable/small',
		headlineText: trail.headline,
		byline: trail.byline,
		showByline: trail.showByline,
		showQuotedHeadline: trail.showQuotedHeadline,
		webPublicationDate: trail.webPublicationDate,
		kickerText: trail.kickerText,
		showPulsingDot: false,
		showClock: false,
		image: trail.image,
		isCrossword: trail.isCrossword,
		starRating: trail.starRating,
		dataLinkName: trail.dataLinkName,
		snapData: trail.snapData,
		discussionApiUrl,
		discussionId: trail.discussion?.isCommentable
			? trail.discussion.discussionId
			: undefined,
		avatarUrl: trail.avatarUrl,
		mainMedia: trail.mainMedia,
		isExternalLink: false,
		branding: trail.branding,
		showAge: true,
		aspectRatio: '5:4',
		mediaSize: 'scrollable-small',
		mediaPositionOnDesktop: 'left',
		mediaPositionOnMobile: 'left',
		headlineSizes: {
			desktop: 'xxsmall',
			mobile: 'xxxsmall',
		},
		trailText: undefined,
		supportingContent: undefined,
		canPlayInline: false,
		onwardsSource,
		isOnwardContent: false,
		showLivePlayable: false,
	};
	return defaultProps;
};
