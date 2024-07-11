import { css } from '@emotion/react';
import { Pillar } from '@guardian/libs';
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
import { pillarLeftMarginPx, pillarWidthsPx } from './constants';

type Props = {
	nav: NavType;
	dataLinkName: string;
	selectedPillar?: Pillar;
	isImmersive?: boolean;
	showBurgerMenu?: boolean;
	hasPageSkin?: boolean;
};

const pillarsContainer = css`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
`;

const pillarLink = css`
	${headlineBold14}
	text-decoration: none;

	/* TODO - set this in palette and retrieve as CSS var */
	background-color: ${sourcePalette.brand[400]};
	color: ${sourcePalette.neutral[100]};

	margin-left: ${pillarLeftMarginPx}px;
	padding-right: ${space[1]}px;

	${from.mobileMedium} {
		${headlineBold17}
		padding-right: ${space[2]}px;
	}

	${from.desktop} {
		${headlineBold20}
	}

	${from.leftCol} {
		${headlineBold24}
	}

	:focus:after {
		transform: translateY(-${space[1]}px);
	}
	:hover {
		text-decoration: none;
	}
	:hover:after {
		transform: translateY(-${space[1]}px);
	}
`;

const firstPillarLinkOverrides = css`
	/* width: calc(100% - ${pillarLeftMarginPx}px); */
	a {
		margin-left: 0;

		:after {
			width: calc(100% - 1px);
			margin-left: 0;
		}
	}
`;

const forceUnderline = css`
	:after {
		transform: translateY(-${space[1]}px);
	}
	:focus:after {
		transform: translateY(-${space[1]}px);
	}
	:hover {
		text-decoration: none;
	}
	:hover:after {
		transform: translateY(-${space[1]}px);
	}
`;

const verticalDividerStyles = css`
	:after {
		content: '';
		/* TODO - set this in palette and retrieve as CSS var */
		border-left: 1px solid ${sourcePalette.neutral[86]};
		display: flex;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		height: calc(100% - ${space[1]}px);
		margin-top: ${space[1]}px;
	}
`;

const pillarUnderline = css`
	:after {
		/* This CSS var is dynamically set via the style attribute*/
		border-bottom: 4px solid var(--pillar-underline);
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;

		height: ${space[1]}px;
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
		margin-bottom: -${space[1]}px;
	}
`;

const pillarBlock = css`
	display: block;
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

	${from.leftCol} {
		height: 52px;
		width: ${pillarWidthsPx.leftCol}px;
	}

	${from.wide} {
		width: ${pillarWidthsPx.wide}px;
	}
`;

// TODO - implement veggie burger menu
// const burgerPositionOverrides = css`
// 	left: 6px;
// 	bottom: 10px;
// `;

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
	nav,
	selectedPillar,
	dataLinkName,
	isImmersive = false,
	showBurgerMenu = false,
	hasPageSkin = false,
}: Props) => {
	// TEMPORARY - to stop the linter freaking out
	// TODO - handle immersive displayed articles and fronts with page skins
	const needsAdapting = isImmersive || hasPageSkin;
	console.log({ needsAdapting });

	return (
		<>
			<ul id="navigation" css={[pillarsContainer]}>
				{nav.pillars.map((p, i) => {
					const isSelected = p.pillar === selectedPillar;

					const showDivider =
						showBurgerMenu ||
						isNotLastPillar(i, nav.pillars.length);

					const pillarColour = getPillarColour(p.pillar);

					return (
						<li
							key={p.title}
							css={[
								pillarBlock,
								showDivider && verticalDividerStyles,
								i === 0 && firstPillarLinkOverrides,
							]}
						>
							<a
								href={p.url}
								css={[
									pillarLink,
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
				{
					/** TODO - implement veggie burger menu */ showBurgerMenu && (
						<></>
					)
				}
			</ul>
		</>
	);
};
