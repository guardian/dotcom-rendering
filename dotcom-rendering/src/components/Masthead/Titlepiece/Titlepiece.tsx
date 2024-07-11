import { css } from '@emotion/react';
import {
	between,
	from,
	headlineBold14,
	space,
	textSans14,
} from '@guardian/source/foundations';
import {
	Hide,
	SvgGuardianLogo,
	SvgMenu,
} from '@guardian/source/react-components';
import type { EditionId } from '../../../lib/edition';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type { NavType } from '../../../model/extract-nav';
import { palette as themePalette } from '../../../palette';
import { TitlepieceEditionDropdown } from './EditionDropdown';
// import { TitlepieceExpandedNav } from './ExpandedNav/ExpandedNav';
import { Grid } from './Grid';
import { Pillars } from './Pillars';

interface Props {
	nav: NavType;
	editionId: EditionId;
	showSubNav?: boolean;
	isImmersive?: boolean;
	hasPageSkin?: boolean;
}

export const pillarLeftMarginPx = 6;

export const pillarWidthsPx = {
	tablet: 108,
	leftCol: 125,
	wide: 136,
};

const veggieBurgerDiameter = 40;

const editionSwitcherMenuStyles = css`
	grid-column: content-start / content-end;
	grid-row: 1;
	${from.mobileMedium} {
		justify-self: end;
	}
`;

const guardianLogoStyles = css`
	z-index: 2;
	grid-column: content-start / content-end;
	grid-row: 1;
	justify-self: end;
	align-self: end;
	margin-top: ${space[2]}px;
	margin-bottom: 6px;
	margin-right: ${veggieBurgerDiameter + space[3]}px;
	${from.mobileMedium} {
		margin-right: 0;
	}
	svg {
		height: 49px;
		${between.mobileMedium.and.tablet} {
			height: 67px;
		}
		${between.tablet.and.desktop} {
			height: 96px;
		}
		${between.desktop.and.leftCol} {
			height: 94px;
		}
		${from.leftCol} {
			height: 135px;
		}
	}
	${between.mobileLandscape.and.desktop} {
		margin-bottom: 8px;
	}
	${from.desktop} {
		margin-bottom: 10px;
	}
`;

const burgerStyles = css`
	z-index: 2;
	grid-column: content-start / content-end;
	grid-row: 1;
	justify-self: end;
	align-self: end;
	height: ${veggieBurgerDiameter}px;
	width: ${veggieBurgerDiameter}px;
	margin-bottom: 6px;
	border-radius: 50%;
	background-color: ${themePalette('--masthead-veggie-burger-background')};
	justify-content: center;
	display: flex;
	:hover {
		background-color: ${themePalette(
			'--masthead-veggie-burger-background-hover',
		)};
	}
	${from.mobileMedium} {
		grid-row: 2;
		align-self: center;
	}
	${from.desktop} {
		/** TODO - include veggie burger in desktop version of <Pillars /> */
		display: none;
	}
`;

const pillarsNavStyles = css`
	grid-column: content-start / content-end;
	grid-row: 2;
	align-self: end;

	${headlineBold14}
	margin-top: ${space[2]}px;
	border-bottom: 1px solid ${themePalette('--masthead-nav-lines')};

	${from.desktop} {
		grid-row: 1 / 2;
	}
`;

const subnavStyles = css`
	grid-column: content-start / content-end;
	grid-row: 3;
	${textSans14}
	color: inherit;
	height: 28px;
	margin-top: ${space[2]}px;

	overflow-x: scroll;
	width: calc(100% + 10px);

	${from.mobileMedium} {
		margin-top: ${space[3]}px;
	}
	${from.tablet} {
		width: calc(100% + ${space[5]}px);
	}
	${from.leftCol} {
		margin-top: 14px;
	}
`;

const subnavListStyles = css`
	display: flex;
	column-gap: ${space[3]}px;
`;
const subnavListItemStyles = css`
	white-space: nowrap;
`;

const subnavLinkStyles = css`
	color: ${themePalette('--masthead-nav-link-text')};
	text-decoration: none;
`;

export const Titlepiece = ({
	nav,
	editionId,
	showSubNav,
	isImmersive,
	hasPageSkin,
}: Props) => {
	return (
		<Grid
			type="section"
			style={{
				backgroundColor: themePalette('--masthead-nav-background'),
				color: themePalette('--masthead-nav-link-text'),
			}}
		>
			{/* Edition menu */}
			<div css={editionSwitcherMenuStyles}>
				<TitlepieceEditionDropdown
					editionId={editionId}
					dataLinkName={''}
				/>
			</div>

			{/* Guardian logo */}
			<div css={guardianLogoStyles}>
				<a href="https://theguardian.com">
					<SvgGuardianLogo
						textColor={themePalette('--masthead-nav-link-text')}
					/>
				</a>
			</div>

			{/* Pillars nav */}
			<nav css={pillarsNavStyles}>
				{/* Pillars nav mobile version */}
				<Hide from="desktop">
					<Pillars
						nav={nav}
						dataLinkName={nestedOphanComponents(
							'header',
							'titlepiece',
							'nav',
						)}
						selectedPillar={nav.selectedPillar}
						isImmersive={isImmersive}
						showBurgerMenu={false}
						hasPageSkin={hasPageSkin}
					/>
				</Hide>

				{/* Pillars nav desktop version (contains veggie burger) */}
				<Hide until="desktop">
					<Pillars
						nav={nav}
						dataLinkName={nestedOphanComponents(
							'header',
							'titlepiece',
							'nav',
						)}
						selectedPillar={nav.selectedPillar}
						isImmersive={isImmersive}
						showBurgerMenu={true}
						hasPageSkin={hasPageSkin}
					/>
				</Hide>

				{/* <TitlepieceExpandedNav
					nav={nav}
					editionId={editionId}
					isImmersive={isImmersive}
					hasPageSkin={hasPageSkin}
				/> */}
			</nav>

			{/* Veggie burger menu */}
			{/* <Hide from="desktop"> */}
			<div css={burgerStyles}>
				<SvgMenu
					size="small"
					theme={{
						fill: themePalette('--masthead-veggie-burger-icon'),
					}}
				/>
			</div>
			{/* </Hide> */}

			{/* Subnav */}
			{nav.subNavSections && showSubNav && (
				<nav css={subnavStyles}>
					<ul css={subnavListStyles}>
						{nav.subNavSections.links.map(({ title, url }) => (
							<li key={title} css={subnavListItemStyles}>
								<a href={url} css={subnavLinkStyles}>
									{title}
								</a>
							</li>
						))}
					</ul>
				</nav>
			)}
		</Grid>
	);
};
