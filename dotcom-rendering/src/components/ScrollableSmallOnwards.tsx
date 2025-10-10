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
import { palette } from '../palette';
import { type OnwardsSource } from '../types/onwards';
import { type TrailType } from '../types/trails';
import { Card } from './Card/Card';
import { ScrollableCarousel } from './ScrollableCarousel';

type Props = {
	absoluteServerTimes: boolean;
	trails: TrailType[];
	discussionApiUrl: string;
	heading: string;
	onwardsSource: OnwardsSource;
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
			data-link="more-galleries"
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
								isOnwardContent={true}
							>
								{Card({
									linkTo: trail.url,
									format: trail.format,
									headlineText: trail.headline,
									byline: trail.byline,
									showByline: trail.showByline,
									showQuotedHeadline:
										trail.showQuotedHeadline,
									webPublicationDate:
										trail.webPublicationDate,
									kickerText: trail.kickerText,
									showPulsingDot: false,
									showClock: false,
									image: trail.image,
									isCrossword: trail.isCrossword,
									starRating: trail.starRating,
									dataLinkName: trail.dataLinkName,
									snapData: trail.snapData,
									discussionApiUrl: props.discussionApiUrl,
									discussionId:
										trail.discussion?.discussionId,
									avatarUrl: trail.avatarUrl,
									mainMedia: trail.mainMedia,
									isExternalLink: false,
									branding: trail.branding,
									absoluteServerTimes:
										props.absoluteServerTimes,
									imageLoading: 'lazy',
									showAge: true,
									containerType: 'related-content',
									aspectRatio: '5:4',
									mediaSize: 'small',
									mediaPositionOnDesktop: 'left',
									mediaPositionOnMobile: 'left',
									headlineSizes: {
										desktop: 'xxsmall',
										tablet: 'xxsmall',
										mobile: 'xxxsmall',
									},
									trailText: undefined,
									supportingContent: undefined,
									showTopBarDesktop:
										desktopBottomCards.includes(index),
									showTopBarMobile:
										mobileBottomCards.includes(index),
									canPlayInline: false,
								})}
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
	color: ${palette('--caption-text')};
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
	color: ${palette('--carousel-text')};
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
