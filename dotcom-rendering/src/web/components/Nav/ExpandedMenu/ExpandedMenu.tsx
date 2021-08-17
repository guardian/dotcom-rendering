import { css } from '@emotion/react';

import { brandBackground } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

import { getZIndex } from '@root/src/web/lib/getZIndex';
import { Display } from '@guardian/types';

import { ShowMoreMenu } from './ShowMoreMenu';
import { VeggieBurgerMenu } from './VeggieBurgerMenu';
import { Columns } from './Columns';
import { navInputCheckboxId } from '../config';

const wrapperMainMenuStyles = css`
	background-color: rgba(0, 0, 0, 0.5);
	${getZIndex('expanded-veggie-menu-wrapper')}
	left: 0;
	top: 0;

	${from.desktop} {
		display: none;
	}

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
		transform: translateX(
			-110%
		); /* the negative translateX makes the nav hide to the side */
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
		display: none;
	}
`;

const mainMenuStyles = css`
	background-color: ${brandBackground.primary};
	box-sizing: border-box;
	${textSans.large()};
	margin-right: 29px;
	left: 0;
	top: 0;
	${getZIndex('expanded-veggie-menu')}
	overflow: hidden;

	${from.desktop} {
		position: absolute;
		padding-bottom: 0;
		padding-top: 0;
		top: 100%;
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

export const ExpandedMenu: React.FC<{
	display: Display;
	nav: NavType;
}> = ({ display, nav }) => {
	return (
		<div id="expanded-menu-root">
			<ShowMoreMenu display={display} />
			<VeggieBurgerMenu display={display} />
			<div id="expanded-menu" css={wrapperMainMenuStyles}>
				<div
					css={mainMenuStyles}
					data-testid="expanded-menu"
					data-cy="expanded-menu"
				>
					<Columns nav={nav} />
				</div>
			</div>
		</div>
	);
};
