import { css } from '@emotion/react';
import { ArticleDisplay } from '@guardian/libs';
import {
	brandAlt,
	brandText,
	from,
	headline,
	visuallyHidden,
} from '@guardian/source-foundations';
import { SvgChevronDownSingle } from '@guardian/source-react-components';
import { navInputCheckboxId, showMoreButtonId } from '../config';

const screenReadable = css`
	${visuallyHidden};
`;

const showMoreTextStyles = css`
	display: block;
	height: 100%;

	/* stylelint-disable selector-type-no-unknown */
	${`#${navInputCheckboxId}`}:checked ~ div label & svg {
		transform: translateY(-2px) rotate(-180deg);
	}

	${`#${navInputCheckboxId}`}:checked ~ div label:hover & svg,
	${`#${navInputCheckboxId}`}:checked ~ div label:focus & svg {
		transform: translateY(-4px) rotate(-180deg);
	}
	/* stylelint-enable selector-type-no-unknown */

	svg {
		position: absolute;
		right: 2px;
		top: 14px;
		fill: currentColor;
		height: 16px;
		width: 16px;
		transition: transform 250ms ease-out;
	}
`;

const openExpandedMenuStyles = (display: ArticleDisplay) => css`
	${headline.xsmall()};
	font-weight: 300;
	color: ${brandText.primary};
	cursor: pointer;
	display: none;
	position: relative;
	overflow: hidden;
	border: 0;
	background-color: transparent;
	height: 48px;
	padding-left: 9px;
	padding-right: 20px;
	${from.desktop} {
		display: block;
		padding-top: ${display === ArticleDisplay.Immersive ? '9px' : '5px'};
		height: 42px;
	}

	:hover,
	:focus {
		color: ${brandAlt[400]};
		svg {
			transform: translateY(2px);
		}
	}
`;

export const ShowMoreMenu = ({ display }: { display: ArticleDisplay }) => (
	<>
		<label
			id={showMoreButtonId}
			css={openExpandedMenuStyles(display)}
			aria-label="Toggle main menu"
			key="OpenExpandedMenuButton"
			htmlFor={navInputCheckboxId}
			data-link-name="nav2 : veggie-burger: show"
			tabIndex={0}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role -- we’re using this label for a CSS-only toggle
			role="button"
			data-cy="nav-show-more-button"
		>
			<span css={screenReadable}>Show</span>
			<span css={showMoreTextStyles}>
				More
				<SvgChevronDownSingle />
			</span>
		</label>
	</>
);
