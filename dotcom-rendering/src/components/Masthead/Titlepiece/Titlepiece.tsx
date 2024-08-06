import { css, Global } from '@emotion/react';
import {
	from,
	headlineBold14,
	space,
	textSansBold14,
	textSansBold17,
	until,
	visuallyHidden,
} from '@guardian/source/foundations';
import type { EditionId } from '../../../lib/edition';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type { NavType } from '../../../model/extract-nav';
import { palette as themePalette } from '../../../palette';
import {
	expandedMenuRootId,
	navInputCheckboxId,
	pageMargin,
	smallMobilePageMargin,
	veggieBurgerId,
} from './constants';
import { EditionDropdown } from './EditionDropdown';
import { ExpandedNav } from './ExpandedNav/ExpandedNav';
import { Grid } from './Grid';
import { Logo } from './Logo';
import { Pillars, verticalDivider } from './Pillars';
import { SubNav } from './SubNav';
import { VeggieBurger } from './VeggieBurger';

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

	${until.mobileMedium} {
		display: none;
	}
	${until.mobileLandscape} {
		max-width: 100px;
	}
`;

const accreditationStylesFromLeftCol = css`
	${from.leftCol} {
		${textSansBold17}
	}
`;

const logoStyles = css`
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

	svg {
		width: 152px;
		${from.mobileMedium} {
			width: 207px;
		}
		${from.tablet} {
			width: 252px;
		}
		${from.desktop} {
			width: 291px;
		}
	}
`;

const logoStylesFromLeftCol = css`
	svg {
		${from.leftCol} {
			width: 324px;
		}
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
		li:last-of-type {
			${verticalDivider}
		}
	}
`;

const burgerStyles = css`
	${gridContent}
	grid-row: 1;
	align-self: center;
	${from.mobileMedium} {
		grid-row: 1 / 3;
		align-self: end;
	}
	justify-content: center;
	display: flex;
	justify-self: end;
	position: relative;
	bottom: 2px;
	${from.mobileMedium} {
		bottom: ${space[1]}px;
	}
	${from.desktop} {
		right: 354px;
		bottom: 6px;
	}
`;

const burgerStylesFromLeftCol = css`
	${from.leftCol} {
		right: 430px;
		bottom: 14px;
	}
	${from.wide} {
		right: 534px;
	}
`;

const expandedNavStyles = css`
	${gridContent}
	grid-row: 2;
	margin-top: -1px;
