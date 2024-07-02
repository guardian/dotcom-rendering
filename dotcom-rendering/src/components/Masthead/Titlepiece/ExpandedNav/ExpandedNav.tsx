import { css } from '@emotion/react';
import {
	from,
	textSans20,
	// until,
} from '@guardian/source/foundations';
import type { EditionId } from '../../../../lib/edition';
import { getZIndex } from '../../../../lib/getZIndex';
import type { NavType } from '../../../../model/extract-nav';
// import { navInputCheckboxId } from '../../../Nav/config';
import { palette as themePalette } from '../../../../palette';
import { VeggieBurgerMenu } from '../VeggieBurger';
import { Sections } from './Sections';

// const wrapperMainMenuStyles = css`
// 	background-color: rgba(0, 0, 0, 0.5);
// 	${getZIndex('expanded-veggie-menu-wrapper')}
// 	left: 0;
// 	top: 0;
// 	/*
//         IMPORTANT NOTE:
//         we need to specify the adjacent path to the a (current) tag
//         to apply styles to the nested tabs due to the fact we use ~
//         to support NoJS
//     */
// 	/* stylelint-disable-next-line selector-type-no-unknown */
// 	${`#${navInputCheckboxId}`}:checked ~ div & {
// 		${from.desktop} {
// 			display: block;
// 			overflow: visible;
// 		}
// 	}

// 	/* refer to comment above */
// 	/* stylelint-disable */
// 	${`#${navInputCheckboxId}`}:checked ~ div & {
// 		${until.desktop} {
// 			transform: translateX(
// 				0%
// 			); /* when translateX is set to 0% it reapears on the screen */
// 		}
// 	}

// 	${until.desktop} {
// 		transform: translateX(
// 			-110%
// 		); /* the negative translateX makes the nav hide to the side */
// 		transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
// 		box-shadow: 3px 0 16px rgba(0, 0, 0, 0.4);
// 		bottom: 0;
// 		height: 100%;
// 		overflow: auto;
// 		position: fixed;
// 		right: 0;
// 		will-change: transform;
// 	}
// 	${from.desktop} {
// 		display: relative;
// 	}
// `;

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

export const TitlepieceExpandedNav = ({
	isImmersive,
	nav,
	editionId,
	hasPageSkin,
}: Props) => {
	return (
		<div id="expanded-menu-root">
			<VeggieBurgerMenu isImmersive={isImmersive} />
			{/* <div
				id="expanded-menu"
				data-testid="expanded-menu"
				css={wrapperMainMenuStyles}
			> */}
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
			{/* </div> */}
		</div>
	);
};
