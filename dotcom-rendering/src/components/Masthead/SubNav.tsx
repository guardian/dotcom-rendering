import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	space,
	textSans14,
	textSansBold14,
} from '@guardian/source/foundations';
import { nestedOphanComponents } from '../../lib/ophan-helpers';
import type { SubNavType } from '../../model/extract-nav';
import { palette as themePalette } from '../../palette';

type Props = {
	subNavSections: SubNavType;
	currentNavLink: string;
	css?: SerializedStyles;
};

const subnavStyles = css`
	${textSans14}
	color: inherit;
	height: 28px;
	margin-top: ${space[2]}px;
	${from.mobileMedium} {
		margin-top: ${space[3]}px;
	}
	${from.tablet} {
		height: 30px;
	}
	${from.leftCol} {
		margin-top: 14px;
	}
`;

const subnavListStyles = css`
	display: flex;
	column-gap: ${space[3]}px;
`;

const subnavListItemStyles = css`
	white-space: nowrap;
`;

const subnavLinkStyles = css`
	color: ${themePalette('--masthead-nav-link-text')};
	text-decoration: none;
`;

const selectedLink = css`
	${textSansBold14}
`;

export const SubNav = ({
	subNavSections,
	currentNavLink,
	css: cssProp,
}: Props) => {
	return (
		<nav
			data-print-layout="hide"
			css={[subnavStyles, cssProp]}
			data-testid="sub-nav"
			data-component="sub-nav"
		>
			{/* eslint-disable jsx-a11y/no-redundant-roles -- A11y fix for Safari
			    {@see https://github.com/guardian/dotcom-rendering/pull/5041} */}
			<ul
				css={subnavListStyles}
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
		</nav>
	);
};
