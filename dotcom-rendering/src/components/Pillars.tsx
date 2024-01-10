import { css } from '@emotion/react';
import type { Pillar } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import {
	brandText,
	from,
	headline,
	palette as srcPalette,
	until,
} from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import type { PillarLinkType } from '../model/extract-nav';
import type { Palette } from '../types/palette';
import { navInputCheckboxId } from './Nav/config';

// CSS Vars

const firstPillarWidth = 171;
const pillarWidth = 160;
const preLeftColFirstPillarWidth = 144;
const preLeftColPillarWidth = 134;
const preDesktopPillarWidth = 'auto';

// CSS
const pillarsStyles = (isImmersive: boolean) => css`
	${until.tablet} {
		display: ${isImmersive && 'none'};
	}
	clear: right;
	margin: 0;
	list-style: none;
	list-style-image: none;
	padding-left: 10px;
	${from.mobileLandscape} {
		padding-left: 20px;
	}
	li {
		float: left;
		display: block;
		position: relative;
		width: ${preDesktopPillarWidth};
		${from.desktop} {
			width: ${preLeftColPillarWidth}px;
		}
		/* https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns */
		/* Needs double escape char: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#es2018_revision_of_illegal_escape_sequences */
		&::before {
			content: '\\200B'; /* Zero width space */
			display: block;
			height: 0;
			width: 0;
		}
	}

	:after {
		content: '';
		border-top: 1px solid ${srcPalette.brand[600]};
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: ${isImmersive ? '48px' : '36px'};
		${from.tablet} {
			border-bottom: 0;
			height: 49px;
		}
		${from.desktop} {
			height: ${isImmersive ? '48px' : '42px'};
		}
	}
`;

const pillarsStylesFromLeftCol = css`
	li {
		${from.leftCol} {
			width: ${pillarWidth}px;
		}
	}
`;

const showMenuUnderlineStyles = css`
	/*
        IMPORTANT NOTE:
        we need to specify the adjacent path to the a (current) tag
        to apply styles to the nested tabs due to the fact we use ~
        to support NoJS
    */
	/* stylelint-disable-next-line selector-type-no-unknown */
	${`#${navInputCheckboxId}`}:checked ~ ul li & {
		${from.desktop} {
			:before {
				bottom: 0;
			}
		}

		:hover,
		:focus {
			text-decoration: underline;
			color: ${srcPalette.brandAlt[400]};
		}

		:after {
			transform: translateY(4px);
		}
	}
`;

const pillarStyle = css`
	:first-of-type {
		margin-left: -20px;
		width: ${preDesktopPillarWidth};

		${from.desktop} {
			width: ${preLeftColFirstPillarWidth}px;
		}
		a {
			padding-left: 20px;
		}
	}

	:last-child a:before {
		${until.desktop} {
			content: none;
		}
	}
`;

const pillarStyleFromLeftCol = css`
	:first-of-type {
		${from.leftCol} {
			width: ${firstPillarWidth}px;
		}
	}
`;

const pillarDivider = css`
	:before {
		content: '';
		display: block;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 1px;
		background-color: ${srcPalette.brand[600]};

		${from.tablet} {
			bottom: 17px;
		}

		${from.desktop} {
			bottom: 0.6em;
		}
	}
