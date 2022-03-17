import { css } from '@emotion/react';

import {
	from,
	visuallyHidden,
	headline,
	brandText,
	brandAlt,
} from '@guardian/source-foundations';

import { SvgChevronDownSingle } from '@guardian/source-react-components';

import { ArticleDisplay } from '@guardian/libs';
import { navInputCheckboxId, showMoreButtonId } from '../config';

const screenReadable = css`
	${visuallyHidden};
`;

const showMoreTextStyles = css`
	display: block;
	height: 100%;

	${`#${navInputCheckboxId}`}:checked ~ div label & svg {
		transform: translateY(-2px) rotate(-180deg);
		:hover {
			transform: translateY(-4px) rotate(-180deg);
		}
	}

	svg {
		position: absolute;
		right: 2px;
		top: 14px;
		fill: currentColor;
		height: 16px;
		width: 16px;
		transition: transform 250ms ease-out;

		:hover {
			transform: translateY(2px);
		}
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
	}
`;

export const ShowMoreMenu = ({ display }: { display: ArticleDisplay }) => (
	<>
		{/* eslint-disable @typescript-eslint/ban-ts-comment, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role */}
		{/*
    // @ts-ignore */}
		<label
			id={showMoreButtonId}
			css={openExpandedMenuStyles(display)}
			aria-label="Toggle main menu"
			key="OpenExpandedMenuButton"
			htmlFor={navInputCheckboxId}
			data-link-name="nav2 : veggie-burger: show"
			// @ts-ignore
			tabIndex={0}
			role="button"
			data-cy="nav-show-more-button"
		>
			<span css={screenReadable}>Show</span>
			<span css={showMoreTextStyles}>
				More
				<SvgChevronDownSingle />
			</span>
		</label>
		{/* eslint-enable @typescript-eslint/ban-ts-comment, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role  */}
	</>
);
