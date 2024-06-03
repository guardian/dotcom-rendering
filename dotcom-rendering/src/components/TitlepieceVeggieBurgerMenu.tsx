import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	visuallyHidden,
} from '@guardian/source/foundations';
import { SvgMenu } from '@guardian/source/react-components';
import { getZIndex } from '../lib/getZIndex';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { navInputCheckboxId, veggieBurgerId } from './Nav/config';

const screenReadable = css`
	${visuallyHidden};
`;

const relativePosition = css`
	position: relative;
	display: block;
	/* padding: 0 0 4px 4px; */
`;

const veggieBurgerIconStyles = css`
	padding-top: 2px;
`;

/**
 * IMPORTANT NOTE:
 * we need to specify the adjacent path to the a (current) tag
 * to apply styles to the nested tabs due to the fact we use ~
 * to support NoJS
 *
 * TODO - handle smooth opening and closing transitions
 */
const checkedIconStyles = css`
	${`#${navInputCheckboxId}`}:checked + label & {
		transition: transform 0.3s ease-in-out;
		transform: rotate(-90deg);
		padding-left: 2px;
		padding-top: 2px;
	}

	${`#${navInputCheckboxId}`}:not(:checked) + label & {
		transition: transform 0.3s ease-in-out;
	}
`;

const positionStyles = css`
	position: absolute;
	z-index: 1;

	${`#${navInputCheckboxId}`}:checked + label & {
		${getZIndex('burger')}
	}
`;

const veggieBurgerStyles = css`
	height: 40px;
	width: 40px;
	border: 0;
	border-radius: 50%;
	background-color: ${sourcePalette.brandAlt[400]};
	cursor: pointer;

	/** Keeps the SVG icon centered */
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;

	:focus {
		outline: none;
	}

	:hover {
		background-color: ${sourcePalette.brandAlt[300]};
	}
`;

const smallBurgerStyleOverrides = css`
	height: 32px;
	width: 32px;
`;

const immersiveStyles = css`
	${from.mobileMedium} {
		bottom: ${space[1]}px;
	}
`;

type Props = {
	size?: 'small' | 'medium';
	/** Allows offsetting the position of the burger relative to its parent container */
	positionOverrideStyles?: SerializedStyles;
	isImmersive?: boolean;
};

export const VeggieBurgerMenu = ({
	size = 'medium',
	positionOverrideStyles,
	isImmersive = false,
}: Props) => {
	return (
		<div css={[relativePosition]}>
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
			<label
				htmlFor={navInputCheckboxId}
				id={veggieBurgerId}
				css={[
					positionStyles,
					positionOverrideStyles,
					veggieBurgerStyles,
					size === 'small' && smallBurgerStyleOverrides,
					isImmersive && immersiveStyles,
					checkedIconStyles,
				]}
				aria-label="Toggle main menu"
				key="OpenExpandedMenuButton"
				data-link-name={nestedOphanComponents(
					'titlepiece',
					'veggie-burger',
					'show',
				)}
				tabIndex={0} // TODO - double check this
				// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role -- we’re using this label for a CSS-only toggle
				role="button"
				data-testid="veggie-burger"
			>
				<span css={screenReadable}>Show More</span>
				<span css={[veggieBurgerIconStyles, checkedIconStyles]}>
					<SvgMenu
						size="small"
						theme={{ fill: sourcePalette.brand[400] }}
					/>
				</span>
			</label>
		</div>
	);
};
