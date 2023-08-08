import { css } from '@emotion/react';
import {
	body,
	brand,
	brandAlt,
	neutral,
	textSans,
} from '@guardian/source-foundations';
import type { NavType } from '../model/extract-nav';
import { useContentABTestGroup } from './ContentABTest.amp';
import { ReaderRevenueButton } from './ReaderRevenueButton.amp';

export interface Link {
	title: string;
	url?: string;
	on?: string;
}

export const footerLinks: Link[][] = [
	[
		{
			title: 'About us',
			url: 'https://www.theguardian.com/about',
		},
		{
			title: 'Contact us',
			url: 'https://www.theguardian.com/help/contact-us',
		},
		{
			title: 'Complaints and corrections',
			url: 'https://www.theguardian.com/info/complaints-and-corrections',
		},
		{
			title: 'SecureDrop',
			url: 'https://www.theguardian.com/securedrop',
		},
		{
			title: 'Work for us',
			url: 'https://workforus.theguardian.com/locations/london',
		},
		{
			title: 'Privacy settings',
			on: 'tap:consent.prompt(consent=SourcePoint)',
		},
		{
			title: 'Privacy policy',
			url: 'https://www.theguardian.com/info/privacy',
		},
		{
			title: 'Cookie policy',
			url: 'https://www.theguardian.com/info/cookies',
		},
		{
			title: 'Terms & conditions',
			url: 'https://www.theguardian.com/help/terms-of-service',
		},
		{
			title: 'Help',
			url: 'https://www.theguardian.com/help',
		},
	],
	[
		{
			title: 'All topics',
			url: 'https://www.theguardian.com/index/subjects/a',
		},
		{
			title: 'All writers',
			url: 'https://www.theguardian.com/index/contributors',
		},
		{
			title: 'Modern Slavery Act',
			url: 'https://uploads.guim.co.uk/2023/07/25/Modern_Slavery_Statement_GMG_and_Scott_Trust_2023.docx.pdf',
		},
		{
			title: 'Digital newspaper archive',
			url: 'https://theguardian.newspapers.com/',
		},
		{
			title: 'Facebook',
			url: 'https://www.facebook.com/theguardian',
		},
		{
			title: 'Twitter',
			url: 'https://twitter.com/guardian',
		},
	],
	[
		{
			title: 'Advertise with us',
			url: 'https://advertising.theguardian.com/',
		},
		{
			title: 'Search jobs',
			url: 'https://jobs.theguardian.com',
		},
		{
			title: 'Patrons',
			url: 'https://patrons.theguardian.com/?INTCMP=footer_patrons',
		},
	],
];

const innerContainerStyles = css`
	padding-left: 10px;
	padding-right: 10px;
`;

const footer = css`
	background-color: ${brand[400]};
	color: ${neutral[86]};
	${textSans.medium()};
	margin-top: 20px;
`;

const footerInner = css`
	position: relative;
	padding-bottom: 6px;
`;

const footerLink = css`
	color: ${neutral[100]};
	text-decoration: none;
	padding-bottom: 12px;
	display: block;

	:hover {
		color: ${brandAlt[400]};
	}
`;

const footerList = css`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	position: relative;
	padding-top: 12px;

	:before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: calc(50% - 10px);
		width: 1px;
		display: block;
		background-color: rgba(255, 255, 255, 0.3);
	}
`;

const footerListBlock = css`
	margin-right: 10px;
	width: calc(50% - 10px);
	margin-top: 0;
`;

const copyrightContainer = css`
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 20px;
	padding-bottom: 18px;
	border-top: 1px solid rgba(255, 255, 255, 0.3);
	margin-top: 12px;
	position: relative;
`;

const copyright = css`
	${textSans.xxsmall()};
`;

const iconContainer = css`
	position: relative;
	float: right;
	margin-top: -6px;
	border-radius: 100%;
	background-color: ${neutral[100]};
	cursor: pointer;
	height: 42px;
	min-width: 42px;
`;

const icon = css`
	:before {
		position: absolute;
		top: 6px;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		border: 2px solid ${brand[400]};
		border-bottom: 0;
		border-right: 0;
		content: '';
		height: 12px;
		width: 12px;
		transform: rotate(45deg);
	}
`;

const backToTopLink = css`
	position: absolute;
	background-color: ${brand[400]};
	color: ${neutral[100]};
	font-weight: 700;
	top: -14px;
	right: 20px;
	padding: 0 5px;
`;

const backToTopText = css`
	display: inline-block;
	padding-right: 0.3125rem;
	padding-top: 3px;
`;

const supportLink = css`
	color: ${brandAlt[400]};
	${body.medium()};
	padding-bottom: 0.375rem;
`;

const year = new Date().getFullYear();

type FooterLinksProps = {
	links: Link[][];
	nav: NavType;
};

const FooterLinks = ({ links, nav }: FooterLinksProps) => {
	const linkGroups = links.map((linkGroup) => {
		const ls = linkGroup.map((l, index) => (
			<li key={`${l.url ?? ''}${index}`}>
				<a css={footerLink} href={l.url} on={l.on}>
					{l.title}
				</a>
			</li>
		));
		const key = linkGroup.reduce((acc, { title }) => `acc-${title}`, '');

		return (
			<ul key={key} css={footerListBlock}>
				{ls}
			</ul>
		);
	});

	return (
		<div css={footerList}>
			{linkGroups}
			<div key="rrblock" css={footerListBlock}>
				<div css={supportLink}>Support the&nbsp;Guardian</div>
				<ReaderRevenueButton
					nav={nav}
					rrLink="ampFooter"
					rrCategory="contribute"
					rightAlignIcon={true}
					linkLabel="Support us"
				/>
			</div>
		</div>
	);
};

type FooterProps = { nav: NavType };

export const Footer = ({ nav }: FooterProps) => {
	const { group } = useContentABTestGroup();
	return (
		<footer data-content-test-group={group} css={footer}>
			<div css={innerContainerStyles}>
				<div css={footerInner}>
					<FooterLinks links={footerLinks} nav={nav} />
				</div>
			</div>
			<div css={[copyrightContainer, innerContainerStyles]}>
				<a css={backToTopLink} href="#top">
					<span css={backToTopText}>Back to top</span>
					<span css={iconContainer}>
						<i css={icon} />
					</span>
				</a>
				<div css={copyright}>
					© {year} Guardian News & Media Limited or its affiliated
					companies. All rights reserved.
				</div>
			</div>
		</footer>
	);
};
