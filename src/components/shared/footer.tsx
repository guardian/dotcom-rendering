import { css } from '@emotion/core';
import { Footer } from '@guardian/src-footer';
import { brandBorder, brandText, space } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import type { bool } from 'aws-sdk/clients/signer';
import type { FC } from 'react';
import React from 'react';

// Footer content styles
const container = css`
	border-style: solid;
	border-color: ${brandBorder.primary};
	border-width: 0 1px;
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
	${textSans.medium({ lineHeight: 'regular' })};
	color: ${brandText.anchorPrimary};
	text-decoration: none;
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

const FooterCcpa: FC<FooterCcpaProps> = ({ isCcpa }) => (
	<Footer>{footerContents(isCcpa)}</Footer>
);

export default FooterCcpa;
