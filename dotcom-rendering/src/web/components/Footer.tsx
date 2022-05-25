import { css } from '@emotion/react';
import { ArticleDisplay } from '@guardian/libs';
import {
	between,
	brand,
	brandAlt,
	brandBackground,
	brandText,
	from,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { clearFix } from '../../lib/mixins';
import { BackToTop } from './BackToTop';
import { Island } from './Island';
import { Pillars } from './Pillars';
import { ReaderRevenueLinks } from './ReaderRevenueLinks.importable';

// CSS vars
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
	padding-top: ${space[2]}px;
	margin-right: 10px;
	margin-bottom: ${space[3]}px;

	${between.desktop.and.leftCol} {
		float: left;
		width: 247px;
	}
	${between.leftCol.and.wide} {
		width: 325px;
	}
	${from.wide} {
		width: 498px;
	}
`;

const emailSignupButton = css`
	color: ${brandBackground.primary};
	background-color: ${brandText.primary};
	:hover {
		background-color: ${neutral[86]};
	}
	margin-top: ${space[3]}px;
`;

const showWhenConstrained = css`
	${between.mobileLandscape.and.desktop} {
		display: none;
	}
	${from.wide} {
		display: none;
	}
`;
const hideWhenConstrained = css`
	${until.mobileLandscape} {
		display: none;
	}
	${between.desktop.and.wide} {
		display: none;
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
	padding: 0 10px;
	position: relative;
	border: ${footerBorders};

	${from.mobileLandscape} {
		padding: 0 20px;
	}
`;

const bttPosition = css`
	background-color: ${brandBackground.primary};
	padding: 0 5px;
	position: absolute;
	bottom: -21px;
	right: 20px;
`;

const FooterLinks = ({
	pageFooter,
	urls,
	edition,
	contributionsServiceUrl,
}: {
	pageFooter: FooterType;
	urls: ReaderRevenueCategories;
	edition: Edition;
	contributionsServiceUrl: string;
}) => {
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
			<Island deferUntil="visible" clientOnly={true}>
				<ReaderRevenueLinks
					urls={urls}
					edition={edition}
					dataLinkNamePrefix="footer : "
					inHeader={false}
					remoteHeader={false}
					contributionsServiceUrl={contributionsServiceUrl}
				/>
			</Island>
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

export const Footer = ({
	pillars,
	pillar,
	pageFooter,
	urls,
	edition,
	contributionsServiceUrl,
}: {
	pillars: PillarType[];
	pillar: ArticleTheme;
	pageFooter: FooterType;
	urls: ReaderRevenueCategories;
	edition: Edition;
	contributionsServiceUrl: string;
}) => (
	<div
		data-print-layout="hide"
		css={footer}
		data-link-name="footer"
		data-component="footer"
	>
		<div css={pillarWrap}>
			<Pillars
				display={ArticleDisplay.Standard}
				pillars={pillars}
				pillar={pillar}
				showLastPillarDivider={false}
				dataLinkName="footer"
			/>
		</div>
		<div css={footerItemContainers}>
			<div css={emailSignup}>
				<div>
					All the day's headlines and highlights from the Guardian,
					direct to you every morning
				</div>
				<LinkButton
					size="small"
					href="https://www.theguardian.com/info/2015/dec/08/daily-email-uk"
					cssOverrides={emailSignupButton}
					icon={<SvgArrowRightStraight />}
					iconSide="right"
				>
					<span css={hideWhenConstrained}>
						Sign up for the Guardian Headlines email
					</span>
					<span css={showWhenConstrained}>Sign up</span>
				</LinkButton>
			</div>

			<FooterLinks
				pageFooter={pageFooter}
				urls={urls}
				edition={edition}
				contributionsServiceUrl={contributionsServiceUrl}
			/>
			<div css={bttPosition}>
				<BackToTop />
			</div>
		</div>
		<div css={copyright}>
			© {year} Guardian News & Media Limited or its affiliated companies.
			All rights reserved. (modern)
		</div>
	</div>
);
