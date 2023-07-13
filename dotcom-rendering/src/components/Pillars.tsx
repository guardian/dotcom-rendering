import { css } from '@emotion/react';
import type { ArticlePillar } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { from, headline, palette, until } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import type { PillarLinkType } from '../model/extract-nav';
import { navInputCheckboxId } from './Nav/config';

// CSS Vars

const firstPillarWidth = 171;
const pillarWidth = 160;
const preLeftColFirstPillarWidth = 144;
const preLeftColPillarWidth = 134;
const preDesktopPillarWidth = 'auto';

// CSS
const pillarsStyles = css`
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
		${from.leftCol} {
			width: ${pillarWidth}px;
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
		border-top: 1px solid ${palette.brand[600]};
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 36px;

		${from.tablet} {
			height: 49px;
		}

		${from.desktop} {
			height: 42px;
		}
	}
`;

const immersivePillarStyles = css`
	${until.tablet} {
		display: none;
	}
	:after {
		height: 48px;

		${from.desktop} {
			height: 48px;
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
			color: ${palette.brandAlt[400]};
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

		${from.leftCol} {
			width: ${firstPillarWidth}px;
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

const pillarDivider = css`
	:before {
		content: '';
		display: block;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 1px;
		background-color: ${palette.brand[600]};

		${from.tablet} {
			bottom: 17px;
		}

		${from.desktop} {
			bottom: 0.6em;
		}
	}
`;

const baseLinkStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold' })};
	box-sizing: border-box;
	color: ${palette.neutral[100]};
	cursor: pointer;
	display: block;

	font-size: 15.4px;
	height: 36px;

	padding-top: 9px;
	padding-right: 5px;
	padding-bottom: 0;
	padding-left: 5px;

	position: relative;
	overflow: hidden;
	text-decoration: none;

	${from.mobileMedium} {
		font-size: 15.7px;
	}
	${from.mobileLandscape} {
		font-size: 18px;
	}
	${from.tablet} {
		font-size: 22px;
		height: 48px;
		padding-right: 20px;
		padding-left: 9px;
	}

	${from.desktop} {
		padding-top: 5px;
		height: 42px;
	}

	${from.wide} {
		font-size: 24px;
		padding-top: 7px;
	}

	:hover {
		text-decoration: none;
	}

	:hover:after,
	:focus:after {
		transform: translateY(4px);
	}
`;

const immersiveLinkStyles = css`
	height: 48px;
	${from.desktop} {
		height: 48px;
		padding-top: 9px;
	}
	${from.wide} {
		font-size: 24px;
		padding-top: 10px;
	}
`;

const pillarUnderline = css`
	:after {
		border-top: 4px solid;
		left: 0;
		right: 1px;
		top: -4px;
		content: '';
		display: block;
		position: absolute;
		transition: transform 0.3s ease-in-out;
	}
`;

/** A11Y warning: this styling has no focus state for the selected pillar */
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
`;

const isNotLastPillar = (i: number, noOfPillars: number): boolean =>
	i !== noOfPillars - 1;

type Props = {
	isImmersive?: boolean;
	isTopNav?: boolean;
	pillars: PillarLinkType[];
	selectedPillar?: ArticlePillar;
	showLastPillarDivider?: boolean;
	dataLinkName: string;
};

export const Pillars = ({
	isImmersive = false,
	isTopNav,
	pillars,
	selectedPillar,
	showLastPillarDivider = true,
	dataLinkName,
}: Props) => (
	<ul
		data-testid="pillar-list"
		css={[pillarsStyles, isImmersive && immersivePillarStyles]}
	>
		{pillars.map((p, i) => {
			const isSelected = p.pillar === selectedPillar;
			const showDivider =
				showLastPillarDivider || isNotLastPillar(i, pillars.length);
			const borderTopColor = decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: p.pillar,
			}).border.navPillar;
			return (
				<li key={p.title} css={pillarStyle}>
					<a
						css={[
							baseLinkStyles,
							isImmersive && immersiveLinkStyles,
							pillarUnderline,
							css({
								':after': {
									borderTopColor,
								},
							}),
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
