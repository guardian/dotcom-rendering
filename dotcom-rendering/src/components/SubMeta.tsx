import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, space, textSans, until } from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';
import { decidePalette } from '../lib/decidePalette';
import type { BaseLinkType } from '../model/extract-nav';
import type { DCRBadgeType } from '../types/badge';
import type { Palette } from '../types/palette';
import { Badge } from './Badge';
import { ShareIcons } from './ShareIcons';

const labelStyles = (palette: Palette) => css`
	${textSans.xxsmall()};
	display: block;
	color: ${palette.text.subMetaLabel};
`;

const badgeWrapper = css`
	float: right;
	margin-top: 6px;
`;

const bottomPadding = css`
	padding-bottom: ${space[9]}px;
	${until.desktop} {
		padding-bottom: ${space[5]}px;
	}
`;

const setMetaWidth = (palette: Palette) => css`
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
		border-left: 1px solid ${palette.border.article};
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
`;

const listWrapper = (palette: Palette) => css`
	padding-bottom: 12px;
	margin-bottom: 6px;
	border-bottom: 1px solid ${palette.border.article};
`;

const listItemStyles = (palette: Palette) => css`
	display: inline-block;
	${textSans.xsmall()};
	border: 1px solid ${palette.text.subMeta};
	border-radius: 12px;
	padding: 2px 9px;
	margin-right: 7px;
	a {
		position: relative;
		display: block;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
`;

const linkStyles = (palette: Palette) => css`
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
	color: ${palette.text.subMeta};
`;

type Props = {
	format: ArticleFormat;
	subMetaSectionLinks: BaseLinkType[];
	subMetaKeywordLinks: BaseLinkType[];
	pageId: string;
	webUrl: string;
	webTitle: string;
	showBottomSocialButtons: boolean;
	badge?: DCRBadgeType;
};

const syndicationButtonOverrides = (palette: Palette) => css`
	> a {
		color: ${palette.text.syndicationButton};
		border-color: ${palette.border.syndicationButton};
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
	badge,
}: Props) => {
	const palette = decidePalette(format);
	const createLinks = () => {
		const links: BaseLinkType[] = [];
		if (subMetaSectionLinks.length > 0) links.push(...subMetaSectionLinks);
		if (subMetaKeywordLinks.length > 0) links.push(...subMetaKeywordLinks);
		return {
			links: links,
			hasLinks: links.length > 0,
		};
	};
	const { links, hasLinks } = createLinks();
	return (
		<div
			data-print-layout="hide"
			css={
				format.design === ArticleDesign.Interactive
					? [bottomPadding, setMetaWidth(palette)]
					: bottomPadding
			}
		>
			{badge && (
				<div css={badgeWrapper}>
					<Badge imageSrc={badge.imageSrc} href={badge.href} />
				</div>
			)}
			{hasLinks && (
				<>
					<span css={labelStyles(palette)}>
						Explore more on these topics
					</span>
					<div css={listWrapper(palette)}>
						<ul css={listStyleNone}>
							{links.map((link) => (
								<li
									css={listItemStyles(palette)}
									key={link.url}
								>
									<a
										css={linkStyles(palette)}
										href={link.url}
									>
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
					<ShareIcons
						pageId={pageId}
						webTitle={webTitle}
						format={format}
						displayIcons={[
							'facebook',
							'twitter',
							'email',
							'linkedIn',
							'whatsApp',
							'messenger',
						]}
						size="medium"
						context="SubMeta"
					/>
					<div css={syndicationButtonOverrides(palette)}>
						{format.design === ArticleDesign.Interactive ? null : (
							<LinkButton
								priority="tertiary"
								size="xsmall"
								data-link-name="meta-syndication-article"
								href={`https://syndication.theguardian.com/automation/?url=${encodeURIComponent(
									webUrl,
								)}&type=article&internalpagecode=${pageId}`}
								target="_blank"
								rel="noreferrer"
								title="Reuse this content"
							>
								Reuse this content
							</LinkButton>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
