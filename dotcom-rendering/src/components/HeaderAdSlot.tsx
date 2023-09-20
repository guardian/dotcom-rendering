import { css, Global } from '@emotion/react';
import { constants } from '@guardian/commercial';
import { border, neutral, space } from '@guardian/source-foundations';
import { adContainerStyles, AdSlot } from './AdSlot.web';
import { Hide } from './Hide';

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
	background-color: ${neutral[97]};
	min-height: ${headerMinHeight}px;
	border-bottom: ${borderBottomHeight}px solid ${border.secondary};
	padding-bottom: ${padding}px;

	display: flex;
	flex-direction: column;
	justify-content: center;

	position: sticky;
	top: 0;
`;

const topAboveNavContainer = css`
	&[top-above-nav-ad-rendered] {
		width: fit-content;
		margin: auto;
	}
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
				<div
					css={[adContainerStyles, topAboveNavContainer]}
					className="ad-slot-container"
				>
					<AdSlot position="top-above-nav" />
				</div>
			</div>
		</Hide>
	</div>
);
