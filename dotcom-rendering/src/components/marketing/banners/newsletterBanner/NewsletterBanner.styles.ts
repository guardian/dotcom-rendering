import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	between,
	from,
	neutral,
	palette,
	space,
	until,
} from '@guardian/source/foundations';
import { contentTransitionEasing } from '../../shared/transitions';

const phabletContentMaxWidth = '492px';
export const transitionDurationMs = 350;
const successTransition = `${transitionDurationMs}ms ${contentTransitionEasing}`;

export const styles = {
	layout: css`
		display: grid;
		position: relative;
		margin: 0 auto;
		max-width: 660px;
		grid-template-columns: minmax(0, 1fr);
		grid-template-areas: 'copy-container';

		${from.phablet} {
			max-width: 740px;
		}
		${between.phablet.and.desktop} {
			position: static;
		}
		${from.desktop} {
			padding: 0 ${space[3]}px;
			max-width: 980px;
			grid-template-columns: minmax(0, 1fr) 380px auto;
			grid-template-areas: 'copy-container main-image close-button';
			gap: 20px;
		}
		${from.leftCol} {
			max-width: 1140px;
			grid-template-columns: 140px 1px minmax(0, 460px) 380px auto;
			gap: 10px;
			grid-template-areas: 'logo vert-line copy-container main-image close-button';
		}
		${from.wide} {
			max-width: 1300px;
			grid-template-columns: 219px 1px minmax(0, 491px) 400px auto;
		}
	`,
	dismissal: (isDismissing: boolean): SerializedStyles => css`
		transform: translateY(${isDismissing ? '100%' : '0'});
		transition: transform ${successTransition};
		pointer-events: ${isDismissing ? 'none' : 'auto'};

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
	`,
	panel: (isVisible: boolean): SerializedStyles => css`
		display: grid;
		grid-template-rows: ${isVisible ? '1fr' : '0fr'};
		opacity: ${isVisible ? 1 : 0};
		transition:
			grid-template-rows ${successTransition},
			opacity ${successTransition};

		> div {
			min-height: 0;
			overflow: hidden;
		}

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
	`,
	successContent: css`
		position: relative;
		max-width: 1300px;
		margin: 0 auto;
		padding: ${space[6]}px 64px ${space[6]}px 0;

		${from.leftCol} {
			padding-top: 36px;
			padding-left: 10px;
		}
	`,
	container: (background: string, textColor: string): SerializedStyles => css`
		background: ${background};
		color: ${textColor};
		position: relative;
		max-height: 65vh;
		max-height: 65svh;
		overflow-y: auto;

		* {
			box-sizing: border-box;
		}

		${from.phablet} {
			border-top: 1px solid ${neutral[0]};
		}
	`,
	panels: css`
		grid-column: copy-container-start / -1;
		grid-row: 1;
		min-width: 0;

		${from.desktop} {
			grid-column: copy-container-start / close-button-start;
		}
	`,
	signupLayout: css`
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-areas: 'copy-container';

		${from.desktop} {
			grid-template-columns: minmax(0, 1fr) 380px;
			grid-template-areas: 'copy-container main-image';
			gap: 20px;
		}

		${from.leftCol} {
			gap: 10px;
		}

		${from.wide} {
			grid-template-columns: minmax(0, 1fr) 400px;
		}
	`,
	contentContainer: css`
		grid-area: copy-container;
		width: 100%;
		max-width: 100%;
		align-self: start;

		${between.phablet.and.desktop} {
			max-width: ${phabletContentMaxWidth};
			justify-self: center;
		}

		${from.leftCol} {
			padding-left: 10px;
		}
	`,
	content: css`
		display: flex;
		flex-direction: column;
		margin: 28px 0;
		${until.desktop} {
			margin: ${space[3]}px 0;
		}
		${until.tablet} {
			margin-top: 0;
		}
	`,
	frequencyRow: css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: ${space[2]}px;

		${until.mobile} {
			min-height: 40px;
		}
	`,
	closeButton: css`
		grid-area: close-button;
		grid-row: 1;
		align-self: start;
		z-index: 1;

		${until.desktop} {
			position: absolute;
			top: ${space[2]}px;
			right: ${space[3]}px;
		}
		${until.mobile} {
			> div {
				margin: 0;
				padding: 0;
				position: static;
			}
		}
	`,
	textImageRow: css`
		display: grid;
		grid-template-columns: minmax(0, 1fr) 90px;
		column-gap: ${space[3]}px;
		align-items: start;
		margin-top: ${space[2]}px;

		${from.desktop} {
			display: block;
		}
		${until.tablet} {
			margin: ${space[2]}px 10px 0;
		}
	`,
	textCopy: css`
		min-width: 0;
	`,
	mobileImage: css`
		width: 90px;
		height: 90px;
		justify-self: end;
		align-self: start;
		overflow: hidden;
		border-radius: 50%;

		> div {
			grid-area: auto;
			width: 90px;
			max-width: 90px;
			height: 90px;
			margin: 0;
			padding: 0;
		}

		> div > picture {
			display: block;
			width: 90px;
			height: 90px;
		}

		> div > picture img {
			width: 90px;
			height: 90px;
			max-height: 90px;
			padding: 0;
			object-fit: cover;
		}

		${from.desktop} {
			display: none;
		}
	`,
	desktopImage: css`
		grid-area: main-image;

		${until.desktop} {
			display: none;
		}

		> div {
			grid-area: auto;
		}
	`,
	verticalLine: css`
		grid-area: vert-line;
		background-color: ${neutral[0]};
		opacity: 0.2;
		pointer-events: none;

		${until.leftCol} {
			display: none;
		}

		${from.leftCol} {
			margin-top: 36px;
			margin-bottom: 0;
		}
	`,
	horizontalLine: css`
		width: 100%;
		height: 1px;
		background-color: ${neutral[0]};
		opacity: 0.2;
		pointer-events: none;

		${until.mobile} {
			background-color: transparent;

			&::before {
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				height: 1px;
				background-color: ${neutral[0]};
			}
		}
	`,
	headingAfterDivider: css`
		> div {
			padding-top: 0;
		}

		&& h2 {
			margin: 0;
		}
	`,
	subheading: css`
		color: ${palette.neutral[20]};

		> div {
			margin-bottom: ${space[2]}px;
			${until.desktop} {
				margin-bottom: ${space[4]}px;
			}
		}

		p {
			margin-bottom: 0;
		}
	`,
};