`;

const linkStyle = (isImmersive: boolean) => css`
	${headline.xxxsmall()};
	box-sizing: border-box;
	font-weight: 900;
	color: ${brandText.primary};
	cursor: pointer;
	display: block;
	font-size: 15.4px;
	height: ${isImmersive ? '48px' : '36px'};
	padding-top: ${isImmersive ? '10px' : '9px'};
	padding-right: ${isImmersive ? '5px' : '5px'};
	padding-bottom: ${isImmersive ? '0' : '0'};
	padding-left: ${isImmersive ? '5px' : '5px'};
	position: relative;
	overflow: hidden;
	text-decoration: none;
	z-index: 1;
	${from.mobileMedium} {
		font-size: 15.7px;
		padding-top: ${isImmersive ? '9px' : '9px'};
		padding-right: ${isImmersive ? '5px' : '5px'};
		padding-bottom: ${isImmersive ? '0' : '0'};
		padding-left: ${isImmersive ? '5px' : '5px'};
	}
	${from.mobileLandscape} {
		font-size: 18px;
		padding-top: ${isImmersive ? '9px' : '9px'};
		padding-right: ${isImmersive ? '5px' : '5px'};
		padding-bottom: ${isImmersive ? '0' : '0'};
		padding-left: ${isImmersive ? '5px' : '5px'};
	}
	${from.tablet} {
		font-size: 22px;
		height: 48px;
		padding-top: ${isImmersive ? '9px' : '9px'};
		padding-right: ${isImmersive ? '20px' : '20px'};
		padding-bottom: ${isImmersive ? '0' : '0'};
		padding-left: ${isImmersive ? '9px' : '9px'};
	}
	${from.desktop} {
		padding-top: ${isImmersive ? '9px' : '5px'};
		height: ${isImmersive ? '48px' : '42px'};
	}

	:focus:after {
		transform: translateY(4px);
	}
	:hover {
		text-decoration: none;
	}
	:hover:after {
		transform: translateY(4px);
	}
`;

const linkStyleFromWide = (isImmersive: boolean) => css`
	${from.wide} {
		padding-top: ${isImmersive ? '10px' : '7px'};
		font-size: 24px;
	}
`;

const pillarUnderline = (palette: Palette) => css`
	:after {
		border-top: 4px solid ${palette.border.navPillar};
		left: 0;
		right: 1px;
		top: -4px;
		content: '';
		display: block;
		position: absolute;
		transition: transform 0.3s ease-in-out;
	}
`;

const forceUnderline = css`
	:after {
		transform: translateY(4px);
	}
	:focus:after {
		transform: translateY(4px);
	}
	:hover {
		text-decoration: none;
	}
	:hover:after {
		transform: translateY(4px);
	}
`; // A11Y warning: this styling has no focus state for the selected pillar

const isNotLastPillar = (i: number, noOfPillars: number): boolean =>
	i !== noOfPillars - 1;

type Props = {
	isImmersive?: boolean;
	isTopNav?: boolean;
	pillars: PillarLinkType[];
	selectedPillar?: Pillar;
	showLastPillarDivider?: boolean;
	dataLinkName: string;
	hasPageSkin?: boolean;
};

export const Pillars = ({
	isImmersive = false,
	isTopNav,
	pillars,
	selectedPillar,
	showLastPillarDivider = true,
	dataLinkName,
	hasPageSkin,
}: Props) => (
	<ul
		data-testid="pillar-list"
		css={[
			pillarsStyles(isImmersive),
			!hasPageSkin && pillarsStylesFromLeftCol,
		]}
	>
		{pillars.map((p, i) => {
			const isSelected = p.pillar === selectedPillar;
			const showDivider =
				showLastPillarDivider || isNotLastPillar(i, pillars.length);
			return (
				<li
					key={p.title}
					css={[pillarStyle, !hasPageSkin && pillarStyleFromLeftCol]}
				>
					<a
						css={[
							linkStyle(isImmersive),
							!hasPageSkin && linkStyleFromWide(isImmersive),
							pillarUnderline(
								decidePalette({
									display: ArticleDisplay.Standard,
									design: ArticleDesign.Feature,
									theme: p.pillar,
								}),
							),
							isTopNav && showMenuUnderlineStyles,
							isSelected && forceUnderline,
							showDivider && pillarDivider,
						]}
						id={isTopNav && i === 0 ? 'navigation' : undefined}
						href={p.url}
						data-link-name={nestedOphanComponents(
							dataLinkName,
							'primary',
							p.title,
						)}
					>
						{p.title}
					</a>
				</li>
			);
		})}
	</ul>
);
