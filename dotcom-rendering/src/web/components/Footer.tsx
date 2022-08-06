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
import type { PillarType } from '../../model/extract-nav';
import type { FooterType } from '../../types/footer';
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

	clear: both;
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
	editionId,
	contributionsServiceUrl,
}: {
	pageFooter: FooterType;
	urls: ReaderRevenueCategories;
	editionId: EditionId;
	contributionsServiceUrl: string;
}) => {
	const linkGroups = pageFooter.footerLinks.map((linkGroup) => {
		const linkList = linkGroup.map((l, index) => (
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
					editionId={editionId}
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

// Hard coding the values here is not ideal - ideally, they would sourced from the
// newsletters API by frontend and included in the request.
const decideSignupLink = (edition: EditionId): string => {
	switch (edition) {
		case 'US':
			return 'https://www.theguardian.com/info/2018/sep/17/guardian-us-morning-briefing-sign-up-to-stay-informed';
		case 'AU':
			return 'https://www.theguardian.com/world/guardian-australia-morning-mail/2014/jun/24/-sp-guardian-australias-morning-mail-subscribe-by-email';
		case 'UK':
		case 'INT': // There's no international version so we default to UK
		default:
			return 'https://www.theguardian.com/global/ng-interactive/2022/apr/13/first-edition-sign-up-guardian';
	}
};

const decideSignupNewsletterName = (edition: EditionId): string => {
	switch (edition) {
		case 'US':
			return 'us-morning-newsletter';
		case 'AU':
			return 'morning-mail';
		case 'UK':
		case 'INT': // There's no international version so we default to UK
		default:
			return 'morning-briefing';
	}
};

export const Footer = ({
	pillars,
	pillar,
	pageFooter,
	urls,
	editionId,
	contributionsServiceUrl,
}: {
	pillars: PillarType[];
	pillar: ArticleTheme;
	pageFooter: FooterType;
	urls: ReaderRevenueCategories;
	editionId: EditionId;
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
					Original reporting and incisive analysis, direct from the
					Guardian every morning
				</div>
				<LinkButton
					size="small"
					href={decideSignupLink(editionId)}
					data-link-name={`footer : ${decideSignupNewsletterName(
						editionId,
					)}`}
					cssOverrides={emailSignupButton}
					icon={<SvgArrowRightStraight />}
					iconSide="right"
				>
					Sign up for our email
				</LinkButton>
			</div>

			<FooterLinks
				pageFooter={pageFooter}
				urls={urls}
				editionId={editionId}
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
