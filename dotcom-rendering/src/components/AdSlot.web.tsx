import { css } from '@emotion/react';
import type { SlotName } from '@guardian/commercial';
import { adSizes, constants } from '@guardian/commercial';
import { ArticleDisplay } from '@guardian/libs';
import {
	between,
	breakpoints,
	from,
	palette,
	space,
	textSans12,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { getZIndex } from '../lib/getZIndex';
import { LABS_HEADER_HEIGHT } from '../lib/labs-constants';
import { AdBlockAsk } from './AdBlockAsk.importable';
import { Island } from './Island';

type InlinePosition =
	| 'fronts-banner'
	| 'inline'
	| 'liveblog-inline'
	| 'liveblog-inline-mobile'
	| 'mobile-front';

type DefaultProps = {
	display?: ArticleDisplay;
	isPaidContent?: boolean;
	hasPageskin?: boolean;
};

// TODO move to commercial
type SlotNamesWithPageSkin = SlotName | 'pageskin';

// for dark ad labels
type ColourScheme = 'light' | 'dark';

type InlineProps = {
	position: InlinePosition;
	colourScheme?: ColourScheme;
	index: number;
	shouldHideReaderRevenue?: never;
};

type RightProps = {
	position: 'right';
	colourScheme?: ColourScheme;
	index?: never;
	shouldHideReaderRevenue: boolean;
};

type RemainingProps = {
	position: Exclude<SlotNamesWithPageSkin, InlinePosition | 'right'>;
	colourScheme?: ColourScheme;
	index?: never;
	shouldHideReaderRevenue?: never;
};

/**
 * This allows us to conditionally require properties based on position:
 *
 * - If `position` is an inline type then we expect the `index` prop.
 * - If `position` is `right` then we expect the `shouldHideReaderRevenue` prop
 * - If not, then we explicitly refuse these properties
 */
type Props = DefaultProps & (RightProps | InlineProps | RemainingProps);

const labelHeight = constants.AD_LABEL_HEIGHT;

const individualLabelCSS = css`
	${textSans12};
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

	.ad-slot[data-label-show='true']:not(.ad-slot--interscroller)::before {
		content: attr(ad-label-text);
		display: block;
		position: relative;
		${individualLabelCSS}
	}

	.ad-slot__adtest-cookie-clear-link {
		${textSans12};
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

const darkLabelStyles = css`
	.ad-slot[data-label-show='true']:not(.ad-slot--interscroller)::before {
		background-color: transparent;
		border-top-color: ${palette.neutral[20]};
		color: ${palette.neutral[86]};
	}
`;

const adContainerCollapseStyles = css`
	& .ad-slot.ad-slot--collapse {
		display: none;
	}
`;

const adContainerCentreSlotStyles = css`
	&.ad-slot-container--centre-slot {
		width: fit-content;
		margin: 0 auto;
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

const merchandisingAdContainerStyles = css`
	display: flex;
	justify-content: center;
`;

const merchandisingAdStyles = css`
	position: relative;
	min-height: ${adSizes.billboard.height + labelHeight}px;
	margin: 12px auto;
	max-width: ${breakpoints['wide']}px;
	overflow: hidden;

	${from.desktop} {
		margin: 0;
		padding-bottom: 20px;
		min-height: ${adSizes.billboard.height + labelHeight + 20}px;
	}
	&:not(.ad-slot--fluid).ad-slot--rendered {
		${between.phablet.and.desktop} {
			display: none;
		}
	}
`;

const inlineAdStyles = css`
	position: relative;

	${until.tablet} {
		display: none;
	}
`;

const liveblogInlineAdStyles = css`
	position: relative;
	min-height: ${adSizes.mpu.height + labelHeight}px;
	background-color: ${palette.neutral[93]};

	${until.tablet} {
		display: none;
	}
`;

const liveblogInlineMobileAdStyles = css`
	position: relative;
	min-height: ${adSizes.outstreamMobile.height + labelHeight}px;
	background-color: ${palette.neutral[93]};

	${from.tablet} {
		display: none;
	}
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
const frontsBannerMinHeightTablet =
	adSizes.leaderboard.height + labelHeight + frontsBannerPaddingHeight;
const frontsBannerMinHeight =
	adSizes.billboard.height + labelHeight + frontsBannerPaddingHeight;

const frontsBannerAdTopContainerStyles = css`
	display: none;
	${from.tablet} {
		display: flex;
		justify-content: center;
		min-height: ${frontsBannerMinHeightTablet}px;
		background-color: ${palette.neutral[97]};
	}
	${from.desktop} {
		min-height: ${frontsBannerMinHeight}px;
	}
`;

const frontsBannerAdContainerStyles = css`
	display: flex;
	justify-content: center;

	/* Native templates require a width (or min-width) to be explicitly set */
	width: ${breakpoints['wide']}px;
	/* This is similar to fluid ads, except this class is applied using messenger */
	&.ad-slot--full-width {
		width: 100%;
		.ad-slot {
			max-width: 100%;
		}
	}
`;

const frontsBannerCollapseStyles = css`
	display: none;
`;

const frontsBannerAdStyles = css`
	position: relative;
	min-height: ${frontsBannerMinHeightTablet}px;
	max-width: ${adSizes.leaderboard.width}px;
	max-height: ${adSizes.leaderboard.height + labelHeight}px;
	overflow: hidden;
	padding-bottom: ${frontsBannerPaddingHeight}px;
	${from.desktop} {
		/* No banner should be taller than 600px */
		max-height: ${600 + labelHeight}px;
		max-width: ${breakpoints['wide']}px;
	}
`;

const articleEndAdStyles = css`
	position: relative;
	min-height: ${adSizes.outstreamDesktop.height + labelHeight}px;

	&.ad-slot--fluid {
		min-height: 450px;
	}
`;

const mostPopAdStyles = css`
	position: relative;
	min-height: ${adSizes.mpu.height + labelHeight}px;
	min-width: ${adSizes.mpu.width}px;
	max-width: ${adSizes.mpu.width}px;
	text-align: center;
	${from.tablet} {
		max-width: 700px;
	}
	${from.desktop} {
		width: auto;
		max-width: ${adSizes.mpu.width}px;
	}
`;

const mostPopContainerStyles = css`
	min-height: ${adSizes.mpu.height + labelHeight}px;
	min-width: ${adSizes.mpu.width}px;
	width: fit-content;
	max-width: ${adSizes.mpu.width}px;
	margin: 0 auto;
	${from.tablet} {
		max-width: 700px;
	}
	${from.desktop} {
		max-width: ${adSizes.mpu.width}px;
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

export const adContainerStyles = [
	adContainerCollapseStyles,
	labelStyles,
	adContainerCentreSlotStyles,
];

export const AdSlot = ({
	position,
	display,
	isPaidContent = false,
	index,
	hasPageskin = false,
	shouldHideReaderRevenue = false,
	colourScheme = 'light',
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
							css={adContainerStyles}
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
					const slotId = 'dfp-ad--right';
					return (
						<>
							<Island
								priority="feature"
								defer={{ until: 'visible' }}
							>
								<AdBlockAsk
									size="mpu"
									slotId={slotId}
									isPaidContent={isPaidContent}
									shouldHideReaderRevenue={
										shouldHideReaderRevenue
									}
								/>
							</Island>
							<div
								id="top-right-ad-slot"
								className="ad-slot-container"
								css={[
									css`
										position: static;
										height: 100%;
										max-height: 100%;
									`,
									labelStyles,
									colourScheme === 'dark' && darkLabelStyles,
								]}
							>
								<div
									id={slotId}
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
											/* Possibly account for the sticky Labs header and 6px of padding */
											top: ${isPaidContent
												? LABS_HEADER_HEIGHT + 6
												: 0}px;
										`,
										labelStyles,
									]}
									data-link-name="ad slot right"
									data-name="right"
									aria-hidden="true"
								/>
							</div>
						</>
					);
				}
				default:
					return null;
			}
		case 'comments': {
			return (
				<div className="ad-slot-container" css={adContainerStyles}>
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
					css={[fluidAdStyles, fluidFullWidthAdStyles]}
					data-link-name="ad slot top-above-nav"
					data-name="top-above-nav"
					aria-hidden="true"
				></div>
			);
		}
		case 'mostpop': {
			return (
				<Hide until="tablet">
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
				</Hide>
			);
		}
		case 'merchandising-high': {
			return (
				<div
					className="ad-slot-container"
					css={[merchandisingAdContainerStyles, adContainerStyles]}
				>
					<div
						id="dfp-ad--merchandising-high"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--merchandising-high',
						].join(' ')}
						css={[
							fluidAdStyles,
							fluidFullWidthAdStyles,
							merchandisingAdStyles,
							adSlotCollapseStyles,
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
							fluidAdStyles,
							fluidFullWidthAdStyles,
							merchandisingAdStyles,
							adSlotCollapseStyles,
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
				<div
					className="top-fronts-banner-ad-container"
					css={frontsBannerAdTopContainerStyles}
				>
					<div
						className="ad-slot-container"
						css={[
							frontsBannerAdContainerStyles,
							hasPageskin && frontsBannerCollapseStyles,
							adContainerStyles,
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
				<div className="ad-slot-container" css={adContainerStyles}>
					<div
						id={`dfp-ad--${advertId}`}
						className={[
							'js-ad-slot',
							'ad-slot',
							`ad-slot--${advertId}`,
							'ad-slot--container-inline',
							'ad-slot--rendered',
						].join(' ')}
						css={inlineAdStyles}
						data-link-name={`ad slot ${advertId}`}
						data-name={advertId}
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'liveblog-inline': {
			const advertId = `inline${index + 1}`;
			return (
				<div
					className="ad-slot-container ad-slot-desktop"
					css={adContainerStyles}
				>
					<div
						id={`dfp-ad--${advertId}`}
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--liveblog-inline',
							`ad-slot--${advertId}`,
							'ad-slot--rendered',
						].join(' ')}
						css={liveblogInlineAdStyles}
						data-link-name={`ad slot ${advertId}`}
						data-name={advertId}
						data-testid={`liveblog-inline--${advertId}`}
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'liveblog-inline-mobile': {
			const advertId = index === 0 ? 'top-above-nav' : `inline${index}`;
			return (
				<div
					className="ad-slot-container ad-slot-mobile"
					css={adContainerStyles}
				>
					<div
						id={`dfp-ad--${advertId}--mobile`}
						className={[
							'js-ad-slot',
							'ad-slot',
							`ad-slot--${advertId}`,
							`ad-slot--liveblog-inline--mobile`,
							'ad-slot--rendered',
						].join(' ')}
						css={liveblogInlineMobileAdStyles}
						data-link-name={`ad slot ${advertId}`}
						data-name={advertId}
						data-testid={`liveblog-inline-mobile--${advertId}`}
						aria-hidden="true"
					/>
				</div>
			);
		}
		case 'mobile-front': {
			const advertId = index === 0 ? 'top-above-nav' : `inline${index}`;
			return (
				<div className="ad-slot-container" css={adContainerStyles}>
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
				<div className="ad-slot-container" css={adContainerStyles}>
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
				<div className="ad-slot-container" css={adContainerStyles}>
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
