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
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import { type TrailType } from '../types/trails';
import { Card } from './Card/Card';
import type { Props as CardProps } from './Card/Card';

type Props = {
	serverTime?: number;
	trails: TrailType[];
	discussionApiUrl: string;
	guardianBaseUrl: string;
	format: ArticleFormat;
};

const standardCardStyles = css`
	flex: 1;
	position: relative;
	display: flex;
	padding: ${space[2]}px;
	background-color: ${palette('--onward-more-galleries-card-background')};

	${from.tablet} {
		:not(:first-child)::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: -10px; /* shift into the gap */
			width: 1px;
			background: ${palette('--onward-content-border')};
		}
	}
`;

const standardCardsListStyles = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-bottom: ${space[6]}px;

	${from.tablet} {
		flex-direction: row;
		padding-top: ${space[2]}px;
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
	${grid.column.centre}
	position: relative;

	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}

	${from.leftCol} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
`;

const getDefaultCardProps = (
	trail: TrailType,
	discussionApiUrl: string,
	format: ArticleFormat,
	serverTime?: number,
) => {
	const defaultProps: CardProps = {
		linkTo: trail.url,
		format: trail.format,
		contextFormat: format,
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
		serverTime,
		imageLoading: 'lazy',
		trailText: trail.trailText,
		showAge: false,
		showTopBarDesktop: false,
		showTopBarMobile: false,
		aspectRatio: '5:4',
		isOnwardContent: true,
		onwardsSource: 'more-galleries',
	};
	return defaultProps;
};

export const MoreGalleries = (props: Props) => {
	const [firstTrail, ...standardCards] = props.trails;
	if (!firstTrail) return null;

	return (
		<div
			css={{
				backgroundColor: palette('--onward-background'),
				minHeight: 300,
			}}
		>
			<section
				data-component="more-galleries"
				data-link="more-galleries"
				css={css`
					${grid.paddedContainer}
					background-color: ${palette('--onward-background')};
					padding-top: ${space[1]}px;

					${from.tablet} {
						padding-top: 0;
						border-left: 1px solid
							${palette('--onward-content-border')};
						border-right: 1px solid
							${palette('--onward-content-border')};
					}
				`}
			>
				<Title guardianBaseUrl={props.guardianBaseUrl} />
				<MoreGalleriesSplashCard
					defaultProps={getDefaultCardProps(
						firstTrail,
						props.discussionApiUrl,
						props.format,
						props.serverTime,
					)}
				/>
				<StraightLines
					cssOverrides={[
						cardsContainerStyles,
						css`
							${until.tablet} {
								display: none;
							}
						`,
					]}
					count={1}
					color={palette('--onward-content-border')}
				/>
				<ul css={[cardsContainerStyles, standardCardsListStyles]}>
					{standardCards.map((trail) => (
						<li key={trail.url} css={standardCardStyles}>
							<Card
								{...getDefaultCardProps(
									trail,
									props.discussionApiUrl,
									props.format,
									props.serverTime,
								)}
								mediaSize="medium"
							/>
						</li>
					))}
				</ul>
			</section>
		</div>
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
					background-color: ${palette(
						'--onward-more-galleries-card-background',
					)};
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

const Title = ({ guardianBaseUrl }: { guardianBaseUrl: string }) => (
	<a
		css={css`
			${grid.column.centre}
			color: ${palette('--caption-text')};
			text-decoration: none;
			align-self: start;

			${from.leftCol} {
				${grid.column.left}
			}
		`}
		href={`${guardianBaseUrl}/inpictures/all`}
		data-link-name="section heading"
	>
		<h2 css={headerStyles}>More galleries</h2>
	</a>
);

const headerStyles = css`
	color: ${palette('--carousel-text')};
	${headlineBold24};
	padding-bottom: ${space[3]}px;
	padding-top: ${space[1]}px;

	:hover {
		text-decoration: underline;
	}

	${from.tablet} {
		${headlineBold28};
	}
`;
