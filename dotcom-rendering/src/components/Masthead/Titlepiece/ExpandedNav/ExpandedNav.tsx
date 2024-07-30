/**
 * @file
 * This file was largely copied from src/components/Nav/ExpandedMenu/ExpandedMenu.tsx
 */
import { css } from '@emotion/react';
import { from, space, textSans20, until } from '@guardian/source/foundations';
import type { EditionId } from '../../../../lib/edition';
import { getZIndex } from '../../../../lib/getZIndex';
import type { NavType } from '../../../../model/extract-nav';
import { palette as themePalette } from '../../../../palette';
import { expandedMenu, navInputCheckboxId } from '../constants';
import { Sections } from './Sections';

const wrapperMainMenuStyles = css`
	background-color: rgba(0, 0, 0, 0.5);
	${getZIndex('expanded-veggie-menu-wrapper')}
	left: 0;
	top: 0;

	/* Default state is for the menu to be collapsed or hidden */
	${until.desktop} {
		/* the negative translateX makes the nav hide to the side */
		transform: translateX(-110%);
		transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		/** TODO - update the box shadow colour to use the themed palette */
		box-shadow: ${space[1]}px 0 ${space[4]}px rgba(0, 0, 0, 0.4);
		bottom: 0;
		height: 100%;
		overflow: auto;
		position: fixed;
		right: 0;
		will-change: transform;
	}
	${from.desktop} {
		display: none;
	}

	/*
        IMPORTANT NOTE:
        we need to specify the adjacent path to the a (current) tag
        to apply styles to the nested tabs due to the fact we use ~
        to support NoJS

		The following styles apply if the menu is open (checkbox is checked)
    */
	${`#${navInputCheckboxId}`}:checked ~ div & {
		${until.desktop} {
			/* menu appears from left of screen on mobile when translateX is set to 0% */
			transform: translateX(0%);
		}
		${from.desktop} {
			display: block;
			overflow: visible;
		}
	}
`;

const mainMenuStyles = css`
	background-color: ${themePalette('--masthead-nav-background')};
	${textSans20};
	${getZIndex('expanded-veggie-menu')}
	overflow: hidden;
	position: fixed;
	left: 0;
	top: 0;
	box-sizing: border-box;

	margin-right: 28px;
	${from.mobileLandscape} {
		margin-right: 40px;
	}
	${from.tablet} {
		margin-right: 100px;
	}
	${from.desktop} {
		position: absolute;
		padding-bottom: 0;
		padding-top: 0;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		@supports (width: 100vw) {
			left: 50%;
			right: 50%;
			width: 100vw;
			margin-left: -50vw;
			margin-right: -50vw;
		}
	}
`;

type Props = {
	editionId: EditionId;
	nav: NavType;
	isImmersive?: boolean;
	hasPageSkin?: boolean;
};

/**
 * Entrypoint for the expanded navigation (via burger menu) to open the
 * secondary pillar links, other Guardian links as well as
 * non journalistic links for support asks and other marketing.
 */
export const ExpandedNav = ({
	isImmersive,
	nav,
	editionId,
	hasPageSkin,
}: Props) => {
	return (
		<div
			id={expandedMenu}
			data-testid="expanded-menu"
			css={wrapperMainMenuStyles}
		>
			<div
				css={css`
					${from.desktop} {
						position: relative;
					}
				`}
			>
				<div css={mainMenuStyles}>
					<Sections
						editionId={editionId}
						isImmersive={isImmersive}
						nav={nav}
						hasPageSkin={hasPageSkin}
					/>
				</div>
			</div>
		</div>
	);
};
