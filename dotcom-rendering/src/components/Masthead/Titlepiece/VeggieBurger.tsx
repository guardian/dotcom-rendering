import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source/foundations';
import { SvgCross, SvgMenu } from '@guardian/source/react-components';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { palette as themePalette } from '../../../palette';
import { navInputCheckboxId, veggieBurgerId } from './constants';

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

export const VeggieBurger = () => (
	<label
		id={veggieBurgerId}
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
		<span id="nav-menu-closed" css={[iconWrapper, hideIfMenuOpened]}>
			<span css={screenReadable}>Show more</span>
			<SvgMenu
				size="small"
				theme={{
					fill: themePalette('--masthead-veggie-burger-icon'),
				}}
			/>
		</span>

		<span id="nav-menu-expanded" css={[iconWrapper, hideIfMenuClosed]}>
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
