import { css } from '@emotion/react';
import {
	between,
	from,
	palette as sourcePalette,
	visuallyHidden,
} from '@guardian/source-foundations';
import { getZIndex } from '../../../lib/getZIndex';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { navInputCheckboxId, veggieBurgerId } from '../config';

const screenReadable = css`
	${visuallyHidden};
`;

const beforeAfterStyles = css`
	content: '';
	background-color: currentColor;
`;

const lineStyles = css`
	height: 2px;
	left: 0;
	position: absolute;
	width: 20px;
`;
const veggieBurgerIconStyles = css`
	background-color: currentColor;
	/*
            IMPORTANT NOTE:
            we need to specify the adjacent path to the a (current) tag
            to apply styles to the nested tabs due to the fact we use ~
            to support NoJS
        */
	/* stylelint-disable-next-line selector-type-no-unknown */
	${`#${navInputCheckboxId}`}:checked ~ div & {
		background-color: transparent;
	}

	top: 50%;
	right: 0;
	margin-top: -1px;
	margin-left: auto;
	margin-right: auto;
	${lineStyles};

	:before {
		${lineStyles};
		${beforeAfterStyles};
		top: -6px;
		/* refer to comment above */
		/* stylelint-disable-next-line selector-type-no-unknown */
		${`#${navInputCheckboxId}`}:checked ~ div & {
			top: 0;
			transform: rotate(-45deg);
		}
	}
	:after {
		${lineStyles};
		${beforeAfterStyles};
		bottom: -6px;
		/* refer to comment above */
		/* stylelint-disable-next-line selector-type-no-unknown */
		${`#${navInputCheckboxId}`}:checked ~ div & {
			bottom: 0;
			transform: rotate(45deg);
		}
	}
`;

const veggieBurgerStyles = (isImmersive: boolean) => css`
	background-color: ${sourcePalette.brandAlt[400]};
	color: ${sourcePalette.neutral[7]};
	cursor: pointer;
	height: 42px;
	min-width: 42px;
	position: absolute;
	border: 0;
	border-radius: 50%;
	z-index: 1;

	right: 5px;
	bottom: 58px;

	${between.mobileMedium.and.tablet} {
		${getZIndex('burger')}
	}

	${from.mobileMedium} {
		bottom: ${isImmersive ? '3px' : '-3px'};
		right: 5px;
	}
	${from.mobileLandscape} {
		right: 18px;
	}
	${from.tablet} {
		bottom: 3px;
	}
	${from.desktop} {
		display: none;
	}

	/* refer to comment above */
	/* stylelint-disable-next-line selector-type-no-unknown */
	${`#${navInputCheckboxId}`}:checked ~ div & {
		${getZIndex('burger')}
	}
	:focus {
		outline: none;
	}
`;

type Props = {
	isImmersive?: boolean;
};

export const VeggieBurgerMenu = ({ isImmersive = false }: Props) => {
	return (
		<label
			id={veggieBurgerId}
			css={veggieBurgerStyles(isImmersive)}
			aria-label="Toggle main menu"
			key="OpenExpandedMenuButton"
			htmlFor={navInputCheckboxId}
			data-link-name={nestedOphanComponents(
				'nav3',
				'veggie-burger',
				'show',
			)}
			tabIndex={0}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role -- we’re using this label for a CSS-only toggle
			role="button"
			data-testid="veggie-burger"
		>
			<span css={screenReadable}>Show More</span>
			<span css={veggieBurgerIconStyles} />
		</label>
	);
};
