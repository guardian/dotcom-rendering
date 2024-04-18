import { css, Global } from '@emotion/react';
import { adSizes, constants } from '@guardian/commercial';
import { palette as sourcePalette, space } from '@guardian/source-foundations';
import { AdBlockAsk } from './AdBlockAsk.importable';
import { adContainerStyles, AdSlot } from './AdSlot.web';
import { Hide } from './Hide';
import { Island } from './Island';

const headerWrapper = css`
	position: static;
`;

const { TOP_ABOVE_NAV_HEIGHT, AD_LABEL_HEIGHT } = constants;

const padding = space[4] + 2; // 18px - currently being reviewed
const borderBottomHeight = 1;
const headerMinHeight =
	TOP_ABOVE_NAV_HEIGHT + padding + AD_LABEL_HEIGHT + borderBottomHeight;

const headerAdWrapper = css`
	z-index: 1080;
	width: 100%;
	background-color: ${sourcePalette.neutral[97]};
	min-height: ${headerMinHeight}px;
	border-bottom: ${borderBottomHeight}px solid ${sourcePalette.neutral[86]};

	display: flex;
	flex-direction: column;
	justify-content: center;

	position: sticky;
	top: 0;
`;

// Remove this once new `ad-slot-container--centre-slot` class is in place
const topAboveNavContainer = css`
	&[top-above-nav-ad-rendered] {
		width: fit-content;
		margin: auto;
	}
	padding-bottom: ${padding}px;
`;

/**
 * Ensure the top-above-nav/ad-block-ask containing div is always of a certain minimum height
 */
const headerMinSizeStyles = css`
	min-height: ${adSizes.leaderboard.height}px;
	min-width: ${adSizes.leaderboard.width}px;
`;

const topAboveNavStyles = css`
	position: relative;
	margin: 0 auto;
	text-align: left;
	display: block;
`;

export const HeaderAdSlot = () => (
	<div css={headerWrapper}>
		<Global
			styles={css`
				/**
				* Hides the top-above-nav ad-slot container when a
				* Bonzai TrueSkin (Australian 3rd Party page skin) is shown
				*/
				.bz-custom-container
					~ #bannerandheader
					.top-banner-ad-container {
					display: none;
				}
			`}
		/>
		<Hide when="below" breakpoint="tablet">
			<div css={[headerAdWrapper]} className="top-banner-ad-container">
				<div css={headerMinSizeStyles}>
					<Island priority="feature" defer={{ until: 'visible' }}>
						<AdBlockAsk
							size="leaderboard"
							slotId="dfp-ad--top-above-nav"
						/>
					</Island>
					<div
						css={[
							adContainerStyles,
							topAboveNavContainer,
							topAboveNavStyles,
						]}
						className="ad-slot-container"
					>
						<AdSlot position="top-above-nav" />
					</div>
				</div>
			</div>
		</Hide>
	</div>
);
