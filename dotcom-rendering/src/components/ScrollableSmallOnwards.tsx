import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	space,
} from '@guardian/source/foundations';
import { formatAttrString } from '../lib/formatAttrString';
import { palette as themePalette } from '../palette';
import { type OnwardsSource } from '../types/onwards';
import { type TrailType } from '../types/trails';
import { Card } from './Card/Card';
import type { Props as CardProps } from './Card/Card';
import { Hide } from './Hide';
import { LeftColumn } from './LeftColumn';
import { ScrollableCarousel } from './ScrollableCarousel';
import { Section } from './Section';

type Props = {
	absoluteServerTimes: boolean;
	trails: TrailType[];
	discussionApiUrl: string;
	heading: string;
	onwardsSource: OnwardsSource;
	url?: string;
};

const wrapperStyle = css`
	display: flex;
	justify-content: space-between;
	overflow: hidden;
	${from.desktop} {
		padding-right: 40px;
	}
`;

const containerStyles = css`
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden; /* Needed for scrolling to work */

	margin-top: ${space[2]}px;
	padding-bottom: ${space[6]}px;

	margin-left: 0px;
	margin-right: 0px;

	border-bottom: 1px solid ${themePalette('--onward-content-border')};

	${from.leftCol} {
		margin-left: 10px;
		margin-right: 100px;
	}
`;

const headerStyles = css`
	color: ${themePalette('--carousel-text')};
	${headlineBold24};
	padding-bottom: ${space[3]}px;
	padding-top: ${space[1]}px;
	margin-left: 0;

	${from.tablet} {
		${headlineBold20};
	}
`;

const headerStylesWithUrl = css`
	:hover {
		text-decoration: underline;
	}
`;

const titleStyle = css`
	color: ${themePalette('--onward-text')};
	display: inline-block;
	&::first-letter {
		text-transform: capitalize;
	}
`;

const getDefaultCardProps = (
	trail: TrailType,
	absoluteServerTimes: boolean,
	discussionApiUrl: string,
) => {
	const defaultProps: CardProps = {
		linkTo: trail.url,
		format: trail.format,
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
		discussionId: trail.discussionId,
		avatarUrl: trail.avatarUrl,
		mainMedia: trail.mainMedia,
		isExternalLink: false,
		branding: trail.branding,
		absoluteServerTimes,
		imageLoading: 'lazy',
		trailText: trail.trailText,
		showAge: true, // TODO
		containerType: 'related-content',
		showTopBarDesktop: false,
		showTopBarMobile: false,
		aspectRatio: '5:4',
	};
	return defaultProps;
};

export const ScrollableSmallOnwards = (props: Props) => {
	const trails = props.trails.slice(0, 4); // Limit to 4 cards
	if (trails.length !== 4) return null;

	const mobileBottomCards = [1, 3];
	const desktopBottomCards = [2, 3];

	return (
		<Section
			fullWidth={true}
			borderColour={themePalette('--onward-content-border')}
			backgroundColour={themePalette('--onward-background')}
			showTopBorder={false}
			showSideBorders={true}
		>
			<div
				css={wrapperStyle}
				data-link-name={formatAttrString(props.heading)}
			>
				<LeftColumn
					size={'compact'}
					borderColour={themePalette('--onward-content-border')}
					hasPageSkin={false} // TODO
				>
					<Title title={props.heading} url={props.url} />
				</LeftColumn>

				<div
					css={containerStyles}
					data-component={props.onwardsSource}
					data-link={formatAttrString(props.heading)}
				>
					<Hide when="above" breakpoint="leftCol">
						<Title title={props.heading} url={props.url} />
					</Hide>

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
								<li
									key={trail.url}
									css={[
										css`
											display: flex;
											scroll-snap-align: start;
											grid-area: span 1;
											position: relative;
											&::before {
												content: '';
												position: absolute;
												top: 0;
												bottom: 0;
												left: -10px;
												width: 1px;
												background-color: ${themePalette(
													'--card-border-top',
												)};
												transform: translateX(-50%);
											}
										`,
									]}
								>
									{Card({
										...getDefaultCardProps(
											trail,
											props.absoluteServerTimes,
											props.discussionApiUrl,
										),
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
								</li>
							);
						})}
					</ScrollableCarousel>
				</div>
			</div>
		</Section>
	);
};

const Title = ({ title, url }: { title: string; url?: string }) =>
	url ? (
		<a
			css={css`
				text-decoration: none;
			`}
			href={url}
			data-link-name="section heading" // TODO
		>
			<h2 css={headerStyles}>
				<span css={[headerStylesWithUrl, titleStyle]}>{title}</span>
			</h2>
		</a>
	) : (
		<h2 css={headerStyles}>
			<span css={titleStyle}>{title}</span>
		</h2>
	);
