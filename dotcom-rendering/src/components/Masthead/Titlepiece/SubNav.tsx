/**
 * @file
 * This file was largely copied from https://github.com/guardian/dotcom-rendering/blob/016de51dc294d3a2895b52091258de0adbadcef5/dotcom-rendering/src/components/SubNav.importable.tsx
 */
import { css } from '@emotion/react';
import {
	from,
	space,
	textSans14,
	textSansBold14,
} from '@guardian/source/foundations';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type { SubNavType } from '../../../model/extract-nav';
import { palette as themePalette } from '../../../palette';

type Props = {
	subNavSections: SubNavType;
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

export const SubNav = ({
	hasPageSkin,
	subNavSections,
	currentNavLink,
}: Props) => {
	return (
		<>
			{/* eslint-disable jsx-a11y/no-redundant-roles -- A11y fix for Safari
			{@see https://github.com/guardian/dotcom-rendering/pull/5041} */}
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
				{/* eslint-enable jsx-a11y/no-redundant-roles */}
				{subNavSections.parent && (
					<li
						key={subNavSections.parent.url}
						css={subnavListItemStyles}
					>
						<a
							data-src-focus-disabled={true}
							css={subnavLinkStyles}
							href={subNavSections.parent.url}
						>
							{subNavSections.parent.title}
						</a>
					</li>
				)}
				{subNavSections.links.map(({ title, longTitle, url }) => (
					<li key={url} css={subnavListItemStyles}>
						<a
							css={subnavLinkStyles}
							data-src-focus-disabled={true}
							href={url}
							data-link-name={nestedOphanComponents(
								'header',
								'subnav',
								longTitle,
							)}
						>
							{title === currentNavLink ? (
								<span css={selectedLink}>{title}</span>
							) : (
								title
							)}
						</a>
					</li>
				))}
			</ul>
		</>
	);
};
