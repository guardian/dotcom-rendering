import { css } from '@emotion/react';
import {
	from,
	headlineBold14,
	space,
	textSansBold14,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import { Hide, SvgMenu } from '@guardian/source/react-components';
import type { EditionId } from '../../../lib/edition';
import { getZIndex } from '../../../lib/getZIndex';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type { NavType } from '../../../model/extract-nav';
import { palette as themePalette } from '../../../palette';
import { pageMargin, smallMobilePageMargin } from './constants';
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

const veggieBurgerDiameter = 40;

const gridContent = css`
	grid-column: content-start / content-end;
`;

const gridMainColumn = css`
	grid-column: main-column-start / main-column-end;
`;

const editionSwitcherMenuStyles = css`
	${gridMainColumn}
	grid-row: 1;
	${from.mobileMedium} {
		justify-self: end;
	}
`;

const accreditationStyles = css`
	${gridContent}
	grid-row: 1;
	justify-self: start;
	align-self: start;
	display: flex;
	flex-wrap: wrap;
	padding-top: 10px;
	color: ${themePalette('--masthead-accreditation-text')};

	${textSansBold14}
	${from.leftCol} {
		${textSansBold17}
	}

	${until.mobileMedium} {
		display: none;
	}
	${until.mobileLandscape} {
		max-width: 100px;
	}
`;

const logoStyles = css`
	${getZIndex('TheGuardian')}
	${gridMainColumn}
	grid-row: 1;
	justify-self: end;
	align-self: end;
	margin-top: ${space[2]}px;
	margin-bottom: 6px;
	margin-right: ${veggieBurgerDiameter + space[3]}px;
	${from.mobileMedium} {
		margin-right: 0;
	}
	${from.mobileLandscape} {
		margin-bottom: 8px;
	}
	${from.desktop} {
		margin-bottom: 10px;
	}

	svg {
		width: 152px;
		${from.mobileMedium} {
			width: 207px;
		}
		${from.tablet} {
			width: 297px;
		}
		${from.desktop} {
			width: 291px;
		}
	}
`;

const logoStylesWithoutPageSkin = css`
	svg {
		${from.leftCol} {
			width: 356px;
		}
	}
`;

const burgerStyles = css`
	z-index: 2;
	${gridMainColumn}
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
	${gridContent}
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
		bottom: 0;
		left: 0;
		right: 0;
	}
`;

/** The divider length should match the width of the subnav */
const dividerOverridesForSubNav = css`
	&::after {
		left: 0;
		right: -${smallMobilePageMargin};

		${from.mobileLandscape} {
			right: -${pageMargin};
		}

		${from.tablet} {
			right: 0;
		}
	}
`;

const subNavWrapper = css`
	/** Relative positioning needed on the wrapper to allow
	  the pseudo after element to position absolutely */
	position: relative;
	${gridContent}
	grid-row: 3;

	/** We increase the width of the subnav to let it overflow
	 on the right to help indicate scrollability */
	width: calc(100% + ${smallMobilePageMargin});
	${from.mobileLandscape} {
		width: calc(100% + ${pageMargin});
	}
	${from.tablet} {
		width: 100%;
	}

	/** This additional padding on the right of the subnav list allows
	 the list items to remain visible with the fade overlay */
	ul {
		padding-right: ${space[8]}px;
	}

	/** Adds a fade overlay to the RHS of the subnav area,
	 to visually hint that it is scrollable horizontally */
	::after {
		content: '';
		position: absolute;
		width: ${space[10]}px;
		height: 100%;
		right: 0;
		top: 0;
		bottom: 0;
		background: linear-gradient(
			to right,
			transparent,
			${themePalette('--masthead-nav-background')}
		);
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
			hasPageSkin={hasPageSkin}
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
			<div css={[logoStyles, !hasPageSkin && logoStylesWithoutPageSkin]}>
				<Logo />
			</div>

			{editionId === 'UK' && (
				<span css={accreditationStyles}>News provider of the year</span>
			)}

			{/* Pillars nav */}
			<nav
				css={[
					pillarsNavStyles,
					horizontalDivider,
					showSubNav &&
						nav.subNavSections &&
						dividerOverridesForSubNav,
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
					css={subNavWrapper}
					data-print-layout="hide"
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
