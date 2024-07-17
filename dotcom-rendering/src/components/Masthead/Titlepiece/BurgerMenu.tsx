import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source/foundations';
import { SvgCross, SvgMenu } from '@guardian/source/react-components';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { palette as themePalette } from '../../../palette';
import { navInputCheckboxId } from './constants';

const screenReadable = css`
	${visuallyHidden};
`;

const showIfMenuClosed = css`
	${`#${navInputCheckboxId}`}:checked & {
		display: none;
	}
`;

const showIfMenuExpanded = css`
	${`#${navInputCheckboxId}`}:not(:checked) & {
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

export const BurgerMenu = () => {
	return (
		<div>
			<input
				type="checkbox"
				css={screenReadable}
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
					'nav3',
					'veggie-burger',
					'show',
				)}
				tabIndex={0}
				// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role -- we’re using this label for a CSS-only toggle
				role="button"
				data-testid="veggie-burger"
			>
				<span css={[screenReadable, showIfMenuClosed]}>Show more</span>
				<span
					id="nav-menu-closed"
					css={[iconWrapper, showIfMenuClosed]}
				>
					<SvgMenu
						size="small"
						theme={{
							fill: themePalette('--masthead-veggie-burger-icon'),
						}}
					/>
				</span>

				<span css={[screenReadable, showIfMenuExpanded]}>
					Hide expanded menu
				</span>
				<span
					id="nav-menu-expanded"
					css={[iconWrapper, showIfMenuExpanded]}
				>
					<SvgCross
						size="small"
						theme={{
							fill: themePalette('--masthead-veggie-burger-icon'),
						}}
					/>
				</span>
			</label>
		</div>
	);
};
