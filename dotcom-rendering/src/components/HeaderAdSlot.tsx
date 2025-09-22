import { css, Global } from '@emotion/react';
import { palette } from '../palette';
import { AdSlot } from './AdSlot.web';
import { Hide } from './Hide';

const headerWrapper = css`
	position: static;
`;

const headerAdWrapperStyles = css`
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

export const HeaderAdSlot = () => {
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
					css={headerAdWrapperStyles}
					className="top-banner-ad-container"
				>
					<AdSlot position="top-above-nav" />
				</div>
			</Hide>
		</div>
	);
};
