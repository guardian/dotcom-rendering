import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	space,
	until,
} from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { grid } from '../grid';
import { formatAttrString } from '../lib/formatAttrString';
import { palette } from '../palette';
import { type OnwardsSource } from '../types/onwards';
import { type TrailType } from '../types/trails';
import { Card } from './Card/Card';
import type { Props as CardProps } from './Card/Card';

type Props = {
	absoluteServerTimes: boolean;
	trails: TrailType[];
	discussionApiUrl: string;
	headingLink?: string;
};

const standardCardStyles = css`
	flex: 1;

	position: relative;
	display: flex;
	padding: ${space[2]}px;
	background-color: ${palette('--onward-card-background')};

	:not(:first-child)::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: -10px; /* shift into the gap */
		width: 1px;
		background: ${palette('--onward-content-border')};
	}
`;

const titleGridStyle = css`
	${grid.column.centre}
	color: ${palette('--caption-text')};
	align-self: start;

	${from.leftCol} {
		${grid.column.left}
	}
`;

const standardCardsListStyles = css`
	width: 100%;
	display: flex;
	flex-direction: row;
	gap: 20px;
	margin-bottom: ${space[6]}px;

	${from.tablet} {
		padding-top: ${space[2]}px;
	}

	${until.tablet} {
		flex-direction: column;
		width: 100%;
	}
	${from.leftCol} {
		&::before {
			content: '';
			position: absolute;
			left: -11px;
			top: 8px;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--onward-content-border')};
		}
	}
`;

const cardsContainerStyles = css`
	display: inline;
	position: relative;
	${grid.column.centre}

	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}

	${from.leftCol} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
`;

const headerStyles = css`
	color: ${palette('--carousel-text')};
	${headlineBold24};
	padding-bottom: ${space[3]}px;
	padding-top: ${space[1]}px;
	margin-left: 0;

	${from.tablet} {
		${headlineBold28};
	}
`;

const headerStylesWithUrl = css`
	:hover {
		text-decoration: underline;
	}
`;

const titleStyle = css`
	color: ${palette('--onward-text')};
	display: inline-block;
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
		showAge: false,
		containerType: 'more-galleries',
		showTopBarDesktop: false,
		showTopBarMobile: false,
		aspectRatio: '5:4',
	};
	return defaultProps;
};

export const MoreGalleries = (props: Props) => {
	const [firstTrail, ...standardCards] = props.trails;
	if (!firstTrail) return null;

	const heading = 'More galleries';
	const onwardsSource: OnwardsSource = 'more-galleries';

	const defaultProps = getDefaultCardProps(
		firstTrail,
		props.absoluteServerTimes,
		props.discussionApiUrl,
	);

	return (
		<section
			data-component={onwardsSource}
			data-link={formatAttrString(heading)}
			css={css`
				${grid.paddedContainer}

				background-color: ${palette('--onward-background')};

				${until.tablet} {
					padding-top: ${space[1]}px;
				}

				${from.tablet} {
					border-left: 1px solid ${palette('--onward-content-border')};
					border-right: 1px solid
						${palette('--onward-content-border')};
				}
			`}
		>
			<Title title={heading} url={props.headingLink} />
			<MoreGalleriesSplashCard defaultProps={defaultProps} />
			<StraightLines
				cssOverrides={cardsContainerStyles}
				count={1}
				color={palette('--onward-content-border')}
			/>
			<ul css={[cardsContainerStyles, standardCardsListStyles]}>
				{standardCards.map((trail) => (
					<li key={trail.url} css={standardCardStyles}>
						<Card
							{...getDefaultCardProps(
								trail,
								props.absoluteServerTimes,
								props.discussionApiUrl,
							)}
							mediaSize="medium"
						/>
					</li>
				))}
			</ul>
			<StraightLines
				cssOverrides={css`
					${grid.column.all}
					padding-left: ${space[5]}px;
					padding-right: ${space[5]}px;
					${from.leftCol} {
						padding-left: ${space[2]}px;
						padding-right: ${space[2]}px;
					}
				`}
				count={1}
				color={palette('--onward-content-border')}
			/>
		</section>
	);
};

const MoreGalleriesSplashCard = ({
	defaultProps,
}: {
	defaultProps: CardProps;
}) => {
	const cardProps: Partial<CardProps> = {
		headlineSizes: {
			desktop: 'medium',
			tablet: 'medium',
			mobile: 'medium',
		},
		mediaPositionOnDesktop: 'right',
		mediaPositionOnMobile: 'top',
		mediaSize: 'medium',
		isOnwardSplash: true,
	};
	return (
		<div
			css={[
				cardsContainerStyles,
				css`
					margin-bottom: ${space[6]}px;
					background-color: ${palette('--onward-card-background')};
					padding: ${space[2]}px;
					${from.leftCol} {
						&::before {
							content: '';
							position: absolute;
							left: -11px;
							top: 8px;
							bottom: 0;
							width: 1px;
							background-color: ${palette(
								'--onward-content-border',
							)};
						}
					}
				`,
			]}
		>
			<Card {...defaultProps} {...cardProps} />
		</div>
	);
};

const Title = ({ title, url }: { title: string; url?: string }) =>
	url ? (
		<a
			css={[
				titleGridStyle,
				css`
					text-decoration: none;
				`,
			]}
			href={url}
			data-link-name="section heading"
		>
			<h2 css={headerStyles}>
				<span css={[headerStylesWithUrl, titleStyle]}>{title}</span>
			</h2>
		</a>
	) : (
		<h2 css={[titleGridStyle, headerStyles]}>
			<span css={titleStyle}>{title}</span>
		</h2>
	);
