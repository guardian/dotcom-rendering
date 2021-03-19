import { css } from '@emotion/react';
import { breakpoints, neutral, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { textSans } from '@guardian/src-foundations/typography';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// Footer content styles
const container = css`
	border-width: 0 1px;
	${textSans.small({ lineHeight: 'regular' })};
	margin-left: ${remSpace[2]};
	margin-right: ${remSpace[2]};
	padding-top: ${remSpace[4]};
	padding-bottom: ${remSpace[6]};
	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
	${darkModeCss`
            color: ${neutral[60]};
    `}
`;

const anchor = css`
	${textSans.small({ lineHeight: 'regular' })};
	color: ${neutral[7]};
	text-decoration: underline;
	${darkModeCss`
            color: ${neutral[60]};
    `}
`;

interface FooterCcpaProps {
	isCcpa: boolean;
}

const renderContent = (ccpaStatus: boolean): JSX.Element | null => {
	if (ccpaStatus) {
		return (
			<>
				<a
					css={anchor}
					href="https://www.theguardian.com/help/privacy-policy"
				>
					California Residents - Do Not Sell
				</a>
				&nbsp;&#183;&nbsp;
			</>
		);
	} else {
		return (
			<>
				<a
					css={anchor}
					href="https://www.theguardian.com/help/privacy-settings"
				>
					Privacy Settings
				</a>
				&nbsp;&#183;&nbsp;
			</>
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
