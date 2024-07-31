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
import { getZIndex } from '../../../lib/getZIndex';
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
	${getZIndex('burger')};
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
	padding-bottom: 2px;
	${from.mobileMedium} {
		padding-bottom: ${space[1]}px;
	}
	${from.desktop} {
		margin-right: 356px;
		padding-bottom: 6px;
	}
`;

const burgerStylesFromLeftCol = css`
	${from.leftCol} {
		margin-right: 428px;
		padding-bottom: ${space[2]}px;
	}
	${from.wide} {
		margin-right: 536px;
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
					__html: `document.addEventListener('DOMContentLoaded', function(){
                        // Used to toggle data-link-name on label buttons
                        var navInputCheckbox = document.getElementById('${navInputCheckboxId}')
                        var veggieBurger = document.getElementById('${veggieBurgerId}')
                        var expandedMenuClickableTags = document.querySelectorAll('.selectableMenuItem')
                        var expandedMenu = document.getElementById('${expandedMenuRootId}')
                        // We assume News is the 1st column
                        var firstColLabel = document.getElementById('News-button')
                        var firstColLink = document.querySelectorAll('#newsLinks > li:nth-of-type(2) > a')[0]
                        var focusOnFirstNavElement = function(){
                          // need to focus on first element in list, firstColLabel is not viewable on desktop
                          if(window.getComputedStyle(firstColLabel).display === 'none'){
                            firstColLink.focus()
                          } else {
                            firstColLabel.focus()
                          }
                        }
						if (!navInputCheckbox) return;
                        navInputCheckbox.addEventListener('click',function(){
                          document.body.classList.toggle('nav-is-open')
                          if(!navInputCheckbox.checked) {
							firstColLabel.setAttribute('aria-expanded', 'false')
                            veggieBurger.setAttribute('data-link-name','header : veggie-burger : show')
                            expandedMenuClickableTags.forEach(function($selectableElement){
                                $selectableElement.setAttribute('tabindex','-1')
                            })
                          } else {
							firstColLabel.setAttribute('aria-expanded', 'true')
                            veggieBurger.setAttribute('data-link-name','header : veggie-burger : hide')
                            expandedMenuClickableTags.forEach(function($selectableElement){
                                $selectableElement.setAttribute('tabindex','0')
                            })
                            focusOnFirstNavElement()
                          }
                        })
                        var toggleMainMenu = function(e){
                          navInputCheckbox.click()
                        }
                        // Close hide menu on press enter
                        var keydownToggleMainMenu = function(e){
                          // keyCode: 13 => Enter key | keyCode: 32 => Space key
                          if (e.keyCode === 13 || e.keyCode === 32) {
                            e.preventDefault()
                            toggleMainMenu()
                          }
                        }
                        veggieBurger.addEventListener('keydown', keydownToggleMainMenu)
                        // Accessibility to hide Nav when pressing escape key
                        document.addEventListener('keydown', function(e){
                          // keyCode: 27 => esc
                          if (e.keyCode === 27) {
                            if(navInputCheckbox.checked) {
                              toggleMainMenu()
                              veggieBurger.focus()
                            }
                          }
                        })
                        // onBlur close dialog
                        document.addEventListener('mousedown', function(e){
                          if(navInputCheckbox.checked && !expandedMenu.contains(e.target)){
                            toggleMainMenu()
                          }
                        });
                      })`,
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
			<div
				css={[
					pillarsNavStyles,
					horizontalDivider,
					showSubNav &&
						nav.subNavSections &&
						dividerOverridesForSubNav,
				]}
			>
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
