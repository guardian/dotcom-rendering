import { css, type SerializedStyles } from '@emotion/react';
import {
	between,
	from,
	space,
	textSans12,
	textSans14,
	until,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { grid } from '../grid';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import type { BaseLinkType } from '../model/extract-nav';
import { palette } from '../palette';
import { Island } from './Island';
import { ShareButton } from './ShareButton.importable';

const labelStyles = (design: ArticleDesign): SerializedStyles => css`
	${design === ArticleDesign.Gallery ? grid.column.centre : undefined};
	${textSans12};
	display: block;
	color: ${palette('--sub-meta-label-text')};
	margin-bottom: 8px;
`;

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

const listStyles = css`
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
			${palette('--sub-meta-background')} 2.25rem,
			transparent 2.25rem,
			transparent 2.3125rem,
			${palette('--sub-meta-background')} 2.3125rem,
			${palette('--sub-meta-background')} 3rem
		),
		repeating-linear-gradient(
			to right,
			${palette('--article-border')} 0px,
			${palette('--article-border')} 0.1875rem,
			transparent 0.1875rem,
			transparent 0.3125rem
		);
	background-position: top;
	background-repeat: no-repeat;
`;

const listWrapper = (design: ArticleDesign): SerializedStyles => {
	if (design === ArticleDesign.Gallery) {
		return css`
			${grid.column.centre}
			padding-bottom: 0.75rem;
			margin-bottom: 6px;
		`;
	}

	return css`
		padding-bottom: 0.75rem;
		margin-bottom: 6px;
		border-bottom: 1px solid ${palette('--article-border')};
	`;
};

const listItemStyles = css`
	${textSans14};
	border: 0.0625rem solid ${palette('--sub-meta-text')};
	border-radius: 0.75rem;
	padding: 0.125rem 0.5625rem;
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

const galleryStyles = css`
	${grid.paddedContainer};
	background-color: ${palette('--article-inner-background')};
	border-bottom: 1px solid var(--article-border);
	padding: 0;

	${from.tablet} {
		border-left: 1px solid ${palette('--article-border')};
		border-right: 1px solid ${palette('--article-border')};
	}
`;

const galleryBorder = css`
	grid-row: 1 / 3;
	position: relative; /* allows the ::before & ::after to be positioned relative to this */

	${between.desktop.and.leftCol} {
		${grid.column.right}

		&::before {
			content: '';
			position: absolute;
			left: -10px; /* 10px to the left of this element */
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--article-border')};
		}
	}

	${from.leftCol} {
		${grid.column.left}

		&::after {
			content: '';
			position: absolute;
			right: -10px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--article-border')};
		}
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

	const showSyndicationButton =
		format.design !== ArticleDesign.Interactive &&
		format.design !== ArticleDesign.Gallery;

	return (
		<div
			data-print-layout="hide"
			css={[
				format.design === ArticleDesign.Interactive
					? setMetaWidth
					: undefined,
				format.design === ArticleDesign.Gallery
					? galleryStyles
					: bottomPadding,
			]}
		>
			{format.design === ArticleDesign.Gallery && (
				<div css={galleryBorder}></div>
			)}
			{hasLinks && (
				<>
					<span css={labelStyles(format.design)}>
						Explore more on these topics
					</span>
					<div css={listWrapper(format.design)}>
						<ul css={listStyles}>
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
					css={css`
						display: flex;
						justify-content: space-between;
					`}
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
						{showSyndicationButton ? (
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
						) : null}
					</div>
				</div>
			)}
		</div>
	);
};
