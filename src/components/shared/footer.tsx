import { css } from '@emotion/core';
import {
	brandBorder,
	neutral,
	remSpace,
	space,
} from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import type { bool } from 'aws-sdk/clients/signer';
import type { FC } from 'react';
import React from 'react';

// Footer content styles
const container = css`
	border-width: 0 1px;
	${textSans.small({ lineHeight: 'regular' })};
	margin-left: ${remSpace[2]};
	margin-right: ${remSpace[2]};
	padding-top: 16px;
	padding-bottom: 24px;
`;

const ul = css`
	list-style: none;
	padding: 0;
	border-top: 1px solid ${brandBorder.primary};
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-areas:
		'link1 link3'
		'link2 link4';
`;

const li = css`
	padding: ${space[1]}px 0 ${space[4]}px 0;
	border-style: solid;
	border-color: ${brandBorder.primary};
	border-width: 0;
`;
const anchor = css`
	${textSans.small({ lineHeight: 'regular' })};
	color: ${neutral[7]};
	text-decoration: underline;
`;

const link1 = css`
	grid-area: link1;
	border-right-width: 1px;
`;
const link2 = css`
	grid-area: link2;
	border-right-width: 1px;
`;

const CcpaListItem = (ccpaStatus: bool): JSX.Element | null => {
	if (ccpaStatus) {
		return (
			<li css={[li, link2]}>
				<a
					css={anchor}
					href="https://www.theguardian.com/help/privacy-policy"
				>
					California Residents - Do not sell
				</a>
			</li>
		);
	} else {
		return null;
	}
};

export const footerContents = (ccpabool: boolean): JSX.Element => {
	return (
		<div css={container}>
			<ul css={ul}>
				<li css={[li, link1]}>
					<a
						css={anchor}
						href="https://www.theguardian.com/help/privacy-policy"
					>
						Privacy policy
					</a>
				</li>
				{CcpaListItem(ccpabool)}
			</ul>
		</div>
	);
};

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
