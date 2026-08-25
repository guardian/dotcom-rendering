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
import type { CustomSubnav } from '../../../types/customSubnav';

type Props = {
	customSubNav: CustomSubnav;
	currentNavLink: string;
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
	hasPageSkin,
}: Props) => {
	return (
		<div
			data-component={`custom-subnav-${customSubNav.header.headerText}`}
			data-component-id={customSubNav.id}
			css={[
				headlineBold28,
				css`
					margin-top: ${space[2]}px;
				`,
			]}
		>
			{customSubNav.header.headerText}
			<ul
				css={[
					subNavStyles,
					!hasPageSkin && subNavStylesFromLeftCol,
					scrollableSubNavStyles,
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
