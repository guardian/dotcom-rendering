import { css } from '@emotion/core';
import { neutral, remSpace } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import type { FC } from 'react';
import React from 'react';

// Footer content styles
const container = css`
	border-width: 0 1px;
	${textSans.small({ lineHeight: 'regular' })};
	margin-left: ${remSpace[2]};
	margin-right: ${remSpace[2]};
	padding-top: ${remSpace[4]};
	padding-bottom: ${remSpace[6]};
`;

const anchor = css`
	${textSans.small({ lineHeight: 'regular' })};
	color: ${neutral[7]};
	text-decoration: underline;
`;

interface FooterCcpaProps {
	isCcpa: boolean;
}

const renderContent = (ccpaStatus: boolean): JSX.Element => {
	if (!ccpaStatus) {
		return (
			<a
				css={anchor}
				href="https://www.theguardian.com/help/privacy-policy"
			>
				Privacy Settings
			</a>
		);
	} else {
		return (
			<a
				css={anchor}
				href="https://www.theguardian.com/help/privacy-policy"
			>
				California Residents - Do Not Sell
			</a>
		);
	}
};

const FooterCcpa: FC<FooterCcpaProps> = ({ isCcpa }) => {
	const currentYear = new Date().getFullYear();
	return (
		<div css={container}>
			&#169; {currentYear} Guardian News and Media Limited or its
			affiliated companies. All rights reserved.
			<br />
			{renderContent(isCcpa)}
			&nbsp;&#183;&nbsp;
			<a
				css={anchor}
				href="https://www.theguardian.com/help/privacy-policy"
			>
				Privacy Policy
			</a>
		</div>
	);
};

export default FooterCcpa;
