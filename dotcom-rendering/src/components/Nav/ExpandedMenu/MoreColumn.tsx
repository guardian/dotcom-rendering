import { css } from '@emotion/react';
import {
	brandText,
	from,
	palette as sourcePalette,
	textSans17,
} from '@guardian/source-foundations';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type { LinkType } from '../../../model/extract-nav';

const pillarHeight = 42;

const hideDesktop = css`
	${from.desktop} {
		display: none;
	}
`;

const columnStyle = css`
	${textSans17};
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

	/* Remove the border from the top item on mobile */
	:first-of-type:after {
		content: none;
	}

	${from.desktop} {
		width: 140px;
		float: left;
		position: relative;

		:after {
			content: none;
		}
	}
`;

const columnStyleFromLeftCol = css`
	${from.leftCol} {
		width: 160px;
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
			height: auto;
			background-color: ${sourcePalette.brand[600]};
			z-index: 1;
		}
	}
`;

const pillarDividerExtended = css`
	${from.desktop} {
		:before {
			top: -${pillarHeight}px;
		}

		:after {
			content: '';
			display: block;
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			left: 0;
			width: 1px;
			height: auto;
			background-color: ${sourcePalette.brand[600]};
			z-index: 1;
		}
	}
`;

const columnLinks = css`
	${textSans17};
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
	${textSans17};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.15;
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
		color: ${sourcePalette.brandAlt[400]};
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

type Props = {
	otherLinks: LinkType[];
	brandExtensions: LinkType[];
	hasPageSkin?: boolean;
};

export const MoreColumn = ({
	otherLinks,
	brandExtensions,
	hasPageSkin,
}: Props) => {
	const subNavId = 'moreLinks';

	const links = [
		...brandExtensions.map((brandExtension) => ({
			...brandExtension,
			mobileOnly: true,
		})),
		...otherLinks,
	];

	return (
		<>
			<li
				css={[
					columnStyle,
					!hasPageSkin && columnStyleFromLeftCol,
					pillarDivider,
					pillarDividerExtended,
				]}
				role="none"
			>
				<ul css={[columnLinks]} role="menu" id={subNavId}>
					{links.map((link) => (
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
								data-testid={`column-collapse-sublink-${link.title}`}
								tabIndex={-1}
							>
								{link.longTitle}
							</a>
						</li>
					))}
				</ul>
			</li>
		</>
	);
};
