import { css } from '@emotion/react';

import {
	brand,
	brandText,
	brandAlt,
	brandBackground,
} from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

import { clearFix } from '@root/src/lib/mixins';
import { Display } from '@guardian/types';
import { Pillars, pillarWidth, firstPillarWidth } from './Pillars';
import { BackToTop } from './BackToTop';

// CSS vars
const emailSignupSideMargins = 10;
const footerItemContainerPadding = 20;
const emailSignupWidth =
	pillarWidth +
	firstPillarWidth -
	(emailSignupSideMargins * 2 + footerItemContainerPadding);
const footerBorders = `1px solid ${brand[600]}`;

// CSS
const footer = css`
	background-color: ${brandBackground.primary};
	color: ${brandText.primary};
	padding-bottom: 6px;
	${textSans.medium()};
`;

const pillarWrap = css`
	${clearFix}
	border-left: ${footerBorders};
	border-right: ${footerBorders};
	padding-bottom: 12px;
	position: relative;
	height: 43px;

	> ul {
		clear: none;

		:after {
			display: none;
		}
	}
`;

const emailSignup = css`
	padding-top: 12px;
	min-height: 150px;
	overflow: hidden;
	border: 0;

	${from.desktop} {
		margin: 0 ${emailSignupSideMargins}px;
		display: flex;
		flex-direction: row;
		float: left;
		width: ${emailSignupWidth}px;
	}

	${from.wide} {
		margin-right: ${pillarWidth * 2 +
		firstPillarWidth -
		(emailSignupWidth +
			emailSignupSideMargins +
			footerItemContainerPadding)}px;
	}
`;

const footerLink = css`
	color: inherit;
	text-decoration: none;
	padding-bottom: 12px;
	display: block;
	line-height: 19px;

	:hover {
		text-decoration: underline;
		color: ${brandAlt[400]};
	}
`;

const footerList = css`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;

	${until.desktop} {
		border-top: ${footerBorders};
	}

	ul {
		width: 50%;
		border-left: ${footerBorders};
		padding: 12px 0 0 10px;

		:nth-of-type(1) {
			border-left: 0 none;
		}

		${until.tablet} {
			clear: left;

			:nth-of-type(odd) {
				border-left: 0;
				padding-left: 0;
			}

			:nth-of-type(3) {
				padding-top: 0;
			}

			:nth-of-type(4) {
				padding-top: 0;
			}
		}

		${from.tablet} {
			margin: 0 10px 36px 0;
			width: 150px;
		}

		${from.desktop} {
			:nth-of-type(1) {
				border-left: ${footerBorders};
			}
		}
	}
`;

const readerRevenueLinks = css`
	border-left: ${footerBorders};
	flex: 1;
	padding: 12px 0 0 10px;
	margin: 0 10px 36px 0;
	width: calc(50% - 10px);

	${until.tablet} {
		width: 50%;
		border-top: ${footerBorders};
	}
`;

const copyright = css`
	${textSans.xxsmall()};
	padding-left: 20px;
	padding-right: 12px;
	padding-top: 12px;
	padding-bottom: 12px;

	${until.tablet} {
		margin-top: 11px;
	}
`;

const footerItemContainers = css`
	${from.leftCol} {
		display: flex;
	}

	width: 100%;
	padding: 0 ${footerItemContainerPadding / 2}px;
	position: relative;
	border: ${footerBorders};

	${from.mobileLandscape} {
		padding: 0 ${footerItemContainerPadding}px;
	}
`;

const bttPosition = css`
	background-color: ${brandBackground.primary};
	padding: 0 5px;
	position: absolute;
	bottom: -21px;
	right: 20px;
`;

const FooterLinks: React.FC<{
	pageFooter: FooterType;
}> = ({ pageFooter }) => {
	const linkGroups = pageFooter.footerLinks.map((linkGroup) => {
		const linkList = linkGroup.map((l: FooterLink, index: number) => (
			<li key={`${l.url}${index}`}>
				<a
					css={[footerLink, l.extraClasses]}
					href={l.url}
					data-link-name={l.dataLinkName}
				>
					{l.text}
				</a>
			</li>
		));
		const key = linkGroup.reduce((acc, { text }) => `acc-${text}`, '');
		return <ul key={key}>{linkList}</ul>;
	});

	const rrLinks = (
		<div css={readerRevenueLinks}>
			<div id="reader-revenue-links-footer" />
		</div>
	);

	return (
		<div css={footerList}>
			{linkGroups}
			{rrLinks}
		</div>
	);
};

const year = new Date().getFullYear();

export const Footer: React.FC<{
	pillars: PillarType[];
	pillar: Theme;
	pageFooter: FooterType;
}> = ({ pillars, pillar, pageFooter }) => (
	<footer
		data-print-layout="hide"
		css={footer}
		data-link-name="footer"
		data-component="footer"
	>
		<div css={pillarWrap}>
			<Pillars
				display={Display.Standard}
				pillars={pillars}
				pillar={pillar}
				showLastPillarDivider={false}
				dataLinkName="footer"
			/>
		</div>
		<div css={footerItemContainers}>
			<iframe
				title="Guardian Email Sign-up Form"
				src="https://www.theguardian.com/email/form/footer/today-uk"
				id="footer__email-form"
				css={emailSignup}
				data-form-success-desc="We will send you our picks of the most important headlines tomorrow morning."
				data-node-uid="2"
				height="100"
			/>

			<FooterLinks pageFooter={pageFooter} />
			<div css={bttPosition}>
				<BackToTop />
			</div>
		</div>
		<div css={copyright}>
			© {year} Guardian News & Media Limited or its affiliated companies.
			All rights reserved. (modern)
		</div>
	</footer>
);
