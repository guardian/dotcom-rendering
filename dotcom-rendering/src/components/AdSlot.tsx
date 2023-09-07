import { css } from '@emotion/react';
import { adSizes, constants } from '@guardian/commercial';
import type { SlotName } from '@guardian/commercial';
import { ArticleDisplay } from '@guardian/libs';
import {
	breakpoints,
	from,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { pageSkinContainer } from '../layouts/lib/pageSkin';
import { getZIndex } from '../lib/getZIndex';
import { AD_CONTAINER_HEIGHT } from '../lib/liveblog-right-ad-constants';
import { TopRightAdSlot } from './TopRightAdSlot';

type InlinePosition =
	| 'fronts-banner'
	| 'inline'
	| 'liveblog-inline'
	| 'liveblog-right'
	| 'mobile-front';

type DefaultProps = {
	display?: ArticleDisplay;
	isPaidContent?: boolean;
	hasPageskin?: boolean;
};

// TODO move to commercial
type SlotNamesWithPageSkin = SlotName | 'pageskin';

type InlineProps = {
	position: InlinePosition;
	index: number;
};

type NonInlineProps = {
	position: Exclude<SlotNamesWithPageSkin, InlinePosition>;
	index?: never;
};

/**
 * This allows us to conditionally require the index property based
 * on position. If `position` is an inline type then we expect the
 * index value. If not, then we explicitly refuse this property
 */
type Props = DefaultProps & (InlineProps | NonInlineProps);

const labelHeight = constants.AD_LABEL_HEIGHT;

const individualLabelCSS = css`
	${textSans.xxsmall()};
	height: ${labelHeight}px;
	max-height: ${labelHeight}px;
	background-color: ${palette.neutral[97]};
	padding: 0 8px;
	border-top: 1px solid ${palette.neutral[86]};
	color: ${palette.neutral[46]};
	text-align: left;
	box-sizing: border-box;
`;

const outOfPageStyles = css`
	height: 0;
`;

export const labelStyles = css`
	.ad-slot__scroll {
		${individualLabelCSS}
		position: relative;
		&.visible {
			visibility: initial;
		}
		&.hidden {
			visibility: hidden;
		}
	}
	.ad-slot__close-button {
		display: none;
	}

	.ad-slot__scroll {
		position: fixed;
		bottom: 0;
		width: 100%;
		${individualLabelCSS}
	}

	.ad-slot:not[data-label-show='true']::before {
		content: '';
		display: block;
		height: ${labelHeight}px;
		visibility: hidden;
	}

	.ad-slot[data-label-show='true']:not(.ad-slot--interscroller):not(
			.ad-slot--merchandising
		):not(.ad-slot--merchandising-high)::before {
		content: attr(ad-label-text);
		display: block;
		position: relative;
		${individualLabelCSS}
	}

	.ad-slot--merchandising[data-label-show='true']::before,
	.ad-slot--merchandising-high[data-label-show='true']::before {
		content: attr(ad-label-text);
		display: block;
		position: relative;
		max-width: 970px;
		margin: auto;
		${individualLabelCSS}
	}

	.ad-slot__adtest-cookie-clear-link {
		${textSans.xxsmall()};
		text-align: left;
		position: absolute;
		left: 268px;
		top: 1px;
		z-index: 10;
		padding: 0;
		border: 0;
	}

	.ad-slot--interscroller[data-label-show='true']::before {
		content: 'Advertisement';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		border: 0;
		display: block;
		${individualLabelCSS}
	}
`;

const adContainerCollapseStyles = css`
	& .ad-slot.ad-slot--collapse {
		display: none;
	}
`;

const adSlotCollapseStyles = css`
	&.ad-slot.ad-slot--collapse {
		display: none;
	}
`;

/**
 * For CSS in Frontend, see mark: 9473ae05-a901-4a8d-a51d-1b9c894d6e1f
 */
const fluidAdStyles = css`
	&.ad-slot--fluid {
		min-height: 250px;
		line-height: 10px;
		padding: 0;
		margin: 0;
		overflow: visible;
	}
`;

/**
 * Usage according to DAP (Digital Ad Production)
 *
 * #### Desktop
 * - `fabric` &rarr; `top-above-nav`,`merchandising-high`,`merchandising`
 * - `fabric-custom` &rarr; `top-above-nav`,`merchandising-high`,`merchandising`
 * - `fabric-expandable` &rarr; `merchandising-high`
 * - `fabric-third-party` &rarr; `top-above-nav`,`merchandising-high`,`merchandising`
 * - `fabric-video` &rarr; `top-above-nav`,`merchandising-high`
 * - `fabric-video-expandable` &rarr; `merchandising-high`
 *
 * #### Mobile
 * - `interscroller` &rarr; `top-above-nav`
 * - `mobile-revealer` &rarr; `top-above-nav`
 */
const fluidFullWidthAdStyles = css`
	&.ad-slot--fluid {
		width: 100%;
	}
`;

const topAboveNavStyles = css`
	position: relative;
	margin: 0 auto;
	min-height: ${adSizes.leaderboard.height}px;
	min-width: ${adSizes.leaderboard.width}px;
	text-align: left;
	display: block;
`;

const merchandisingAdContainerStyles = css`
	display: flex;
	justify-content: center;
`;

const merchandisingAdStyles = css`
	position: relative;
	min-height: ${adSizes.billboard.height}px;
`;

const inlineAdStyles = css`
	position: relative;
	${until.tablet} {
		display: none;
	}
`;

const liveblogInlineAdStyles = css`
	position: relative;
`;

const mobileFrontAdStyles = css`
	position: relative;
	min-height: ${adSizes.mpu.height + labelHeight}px;
	min-width: 300px;
	width: 300px;
	margin: 12px auto;

	${from.tablet} {
		display: none;
	}
`;

const frontsBannerPaddingHeight = 20;
const frontsBannerMinHeight =
	adSizes.billboard.height + labelHeight + frontsBannerPaddingHeight;

const frontsBannerAdTopContainerStyles = css`
	display: flex;
	justify-content: center;
	min-height: ${frontsBannerMinHeight}px;
	background-color: ${palette.neutral[97]};

	${until.desktop} {
		display: none;
	}
`;

const frontsBannerAdContainerStyles = css`
	/* Native templates require a width (or min-width) to be explicitly set */
	width: ${breakpoints['wide']}px;
	display: flex;
	justify-content: center;

	/* This stops the visual effect where the advert renders at the
	   top of the ad slot, then is pushed down 24px when the label renders */
	align-items: flex-end;
`;

const frontsBannerCollapseStyles = css`
	display: none;
`;

const frontsBannerAdStyles = css`
	position: relative;
	max-width: ${breakpoints['wide']}px;
	overflow: hidden;
	padding-bottom: ${frontsBannerPaddingHeight}px;
`;

const articleEndAdStyles = css`
	position: relative;
	min-height: 450px;

	&.ad-slot--fluid {
		min-height: 450px;
	}
`;

const mostPopAdStyles = css`
	position: relative;
	min-height: ${adSizes.mpu.height + labelHeight}px;
	min-width: 300px;
	max-width: 300px;
	margin: 12px auto;
	text-align: center;
	${from.tablet} {
		max-width: 700px;
	}
	${from.desktop} {
		width: auto;
		max-width: 300px;
	}
	${from.wide} {
		margin-top: 25px;
	}
`;

const mostPopContainerStyles = css`
	min-height: ${adSizes.mpu.height + labelHeight}px;
	min-width: 300px;
	width: fit-content;
	max-width: 300px;
	margin: 0px auto;
	${from.tablet} {
		max-width: 700px;
	}
	${from.desktop} {
		max-width: 300px;
	}
`;

/**
 * For implementation in Frontend, see mark: dca5c7dd-dda4-4922-9317-a55a3789fe4c
 * These styles come mostly from RichLink in DCR.
 */
export const carrotAdStyles = css`
	.ad-slot--carrot {
		float: left;
		clear: both;
		width: 140px;
		margin-right: 20px;
		margin-bottom: ${space[1]}px;
		${from.leftCol} {
			position: relative;
			margin-left: -160px;
			width: 140px;
		}
		${from.wide} {
			margin-left: -240px;
			width: 220px;
		}
	}
`;

const mobileStickyAdStyles = css`
	position: fixed;
	bottom: 0;
	width: 320px;
	margin: 0 auto;
	right: 0;
	left: 0;
	${getZIndex('mobileSticky')}
	${from.phablet} {
		display: none;
	}
	.ad-slot__close-button {
		display: none;
		position: absolute;
		right: 3px;
		top: -21px;
		padding: 0;
		border: 0;
		height: 21px;
		width: 21px;
		background-color: transparent;
	}
	.ad-slot__close-button svg {
		height: 0.75rem;
		width: 0.75rem;
		stroke: ${palette.neutral[7]};
		fill: ${palette.neutral[7]};
		stroke-linecap: round;
		stroke-width: 0;
		text-align: center;
	}
	.ad-slot--mobile-sticky .ad-slot__close-button {
		display: block;
	}
	.ad-slot__close-button__x {
		stroke: ${palette.neutral[7]};
		fill: transparent;
		stroke-linecap: round;
		stroke-width: 2;
		text-align: center;
	}

	.ad-slot:not[data-label-show='true']::before {
		content: '';
		display: block;
		height: ${labelHeight}px;
		visibility: hidden;
	}
	.ad-slot[data-label-show='true']::before {
		content: 'Advertisement';
		display: block;
		position: relative;
		${individualLabelCSS}
	}
`;

export const adContainerStyles = [adContainerCollapseStyles, labelStyles];

export const AdSlot = ({
	position,
	display,
	isPaidContent = false,
	index,
	hasPageskin = false,
}: Props) => {
	switch (position) {
		case 'right':
			switch (display) {
				case ArticleDisplay.Immersive:
				case ArticleDisplay.Showcase:
				case ArticleDisplay.NumberedList: {
					return (
						<div
							className="ad-slot-container"
							css={[adContainerStyles]}
						>
							<div
								id="dfp-ad--right"
								className={[
									'js-ad-slot',
									'ad-slot',
									'ad-slot--right',
									'ad-slot--mpu-banner-ad',
									'ad-slot--rendered',
									'js-sticky-mpu',
								].join(' ')}
								data-link-name="ad slot right"
								data-name="right"
								aria-hidden="true"
							/>
						</div>
					);
				}
				case ArticleDisplay.Standard: {
					return (
						<TopRightAdSlot
							isPaidContent={isPaidContent}
							adStyles={[labelStyles]}
						/>
					);
				}
				default:
					return null;
			}
		case 'liveblog-right': {
			const advertId = `liveblog-right-${index}`;
			return (
				<div
					className="ad-slot-container"
					css={[
						adContainerStyles,
						css`
							height: ${AD_CONTAINER_HEIGHT}px;
						`,
					]}
				>
					<div
						id={`dfp-ad--${advertId}`}
						className={[
							'js-ad-slot',
							'ad-slot',
							`ad-slot--${advertId}`,
							'ad-slot--liveblog-right',
							'ad-slot--rendered',
						].join(' ')}
						css={[
							css`
								position: sticky;
								top: 0;
							`,
						]}
						data-link-name={`ad slot ${advertId}`}
						data-name={advertId}
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'comments': {
			return (
				<div className="ad-slot-container" css={[adContainerStyles]}>
					<div
						id="dfp-ad--comments"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--comments',
							'ad-slot--mpu-banner-ad',
							'ad-slot--rendered',
							'js-sticky-mpu',
						].join(' ')}
						data-link-name="ad slot comments"
						data-name="comments"
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'top-above-nav': {
			return (
				<div
					id="dfp-ad--top-above-nav"
					className={[
						'js-ad-slot',
						'ad-slot',
						'ad-slot--top-above-nav',
						'ad-slot--mpu-banner-ad',
						'ad-slot--rendered',
					].join(' ')}
					css={[
						fluidAdStyles,
						fluidFullWidthAdStyles,
						topAboveNavStyles,
					]}
					data-link-name="ad slot top-above-nav"
					data-name="top-above-nav"
					aria-hidden="true"
				></div>
			);
		}
		case 'mostpop': {
			return (
				<div
					className="ad-slot-container"
					css={[adContainerStyles, mostPopContainerStyles]}
				>
					<div
						id="dfp-ad--mostpop"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--mostpop',
							'ad-slot--mpu-banner-ad',
							'ad-slot--rendered',
						].join(' ')}
						css={[
							fluidAdStyles,
							fluidFullWidthAdStyles,
							mostPopAdStyles,
						]}
						data-link-name="ad slot mostpop"
						data-name="mostpop"
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'merchandising-high': {
			return (
				<div
					className="ad-slot-container"
					css={[
						merchandisingAdContainerStyles,
						hasPageskin && pageSkinContainer,
						adContainerStyles,
					]}
				>
					<div
						id="dfp-ad--merchandising-high"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--merchandising-high',
						].join(' ')}
						css={[
							merchandisingAdStyles,
							fluidAdStyles,
							fluidFullWidthAdStyles,
						]}
						data-link-name="ad slot merchandising-high"
						data-name="merchandising-high"
						data-refresh="false"
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'merchandising': {
			return (
				<div
					className="ad-slot-container"
					css={[merchandisingAdContainerStyles, adContainerStyles]}
				>
					<div
						id="dfp-ad--merchandising"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--merchandising',
						].join(' ')}
						css={[
							merchandisingAdStyles,
							fluidAdStyles,
							fluidFullWidthAdStyles,
						]}
						data-link-name="ad slot merchandising"
						data-name="merchandising"
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'fronts-banner': {
			const advertId = `fronts-banner-${index}`;
			return (
				<div css={frontsBannerAdTopContainerStyles}>
					<div
						className="ad-slot-container"
						css={[
							adContainerStyles,
							frontsBannerAdContainerStyles,
							hasPageskin && frontsBannerCollapseStyles,
						]}
					>
						<div
							id={`dfp-ad--${advertId}`}
							className={[
								'js-ad-slot',
								'ad-slot',
								`ad-slot--${advertId}`,
								'ad-slot--rendered',
								hasPageskin && 'ad-slot--collapse',
							].join(' ')}
							css={[
								fluidAdStyles,
								fluidFullWidthAdStyles,
								frontsBannerAdStyles,
							]}
							data-link-name={`ad slot ${advertId}`}
							data-name={`${advertId}`}
							data-refresh="false"
							aria-hidden="true"
						/>
					</div>
				</div>
			);
		}
		case 'survey': {
			return (
				<div
					id="dfp-ad--survey"
					className={[
						'js-ad-slot',
						'ad-slot',
						'ad-slot--survey',
					].join(' ')}
					css={[outOfPageStyles, adSlotCollapseStyles]}
					data-link-name="ad slot survey"
					data-name="survey"
					data-label="false"
					data-refresh="false"
					data-out-of-page="true"
					aria-hidden="true"
				/>
			);
		}
		case 'inline': {
			const advertId = `inline${index + 1}`;
			return (
				<div className="ad-slot-container" css={[adContainerStyles]}>
					<div
						id={`dfp-ad--${advertId}`}
						className={[
							'js-ad-slot',
							'ad-slot',
							`ad-slot--${advertId}`,
							'ad-slot--container-inline',
							'ad-slot--rendered',
						].join(' ')}
						css={[inlineAdStyles]}
						data-link-name={`ad slot ${advertId}`}
						data-name={advertId}
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'liveblog-inline': {
			const advertId = `inline${index}`;
			return (
				<div className="ad-slot-container" css={[adContainerStyles]}>
					<div
						id={`dfp-ad--${advertId}`}
						className={[
							'js-ad-slot',
							'ad-slot',
							`ad-slot--${advertId}`,
							'ad-slot--liveblog-inline',
							'ad-slot--rendered',
						].join(' ')}
						css={[liveblogInlineAdStyles]}
						data-link-name={`ad slot ${advertId}`}
						data-name={advertId}
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'mobile-front': {
			const advertId = index === 0 ? 'top-above-nav' : `inline${index}`;
			return (
				<div className="ad-slot-container" css={[adContainerStyles]}>
					<div
						id={`dfp-ad--${advertId}--mobile`}
						className={[
							'js-ad-slot',
							'ad-slot',
							`ad-slot--${advertId}`,
							'ad-slot--container-inline',
							'ad-slot--mobile',
							'mobile-only',
							'ad-slot--rendered',
						].join(' ')}
						css={[mobileFrontAdStyles, fluidFullWidthAdStyles]}
						data-link-name={`ad slot ${advertId}`}
						data-name={advertId}
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'pageskin': {
			return (
				<div className="ad-slot-container" css={[adContainerStyles]}>
					<div
						id="dfp-ad--pageskin-inread"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--pageskin',
							'ad-slot--pageskin-inread',
						].join(' ')}
						css={outOfPageStyles}
						data-link-name="ad slot pageskin-inread"
						data-name="pageskin-inread"
						data-label="false"
						data-refresh="false"
						data-out-of-page="true"
						data-wide="1,1"
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'article-end': {
			return (
				<div className="ad-slot-container" css={[adContainerStyles]}>
					<div
						id="dfp-ad--article-end"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--article-end',
							'ad-slot--rendered',
						].join(' ')}
						css={[
							fluidAdStyles,
							fluidFullWidthAdStyles,
							articleEndAdStyles,
						]}
						data-link-name="ad slot article-end"
						data-name="article-end"
						aria-hidden="true"
					/>
				</div>
			);
		}
		default:
			return null;
	}
};

export const MobileStickyContainer = () => {
	return (
		<div className="mobilesticky-container" css={mobileStickyAdStyles} />
	);
};
