import { css } from '@emotion/react';
import {
	palette,
	remSpace,
	textSans14,
	textSansBold14,
} from '@guardian/source/foundations';
import type { PropsWithChildren } from 'react';
import React from 'react';

const informationBoxStyles = css`
	background-color: ${palette.neutral[93]};
	color: ${palette.neutral[7]};
	border-radius: 4px;
	padding: ${remSpace[2]} ${remSpace[3]} ${remSpace[4]} ${remSpace[3]};
`;

const informationBoxTextStyle = css`
	${textSans14};
	margin: 0 0 ${remSpace[2]} 0;
	&:last-of-type {
		margin: 0;
	}

	a,
	button {
		${textSansBold14};
	}
`;
export const InformationBoxText = ({
	children,
}: {
	children: React.ReactNode;
}) => <div css={informationBoxTextStyle}>{children}</div>;

export const InformationBox = ({ children }: PropsWithChildren) => (
	<div css={informationBoxStyles}>{children}</div>
);
