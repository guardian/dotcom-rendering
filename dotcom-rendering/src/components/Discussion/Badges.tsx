import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { palette as themePalette } from '../../palette';

const staffBadge = css`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const iconStyles = css`
	display: inline-block;
	width: 15px;
	height: 15px;
`;

const labelText = css`
	display: inline-block;
	line-height: 15px;
	margin: 0 0 0 ${space[1]}px;
	${textSans.xxsmall({ fontWeight: 'bold' })};
`;

const staffIcon = css`
	fill: ${sourcePalette.brand[400]};
`;

const staffLabel = css`
	color: ${themePalette('--staff-label-color')};
`;
const guardianPickLabel = css`
	color: ${sourcePalette.neutral[7]};
`;

export const GuardianStaff = () => (
	<div css={staffBadge}>
		<svg
			width="36"
			height="36"
			viewBox="0 0 36 36"
			css={[iconStyles, staffIcon]}
		>
			<path d="M18 0a18 18 0 1 0 0 36 18 18 0 0 0 0-36"></path>
			<path
				fill={sourcePalette.neutral[100]}
				d="M21.2 4.4c2.3.4 5.3 2 6.3 3.1v5.2H27L21.2 5v-.6zm-2.2.4c-4 0-6.3 5.6-6.3 13.2 0 7.7 2.2 13.3 6.3 13.3v.6c-6 .4-14.4-4.2-14-13.8A13.3 13.3 0 0 1 19 4v.7zm10.4 14.4l-1.9.9v8.6c-1 1-3.8 2.6-6.3 3.1V19.9l-2.2-.7v-.6h10.4v.6z"
			></path>
		</svg>
		<p css={[labelText, staffLabel]}>Staff</p>
	</div>
);

export const GuardianContributor = () => (
	<div css={staffBadge}>
		<svg
			width="36"
			height="36"
			viewBox="0 0 36 36"
			css={[iconStyles, staffIcon]}
		>
			<path d="M18 0a18 18 0 1 0 0 36 18 18 0 0 0 0-36"></path>
			<path
				fill={sourcePalette.neutral[100]}
				d="M21.2 4.4c2.3.4 5.3 2 6.3 3.1v5.2H27L21.2 5v-.6zm-2.2.4c-4 0-6.3 5.6-6.3 13.2 0 7.7 2.2 13.3 6.3 13.3v.6c-6 .4-14.4-4.2-14-13.8A13.3 13.3 0 0 1 19 4v.7zm10.4 14.4l-1.9.9v8.6c-1 1-3.8 2.6-6.3 3.1V19.9l-2.2-.7v-.6h10.4v.6z"
			></path>
		</svg>
		<p css={[labelText, staffLabel]}>Contributor</p>
	</div>
);

export const GuardianPick = () => (
	<div css={staffBadge}>
		<svg width="36" height="36" viewBox="0 0 36 36" css={iconStyles}>
			<path d="M18 0a18 18 0 1 0 0 36 18 18 0 0 0 0-36"></path>
			<path
				fill={sourcePalette.neutral[100]}
				d="M21.2 4.4c2.3.4 5.3 2 6.3 3.1v5.2H27L21.2 5v-.6zm-2.2.4c-4 0-6.3 5.6-6.3 13.2 0 7.7 2.2 13.3 6.3 13.3v.6c-6 .4-14.4-4.2-14-13.8A13.3 13.3 0 0 1 19 4v.7zm10.4 14.4l-1.9.9v8.6c-1 1-3.8 2.6-6.3 3.1V19.9l-2.2-.7v-.6h10.4v.6z"
			></path>
		</svg>
		<p css={[labelText, guardianPickLabel]}>Guardian Pick</p>
	</div>
);
