/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { css, cx } from 'emotion';

import { border, neutral, text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { Display } from '@guardian/types';

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

export const labelStyles = css`
	.ad-slot__label,
	.ad-slot__scroll {
		${textSans.xsmall()};
		position: relative;
		height: 24px;
		background-color: ${neutral[97]};
		padding: 0 8px;
		border-top: 1px solid ${border.secondary};
		color: ${text.supporting};
		text-align: left;
		box-sizing: border-box;
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
		${textSans.xsmall()};
	}
`;

export const AdSlot: React.FC<Props> = ({ position, display }) => {
	switch (position) {
		case 'right':
			switch (display) {
				case Display.Immersive:
				case Display.Showcase: {
					return (
						<div
							id="dfp-ad--right"
							className={cx(
								'js-ad-slot',
								'ad-slot',
								'ad-slot--right',
								'ad-slot--mpu-banner-ad',
								'ad-slot--rendered',
								'js-sticky-mpu',
								labelStyles,
							)}
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
							className={css`
								position: static;
								height: ${MOSTVIEWED_STICKY_HEIGHT}px;
							`}
						>
							<div
								id="dfp-ad--right"
								className={cx(
									'js-ad-slot',
									'ad-slot',
									'ad-slot--right',
									'ad-slot--mpu-banner-ad',
									'ad-slot--rendered',
									'js-sticky-mpu',
									css`
										position: sticky;
										top: 0;
									`,
									labelStyles,
								)}
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
					className={css`
						position: static;
						height: 100%;
					`}
				>
					<div
						id="dfp-ad--comments"
						className={cx(
							'js-ad-slot',
							'ad-slot',
							'ad-slot--comments',
							'ad-slot--mpu-banner-ad',
							'ad-slot--rendered',
							'js-sticky-mpu',
							css`
								position: sticky;
								top: 0;
							`,
							labelStyles,
						)}
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
				margin: 0 auto;
				height: 151px;
				padding-bottom: 18px;
				text-align: left;
				display: table;
				width: 728px;
			`;
			return (
				<div
					id="dfp-ad--top-above-nav"
					className={cx(
						'js-ad-slot',
						'ad-slot',
						'ad-slot--top-above-nav',
						'ad-slot--mpu-banner-ad',
						'ad-slot--rendered',
						css`
							position: relative;
						`,
						labelStyles,
						adSlotAboveNav,
					)}
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
			);
		}
		case 'mostpop': {
			return (
				<div
					id="dfp-ad--mostpop"
					className={cx(
						'js-ad-slot',
						'ad-slot',
						'ad-slot--mostpop',
						'ad-slot--mpu-banner-ad',
						'ad-slot--rendered',
						css`
							position: relative;
						`,
						labelStyles,
					)}
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
					className={cx(
						'js-ad-slot',
						'ad-slot',
						'ad-slot--merchandising-high',
						css`
							position: relative;
						`,
						labelStyles,
					)}
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
					className={cx(
						'js-ad-slot',
						'ad-slot',
						'ad-slot--merchandising',
						css`
							position: relative;
						`,
						labelStyles,
					)}
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
		default:
			return null;
	}
};

export const MobileStickyContainer: React.FC = () => {
	return <div className={`mobilesticky-container ${mobileStickyAdStyles}`} />;
};
