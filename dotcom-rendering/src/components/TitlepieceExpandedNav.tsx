import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	space,
	textSans15,
} from '@guardian/source/foundations';
import type { LinkType, NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import { pillarLeftMarginPx, pillarWidthsPx } from './TitlepiecePillars';

interface Props {
	nav: NavType;
}

const expandedNavStyles = css`
	display: flex;
	background-color: ${themePalette('--masthead-nav-background')};
	${textSans15}
	a {
		color: ${themePalette('--masthead-nav-link-text')};
		text-decoration: none;
		&:hover {
			text-decoration: underline;
			color: yellow;
		}
	}
`;

const pillarColumnStyles = css`
	border-right: 1px solid ${themePalette('--masthead-nav-lines')};

	${from.tablet} {
		width: ${pillarWidthsPx.tablet}px;
	}

	${from.leftCol} {
		width: ${pillarWidthsPx.leftCol}px;
	}

	${from.wide} {
		width: ${pillarWidthsPx.wide}px;
	}
`;

const columnContentStyles = css`
	padding: ${space[2]}px ${pillarLeftMarginPx}px;
`;

const linkStyles = css`
	margin-bottom: ${space[2]}px;
`;

const extensionLinkStyles = css`
	${headlineBold24};
	a {
		&:hover {
			text-decoration: none;
		}
	}
`;

const searchBoxStyles = css`
	width: 100%;
	height: 40px;
	border-radius: 28px;
	${textSans15};
	padding-left: 10px;
	color: white;
	background-color: #1e3f72;
	margin-bottom: ${space[2]}px;
	border: none;
	::placeholder {
		color: white;
		padding-left: 10px;
	}
	:focus {
		outline: none;
	}
`;

const makeChildLinks = (children: LinkType[]) => {
	return children.map((child) => {
		return (
			<div key={child.title} css={linkStyles}>
				<a href={child.url}>{child.longTitle}</a>
			</div>
		);
	});
};

export const TitlepieceExpandedNav = ({ nav }: Props) => {
	return (
		<div css={expandedNavStyles}>
			{nav.pillars.map((pillar) => {
				return (
					<div key={pillar.title} css={pillarColumnStyles}>
						<div css={columnContentStyles}>
							{pillar.children
								? makeChildLinks(pillar.children)
								: null}
						</div>
					</div>
				);
			})}
			<div css={pillarColumnStyles}>
				<div css={columnContentStyles}>
					{nav.otherLinks.map((link) => {
						return (
							<div css={linkStyles} key={link.title}>
								<a href={link.url}>{link.longTitle}</a>
							</div>
						);
					})}
				</div>
			</div>
			<div>
				<div css={columnContentStyles}>
					<input
						css={searchBoxStyles}
						type="text"
						placeholder="Search the Guardian"
					/>
					{nav.brandExtensions.map((brandExtension) => {
						return (
							<div
								css={[linkStyles, extensionLinkStyles]}
								key={brandExtension.title}
							>
								<a href={brandExtension.url}>
									{brandExtension.title}
								</a>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
