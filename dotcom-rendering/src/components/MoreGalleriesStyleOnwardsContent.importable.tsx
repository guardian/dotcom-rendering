import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	space,
	until,
} from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { grid } from '../grid';
import { ArticleDesign } from '../lib/articleFormat';
import { palette } from '../palette';
import type { TrailType } from '../types/trails';
import { Card } from './Card/Card';
import type { Props as CardProps } from './Card/Card';
import { LeftColumn } from './LeftColumn';

const standardCardListStyles = css`
	width: 100%;
	display: grid;
	gap: ${space[4]}px;
	padding-top: ${space[2]}px;

	${from.tablet} {
		grid-template-columns: repeat(4, 1fr);
	}
`;

const cardsContainerStyles = css`
	${grid.column.centre}
	position: relative;

	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
`;

const splashCardStyles = css`
	${from.leftCol} {
		margin-top: ${space[2]}px;
	}
`;

const standardCardStyles = css`
	position: relative;
	display: flex;

	${from.tablet} {
		:not(:first-child)::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: -11px;
			width: 1px;
			background: ${palette('--onward-content-border')};
		}
	}
`;

const containerStyles = css`
	display: flex;
	flex-direction: column;
	padding-bottom: ${space[6]}px;

	${from.leftCol} {
		flex-direction: row;
		padding-right: 80px;
	}
`;

const headerStyles = css`
	${headlineBold24};
	color: ${palette('--carousel-text')};
	padding-bottom: ${space[2]}px;
	padding-top: ${space[2]}px;
	margin-left: 0;

	&::first-letter {
		text-transform: capitalize;
	}
`;

const mobileHeaderStyles = css`
	${headerStyles};
	${from.tablet} {
		padding-left: ${space[1]}px;
	}
	${from.leftCol} {
		display: none;
	}
`;

const getDefaultCardProps = (trail: TrailType) => {
	const defaultProps: CardProps = {
		aspectRatio: '5:4',
		avatarUrl: trail.avatarUrl,
		branding: trail.branding,
		dataLinkName: `onwards-content-gallery-style ${trail.dataLinkName}`,
		discussionApiUrl: '',
		discussionId: trail.discussion?.isCommentable
			? trail.discussion.discussionId
			: undefined,
		format: trail.format,
		headlineText: trail.headline,
		image: trail.image,
		imageLoading: 'lazy',
		isExternalLink: false,
		isInOnwardsAbTestVariant: true,
		isOnwardContent: true,
		linkTo: trail.url,
		mainMedia: trail.mainMedia,
		onwardsSource: 'related-content',
		showAge: false,
		showByline: trail.showByline,
		showClock: false,
		showPulsingDot: false,
		showQuotedHeadline: trail.format.design === ArticleDesign.Comment,
		showTopBarDesktop: false,
		showTopBarMobile: true,
		snapData: trail.snapData,
		starRating: trail.starRating,
		webPublicationDate: trail.webPublicationDate,
	};

	return defaultProps;
};

type Props = {
	heading: string;
	trails: TrailType[];
	isAdFreeUser: boolean;
	discussionApiUrl: string;
	isInStarRatingVariant: boolean;
};

/**
 * We are running an AB test to use the More Galleries style of onwards content on all articles.
 * If the test is successful, the plan is that this component will be removed and MoreGalleries.tsx will
 * be generalised so that is can be used for onwards content across all articles. If the
 * test is not successful, this component will be removed.
 */
export const MoreGalleriesStyleOnwardsContent = ({
	heading,
	trails,
	discussionApiUrl,
	isInStarRatingVariant,
}: Props) => {
	const [firstTrail, ...standardTrails] = trails;
	if (!firstTrail) return null;

	return (
		<div
			data-component="onwards-content-gallery-style"
			css={containerStyles}
		>
			<LeftColumn>
				<h2 css={headerStyles}>{heading}</h2>
			</LeftColumn>
			<h2 css={mobileHeaderStyles}>{heading}</h2>
			<div>
				<div css={[cardsContainerStyles, splashCardStyles]}>
					<Card
						{...getDefaultCardProps(firstTrail)}
						mediaPositionOnDesktop="right"
						mediaPositionOnMobile="top"
						mediaSize="medium"
						discussionApiUrl={discussionApiUrl}
						isInStarRatingVariant={isInStarRatingVariant}
						headlineSizes={{
							desktop: 'small',
							tablet: 'small',
							mobile: 'small',
						}}
					/>
				</div>
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
				<ul css={[cardsContainerStyles, standardCardListStyles]}>
					{standardTrails.slice(0, 4).map((trail: TrailType) => (
						<li key={trail.url} css={standardCardStyles}>
							<Card
								{...getDefaultCardProps(trail)}
								mediaPositionOnDesktop="bottom"
								mediaPositionOnMobile="left"
								mediaSize="small"
								discussionApiUrl={discussionApiUrl}
								isInStarRatingVariant={isInStarRatingVariant}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
