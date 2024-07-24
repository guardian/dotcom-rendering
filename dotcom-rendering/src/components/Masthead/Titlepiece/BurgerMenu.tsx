import { css } from '@emotion/react';
import {
	from,
	textSans20,
	until,
	visuallyHidden,
} from '@guardian/source/foundations';
import { SvgCross, SvgMenu } from '@guardian/source/react-components';
import type { EditionId } from '../../../lib/edition';
import { getZIndex } from '../../../lib/getZIndex';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type { NavType } from '../../../model/extract-nav';
import { palette as themePalette } from '../../../palette';
import { navInputCheckboxId } from './constants';
import { Sections } from './ExpandedNav/Sections';

const screenReadable = css`
	${visuallyHidden};
`;

const hideIfMenuOpened = css`
	${`#${navInputCheckboxId}`}:checked ~ div & {
		display: none;
	}
`;

const hideIfMenuClosed = css`
	${`#${navInputCheckboxId}`}:not(:checked) ~ div & {
		display: none;
	}
`;

const iconWrapper = css`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: ${themePalette('--masthead-veggie-burger-background')};

	:hover {
		background-color: ${themePalette(
			'--masthead-veggie-burger-background-hover',
		)};
	}

	:focus {
		outline: none;
	}
`;

const wrapperMainMenuStyles = css`
	background-color: rgba(0, 0, 0, 0.5);
	${getZIndex('expanded-veggie-menu-wrapper')}
	left: 0;
	top: 0;
	/*
        IMPORTANT NOTE:
        we need to specify the adjacent path to the a (current) tag
        to apply styles to the nested tabs due to the fact we use ~
        to support NoJS
    */
	/* stylelint-disable-next-line selector-type-no-unknown */
	${`#${navInputCheckboxId}`}:checked ~ div & {
		${from.desktop} {
			display: block;
			overflow: visible;
		}
	}

	/* refer to comment above */
	/* stylelint-disable */
	${`#${navInputCheckboxId}`}:checked ~ div & {
		${until.desktop} {
			transform: translateX(
				0%
			); /* when translateX is set to 0% it reapears on the screen */
		}
	}

	${until.desktop} {
		/* the negative translateX makes the nav hide to the side */
		/* transform: translateX(-110%); */
		transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		box-shadow: 3px 0 16px rgba(0, 0, 0, 0.4);
		bottom: 0;
		height: 100%;
		overflow: auto;
		position: fixed;
		right: 0;
		will-change: transform;
	}
	${from.desktop} {
		position: relative;
	}
`;

const mainMenuStyles = css`
	background-color: ${themePalette('--masthead-nav-background')};
	box-sizing: border-box;
	${textSans20};
	margin-right: 29px;
	left: 0;
	top: 0;
	${getZIndex('expanded-veggie-menu')}
	overflow: hidden;
	position: fixed;

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

	${from.mobileMedium} {
		margin-right: 29px;
	}
	${from.mobileLandscape} {
		margin-right: 40px;
	}
	${from.tablet} {
		margin-right: 100px;
	}
`;

type Props = {
	editionId: EditionId;
	nav: NavType;
	isImmersive?: boolean;
	hasPageSkin?: boolean;
};

export const BurgerMenu = ({
	isImmersive,
	nav,
	editionId,
	hasPageSkin,
}: Props) => {
	return (
		<div id="expanded-menu-root">
			<input
				type="checkbox"
				// css={screenReadable}
				id={navInputCheckboxId}
				name="more"
				tabIndex={-1}
				key="OpenExpandedMenuCheckbox"
				aria-hidden="true"
				role="button"
				aria-expanded="false"
				aria-haspopup="true"
			/>

			<label
				id={navInputCheckboxId}
				aria-label="Toggle main menu"
				key="OpenExpandedMenuButton"
				htmlFor={navInputCheckboxId}
				data-link-name={nestedOphanComponents(
					'header',
					'veggie-burger',
					'show',
				)}
				tabIndex={0}
				// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role -- we’re using this label for a CSS-only toggle
				role="button"
				data-testid="veggie-burger"
			>
				<span
					id="nav-menu-closed"
					css={[iconWrapper, hideIfMenuOpened]}
				>
					<span css={screenReadable}>Show more</span>
					<SvgMenu
						size="small"
						theme={{
							fill: themePalette('--masthead-veggie-burger-icon'),
						}}
					/>
				</span>

				<span
					id="nav-menu-expanded"
					css={[iconWrapper, hideIfMenuClosed]}
				>
					<span css={screenReadable}>Hide expanded menu</span>
					<SvgCross
						size="small"
						theme={{
							fill: themePalette('--masthead-veggie-burger-icon'),
						}}
					/>
				</span>
			</label>

			<div
				id="expanded-menu"
				data-testid="expanded-menu"
				css={wrapperMainMenuStyles}
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
