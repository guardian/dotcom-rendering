import React from 'react';
import { css } from 'emotion';
import { space } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

type Props = {
	badge: string;
	badgeAlt?: string;
	palette: Palette;
};

// max-height: ${space[12]}px; - Couldn't find a direct replacement in Source
const badgeImageStyle = css`
	max-height: 60px;
	margin-left: ${space[3]}px;
	vertical-align: middle;
`;

const badgeWrapperStyle = css`
	padding-right: ${space[3]}px;
	padding-bottom: ${space[3]}px;
	text-align: right;
	flex: auto;
`;

const paidForStyle = (palette: Palette) => {
	return css`
		${textSans.xsmall({ fontWeight: 'bold' })}
		color: ${palette.text.cardFooter};
	`;
};

export const LabBadge = ({ badge, badgeAlt, palette }: Props) => (
	<div className={badgeWrapperStyle}>
		<div className={paidForStyle(palette)}>Paid for by</div>
		<img
			className={badgeImageStyle}
			alt={badgeAlt || 'Guardian Labs'}
			src={badge}
		/>
	</div>
);
