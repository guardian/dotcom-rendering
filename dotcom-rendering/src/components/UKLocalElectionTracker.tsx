import { css } from '@emotion/react';
import { from, textSans14, textSansBold14 } from '@guardian/source/foundations';
import { palette as themePalette } from '../palette';

const headingWrapperStyles = css`
	padding: 4px 0 8px 0;
`;

const h3Styles = css`
	${textSansBold14};
	padding-right: 8px;
`;

const commonHeadingStyles = css`
	display: inline;
	color: ${themePalette('--local-election-tracker-font-colour')};
`;

const localElEctionTrackerStyles = css`
	display: flex;
	flex-direction: row;
	border-top: 1px solid
		${themePalette('--local-election-tracker-border-colour')};
	flex-wrap: wrap;

	background-image: radial-gradient(
		circle at 6px 3px,
		${themePalette('--local-election-tracker-border-colour')} 1px,
		transparent 0
	);
	background-size: 10px 10px;
	background-position: 5px 12px;
`;

const ulStyles = css`
	display: flex;
	flex-direction: row;
	height: 170px;
	margin: 0;
	flex: 0 0 100%;
	padding: 4px 0;

	${from.desktop} {
		flex-basis: 711px;
	}
`;

export const UKLocalElectionTracker = () => (
	<>
		<div css={headingWrapperStyles}>
			<h3 css={[h3Styles, commonHeadingStyles]}>Latest results</h3>
			<p css={[textSans14, commonHeadingStyles]}>
				Net change in seats held
			</p>
		</div>
		<div css={localElEctionTrackerStyles}>
			<ul css={ulStyles}></ul>
		</div>
	</>
);
