import { css } from '@emotion/react';
import { adSizes, constants } from '@guardian/commercial';
import type { SlotName } from '@guardian/commercial';
import { ArticleDisplay } from '@guardian/libs';
import {
	border,
	from,
	neutral,
	space,
	text,
	textSans,
	until,
} from '@guardian/source-foundations';
import { pageSkinContainer } from '../layouts/lib/pageSkin';
import { getZIndex } from '../lib/getZIndex';
import { AD_CONTAINER_HEIGHT } from '../lib/liveblog-right-ad-constants';
import { Island } from './Island';
import { TopRightAdSlot } from './TopRightAdSlot.importable';

type InlinePosition =
	| 'inline'
	| 'liveblog-inline'
	| 'liveblog-right'
	| 'mobile-front';

type DefaultProps = {
	display?: ArticleDisplay;
	isPaidContent?: boolean;
	hasPageskin?: boolean;
	isLiveblog?: boolean;
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

export const labelHeight = constants.AD_LABEL_HEIGHT.toString();

const individualLabelCSS = css`
	${textSans.xxsmall()};
	height: ${labelHeight}px;
	max-height: ${labelHeight}px;
	background-color: ${neutral[97]};
	padding: 0 8px;
	border-top: 1px solid ${border.secondary};
	color: ${text.supporting};
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

const merchandisingAdStyles = css`
	position: relative;
	min-height: 250px;
`;

const mostPopAdStyles = css`
	position: relative;
	min-height: 274px;
	min-width: 300px;
	width: 300px;
	margin: 12px auto;
	text-align: center;
	${from.desktop} {
		margin: 0;
		width: auto;
	}
	${from.wide} {
		padding-top: 25px;
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

/**
 * For CSS in Frontend, see mark: 9473ae05-a901-4a8d-a51d-1b9c894d6e1f
 */
const fluidAdStyles = css`
	&.ad-slot--fluid {
		min-height: 250px;
		line-height: 10px;
		padding: 0;
		margin: 0;
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
		stroke: ${neutral[7]};
		fill: ${neutral[7]};
		stroke-linecap: round;
		stroke-width: 0;
		text-align: center;
	}
	.ad-slot--mobile-sticky .ad-slot__close-button {
		display: block;
	}
	.ad-slot__close-button__x {
		stroke: ${neutral[7]};
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
	isLiveblog = false,
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
					return isLiveblog ? (
						// We've already created an Island for liveblogs. This can be
						// simplified when we remove the liveblogRightColumnAds ab test
						<TopRightAdSlot
							isPaidContent={isPaidContent}
							adStyles={[labelStyles]}
						/>
					) : (
						<Island clientOnly={true}>
							<TopRightAdSlot
								isPaidContent={isPaidContent}
								adStyles={[labelStyles]}
							/>
						</Island>
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
						labelStyles,
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
			const adSlotAboveNav = css`
				position: relative;
				margin: 0 auto;
				min-height: ${adSizes.leaderboard.height}px;
				text-align: left;
				display: block;
				min-width: 728px;
			`;
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
						adSlotAboveNav,
					]}
					data-link-name="ad slot top-above-nav"
					data-name="top-above-nav"
					aria-hidden="true"
				></div>
			);
		}
		case 'mostpop': {
			return (
				<div className="ad-slot-container" css={[adContainerStyles]}>
					<div
						id="dfp-ad--mostpop"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--mostpop',
							'ad-slot--mpu-banner-ad',
							'ad-slot--rendered',
						].join(' ')}
						css={[mostPopAdStyles]}
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
						css`
							display: flex;
							justify-content: center;
						`,
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
					css={[
						css`
							display: flex;
							justify-content: center;
						`,
						adContainerStyles,
					]}
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
						css={[
							/**
							 * commercial code will look for slots that are display: none
							 * and remove them from the dom
							 *
							 * on desktop we hide mobile inline slots
							 */
							css`
								position: relative;
								${until.tablet} {
									display: none;
								}
							`,
						]}
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
						css={[
							css`
								position: relative;
							`,
						]}
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
						css={[
							css`
								position: relative;
								min-height: 274px;
								min-width: 300px;
								width: 300px;
								margin: 12px auto;
							`,
							/**
							 * commercial code will look for slots that are display: none
							 * and remove them from the dom
							 *
							 * on mobile we hide desktop inline slots
							 */
							css`
								${from.tablet} {
									display: none;
								}
							`,
							fluidFullWidthAdStyles,
						]}
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
		default:
			return null;
	}
};

export const MobileStickyContainer = () => {
	return (
		<div className="mobilesticky-container" css={mobileStickyAdStyles} />
	);
};
