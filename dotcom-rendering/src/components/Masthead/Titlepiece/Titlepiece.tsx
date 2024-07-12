import { css } from '@emotion/react';
import {
	from,
	headlineBold14,
	space,
	textSans14,
} from '@guardian/source/foundations';
import { Hide, SvgMenu } from '@guardian/source/react-components';
import type { EditionId } from '../../../lib/edition';
import { getZIndex } from '../../../lib/getZIndex';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type { NavType } from '../../../model/extract-nav';
import { palette as themePalette } from '../../../palette';
import { EditionDropdown } from './EditionDropdown';
import { Grid } from './Grid';
import { Logo } from './Logo';
import { Pillars } from './Pillars';
import { SubNav } from './SubNav';

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

const gridFullWidth = css`
	grid-column: content-start / content-end;
`;

const editionSwitcherMenuStyles = css`
	${gridFullWidth}
	grid-row: 1;
	${from.mobileMedium} {
		justify-self: end;
	}
`;

const guardianLogoStyles = css`
	${getZIndex('TheGuardian')}
	${gridFullWidth}
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
		width: 144px;
		${from.mobileMedium} {
			width: 198px;
		}
		${from.tablet} {
			width: 280px;
		}
		${from.desktop} {
			width: 276px;
		}
		${from.leftCol} {
			width: 398px;
		}
	}
	${from.mobileLandscape} {
		margin-bottom: 8px;
	}
	${from.desktop} {
		margin-bottom: 10px;
	}
`;

const burgerStyles = css`
	z-index: 2;
	${gridFullWidth}
	grid-row: 1;
	justify-content: center;
	display: flex;
	justify-self: end;
	align-self: end;
	height: ${veggieBurgerDiameter}px;
	width: ${veggieBurgerDiameter}px;
	border-radius: 50%;
	background-color: ${themePalette('--masthead-veggie-burger-background')};
	margin-bottom: 6px;

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
	${gridFullWidth}
	grid-row: 2;
	align-self: end;

	${headlineBold14}
	margin-top: ${space[2]}px;

	${from.desktop} {
		grid-row: 1 / 2;
	}
`;

const horizontalDivider = css`
	position: relative;
	z-index: 1;
	&::after {
		content: '';
		position: absolute;
		border-bottom: 1px solid ${themePalette('--masthead-nav-lines')};
		bottom: -1px;
		left: -10px;
		right: -10px;

		${from.mobileLandscape} {
			left: -${space[5]}px;
			right: -${space[5]}px;
		}

		${from.phablet} {
			left: 0;
			right: 0;
		}

		${from.tablet} {
			left: -${space[5]}px;
			right: -${space[5]}px;
		}
	}
`;

const dividerWidthWithSubNav = css`
	&::after {
		left: 0;
		right: -10px;

		${from.mobileLandscape} {
			right: -${space[5]}px;
		}
	}
`;

const subnavStyles = css`
	grid-column: content-start / content-end;
	grid-row: 3;
	overflow-x: scroll;
	width: calc(100% + 10px);
	${from.mobileLandscape} {
		width: calc(100% + ${space[5]}px);
	}

	${textSans14}
	color: inherit;
	min-height: 28px;
	margin-top: ${space[2]}px;
	${from.mobileMedium} {
		margin-top: ${space[3]}px;
	}
	${from.tablet} {
		min-height: 30px;
	}
	${from.leftCol} {
		margin-top: 14px;
	}
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
				<EditionDropdown
					editionId={editionId}
					dataLinkName={nestedOphanComponents(
						'header',
						'titlepiece',
						'edition-picker: toggle',
					)}
				/>
			</div>

			{/* Guardian logo */}
			<div css={guardianLogoStyles}>
				<Logo editionId={editionId} />
			</div>

			{/* Pillars nav */}
			<nav
				css={[
					pillarsNavStyles,
					horizontalDivider,
					showSubNav && nav.subNavSections && dividerWidthWithSubNav,
				]}
			>
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

				{/* <ExpandedNav
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

			{showSubNav && nav.subNavSections && (
				<nav
					data-print-layout="hide"
					css={subnavStyles}
					data-testid="sub-nav"
					data-component="sub-nav"
				>
					<SubNav
						subNavSections={nav.subNavSections}
						currentNavLink={nav.currentNavLink}
					/>
				</nav>
			)}
		</Grid>
	);
};
