import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, space, textSans, until } from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';
import type { BaseLinkType } from '../model/extract-nav';
import { palette } from '../palette';
import type { DCRBadgeType } from '../types/badge';
import { Badge } from './Badge';
import { useConfig } from './ConfigContext';
import { ShareIcons } from './ShareIcons';

const labelStyles = css`
	${textSans.xxsmall()};
	display: block;
	color: ${palette('--sub-meta-label-text')};
	margin-bottom: 8px;
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
	${textSans.xsmall()};
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

const syndicationButtonOverrides = css`
	> a {
		color: ${palette('--syndication-button-text')};
		border-color: ${palette('--syndication-button-border')};
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
	const { renderingTarget } = useConfig();
	const showBadge = renderingTarget === 'Web' && badge !== undefined;
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
	return (
		<div
			data-print-layout="hide"
			css={
				format.design === ArticleDesign.Interactive
					? [bottomPadding, setMetaWidth]
					: bottomPadding
			}
		>
			{showBadge && (
				<div css={badgeWrapper}>
					<Badge imageSrc={badge.imageSrc} href={badge.href} />
				</div>
			)}
			{hasLinks && (
				<>
					<span css={labelStyles}>Explore more on these topics</span>
					<div css={listWrapper}>
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
					<div css={syndicationButtonOverrides}>
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
