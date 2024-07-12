/**
 * @file
 * This file was largely copied from src/components/Nav/ExpandedMenu/MoreColumn.tsx
 */
import { css } from '@emotion/react';
import { from, space, textSans17 } from '@guardian/source/foundations';
import { nestedOphanComponents } from '../../../../lib/ophan-helpers';
import type { LinkType } from '../../../../model/extract-nav';
import { palette as themePalette } from '../../../../palette';
import { expandedNavLinkStyles, listAccessibility } from '../commonStyles';
import { pillarWidthsPx } from '../constants';

const pillarHeight = 42;

const hideDesktop = css`
	${from.desktop} {
		display: none;
	}
`;

const columnStyle = css`
	${textSans17};
	${listAccessibility};
	margin: 0;
	padding-bottom: 10px;
	position: relative;

	/* Remove the border from the top item on mobile */
	:first-of-type:after {
		content: none;
	}

	${from.desktop} {
		width: ${pillarWidthsPx.tablet}px;
		float: left;
		position: relative;

		:after {
			content: none;
		}
	}
`;

const columnStyleFromLeftCol = css`
	${from.leftCol} {
		width: ${pillarWidthsPx.leftCol}px;
	}
	${from.wide} {
		width: ${pillarWidthsPx.wide}px;
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
			background-color: ${themePalette('--masthead-nav-lines')};
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
			background-color: ${themePalette('--masthead-nav-lines')};
			z-index: 1;
		}
	}
`;

const columnLinks = css`
	${textSans17};
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	${listAccessibility};
	margin: 0;
	padding: 0 0 ${space[3]}px;
	position: relative;
	${from.desktop} {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		order: 1;
		height: 100%;
		width: 100%;
		padding: 0 ${space[2]}px;
	}
`;

const columnLinkTitle = css`
	${textSans17};
	${expandedNavLinkStyles};

	:hover,
	:focus {
		text-decoration: underline;
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

/**
 * This is a list of links related to Guardian journalism and products.
 * This can include things like "The Guardian app, Video, Podcasts etc"
 * Does not contain any reader revenue type links.
 */
export const MoreSection = ({
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
								'header',
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
	);
};
