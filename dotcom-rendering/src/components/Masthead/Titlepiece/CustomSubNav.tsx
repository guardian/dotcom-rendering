/**
 * @file
 * This file was largely copied from https://github.com/guardian/dotcom-rendering/blob/016de51dc294d3a2895b52091258de0adbadcef5/dotcom-rendering/src/components/SubNav.importable.tsx
 */
import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	space,
	textSans14,
	textSansBold14,
} from '@guardian/source/foundations';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { palette as themePalette } from '../../../palette';
import type { AssignedPage, CustomSubnav } from '../../../types/customSubnav';

type Props = {
	customSubNav: CustomSubnav;
	currentNavLink: string;
	/** The page type this subnav is rendered on, used to vary styling. */
	assignedPage: AssignedPage;
	hasPageSkin?: boolean;
};

const subNavStyles = css`
	${textSans14}
	display: flex;
	column-gap: ${space[2]}px;
	color: inherit;
	min-height: 28px;
	width: 100%;
	margin-top: ${space[2]}px;

	${from.mobileMedium} {
		margin-top: ${space[3]}px;
	}
	${from.tablet} {
		min-height: 30px;
	}
`;

const subNavStylesFromLeftCol = css`
	${from.leftCol} {
		margin-top: 14px;
	}
`;

/** On articles the header and links sit on a single aligned row. */
const articleContainerStyles = css`
	display: flex;
	align-items: stretch;
`;

/**
 * On articles the links row sits inline next to the header. The stacked top margins are
 * removed and replaced with padding so the header divider spans the full component height.
 */
const articleSubNavStyles = css`
	margin-top: 0;
	padding-top: ${space[2]}px;
	padding-bottom: ${space[2]}px;

	${from.mobileMedium} {
		margin-top: 0;
	}
	${from.leftCol} {
		margin-top: 0;
	}
`;

const articleHeaderStyles = css`
	${textSansBold14}
	color: ${themePalette('--custom-subnav-header-text')};
	display: flex;
	white-space: nowrap;
	padding-top: ${space[2]}px;
	padding-right: ${space[2]}px;
	margin-right: ${space[2]}px;
	border-right: 1px solid ${themePalette('--masthead-nav-lines')};
`;

/** Sets horizontal scrolling behaviour and removes the scrollbar */
const scrollableSubNavStyles = css`
	overflow-x: scroll;

	@supports selector(::-webkit-scrollbar) {
		&::-webkit-scrollbar {
			display: none;
		}
	}
	scrollbar-width: none; /* Firefox */
`;

const subnavListItemStyles = css`
	white-space: nowrap;
`;

const subnavLinkStyles = css`
	color: ${themePalette('--masthead-nav-link-text')};
	text-decoration: none;
	padding-right: ${space[1]}px;

	&:hover {
		text-decoration: underline;
		color: ${themePalette('--masthead-nav-link-text-hover')};
	}
`;

const selectedLink = css`
	${textSansBold14}
`;

/**
 * Renders a custom subnav (header + links, images and further data to follow) targeted at a front.
 */
export const CustomSubNav = ({
	customSubNav,
	currentNavLink,
	assignedPage,
	hasPageSkin,
}: Props) => {
	const isArticle = assignedPage === 'article';
	return (
		<div
			data-component={`custom-subnav-${customSubNav.header.headerText}`}
			data-component-id={customSubNav.id}
			data-assigned-page={assignedPage}
			css={
				isArticle
					? articleContainerStyles
					: [
							headlineBold28,
							css`
								margin-top: ${space[2]}px;
							`,
						]
			}
		>
			{isArticle ? (
				<span css={articleHeaderStyles}>
					{customSubNav.header.headerText}
				</span>
			) : (
				customSubNav.header.headerText
			)}
			<ul
				css={[
					subNavStyles,
					!hasPageSkin && subNavStylesFromLeftCol,
					scrollableSubNavStyles,
					isArticle && articleSubNavStyles,
				]}
				role="list"
				style={{
					'--sub-nav-link': themePalette('--sub-nav-link-header'),
				}}
			>
				{customSubNav.links.map(({ linkText, dotcomPath }) => (
					<li key={dotcomPath} css={subnavListItemStyles}>
						<a
							css={subnavLinkStyles}
							data-src-focus-disabled={true}
							href={dotcomPath}
							data-link-name={nestedOphanComponents(
								'header',
								'custom subnav',
								linkText,
							)}
						>
							{linkText === currentNavLink ? (
								<span css={selectedLink}>{linkText}</span>
							) : (
								linkText
							)}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};
