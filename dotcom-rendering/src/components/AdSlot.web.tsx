import { css, type Interpolation } from '@emotion/react';
import type { SlotName } from '@guardian/commercial';
import { adSizes, constants } from '@guardian/commercial';
import {
	between,
	breakpoints,
	from,
	palette,
	space,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { labelBoxStyles, labelHeight, labelStyles } from '../lib/adStyles';
import { ArticleDisplay } from '../lib/articleFormat';
import { getZIndex } from '../lib/getZIndex';
import { LABS_HEADER_HEIGHT } from '../lib/labs-constants';
import { palette as schemedPalette } from '../palette';
import type { FEArticleType } from '../types/frontend';
import { AdBlockAsk } from './AdBlockAsk.importable';
import { Island } from './Island';

// There are multiple of these ad slots on the page
type IndexedSlot =
	| 'fronts-banner'
	| 'liveblog-inline'
	| 'liveblog-inline-mobile'
	| 'mobile-front';

// TODO move to commercial
type SlotNamesWithPageSkin = SlotName | 'pageskin';

type ServerRenderedSlot = Exclude<
	SlotNamesWithPageSkin,
	| 'carrot'
	| 'comments-expanded'
	| 'crossword-banner'
	| 'exclusion'
	| 'external'
	| 'inline'
	| 'mobile-sticky'
	| 'football-right'
	| 'sponsor-logo'
	| 'interactive'
>;

type DefaultProps = {
	display?: ArticleDisplay;
	isPaidContent?: boolean;
	hasPageskin?: boolean;
};

// for dark ad labels
type ColourScheme = 'light' | 'dark';

type IndexedSlotProps = {
	position: IndexedSlot;
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

type RightFootballProps = {
	position: 'football-right';
	colourScheme?: ColourScheme;
	index?: never;
	shouldHideReaderRevenue?: never;
};

type RemainingProps = {
	position: Exclude<ServerRenderedSlot, IndexedSlot>;
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
type Props = DefaultProps &
	(RightProps | IndexedSlotProps | RemainingProps | RightFootballProps);

const halfPageAdHeight = adSizes.halfPage.height;

const outOfPageStyles = css`
	height: 0;
`;

const topAboveNavContainerStyles = css`
	padding-bottom: 18px;
	position: relative;
	margin: 0 auto;
	text-align: left;
	display: block;
`;

/**
 * Both Showcase and NumberedList displays have a showcase main media. Underneath this
 * in the right column, the `right` ad slot and the MostViewed component are loaded on
 * the client, with the `right` ad slot on top. As MostViewed can (and often does)
 * render first, we need to reserve space for the ad to avoid CLS.
 */
const showcaseRightColumnContainerStyles = css`
	min-height: ${halfPageAdHeight + labelHeight}px;
`;

const showcaseRightColumnStyles = css`
	position: sticky;
	top: 0;
`;

const merchandisingAdContainerStyles = css`
	display: flex;
	justify-content: center;

	&.ad-slot-container--centre-slot {
		width: fit-content;
		margin: 0 auto;
	}
`;

const merchandisingAdStyles = css`
	position: relative;
	min-height: ${adSizes.billboard.height + labelHeight + space[3]}px;
	margin: ${space[3]}px auto;
	max-width: ${breakpoints['wide']}px;
	overflow: hidden;
	padding-bottom: ${space[3]}px;

	${from.desktop} {
		margin: 0;
		padding-bottom: ${space[4]}px;
		min-height: ${adSizes.billboard.height + labelHeight + space[4]}px;
	}

	&:not(.ad-slot--fluid).ad-slot--rendered {
		${between.phablet.and.desktop} {
			display: none;
		}
	}
`;

const rightAdStyles = css`
	background-color: ${schemedPalette('--ad-background-article-inner')};
	max-width: 300px;
`;

/*** The right slot label should be dark on audio and video articles even
 * in light mode. Other slots will stay the same as the right ad slot is
 * the only one to overlay the dark section of Audio/Video pages.
 */
const rightAdLabelStyles = css`
	.ad-slot--right[data-label-show='true']::before {
		background-color: ${schemedPalette('--ad-background-article-inner')};
		border-top-color: ${schemedPalette('--ad-border-article-inner')};
		color: ${schemedPalette('--ad-labels-text-article-inner')};
	}
`;

const liveblogInlineContainerStyles = css`
	margin: 12px auto;
`;

const liveblogInlineAdStyles = css`
	position: relative;
	min-height: ${adSizes.mpu.height + labelHeight}px;
	background-color: ${schemedPalette('--ad-background-article-inner')};

	${until.tablet} {
		display: none;
	}
`;

const liveblogInlineMobileAdStyles = css`
	position: relative;
	min-height: ${adSizes.outstreamMobile.height + labelHeight}px;

	${from.tablet} {
		display: none;
	}
`;

const mobileFrontAdStyles = css`
	position: relative;
	min-height: ${adSizes.mpu.height + labelHeight + space[3]}px;
	min-width: 300px;
	width: 300px;
	margin: ${space[3]}px auto;
	padding-bottom: ${space[3]}px;

	${from.tablet} {
		display: none;
	}
`;

const frontsBannerPaddingHeight = space[6];
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
		background-color: ${schemedPalette('--ad-background')};
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

const liveBlogTopAdStyles = css`
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

const liveBlogTopContainerStyles = css`
	padding: 12px 0;
	text-align: center;
	display: flex;
	justify-content: center;
`;

const mobileStickyAdStyles = css`
	position: fixed;
	bottom: 0;
	width: 320px;
	margin: 0 auto;
	right: 0;
	left: 0;
	z-index: ${getZIndex('mobileSticky')};
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
		${labelBoxStyles}
	}
`;

const mobileStickyAdStylesFullWidth = css`
	width: 100%;
	text-align: center;
	background-color: ${palette.neutral[97]};

	.ad-slot[data-label-show='true']::before {
		padding-left: calc((100% - ${adSizes.mobilesticky.width}px) / 2);
		padding-right: calc((100% - ${adSizes.mobilesticky.width}px) / 2);
	}
`;

const crosswordBannerMobileAdStyles = css`
	min-height: ${adSizes.mobilesticky.height + constants.AD_LABEL_HEIGHT}px;
`;

const AdSlotWrapper = ({
	children,
	css: additionalCss,
	className,
}: {
	children: React.ReactNode;
	css?: Interpolation;
	className?: string;
}) => {
	return (
		<aside className={`ad-slot-container ${className}`} css={additionalCss}>
			{children}
		</aside>
	);
};

export const AdSlot = ({
	position,
	display,
	isPaidContent = false,
	index,
	hasPageskin = false,
	shouldHideReaderRevenue = false,
}: Props) => {
	switch (position) {
		case 'right':
			switch (display) {
				case ArticleDisplay.Immersive: {
					return (
						<AdSlotWrapper>
							<div
								id="dfp-ad--right"
								css={rightAdStyles}
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
								data-testid="slot"
								aria-hidden="true"
							/>
						</AdSlotWrapper>
					);
				}
				case ArticleDisplay.Showcase:
				case ArticleDisplay.NumberedList: {
					return (
						<AdSlotWrapper css={showcaseRightColumnContainerStyles}>
							<div
								id="dfp-ad--right"
								css={[rightAdStyles, showcaseRightColumnStyles]}
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
								data-testid="slot"
								aria-hidden="true"
							/>
						</AdSlotWrapper>
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
							<AdSlotWrapper
								css={[
									css`
										position: static;
										height: 100%;
										max-height: 100%;
									`,
									labelStyles,
									rightAdLabelStyles,
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
										rightAdStyles,
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
									data-testid="slot"
									aria-hidden="true"
								/>
							</AdSlotWrapper>
						</>
					);
				}
				default:
					return null;
			}
		case 'football-right': {
			const slotId = 'dfp-ad--right';
			return (
				<AdSlotWrapper
					css={[
						css`
							height: 100%;
							max-height: 100%;
							padding-top: ${space[2]}px;
							${until.desktop} {
								display: none;
							}
						`,
						labelStyles,
						rightAdLabelStyles,
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
							rightAdStyles,
							css`
								position: sticky;
								top: 0;
							`,
							labelStyles,
						]}
						data-link-name="ad slot right"
						data-name="right"
						data-testid="slot"
						aria-hidden="true"
						// Football fixtures pages cannot always support longer right column ads, so limit allowed size
						data-desktop="300,250"
					/>
				</AdSlotWrapper>
			);
		}
		case 'comments': {
			return (
				<AdSlotWrapper>
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
						data-testid="slot"
						aria-hidden="true"
					/>
				</AdSlotWrapper>
			);
		}
		case 'top-above-nav': {
			return (
				<AdSlotWrapper css={topAboveNavContainerStyles}>
					<div
						id="dfp-ad--top-above-nav"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--top-above-nav',
							'ad-slot--mpu-banner-ad',
							'ad-slot--rendered',
						].join(' ')}
						data-link-name="ad slot top-above-nav"
						data-name="top-above-nav"
						data-testid="slot"
						aria-hidden="true"
					></div>
				</AdSlotWrapper>
			);
		}
		case 'mostpop': {
			return (
				<Hide until="tablet">
					<AdSlotWrapper css={mostPopContainerStyles}>
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
							data-testid="slot"
							aria-hidden="true"
						/>
					</AdSlotWrapper>
				</Hide>
			);
		}
		case 'merchandising-high': {
			return (
				<AdSlotWrapper css={merchandisingAdContainerStyles}>
					<div
						id="dfp-ad--merchandising-high"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--merchandising-high',
						].join(' ')}
						css={merchandisingAdStyles}
						data-link-name="ad slot merchandising-high"
						data-name="merchandising-high"
						data-refresh="false"
						data-testid="slot"
						aria-hidden="true"
					/>
				</AdSlotWrapper>
			);
		}
		case 'merchandising': {
			return (
				<AdSlotWrapper css={merchandisingAdContainerStyles}>
					<div
						id="dfp-ad--merchandising"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--merchandising',
						].join(' ')}
						css={merchandisingAdStyles}
						data-link-name="ad slot merchandising"
						data-name="merchandising"
						data-testid="slot"
						aria-hidden="true"
					/>
				</AdSlotWrapper>
			);
		}
		case 'fronts-banner': {
			const advertId = `fronts-banner-${index}`;
			return (
				<div
					className="top-fronts-banner-ad-container"
					css={frontsBannerAdTopContainerStyles}
				>
					<AdSlotWrapper
						css={[
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
							css={frontsBannerAdStyles}
							data-link-name={`ad slot ${advertId}`}
							data-name={`${advertId}`}
							data-testid="slot"
							aria-hidden="true"
						/>
					</AdSlotWrapper>
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
					css={[outOfPageStyles]}
					data-link-name="ad slot survey"
					data-name="survey"
					data-label="false"
					data-refresh="false"
					data-out-of-page="true"
					data-testid="slot"
					aria-hidden="true"
				/>
			);
		}
		case 'liveblog-inline': {
			const advertId = `inline${index + 1}`;
			return (
				<AdSlotWrapper
					className="ad-slot-desktop"
					css={liveblogInlineContainerStyles}
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
				</AdSlotWrapper>
			);
		}
		case 'liveblog-inline-mobile': {
			const advertId = index === 0 ? 'top-above-nav' : `inline${index}`;
			return (
				<AdSlotWrapper css={liveblogInlineContainerStyles}>
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
				</AdSlotWrapper>
			);
		}
		case 'liveblog-top': {
			return (
				<AdSlotWrapper css={liveBlogTopContainerStyles}>
					<div
						id="dfp-ad--liveblog-top"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--liveblog-top',
							'ad-slot--rendered',
						].join(' ')}
						css={liveBlogTopAdStyles}
						data-link-name="ad slot liveblog-top"
						data-name="liveblog-top"
						data-testid="slot"
						aria-hidden="true"
					/>
				</AdSlotWrapper>
			);
		}
		case 'mobile-front': {
			const advertId = index === 0 ? 'top-above-nav' : `inline${index}`;
			return (
				<AdSlotWrapper>
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
						css={mobileFrontAdStyles}
						data-link-name={`ad slot ${advertId}`}
						data-name={advertId}
						data-testid="slot"
						aria-hidden="true"
					/>
				</AdSlotWrapper>
			);
		}
		case 'pageskin': {
			return (
				<AdSlotWrapper>
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
						data-testid="slot"
						aria-hidden="true"
					/>
				</AdSlotWrapper>
			);
		}
		case 'article-end': {
			return (
				<AdSlotWrapper>
					<div
						id="dfp-ad--article-end"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--article-end',
							'ad-slot--rendered',
						].join(' ')}
						css={articleEndAdStyles}
						data-link-name="ad slot article-end"
						data-name="article-end"
						data-testid="slot"
						aria-hidden="true"
					/>
				</AdSlotWrapper>
			);
		}
		case 'crossword-banner-mobile': {
			return (
				<AdSlotWrapper>
					<div
						id="dfp-ad--crossword-banner-mobile"
						className={[
							'js-ad-slot',
							'ad-slot',
							'ad-slot--crossword-banner-mobile',
							'ad-slot--rendered',
						].join(' ')}
						css={crosswordBannerMobileAdStyles}
						data-link-name="ad slot crossword-banner-mobile"
						data-name="crossword-banner-mobile"
						data-testid="slot"
						aria-hidden="true"
					/>
				</AdSlotWrapper>
			);
		}
	}
};

type MobileStickyContainerProps = Pick<FEArticleType, 'contentType' | 'pageId'>;

export const MobileStickyContainer = ({
	contentType,
	pageId,
}: MobileStickyContainerProps) => {
	return (
		<div
			className="mobilesticky-container"
			css={[
				mobileStickyAdStyles,
				(contentType === 'Article' ||
					contentType === 'Interactive' ||
					pageId.startsWith('football/')) &&
					mobileStickyAdStylesFullWidth,
			]}
		/>
	);
};
