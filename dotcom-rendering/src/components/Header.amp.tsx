import { css } from '@emotion/react';
import {
	brandText,
	from,
	headline,
	palette,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';
import { SvgGuardianBestWebsiteLogo } from '@guardian/source-react-components';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';
import type { NavType, PillarLinkType } from '../model/extract-nav';
import { ReaderRevenueButton } from './ReaderRevenueButton.amp';

const headerStyles = css`
	background-color: ${palette.brand[400]};
`;

const row = css`
	display: flex;
	justify-content: space-between;
	position: relative;
`;

const logoStyles = css`
	align-self: flex-start;
	height: 65px;
	width: 175px;
	margin-top: 3px;
	margin-right: 20px;
	margin-bottom: 20px;

	${until.mobileMedium} {
		height: 54px;
		width: 135px;
		margin-bottom: 15px;
		margin-right: 52px;
		margin-top: 9px;
	}

	svg {
		max-width: 100%;
		max-height: 100%;
	}
`;

const pillarListStyles = css`
	list-style: none;
	/* https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns */
	/* Needs double escape char: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#es2018_revision_of_illegal_escape_sequences */
	li::before {
		content: '\\200B'; /* Zero width space */
		display: block;
		height: 0;
		width: 0;
	}
	/* Design System: This override is needed because the line height changes the layout*/
	line-height: 0;
`;

const pillarListItemStyle = css`
	display: inline-block;

	:first-of-type {
		a {
			padding-left: 20px;

			:before {
				display: none;
			}
		}

		${until.mobileLandscape} {
			a {
				padding-left: 10px;
			}
		}
	}
`;

const pillarLinkStyle = (pillar: ArticleTheme) => css`
	text-decoration: none;
	cursor: pointer;
	display: block;
	${headline.xxxsmall()};
	height: 36px;
	padding: 9px 4px;
	color: ${palette.neutral[100]};
	position: relative;
	overflow: hidden;

	font-weight: 900;
	font-size: 15.4px;

	${from.mobileLandscape} {
		font-size: 18px;
		padding: 7px 4px 0;
	}

	:hover {
		text-decoration: underline;
	}

	:before {
		border-left: 1px solid rgba(255, 255, 255, 0.3);
		top: 0;
		z-index: 1;
		content: '';
		display: block;
		left: 0;
		position: absolute;
		bottom: 0;
	}

	:after {
		content: '';
		display: block;
		top: 0;
		left: 0;
		right: 0;
		position: absolute;
		border-top: 4px solid ${pillarPalette_DO_NOT_USE[pillar].bright};
		transition: transform 0.3s ease-in-out;
	}
`;

const veggieStyles = css`
	background-color: ${palette.brandAlt[400]};
	color: ${palette.neutral[97]};
	height: 42px;
	min-width: 42px;
	border: 0;
	border-radius: 50%;
	outline: none;
	z-index: 1;
	bottom: -3px;
	right: 20px;
	position: absolute;

	${until.mobileMedium} {
		bottom: 50px;
	}

	${until.mobileLandscape} {
		right: 5px;
	}
`;

const lineStyles = css`
	height: 2px;
	position: absolute;
	width: 20px;
	background-color: ${palette.neutral[7]};
`;

const pattyStyles = css`
	left: 11px;

	${lineStyles};

	:before {
		content: '';
		top: -6px;
		left: 0;
		${lineStyles};
	}

	:after {
		content: '';
		top: 6px;
		left: 0;
		${lineStyles};
	}
`;

const navRow = css`
	border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

const pillarLinks = (pillars: PillarLinkType[], guardianBaseURL: string) => (
	<nav>
		<ul css={pillarListStyles}>
			{pillars.map((p) => (
				<li css={pillarListItemStyle} key={p.title}>
					<a
						css={pillarLinkStyle(p.pillar)}
						href={`${guardianBaseURL}${p.url}`}
					>
						{p.title}
					</a>
				</li>
			))}
		</ul>
	</nav>
);

type Props = {
	nav: NavType;
	guardianBaseURL: string;
};

export const Header = ({ nav, guardianBaseURL }: Props) => (
	<header css={headerStyles}>
		<div css={row}>
			<ReaderRevenueButton
				nav={nav}
				rrLink="ampHeader"
				rrCategory="contribute"
				linkLabel="Support us"
			/>

			<a css={logoStyles} href={guardianBaseURL}>
				<span
					css={css`
						${visuallyHidden};
					`}
				>
					The Guardian - Back to home
				</span>
				<SvgGuardianBestWebsiteLogo
					textColor={brandText.primary}
					textAccentColor={palette.brandAlt[400]}
				/>
			</a>
		</div>

		<div css={[row, navRow]}>
			{pillarLinks(nav.pillars, guardianBaseURL)}

			{/* Note, the actual sidebar lives directly in the body as AMP requires this :( */}
			<button
				css={veggieStyles}
				aria-label="Toggle main menu"
				on="tap:sidebar1.toggle"
			>
				<span css={pattyStyles} />
			</button>
		</div>
	</header>
);
