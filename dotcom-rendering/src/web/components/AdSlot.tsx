import { css } from '@emotion/react';
import { adSizes } from '@guardian/commercial-core';
import type { SlotName } from '@guardian/commercial-core';
import { ArticleDisplay } from '@guardian/libs';
import {
	border,
	from,
	neutral,
	space,
	text,
	textSans,
} from '@guardian/source-foundations';
import { getZIndex } from '../lib/getZIndex';
import { Island } from './Island';
import { TopRightAdSlot } from './TopRightAdSlot.importable';

type InlineProps = {
	display?: ArticleDisplay;
	position: 'inline' | 'mobile-front';
	index: number;
	shouldHideReaderRevenue?: boolean;
	isPaidContent?: boolean;
};

type NonInlineProps = {
	display?: ArticleDisplay;
	position: Omit<SlotName, 'inline' | 'mobile-front'>;
	index?: never;
	shouldHideReaderRevenue?: boolean;
	isPaidContent?: boolean;
};

/**
 * This union type allows us to conditionally require the index property
 * based on position. If `position` is 'inline' or 'mobile-front' then we expect the index
 * value. If not, then we explicitly refuse this property
 */
type Props = InlineProps | NonInlineProps;

export const labelHeight = 24;

const adSlotLabelStyles = css`
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
	.ad-slot__close-button {
		display: none;
	}

	.ad-slot__scroll {
		position: fixed;
		bottom: 0;
		width: 100%;
		${adSlotLabelStyles}
	}

	.ad-slot:not[data-label-show='true']::before {
		content: '';
		display: block;
		height: ${labelHeight}px;
		visibility: hidden;
	}

	.ad-slot[data-label-show='true']:not(.ad-slot--interscroller)::before {
		content: 'Advertisement';
		display: block;
		position: relative;
		${adSlotLabelStyles}
	}
`;

export const adCollapseStyles = css`
	& .ad-slot.ad-slot--collapse {
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
		top: 3px;
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
	.ad-slot--mobile-sticky .ad-slot__label .ad-slot__close-button {
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
	.ad-slot[data-label-show='true']:not(.ad-slot--interscroller)::before {
		content: 'Advertisement';
		display: block;
		position: relative;
		${adSlotLabelStyles}
	}
`;

const adStyles = [labelStyles, fluidAdStyles];

export const AdSlot = ({
	position,
	display,
	isPaidContent = false,
	index,
}: Props) => {
	switch (position) {
		case 'right':
			switch (display) {
				case ArticleDisplay.Immersive:
				case ArticleDisplay.Showcase:
				case ArticleDisplay.NumberedList: {
					return (
						<div css={[adStyles]}>
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
								css={adStyles}
								data-link-name="ad slot right"
								data-name="right"
								aria-hidden="true"
							/>
						</div>
					);
				}
				case ArticleDisplay.Standard: {
					return (
						<Island>
							<TopRightAdSlot
								isPaidContent={isPaidContent}
								adStyles={adStyles}
							/>
						</Island>
					);
				}
				default:
					return null;
			}
		case 'comments': {
			return (
				<div
					css={[
						css`
							position: static;
							height: 100%;
						`,
						adStyles,
					]}
				>
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
						css={[
							css`
								position: sticky;
								top: 0;
								width: 300px;
							`,
							adStyles,
						]}
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
					css={[adStyles, fluidFullWidthAdStyles, adSlotAboveNav]}
					data-link-name="ad slot top-above-nav"
					data-name="top-above-nav"
					aria-hidden="true"
				></div>
			);
		}
		case 'mostpop': {
			return (
				<div css={[adStyles]}>
					<div
						id="dfp-ad--mostpop"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--mostpop',
							'ad-slot--mpu-banner-ad',
							'ad-slot--rendered',
						].join(' ')}
						css={[adStyles, mostPopAdStyles]}
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
					id="dfp-ad--merchandising-high"
					className={[
						'js-ad-slot',
						'ad-slot',
						'ad-slot--merchandising-high',
					].join(' ')}
					css={[
						merchandisingAdStyles,
						adStyles,
						fluidFullWidthAdStyles,
					]}
					data-link-name="ad slot merchandising-high"
					data-name="merchandising-high"
					aria-hidden="true"
					data-label="false"
				/>
			);
		}
		case 'merchandising': {
			return (
				<div
					id="dfp-ad--merchandising"
					className={[
						'js-ad-slot',
						'ad-slot',
						'ad-slot--merchandising',
					].join(' ')}
					css={[
						merchandisingAdStyles,
						adStyles,
						fluidFullWidthAdStyles,
					]}
					data-link-name="ad slot merchandising"
					data-name="merchandising"
					aria-hidden="true"
					data-label="false"
				/>
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
					css={outOfPageStyles}
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
			// index will always be defined here but ts isn't as sure
			// so I'm falling back to 'inline-0' to keep it happy
			const advertId = index ? `inline${index}` : 'inline-0';
			return (
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
						css`
							position: relative;
						`,
						adStyles,
					]}
					data-link-name={`ad slot ${advertId}`}
					data-name={`${advertId}`}
					aria-hidden="true"
				/>
			);
		}
		case 'mobile-front': {
			const advertId = index ? `inline${index}` : 'inline-0';
			return (
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
						adStyles,
					]}
					data-link-name={`ad slot ${advertId}`}
					data-name={`${advertId}`}
					aria-hidden="true"
				/>
			);
		}
		case 'exclusion': {
			return (
				<div
					id={'dfp-ad--exclusion'}
					className={['js-ad-slot', 'ad-slot'].join(' ')}
					data-name="exclusion"
					aria-hidden="true"
					data-label="false"
				/>
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
