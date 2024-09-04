import { css } from '@emotion/react';
import { ArticleDesign, type ArticleFormat } from '@guardian/libs';
import {
	from,
	space,
	textSans12,
	textSans14,
	until,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { grid } from '../grid';
import type { BaseLinkType } from '../model/extract-nav';
import { palette } from '../palette';
import { Island } from './Island';
import { ShareButton } from './ShareButton.importable';

const labelStyles = css`
	${textSans12};
	display: block;
	color: ${palette('--sub-meta-label-text')};
	margin-bottom: 8px;
`;

const labelId = 'sub-meta';

const bottomPadding = css`
	padding-bottom: ${space[9]}px;
	${until.desktop} {
		padding-bottom: ${space[5]}px;
	}
`;

const setMetaWidth = css`
	position: relative;
	${from.tablet} {
		max-width: 620px;
	}
	${from.desktop} {
		margin-left: 0px;
		margin-right: 310px;
	}
	${from.leftCol} {
		margin-left: 150px;
		padding-left: 10px;
		border-left: 1px solid ${palette('--article-border')};
	}
	${from.wide} {
		margin-left: 229px;
	}
`;

const listStyleNone = css`
	list-style: none;
	/* https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns */
	/* Needs double escape char: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#es2018_revision_of_illegal_escape_sequences */
	li::before {
		content: '\\200B'; /* Zero width space */
		display: block;
		height: 0;
		width: 0;
	}
	display: flex;
	flex-wrap: wrap;
	gap: 1.5rem 0.25rem;
	background-image: repeating-linear-gradient(
			to bottom,
			${palette('--sub-meta-background')} 0px,
			${palette('--sub-meta-background')} 36px,
			transparent 36px,
			transparent 37px,
			${palette('--sub-meta-background')} 37px,
			${palette('--sub-meta-background')} 48px
		),
		repeating-linear-gradient(
			to right,
			${palette('--article-border')} 0px,
			${palette('--article-border')} 3px,
			transparent 3px,
			transparent 5px
		);
	background-position: top;
	background-repeat: no-repeat;
`;

const listWrapper = css`
	padding-bottom: 12px;
	margin-bottom: 6px;
	border-bottom: 1px solid ${palette('--article-border')};
`;

const listItemStyles = css`
	${textSans14};
	border: 1px solid ${palette('--sub-meta-text')};
	border-radius: 12px;
	padding: 2px 9px;
	:hover {
		background-color: ${palette('--sub-meta-text')};
		a {
			color: ${palette('--sub-meta-text-hover')};
		}
	}
	a {
		position: relative;
		display: block;
		text-decoration: none;
	}
`;

const linkStyles = css`
	text-decoration: none;
	color: ${palette('--sub-meta-text')};
`;

const galleryStyles = css`
	${grid.container}
	grid-auto-flow: row dense;
	background-color: ${palette('--article-inner-background')};
	padding-bottom: ${space[2]}px;

	${from.tablet} {
		&::before {
			${grid.between('viewport-start', 'centre-column-start')}
			grid-row: span 3;
			content: '';
			background-color: ${palette('--article-background')};
			border-right: 1px solid ${palette('--article-border')};
		}

		&::after {
			${grid.between('centre-column-end', 'viewport-end')}
			grid-row: span 3;
			content: '';
			background-color: ${palette('--article-background')};
			border-left: 1px solid ${palette('--article-border')};
		}
	}

	${from.desktop} {
		&::after {
			${grid.between('right-column-end', 'viewport-end')}
		}
	}

	${from.leftCol} {
		&::before {
			${grid.between('viewport-start', 'left-column-start')}
		}
	}
`;

const galleryContentStyles = css`
	${grid.column.centre}
`;

type Props = {
	format: ArticleFormat;
	subMetaSectionLinks: BaseLinkType[];
	subMetaKeywordLinks: BaseLinkType[];
	pageId: string;
	webUrl: string;
	webTitle: string;
	showBottomSocialButtons: boolean;
};

const syndicationButtonOverrides = css`
	> a {
		font-weight: normal;
	}
`;

export const SubMeta = ({
	format,
	subMetaKeywordLinks,
	subMetaSectionLinks,
	pageId,
	webUrl,
	webTitle,
	showBottomSocialButtons,
}: Props) => {
	const createLinks = () => {
		const links: BaseLinkType[] = [];
		if (subMetaSectionLinks.length > 0) links.push(...subMetaSectionLinks);
		if (subMetaKeywordLinks.length > 0) links.push(...subMetaKeywordLinks);
		return {
			links,
			hasLinks: links.length > 0,
		};
	};
	const { links, hasLinks } = createLinks();

	if (!hasLinks && !showBottomSocialButtons) {
		return null;
	}

	return (
		<nav
			data-print-layout="hide"
			aria-labelledby={labelId}
			css={[
				format.design === ArticleDesign.Interactive
					? setMetaWidth
					: undefined,
				format.design === ArticleDesign.Gallery
					? galleryStyles
					: bottomPadding,
			]}
		>
			{hasLinks && (
				<>
					<h2
						id={labelId}
						css={[
							labelStyles,
							format.design === ArticleDesign.Gallery
								? galleryContentStyles
								: undefined,
						]}
					>
						Explore more on these topics
					</h2>
					<div
						css={[
							listWrapper,
							format.design === ArticleDesign.Gallery
								? galleryContentStyles
								: undefined,
						]}
					>
						<ul css={listStyleNone}>
							{links.map((link) => (
								<li css={listItemStyles} key={link.url}>
									<a css={linkStyles} href={link.url}>
										{link.title}
									</a>
								</li>
							))}
						</ul>
					</div>
				</>
			)}
			{showBottomSocialButtons && (
				<div
					css={[
						css`
							display: flex;
							justify-content: space-between;
						`,
						format.design === ArticleDesign.Gallery
							? galleryContentStyles
							: undefined,
					]}
				>
					<Island priority="feature" defer={{ until: 'visible' }}>
						<ShareButton
							pageId={pageId}
							webTitle={webTitle}
							format={format}
							context="SubMeta"
						/>
					</Island>
					<div css={syndicationButtonOverrides}>
						{format.design === ArticleDesign.Interactive ? null : (
							<LinkButton
								priority="tertiary"
								size="xsmall"
								data-link-name="meta-syndication-article"
								href={`https://syndication.theguardian.com/?url=${encodeURIComponent(
									webUrl,
								)}&type=article&internalpagecode=${pageId}`}
								target="_blank"
								rel="noreferrer"
								title="Reuse this content"
								theme={{
									textTertiary: palette(
										'--syndication-button-text',
									),
									borderTertiary: palette(
										'--syndication-button-border',
									),
									backgroundTertiaryHover: palette(
										'--syndication-button-hover',
									),
								}}
							>
								Reuse this content
							</LinkButton>
						)}
					</div>
				</div>
			)}
		</nav>
	);
};
