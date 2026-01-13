import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	space,
	until,
} from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { grid } from '../grid';
import { decideFormat } from '../lib/articleFormat';
import { useApi } from '../lib/useApi';
import { palette } from '../palette';
import type { DCRFrontCard } from '../types/front';
import type { FETrailType } from '../types/trails';
import { Card } from './Card/Card';
import type { Props as CardProps } from './Card/Card';
import { LeftColumn } from './LeftColumn';
import { Placeholder } from './Placeholder';

type OnwardsResponse = {
	trails: FETrailType[];
	heading: string;
	displayname: string;
	description: string;
};

const standardCardListStyles = css`
	width: 100%;
	display: grid;
	gap: ${space[5]}px;

	${from.tablet} {
		grid-template-columns: repeat(4, 1fr);
		padding-top: ${space[2]}px;
	}

	${from.leftCol} {
		&::before {
			content: '';
			position: absolute;
			left: -11px;
			bottom: 0;
			top: 8px;
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
`;

const splashCardStyles = css`
	margin-bottom: ${space[4]}px;
	${from.leftCol} {
		margin-top: ${space[2]}px;

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
	padding-top: ${space[1]}px;
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

const convertFETrailToDcrTrail = (
	trails: FETrailType[],
	discussionApiUrl: string,
): DCRFrontCard[] =>
	trails.map((trail) => ({
		dataLinkName: 'onwards-content-card',
		discussionId: trail.discussion?.discussionId,
		discussionApiUrl,
		format: decideFormat(trail.format),
		headline: trail.headline,
		image: {
			src: trail.masterImage ?? '',
			altText: trail.linkText ?? '',
		},
		isExternalLink: false,
		onwardsSource: 'related-content',
		showLivePlayable: false,
		showQuotedHeadline: false,
		url: trail.url,
		webPublicationDate: trail.webPublicationDate,
		isImmersive: false,
	}));

const getDefaultCardProps = (
	trail: DCRFrontCard,
	isInOnwardsAbTestVariantStandardCard: boolean,
) => {
	const defaultProps: CardProps = {
		aspectRatio: '5:4',
		avatarUrl: trail.avatarUrl,
		branding: trail.branding,
		byline: trail.byline,
		dataLinkName: `onwards-content-gallery-style ${trail.dataLinkName}`,
		discussionApiUrl: trail.discussionApiUrl,
		discussionId: trail.discussionId,
		format: trail.format,
		headlineText: trail.headline,
		image: trail.image,
		imageLoading: 'lazy',
		isCrossword: trail.isCrossword,
		isExternalLink: false,
		isInOnwardsAbTestVariantStandardCard,
		isOnwardContent: true,
		kickerText: trail.kickerText,
		linkTo: trail.url,
		mainMedia: trail.mainMedia,
		onwardsSource: 'related-content',
		showAge: false,
		showByline: trail.showByline,
		showClock: false,
		showPulsingDot: false,
		showQuotedHeadline: trail.showQuotedHeadline,
		showTopBarDesktop: false,
		showTopBarMobile: false,
		snapData: trail.snapData,
		starRating: trail.starRating,
		trailText: trail.trailText,
		webPublicationDate: trail.webPublicationDate,
	};

	return defaultProps;
};

type Props = {
	url: string;
	discussionApiUrl: string;
	isInOnwardsAbTestVariant?: boolean;
};

/**
 * We are running an AB test to use the More Galleries style of onwards content on all articles.
 * If the test is successful, the plan is that this component will be removed and MoreGalleries.tsx will
 * be generalised so that is can be used for onwards content across all articles. If the
 * test is not successful, this component will be removed.
 */
export const MoreGalleriesStyleOnwardsContent = ({
	url,
	discussionApiUrl,
	isInOnwardsAbTestVariant,
}: Props) => {
	const { data, error } = useApi<OnwardsResponse>(url);

	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'onwards-lower');
		return null;
	}

	if (!data?.trails) {
		return (
			<Placeholder
				heights={
					new Map([
						['mobile', 900],
						['tablet', 600],
						['desktop', 900],
					])
				}
				shouldShimmer={false}
				backgroundColor={palette('--article-background')}
			/>
		);
	}

	const trails: DCRFrontCard[] = convertFETrailToDcrTrail(
		data.trails,
		discussionApiUrl,
	);

	const [firstTrail, ...standardTrails] = trails;
	if (!firstTrail) return null;

	const heading = data.heading || data.displayname;

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
						{...getDefaultCardProps(firstTrail, false)}
						mediaPositionOnDesktop="right"
						mediaPositionOnMobile="top"
						mediaSize="medium"
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
					{standardTrails.slice(0, 4).map((trail) => (
						<li key={trail.url} css={standardCardStyles}>
							<Card
								{...getDefaultCardProps(
									trail,
									!!isInOnwardsAbTestVariant,
								)}
								mediaPositionOnDesktop="bottom"
								mediaPositionOnMobile="left"
								mediaSize="small"
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
