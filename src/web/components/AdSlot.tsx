import { css } from '@emotion/react';

import { border, neutral, text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { Display } from '@guardian/types';
import { space } from '@guardian/src-foundations';

type Props = {
	display: Display;
	position: AdSlotType;
};

/*
    This file's values are meant to mirror the values used by frontend.
    Look for marks:
        432b3a46-90c1-4573-90d3-2400b51af8d0
        1b109a4a-791c-4214-acd2-2720d7d9f96f
    ... in the frontend code
 */

enum Size {
	// standard ad sizes
	billboard = '970,250',
	leaderboard = '728,90',
	mpu = '300,250',
	halfPage = '300,600',
	portrait = '300,1050',
	skyscraper = '160,600',
	mobilesticky = '320,50',
	// dfp proprietary ad sizes
	fluid = 'fluid',
	outOfPage = '1,1',
	googleCard = '300,274',
	// guardian proprietary ad sizes
	video = '620,1',
	outstreamDesktop = '620,350',
	outstreamGoogleDesktop = '550,310',
	outstreamMobile = '300,197',
	merchandisingHighAdFeature = '88,89',
	merchandisingHigh = '88,87',
	merchandising = '88,88',
	inlineMerchandising = '88,85',
	fabric = '88,71',
	empty = '2,2',
}

const adSlotLabelStyles = css`
	${textSans.xxsmall()};
	position: relative;
	height: 24px;
	background-color: ${neutral[97]};
	padding: 0 8px;
	border-top: 1px solid ${border.secondary};
	color: ${text.supporting};
	text-align: left;
	box-sizing: border-box;
	&.visible {
		visibility: initial;
	}
	&.hidden {
		visibility: hidden;
	}
	&.ad-slot__label--toggle {
		margin: 0 auto;
		${until.tablet} {
			display: none;
		}
	}
`;

const outOfPageStyles = css`
	height: 0;
`;

export const labelStyles = css`
	.ad-slot__label,
	.ad-slot__scroll {
		${adSlotLabelStyles}
	}

	.ad-slot__close-button {
		display: none;
	}

	.ad-slot__scroll {
		position: fixed;
		bottom: 0;
		width: 100%;
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
	z-index: 1010;
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
	.ad-slot__label {
		font-size: 0.75rem;
		line-height: 1.25rem;
		position: relative;
		height: 1.5rem;
		background-color: ${neutral[97]};
		padding: 0 0.5rem;
		border-top: 0.0625rem solid ${border.secondary};
		color: ${neutral[60]};
		text-align: left;
		box-sizing: border-box;
		${textSans.xxsmall()};
	}
`;

const adStyles = [labelStyles, fluidAdStyles];

const AdSlotLabelToggled: React.FC = () => (
	<div
		className={['ad-slot__label', 'ad-slot__label--toggle', 'hidden'].join(
			' ',
		)}
		css={adSlotLabelStyles}
	>
		Advertisement
	</div>
);

export const AdSlot: React.FC<Props> = ({ position, display }) => {
	switch (position) {
		case 'right':
			switch (display) {
				case Display.Immersive:
				case Display.Showcase:
				case Display.NumberedList: {
					return (
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
							// mark: 01303e88-ef1f-462d-9b6e-242419435cec
							data-mobile={[
								`${Size.outOfPage}`,
								`${Size.empty}`,
								`${Size.mpu}`,
								`${Size.googleCard}`,
								`${Size.halfPage}`,
								`${Size.fluid}`,
							].join('|')}
							aria-hidden="true"
						/>
					);
				}
				case Display.Standard: {
					const MOSTVIEWED_STICKY_HEIGHT = 1059;
					return (
						<div
							css={css`
								position: static;
								height: ${MOSTVIEWED_STICKY_HEIGHT}px;
							`}
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
								css={[
									css`
										position: sticky;
										top: 0;
									`,
									adStyles,
								]}
								data-link-name="ad slot right"
								data-name="right"
								// mark: 01303e88-ef1f-462d-9b6e-242419435cec
								data-mobile={[
									`${Size.outOfPage}`,
									`${Size.empty}`,
									`${Size.mpu}`,
									`${Size.googleCard}`,
									`${Size.halfPage}`,
									`${Size.fluid}`,
								].join('|')}
								aria-hidden="true"
							/>
						</div>
					);
				}
				default:
					return null;
			}
		case 'comments': {
			return (
				<div
					css={css`
						position: static;
						height: 100%;
					`}
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
							`,
							adStyles,
						]}
						data-link-name="ad slot comments"
						data-name="comments"
						data-mobile={[
							`${Size.outOfPage}`,
							`${Size.empty}`,
							`${Size.halfPage}`,
							`${Size.outstreamMobile}`,
							`${Size.mpu}`,
							`${Size.googleCard}`,
							`${Size.fluid}`,
						].join('|')}
						data-desktop={[
							`${Size.outOfPage}`,
							`${Size.empty}`,
							`${Size.mpu}`,
							`${Size.googleCard}`,
							`${Size.video}`,
							`${Size.outstreamDesktop}`,
							`${Size.outstreamGoogleDesktop}`,
							`${Size.fluid}`,
							`${Size.halfPage}`,
							`${Size.skyscraper}`,
						].join('|')}
						data-phablet={[
							`${Size.outOfPage}`,
							`${Size.empty}`,
							`${Size.outstreamMobile}`,
							`${Size.mpu}`,
							`${Size.googleCard}`,
							`${Size.outstreamDesktop}`,
							`${Size.outstreamGoogleDesktop}`,
							`${Size.fluid}`,
						].join('|')}
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'top-above-nav': {
			const adSlotAboveNav = css`
				position: relative;
				margin: 0 auto;
				min-height: 108px;
				padding-bottom: 18px;
				text-align: left;
				display: table;
				width: 728px;
			`;
			return (
				<>
					<AdSlotLabelToggled />
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
						// The sizes here come from two places in the frontend code
						// 1. file mark: 432b3a46-90c1-4573-90d3-2400b51af8d0
						// 2. file mark: c66fae4e-1d29-467a-a081-caad7a90cacd
						data-tablet={[
							`${Size.outOfPage}`,
							`${Size.empty}`,
							`${Size.fabric}`,
							`${Size.fluid}`,
							`${Size.leaderboard}`,
						].join('|')}
						data-desktop={[
							`${Size.outOfPage}`,
							`${Size.empty}`,
							`${Size.leaderboard}`,
							`940,230`,
							`900,250`,
							`${Size.billboard}`,
							`${Size.fabric}`,
							`${Size.fluid}`,
						].join('|')}
						// Values from file mark: c66fae4e-1d29-467a-a081-caad7a90cacd
						aria-hidden="true"
					/>
				</>
			);
		}
		case 'mostpop': {
			return (
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
						css`
							position: relative;
						`,
						adStyles,
					]}
					data-link-name="ad slot mostpop"
					data-name="mostpop"
					// mirror frontend file mark: 432b3a46-90c1-4573-90d3-2400b51af8d0
					data-mobile={[
						`${Size.outOfPage}`,
						`${Size.empty}`,
						`${Size.mpu}`,
						`${Size.googleCard}`,
						`${Size.fluid}`,
					].join('|')}
					data-tablet={[
						`${Size.outOfPage}`,
						`${Size.empty}`,
						`${Size.mpu}`,
						`${Size.googleCard}`,
						`${Size.halfPage}`,
						`${Size.leaderboard}`,
						`${Size.fluid}`,
					].join('|')}
					data-phablet={[
						`${Size.outOfPage}`,
						`${Size.empty}`,
						`${Size.outstreamMobile}`,
						`${Size.mpu}`,
						`${Size.googleCard}`,
						`${Size.halfPage}`,
						`${Size.outstreamGoogleDesktop}`,
						`${Size.fluid}`,
					].join('|')}
					data-desktop={[
						`${Size.outOfPage}`,
						`${Size.empty}`,
						`${Size.mpu}`,
						`${Size.googleCard}`,
						`${Size.halfPage}`,
						`${Size.fluid}`,
					].join('|')}
					aria-hidden="true"
				/>
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
						css`
							position: relative;
						`,
						adStyles,
						fluidFullWidthAdStyles,
					]}
					data-link-name="ad slot merchandising-high"
					data-name="merchandising-high"
					// mirror frontend file mark: 432b3a46-90c1-4573-90d3-2400b51af8d0
					data-mobile={[
						`${Size.outOfPage}`,
						`${Size.empty}`,
						`${Size.merchandisingHigh}`,
						`${Size.fluid}`,
					].join('|')}
					aria-hidden="true"
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
						css`
							position: relative;
						`,
						adStyles,
						fluidFullWidthAdStyles,
					]}
					data-link-name="ad slot merchandising"
					data-name="merchandising"
					// mirror frontend file mark: 432b3a46-90c1-4573-90d3-2400b51af8d0
					data-mobile={[
						`${Size.outOfPage}`,
						`${Size.empty}`,
						`${Size.merchandising}`,
						`${Size.fluid}`,
					].join('|')}
					aria-hidden="true"
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
					data-desktop={[`${Size.outOfPage}`].join('|')}
					aria-hidden="true"
				/>
			);
		}
		default:
			return null;
	}
};

export const MobileStickyContainer: React.FC = () => {
	return (
		<div className="mobilesticky-container" css={mobileStickyAdStyles} />
	);
};
