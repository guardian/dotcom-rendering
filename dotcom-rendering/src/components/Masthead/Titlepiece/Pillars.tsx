/**
 * @file
 * This file was largely inspired by src/components/Pillars.tsx
 */
import { css } from '@emotion/react';
import { type ArticleTheme, Pillar } from '@guardian/libs';
import {
	from,
	headlineBold14,
	headlineBold17,
	headlineBold20,
	headlineBold24,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type { NavType } from '../../../model/extract-nav';
import { palette as themePalette } from '../../../palette';
import { listAccessibility } from './commonStyles';
import { pillarLeftMarginPx, pillarWidthsPx } from './constants';

type Props = {
	pillars: NavType['pillars'];
	selectedPillar?: Pillar;
	dataLinkName: string;
	hasPageSkin?: boolean;
};

const pillarsContainer = css`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	width: fit-content;
	pointer-events: auto;
`;

const pillarBlock = css`
	display: flex;
	position: relative;
	overflow: hidden;

	height: 28px;
	width: fit-content;

	${from.mobileMedium} {
		height: 34px;
	}

	${from.mobileLandscape} {
		height: 37px;
	}

	${from.tablet} {
		width: ${pillarWidthsPx.tablet}px;
	}

	${from.desktop} {
		height: 40px;
	}
`;

const pillarBlockWithoutPageSkin = css`
	${from.leftCol} {
		height: 52px;
		width: ${pillarWidthsPx.leftCol}px;
	}

	${from.wide} {
		width: ${pillarWidthsPx.wide}px;
	}
`;

/** The pillar underline has an extra 1px in height due to the
 * horizontal line under the pillars added in the Titlepiece component */
const pillarUnderlineHeight = space[1] + 1;

const pillarUnderline = css`
	:after {
		height: ${pillarUnderlineHeight}px;
		/* This CSS var is dynamically set via the style attribute*/
		background-color: var(--pillar-underline);
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;

		/*
		This is 100% width of pillar block minus the left margin
		and 1px border on the right
		*/
		width: calc(100% - ${pillarLeftMarginPx}px - 1px);
		margin-left: ${pillarLeftMarginPx}px;
		transition: transform 0.3s ease-in-out;

		/*
		This hides the pillar underline below the pillar block until
		ready to view, either by hovering or forcing the underline (when selected)
		*/
		margin-bottom: -${pillarUnderlineHeight}px;
	}
`;

const forceUnderline = css`
	:after {
		transform: translateY(-${pillarUnderlineHeight}px);
	}
	:focus:after {
		transform: translateY(-${pillarUnderlineHeight}px);
	}
	:hover {
		text-decoration: none;
	}
	:hover:after {
		transform: translateY(-${pillarUnderlineHeight}px);
	}
`;

const pillarLink = css`
	${headlineBold14}
	text-decoration: none;

	background-color: ${themePalette('--masthead-nav-background')};
	color: ${themePalette('--masthead-nav-link-text')};

	/** Allow the anchor tag to fill the whole pillar area */
	flex-grow: 1;
	padding-left: ${pillarLeftMarginPx}px;
	padding-right: ${space[1]}px;

	${from.mobileMedium} {
		${headlineBold14}
		/** This overrides the font size to 15
		 TODO: export headlineBold15 from source */
		font-size: 0.9375rem;
		padding-right: ${space[2]}px;
	}
	${from.mobileLandscape} {
		${headlineBold17}
	}

	${from.desktop} {
		${headlineBold20}
	}

	:focus:after {
		transform: translateY(-${pillarUnderlineHeight}px);
	}
	:hover {
		text-decoration: none;
	}
	:hover:after {
		transform: translateY(-${pillarUnderlineHeight}px);
	}
`;

const pillarLinkWithoutPageSkin = css`
	${from.leftCol} {
		${headlineBold24}
	}
`;

const firstPillarLinkOverrides = css`
	a {
		padding-left: 0;

		:after {
			width: calc(100% - 1px);
			margin-left: 0;
		}
	}
`;

export const verticalDivider = css`
	:after {
		content: '';
		border-left: 1px solid ${themePalette('--masthead-nav-lines')};
		display: flex;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		height: calc(100% - ${space[1]}px);
		margin-top: ${space[1]}px;
	}
`;

const isNotLastPillar = (i: number, noOfPillars: number): boolean =>
	i !== noOfPillars - 1;

const getPillarColour = (pillar: ArticleTheme): string | undefined => {
	switch (pillar) {
		case Pillar.News:
			return sourcePalette.news[500];
		case Pillar.Opinion:
			return sourcePalette.opinion[500];
		case Pillar.Sport:
			return sourcePalette.sport[500];
		case Pillar.Culture:
			return sourcePalette.culture[500];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[500];

		// We don't handle non standard pillars
		default:
			return undefined;
	}
};

export const Pillars = ({
	pillars,
	selectedPillar,
	dataLinkName,
	hasPageSkin = false,
}: Props) => {
	return (
		<ul id="navigation" css={pillarsContainer}>
			{pillars.map((p, i) => {
				const isSelected = p.pillar === selectedPillar;
				const showDivider = isNotLastPillar(i, pillars.length);
				const pillarColour = getPillarColour(p.pillar);

				return (
					<li
						key={p.title}
						css={[
							pillarBlock,
							!hasPageSkin && pillarBlockWithoutPageSkin,
							listAccessibility,
							showDivider && verticalDivider,
							i === 0 && firstPillarLinkOverrides,
						]}
					>
						<a
							href={p.url}
							css={[
								pillarLink,
								!hasPageSkin && pillarLinkWithoutPageSkin,
								pillarUnderline,
								isSelected && forceUnderline,
							]}
							style={{ '--pillar-underline': pillarColour }}
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
};
