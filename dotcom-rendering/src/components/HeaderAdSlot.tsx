import { css, Global } from '@emotion/react';
import { TOP_ABOVE_NAV_HEIGHT } from '@guardian/commercial-core/dist/esm/constants';
import type { ArticleDisplay } from '@guardian/libs';
import { border, neutral, space } from '@guardian/source-foundations';
import { AdSlot, labelHeight, labelStyles } from './AdSlot';
import { Hide } from './Hide';

type Props = {
	display: ArticleDisplay;
};

const headerWrapper = css`
	position: static;
`;

const padding = space[4] + 2; // 18px - currently being reviewed

const headerAdWrapper = css`
	z-index: 1080;
	width: 100%;
	background-color: ${neutral[97]};
	min-height: ${TOP_ABOVE_NAV_HEIGHT + padding + labelHeight}px;
	border-bottom: 1px solid ${border.secondary};
	padding-bottom: ${padding}px;

	display: flex;
	flex-direction: column;
	justify-content: center;

	position: sticky;
	top: 0;
`;

const adSlotContainer = css`
	&[top-above-nav-ad-rendered] {
		width: fit-content;
		margin: auto;
	}
`;

export const HeaderAdSlot = ({ display }: Props) => (
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
				css={[headerAdWrapper, labelStyles]}
				className="top-banner-ad-container"
			>
				<div css={adSlotContainer} className="ad-slot-container">
					<AdSlot position="top-above-nav" display={display} />
				</div>
			</div>
		</Hide>
	</div>
);
