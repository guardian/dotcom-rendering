import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source/foundations';
import { SvgCross, SvgMenu } from '@guardian/source/react-components';
import { getZIndex } from '../../../lib/getZIndex';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { palette as themePalette } from '../../../palette';
import { navInputCheckboxId, veggieBurgerId } from './constants';

const labelStyles = css`
	position: relative;
	z-index: 1;
	${`#${navInputCheckboxId}`}:checked ~ div & {
		/* Bump the z-index of the burger menu when expanded */
		${getZIndex('expanded-veggie-burger')}
	}
`;

const screenReadable = css`
	${visuallyHidden};
`;

const showMoreStyles = css`
	${`#${navInputCheckboxId}`}:checked ~ div & {
		/* Hide the expand menu SVG if already expanded */
		display: none;
	}
`;

const closeMenuStyles = css`
	${`#${navInputCheckboxId}`}:not(:checked) ~ div & {
		/* Hide the collapse menu SVG if already collapsed */
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

export const VeggieBurger = () => (
	<label
		id={veggieBurgerId}
		css={labelStyles}
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
		<span css={[iconWrapper, showMoreStyles]}>
			<span css={screenReadable}>Show more</span>
			<SvgMenu
				size="small"
				theme={{
					fill: themePalette('--masthead-veggie-burger-icon'),
				}}
			/>
		</span>

		<span css={[iconWrapper, closeMenuStyles]}>
			<span css={screenReadable}>Hide expanded menu</span>
			<SvgCross
				size="small"
				theme={{
					fill: themePalette('--masthead-veggie-burger-icon'),
				}}
			/>
		</span>
	</label>
);
