import { css, Global } from '@emotion/react';
import { adSizes, constants } from '@guardian/commercial-core';
import { space } from '@guardian/source/foundations';
import { palette } from '../palette';
import type { ServerSideTests } from '../types/config';
import { AdSlot } from './AdSlot.web';
import { Hide } from './Hide';

const headerWrapper = css`
	position: static;
`;

const { TOP_ABOVE_NAV_HEIGHT, AD_LABEL_HEIGHT } = constants;

const padding = space[4] + 2; // 18px - currently being reviewed
const borderBottomHeight = 1;
const headerMinHeight =
	TOP_ABOVE_NAV_HEIGHT + padding + AD_LABEL_HEIGHT + borderBottomHeight;

const headerAdWrapperStylesVariant = css`
	z-index: 1080;
	width: 100%;
	background-color: ${palette('--ad-background')};
	border-bottom: 1px solid ${palette('--ad-border')};

	display: flex;
	flex-direction: column;
	justify-content: center;

	position: sticky;
	top: 0;
`;

const headerAdWrapperStylesControl = css`
	z-index: 1080;
	width: 100%;
	background-color: ${palette('--ad-background')};
	min-height: ${headerMinHeight}px;
	border-bottom: 1px solid ${palette('--ad-border')};

	display: flex;
	flex-direction: column;
	justify-content: center;

	position: sticky;
	top: 0;
`;

/**
 * Ensure the top-above-nav/ad-block-ask containing div is always of a certain minimum height
 */
const headerMinSizeStyles = css`
	min-height: ${adSizes.leaderboard.height}px;
	min-width: ${adSizes.leaderboard.width}px;
`;

export const HeaderAdSlot = ({ abTests }: { abTests: ServerSideTests }) => {
	const isIn250ReservationVariant =
		abTests.topAboveNav250ReservationVariant === 'variant';
	return (
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
				<div
					css={[
						isIn250ReservationVariant
							? headerAdWrapperStylesVariant
							: headerAdWrapperStylesControl,
					]}
					className="top-banner-ad-container"
				>
					<div
						css={!isIn250ReservationVariant && headerMinSizeStyles}
					>
						<AdSlot
							position="top-above-nav"
							isIn250ReservationVariant={
								isIn250ReservationVariant
							}
						/>
					</div>
				</div>
			</Hide>
		</div>
	);
};
