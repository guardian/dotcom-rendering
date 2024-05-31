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
`;

const veggieBurgerIconStyles = css`
	margin: auto;
	margin-top: 6px;

	/*
		IMPORTANT NOTE:
		we need to specify the adjacent path to the a (current) tag
		to apply styles to the nested tabs due to the fact we use ~
		to support NoJS
	*/
	${`#${navInputCheckboxId}`}:checked + label & {
		transition: transform 0.3s ease-in-out;
		transform: rotate(-90deg);
		margin-left: 6px;
	}

	/** TODO - handle smooth opening and closing transitions */
`;

const veggieBurgerStyles = css`
	background-color: ${sourcePalette.brandAlt[400]};
	display: flex;
	cursor: pointer;
	height: 40px;
	width: 40px;
	position: absolute;
	border: 0;
	border-radius: 50%;
	z-index: 1;

	right: 0;
	top: 0;
	bottom: 0;

	/* refer to comment above */
	${`#${navInputCheckboxId}`}:checked + label & {
		${getZIndex('burger')}
	}

	:focus {
		outline: none;
	}

	:hover {
		background-color: ${sourcePalette.brandAlt[300]};
	}
`;

const immersiveStyles = css`
	${from.mobileMedium} {
		bottom: ${space[1]}px;
	}
`;

type Props = {
	isImmersive?: boolean;
};

export const VeggieBurgerMenu = ({ isImmersive = false }: Props) => {
	return (
		<div css={relativePosition}>
			{/*
				IMPORTANT NOTE:
				It is important to have the input as the 1st sibling for NoJS to work
				as we use ~ to apply certain styles on checkbox checked and ~ can only
				apply to styles with elements that are preceded
			*/}
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
				css={[veggieBurgerStyles, isImmersive && immersiveStyles]}
				aria-label="Toggle main menu"
				key="OpenExpandedMenuButton"
				data-link-name={nestedOphanComponents(
					'titlepiece',
					'veggie-burger',
					'show',
				)}
				tabIndex={0}
				// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role -- we’re using this label for a CSS-only toggle
				role="button"
				data-testid="veggie-burger"
			>
				<span css={screenReadable}>Show More</span>
				<span css={veggieBurgerIconStyles}>
					<SvgMenu size="small" />
				</span>
			</label>
		</div>
	);
};
