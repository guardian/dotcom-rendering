import { css } from '@emotion/react';

import { brand, brandText, brandAlt } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

const pillarHeight = 42;

export const hideDesktop = css`
	${from.desktop} {
		display: none;
	}
`;

const pillarColumnLinks = css`
	${until.tablet} {
		background: ${brand[300]};
	}
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

	:after {
		background-color: ${brand[600]};
		top: 0;
		content: '';
		display: block;
		height: 1px;
		left: 50px;
		position: absolute;
		right: 0;
	}

	/* Remove the border from the top item on mobile */
	:first-of-type:after {
		content: none;
	}

	${from.desktop} {
		width: 134px;
		float: left;
		position: relative;

		:after {
			content: none;
		}

		:first-of-type {
			width: 123px;
		}
	}
	${from.leftCol} {
		width: 160px;

		:first-of-type {
			width: 150px;
		}
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

const pillarDividerExtended = css`
	${from.desktop} {
		:before {
			top: -${pillarHeight}px;
		}
	}
`;

const columnLinks = css`
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

const mainMenuLinkStyle = css`
	box-sizing: border-box;
	overflow: hidden;
	position: relative;
	width: 100%;
	${from.desktop} {
		display: list-item;
	}
`;

export const MoreColumn: React.FC<{
	column: LinkType;
	brandExtensions: LinkType[];
}> = ({ column, brandExtensions }) => {
	const subNavId = `${column.title.toLowerCase()}Links`;
	// Add the brand extensions to 'more' on mobile.
	const moreColumn = {
		...column,
		children: [
			...brandExtensions.map((brandExtension) => ({
				...brandExtension,
				mobileOnly: true,
			})),
			...(column.children || []),
		],
	};
	return (
		<li
			css={[columnStyle, pillarDivider, pillarDividerExtended]}
			role="none"
		>
			<ul
				css={[columnLinks, !!moreColumn.pillar && pillarColumnLinks]}
				role="menu"
				id={subNavId}
			>
				{(moreColumn.children || []).map((link) => (
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
							data-link-name={`nav2 : secondary : ${link.longTitle}`}
							data-cy={`column-collapse-sublink-${link.title}`}
							tabIndex={-1}
						>
							{link.longTitle}
						</a>
					</li>
				))}
			</ul>
		</li>
	);
};
