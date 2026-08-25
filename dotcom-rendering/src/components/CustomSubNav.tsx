import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { palette } from '../palette';
import type { CustomSubnav } from '../types/customSubnav';

type Props = {
	subnav: CustomSubnav;
	/** Base URL used to resolve site-relative `dotcomPath`s. */
	guardianBaseURL: string;
};

/**
 * Resolves a site-relative `dotcomPath` against the site base URL. Absolute
 * URLs are returned unchanged.
 */
const buildUrl = (dotcomPath: string, guardianBaseURL: string): string => {
	if (/^https?:\/\//.test(dotcomPath)) {
		return dotcomPath;
	}
	return `${guardianBaseURL}${
		dotcomPath.startsWith('/') ? '' : '/'
	}${dotcomPath}`;
};

const wrapperStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
	padding: ${space[2]}px 10px;
	color: var(--sub-nav-link-header);
	border-bottom: 1px solid ${palette('--sub-nav-border')};

	${from.mobileLandscape} {
		padding: ${space[2]}px 20px;
	}
`;

const compactWrapperStyles = css`
	flex-direction: row;
	align-items: baseline;
	flex-wrap: wrap;
	gap: ${space[2]}px ${space[4]}px;
`;

const headerTextStyles = css`
	${headlineBold20};
	color: inherit;
	margin: 0;
`;

const compactHeaderTextStyles = css`
	${textSans17};
	font-weight: 700;
`;

const headerLinkStyles = css`
	color: inherit;
	text-decoration: none;

	:hover {
		color: ${palette('--sub-nav-link-hover')};
	}
`;

const copyStyles = css`
	${textSans15};
	color: inherit;
	margin: 0;
`;

const linksListStyles = css`
	${textSans15};
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	column-gap: ${space[4]}px;
	row-gap: ${space[1]}px;

	${from.tablet} {
		${textSans17};
	}
`;

const linkStyles = css`
	color: inherit;
	text-decoration: none;
	font-weight: 500;

	:hover {
		color: ${palette('--sub-nav-link-hover')};
	}
`;

/**
 * Renders a custom subnav targeted at a front. Frontend forwards the already
 * selected subnav; DCR just renders it.
 *
 * For now only the header text and links are rendered. Images and palettes are
 * intentionally ignored. Unknown `format` values fail safe to `compact`.
 */
export const CustomSubNav = ({ subnav, guardianBaseURL }: Props) => {
	const { header, links, format } = subnav;
	const isLarge = format === 'large';

	const headerText = header.dotcomPath ? (
		<a
			href={buildUrl(header.dotcomPath, guardianBaseURL)}
			css={headerLinkStyles}
			data-link-name={nestedOphanComponents(
				'custom-subnav',
				'header',
				header.headerText,
			)}
		>
			{header.headerText}
		</a>
	) : (
		header.headerText
	);

	return (
		<nav
			css={[wrapperStyles, !isLarge && compactWrapperStyles]}
			data-component="custom-subnav"
			aria-label="Custom subnavigation"
		>
			<h2 css={[headerTextStyles, !isLarge && compactHeaderTextStyles]}>
				{headerText}
			</h2>

			{isLarge && header.copy !== '' && (
				<p css={copyStyles}>{header.copy}</p>
			)}

			{links.length > 0 && (
				<ul css={linksListStyles}>
					{links.map((link) => (
						<li key={`${link.linkText}-${link.dotcomPath}`}>
							<a
								href={buildUrl(
									link.dotcomPath,
									guardianBaseURL,
								)}
								css={linkStyles}
								data-link-name={nestedOphanComponents(
									'custom-subnav',
									'link',
									link.linkText,
								)}
							>
								{link.linkText}
							</a>
						</li>
					))}
				</ul>
			)}
		</nav>
	);
};