`;

const horizontalDivider = css`
	position: relative;
	&::after {
		content: '';
		position: absolute;
		border-bottom: 1px solid ${themePalette('--masthead-nav-lines')};
		bottom: 0;
		right: -${smallMobilePageMargin};
		left: -${smallMobilePageMargin};

		${from.mobileLandscape} {
			left: -${pageMargin};
			right: -${pageMargin};
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

	${from.tablet} {
		:before {
			content: '';
			border-left: 1px solid ${themePalette('--masthead-nav-lines')};
			position: absolute;
			left: -${pageMargin};
			top: 0;
			bottom: 0;
		}

		:after {
			content: '';
			border-left: 1px solid ${themePalette('--masthead-nav-lines')};
			position: absolute;
			right: -${pageMargin};
			top: 0;
			bottom: 0;
		}
	}

	/** This additional padding on the right of the subnav list allows
	 the list items to remain visible with the fade overlay */
	ul {
		padding-right: ${space[8]}px;
		position: relative;

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
			type="nav"
			style={{
				backgroundColor: themePalette('--masthead-nav-background'),
				color: themePalette('--masthead-nav-link-text'),
			}}
			hasPageSkin={hasPageSkin}
		>
			{/** The following Global styles, comment and script logic are lifted from /src/components/Nav/Nav.tsx: */}
			<Global
				styles={css`
					/* We apply this style when the side navigation is open the prevent the document body from scrolling */
					/* See Nav.tsx */
					.nav-is-open {
						${until.desktop} {
							overflow: hidden;
							height: 100vh;
						}
					}
				`}
			/>
			{/*
	           IMPORTANT NOTE: Supporting NoJS and accessibility is hard.
                We therefore use JS to make the Nav elements more accessible. We add a
                keydown `addEventListener` to both the veggie burger button and the show
                more menu buttons. We also listen to escape key presses to close the Nav menu.
                We also toggle the tabindex of clickable items to make sure that even when we
                are displaying the menu on mobile and tablet, that it doesnt get highlighted
                when tabbing though the page.
                This is not a perfect solution as not all screen readers support JS
                https://webaim.org/projects/screenreadersurvey8/#javascript
            */}
			<script
				dangerouslySetInnerHTML={{
					__html: `document.addEventListener('DOMContentLoaded', function () {

					/** The checkbox input element used to toggle the navigation menu. */
					const navInputCheckbox = document.getElementById('${navInputCheckboxId}');

					/** The veggie burger button element used to open/close the menu. */
					const veggieBurger = document.getElementById('${veggieBurgerId}');

					/** List of menu items that should be selectable when the menu is open. */
					const expandedMenuClickableTags = document.querySelectorAll(
						'.selectableMenuItem',
					);

					/** The root element of the expanded menu. */
					const expandedMenu = document.getElementById('${expandedMenuRootId}');

					/** The label for the first column in the menu, assumed to be "News".*/
					const firstColLabel = document.getElementById('News-button');

					/** The link element in the second list item under news links. */
					const firstColLink = document.querySelector(
						'#newsLinks > li:nth-of-type(2) > a',
					);

					/**
					 * Focuses on the first navigation element depending on whether the first column label is visible.
					 *
					 * If the first column label is not visible, the function focuses on the first link element.
					 * Otherwise, it focuses on the first column label.
					 */
					const focusOnFirstNavElement = () => {
						if (window.getComputedStyle(firstColLabel).display === 'none') {
							firstColLink.focus();
						} else {
							firstColLabel.focus();
						}
					};

					/**
					 * Updates ARIA attributes and tabindex values based on whether the menu is open or closed.
					 */
					const updateAttributesForMenu = (isOpen) => {
						firstColLabel.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
						veggieBurger.setAttribute(
							'data-link-name',
							isOpen
								? 'header : veggie-burger : hide'
								: 'header : veggie-burger : show',
						);
						expandedMenuClickableTags.forEach((tag) => {
							tag.setAttribute('tabindex', isOpen ? '0' : '-1');
						});
					};

					/** Toggles the navigation menu by simulating a click on the checkbox. */
					const toggleMainMenu = () => {
						if (navInputCheckbox) {
							navInputCheckbox.click();
						}
					};

					/**
					 * Handles keydown events to toggle the menu when the Enter or Space key is pressed.
					 */
					const keydownToggleMainMenu = (e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							toggleMainMenu();
						}
					};

					/**
					 * Handles click events to manage the state of the navigation menu.
					 *
					 * - Toggles the menu open/close state when the menu button (veggieBurger) is clicked.
					 * - Closes the menu if the click occurs outside both the menu button and the expanded menu.
					 */
						const handleMenuClick = (e) => {
							const menuButtonClicked = veggieBurger.contains(e.target);
							const clickInsideMenu = expandedMenu.contains(e.target);
							const menuIsOpen = navInputCheckbox.checked
							if (menuButtonClicked) {
									document.body.classList.toggle('nav-is-open');
									updateAttributesForMenu(menuIsOpen);
									if (menuIsOpen) {
										focusOnFirstNavElement();
									}
							}

							if (!menuButtonClicked && !clickInsideMenu && menuIsOpen) {
									toggleMainMenu()
							}
						};

					/** Adds event listeners to manage the navigation menu. */
					if (navInputCheckbox) {
						document.addEventListener('click', handleMenuClick);

						veggieBurger.addEventListener('keydown', keydownToggleMainMenu);

						document.addEventListener('keydown', (e) => {
							if (e.key === 'Escape' && navInputCheckbox.checked) {
								toggleMainMenu();
								veggieBurger.focus();
							}
						});
					}
				});`,
				}}
			/>

			{/* Edition switcher menu */}
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
			<div css={[logoStyles, !hasPageSkin && logoStylesFromLeftCol]}>
				<Logo />
			</div>

			{editionId === 'UK' && (
				<span
					css={[
						accreditationStyles,
						!hasPageSkin && accreditationStylesFromLeftCol,
					]}
				>
					News provider of the year
				</span>
			)}

			{/** Expanded menu checkbox */}
			<input
				type="checkbox"
				css={css`
					${visuallyHidden};
				`}
				id={navInputCheckboxId}
				name="more"
				tabIndex={-1}
				key="OpenExpandedMenuCheckbox"
				aria-hidden="true"
				role="button"
				aria-expanded="false"
				aria-haspopup="true"
			/>

			{/* Pillars nav */}
			<div css={[pillarsNavStyles, horizontalDivider]}>
				<Pillars
					nav={nav}
					dataLinkName={nestedOphanComponents(
						'header',
						'titlepiece',
						'nav',
					)}
					selectedPillar={nav.selectedPillar}
					isImmersive={isImmersive}
					hasPageSkin={hasPageSkin}
				/>
			</div>

			{/** Veggie burger menu button */}
			<div css={[burgerStyles, !hasPageSkin && burgerStylesFromLeftCol]}>
				<VeggieBurger />
			</div>

			{/** Expanded menu */}
			<div id={expandedMenuRootId} css={expandedNavStyles}>
				<ExpandedNav
					isImmersive={isImmersive}
					nav={nav}
					editionId={editionId}
					hasPageSkin={hasPageSkin}
				/>
			</div>

			{/** Subnav */}
			{showSubNav && nav.subNavSections && (
				<div
					css={subNavWrapper}
					data-print-layout="hide"
					data-testid="sub-nav"
					data-component="sub-nav"
				>
					<SubNav
						subNavSections={nav.subNavSections}
						currentNavLink={nav.currentNavLink}
					/>
				</div>
			)}
		</Grid>
	);
};
