import { css } from '@emotion/react';
import {
	brand,
	brandAlt,
	brandText,
	from,
	textSans,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type {
	EditionLinkType,
	PillarLinkType,
} from '../../../model/extract-nav';
import { CollapseColumnButton } from './CollapseColumnButton';

// CSS
const hideDesktop = css`
	${from.desktop} {
		display: none;
	}
`;

const pillarDivider = css`
	${from.desktop} {
		:before {
			content: '';
			display: block;
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${brand[600]};
			z-index: 1;
		}
	}
`;

const columnLinkTitle = css`
	${textSans.medium({ lineHeight: 'tight' })};
	background-color: transparent;
	text-decoration: none;
	border: 0;
	box-sizing: border-box;
	color: ${brandText.primary};
	cursor: pointer;
	display: inline-block;
	font-weight: 500;
	outline: none;
	padding: 8px 34px 8px 50px;
	position: relative;
	text-align: left;
	width: 100%;

	${from.tablet} {
		padding-left: 60px;
	}

	${from.desktop} {
		font-size: 16px;
		padding: 6px 0;
	}

	:hover,
	:focus {
		color: ${brandAlt[400]};
		text-decoration: underline;
	}

	> * {
		pointer-events: none;
	}
`;

export const mainMenuLinkStyle = css`
	box-sizing: border-box;
	overflow: hidden;
	position: relative;
	width: 100%;
	${from.desktop} {
		display: list-item;
	}
`;

export const columnLinks = css`
	${textSans.medium()};
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	list-style: none;
	/* https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns */
	/* Needs double escape char: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#es2018_revision_of_illegal_escape_sequences */
	li::before {
		content: '\\200B'; /* Zero width space */
		display: block;
		height: 0;
		width: 0;
	}
	margin: 0;
	padding: 0 0 12px;
	position: relative;
	${from.desktop} {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		order: 1;
		height: 100%;
		width: 100%;
		padding: 0 9px;
	}
`;

const firstColumnLinks = css`
	${from.desktop} {
		padding-left: 0;
	}
	${until.tablet} {
		background: ${brand[300]};
	}
`;

const pillarColumnLinks = css`
	${until.tablet} {
		background: ${brand[300]};
	}
`;

const hideWhenChecked = (columnInputId: string) => css`
	${until.desktop} {
		/* stylelint-disable-next-line selector-type-no-unknown */
		${`#${columnInputId}`}:checked ~ & {
			display: none;
		}
	}
`;

const hideWhenNotChecked = (columnInputId: string) => css`
	${until.desktop} {
		/* stylelint-disable-next-line selector-type-no-unknown */
		${`#${columnInputId}`}:not(:checked) ~ & {
			display: none;
		}
	}
`;

export const lineStyle = css`
	${from.desktop} {
		display: none;
	}
	background-color: ${brand[600]};
	content: '';
	display: block;
	height: 1px;
	margin-left: 50px;
	right: 0;
`;

const columnStyle = css`
	${textSans.medium()};
	list-style: none;
	/* https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns */
	/* Needs double escape char: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#es2018_revision_of_illegal_escape_sequences */

	&::before {
		content: '\\200B'; /* Zero width space */
		display: block;
		height: 0;
		width: 0;
	}

	margin: 0;
	padding-bottom: 10px;
	position: relative;

	${from.desktop} {
		width: 134px;
		float: left;
		position: relative;
		border-left: 1px solid ${brand[600]};

		:after {
			height: 100%;
			left: 0;
			width: 1px;
		}

		:first-of-type {
			border-left: none;
			width: 123px;
		}
	}
`;

const columnStyleFromLeftCol = css`
	${from.leftCol} {
		width: 160px;

		:first-of-type {
			width: 150px;
		}
	}
`;

export const Column = ({
	column,
	index,
	showLineBelow,
	hasPageSkin,
}: {
	column: PillarLinkType | EditionLinkType;
	index: number;
	showLineBelow: boolean;
	hasPageSkin?: boolean;
}) => {
	// As the elements are dynamic we need to specify the IDs here
	//Replace whitespace with hyphen https://stackoverflow.com/questions/3794919/replace-all-spaces-in-a-string-with/3795147#3795147
	const columnId = column.title.split(' ').join('-');
	const columnInputId = `${columnId}-checkbox-input`;
	const collapseColumnInputId = `${columnId}-button`;
	const ariaControls = `${columnId.toLowerCase()}Links`;

	return (
		<li
			css={[
				columnStyle,
				!hasPageSkin && columnStyleFromLeftCol,
				pillarDivider,
			]}
			role="none"
		>
			{/*
                IMPORTANT NOTE: Supporting NoJS and accessibility is hard.

                We therefore use JS to make the Nav elements more accessible. We add a
                keydown `addEventListener` to toggle the column drop down.
                This is not a perfect solution as not all screen readers support JS
                https://webaim.org/projects/screenreadersurvey8/#javascript
            */}
			<script
				dangerouslySetInnerHTML={{
					__html: `document.addEventListener('DOMContentLoaded', function(){
                        var columnInput = document.getElementById('${collapseColumnInputId}');

						if (!columnInput) return; // Sticky nav replaces the nav so element no longer exists for users in test.

						columnInput.addEventListener('keydown', function(e){
                            // keyCode: 13 => Enter key | keyCode: 32 => Space key
                            if (e.keyCode === 13 || e.keyCode === 32) {
                                e.preventDefault()
                                document.getElementById('${columnInputId}').click();
                            }
                        })
                    })`,
				}}
			/>

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
				id={columnInputId}
				tabIndex={-1}
				key="OpenExpandedMenuCheckbox"
				aria-hidden="true"
			/>
			<CollapseColumnButton
				collapseColumnInputId={collapseColumnInputId}
				title={column.title}
				columnInputId={columnInputId}
				ariaControls={ariaControls}
			/>

			{/* ColumnLinks */}
			<ul
				css={[
					columnLinks,
					index === 0 && firstColumnLinks,
					!!column.children && pillarColumnLinks,
					hideWhenNotChecked(columnInputId),
				]}
				role="menu"
				id={ariaControls}
				data-cy={ariaControls}
			>
				{(column.children ?? []).map((link) => (
					<li
						key={link.title.toLowerCase()}
						css={[
							mainMenuLinkStyle,
							!!link.mobileOnly && hideDesktop,
						]}
						role="none"
					>
						<a
							className="selectableMenuItem"
							css={columnLinkTitle}
							href={link.url}
							role="menuitem"
							data-link-name={nestedOphanComponents(
								'nav2',
								'secondary',
								link.longTitle,
							)}
							data-cy={`column-collapse-sublink-${link.title}`}
							tabIndex={-1}
						>
							{link.longTitle}
						</a>
					</li>
				))}
			</ul>
			{showLineBelow && (
				<div css={[hideWhenChecked(columnInputId), lineStyle]}></div>
			)}
		</li>
	);
};
