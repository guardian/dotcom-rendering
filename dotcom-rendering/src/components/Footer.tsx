import { css } from '@emotion/react';
import type { Pillar } from '@guardian/libs';
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
import { Fragment } from 'react';
import type { EditionId } from '../lib/edition';
import { clearFix } from '../lib/mixins';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import type { PillarLinkType } from '../model/extract-nav';
import type { FooterType } from '../types/footer';
import { BackToTop } from './BackToTop';
import { Island } from './Island';
import { Pillars } from './Pillars';
import { PrivacySettingsLink } from './PrivacySettingsLink.importable';
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
	grid-area: signup;

	padding-top: ${space[2]}px;
	margin-bottom: ${space[3]}px;

	${from.desktop} {
		width: 247px;
	}

	${from.leftCol} {
		width: 298px;
	}

	${from.wide} {
		width: 458px;
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
	grid-area: links;
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
			margin: 0 10px ${space[9]}px 0;
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
	padding: ${space[3]}px 0 0 10px;
	margin: 0 10px ${space[9]}px 0;
	width: calc(50% - 10px);

	${until.tablet} {
		width: 50%;
		border-top: ${footerBorders};
	}
`;

const acknowledgments = css`
	grid-area: acknowledgment;
	align-self: end;
	${textSans.xxsmall()};
	padding-top: ${space[3]}px;
	padding-bottom: ${space[3]}px;
	margin-bottom: ${space[6]}px;

	${between.tablet.and.desktop} {
		padding-right: ${space[3]}px;
		max-width: 481px;
		border-right: ${footerBorders};
		position: relative;

		&::after {
			content: '';
			position: absolute;
			height: ${space[9]}px;
			top: -${space[9]}px;
			right: -1px;
			border-right: ${footerBorders};
		}
	}
`;

const copyright = css`
	${textSans.xxsmall()};
	padding: ${space[3]}px;
	padding-left: 20px;

	${until.tablet} {
		margin-top: 11px;
	}
`;

const footerGrid = css`
	display: grid;
	column-gap: ${space[3]}px;

	grid-template-areas:
		'signup'
		'links'
		'acknowledgment';

	${from.desktop} {
		grid-template-columns: min-content;
		grid-template-areas:
			'signup          links'
			'acknowledgment  links';
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
	background-color: ${brand[400]};
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
		const linkList = linkGroup.map(
			({ url, extraClasses, dataLinkName, text }) => (
				<Fragment key={url}>
					{dataLinkName === 'privacy' && (
						<li key="client-side-island">
							<Island>
								<PrivacySettingsLink
									extraClasses={extraClasses}
								/>
							</Island>
						</li>
					)}
					<li>
						<a
							css={[footerLink, extraClasses]}
							href={url}
							data-link-name={dataLinkName}
						>
							{text}
						</a>
					</li>
				</Fragment>
			),
		);
		const key = linkGroup.reduce((acc, { text }) => `${acc}-${text}`, '');
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
			return 'https://www.theguardian.com/australia-news/2022/sep/23/morning-mail-newsletter-best-daily-news-email-guardian-australia-free-sign-up-inbox-subscribe';
		case 'UK':
		case 'INT': // There's no international version so we default to UK
		default:
			return 'https://www.theguardian.com/global/2022/sep/20/sign-up-for-the-first-edition-newsletter-our-free-news-email';
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
	selectedPillar,
	pageFooter,
	urls,
	editionId,
	contributionsServiceUrl,
}: {
	pillars: PillarLinkType[];
	selectedPillar?: Pillar;
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
				pillars={pillars}
				selectedPillar={selectedPillar}
				showLastPillarDivider={false}
				dataLinkName="footer"
			/>
		</div>
		<div css={footerGrid}>
			<div css={emailSignup}>
				<div>
					Original reporting and incisive analysis, direct from the
					Guardian every morning
				</div>
				<LinkButton
					size="small"
					href={decideSignupLink(editionId)}
					data-link-name={nestedOphanComponents(
						'footer',
						decideSignupNewsletterName(editionId),
					)}
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

			{editionId === 'AU' && (
				<div css={acknowledgments}>
					Guardian Australia acknowledges the traditional owners and
					custodians of Country throughout Australia and their
					connections to land, waters and community. We pay respect by
					giving voice to social justice, acknowledging our shared
					history and valuing the cultures of First Nations.
				</div>
			)}

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
