import { css } from '@emotion/react';

import { space } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton } from '@guardian/src-button';
import { Special } from '@guardian/types';
import { until } from '@guardian/src-foundations/mq';

import { ShareIcons } from '@frontend/web/components/ShareIcons';
import { Badge } from '@frontend/web/components/Badge';

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
	margin-right: 5px;
	display: inline-block;
	a {
		position: relative;
		display: block;
		padding-right: 5px;
		text-decoration: none;
	}
	a::after {
		content: '/';
		position: absolute;
		pointer-events: none;
		top: 0;
		right: -3px;
		color: ${palette.text.subMetaLink};
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

const sectionStyles = (format: Format) => {
	if (format.theme === Special.Labs) {
		return css`
			${textSans.medium()}
			line-height: 19px;
		`;
	}
	return css`
		${headline.xxxsmall()};
	`;
};

const keywordStyles = css`
	${textSans.small()};
`;

const hideSlash = css`
	a::after {
		content: '';
	}
`;

type Props = {
	palette: Palette;
	format: Format;
	subMetaSectionLinks: SimpleLinkType[];
	subMetaKeywordLinks: SimpleLinkType[];
	pageId: string;
	webUrl: string;
	webTitle: string;
	showBottomSocialButtons: boolean;
	badge?: BadgeType;
};

const syndicationButtonOverrides = (palette: Palette) => css`
	> a {
		color: ${palette.text.syndicationButton};
		border-color: ${palette.border.syndicationButton};
		font-weight: normal;
	}
`;

export const SubMeta = ({
	palette,
	format,
	subMetaKeywordLinks,
	subMetaSectionLinks,
	pageId,
	webUrl,
	webTitle,
	showBottomSocialButtons,
	badge,
}: Props) => {
	const hasSectionLinks = subMetaSectionLinks.length > 0;
	const hasKeywordLinks = subMetaKeywordLinks.length > 0;
	return (
		<div data-print-layout="hide" css={bottomPadding}>
			{badge && (
				<div css={badgeWrapper}>
					<Badge
						imageUrl={badge.imageUrl}
						seriesTag={badge.seriesTag}
					/>
				</div>
			)}
			{(hasSectionLinks || hasKeywordLinks) && (
				<>
					<span css={labelStyles(palette)}>Topics</span>
					<div css={listWrapper(palette)}>
						{hasSectionLinks && (
							<ul css={listStyleNone}>
								{subMetaSectionLinks.map((link, i) => (
									<li
										css={[
											listItemStyles(palette),
											sectionStyles(format),
											i ===
												subMetaSectionLinks.length -
													1 && hideSlash,
										]}
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
						)}
						{hasKeywordLinks && (
							<ul css={listStyleNone}>
								{subMetaKeywordLinks.map((link, i) => (
									<li
										css={[
											listItemStyles(palette),
											keywordStyles,
											i ===
												subMetaKeywordLinks.length -
													1 && hideSlash,
										]}
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
						)}
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
						palette={palette}
						displayIcons={[
							'facebook',
							'twitter',
							'email',
							'linkedIn',
							'whatsApp',
							'messenger',
						]}
						size="medium"
					/>
					<div css={syndicationButtonOverrides(palette)}>
						<LinkButton
							priority="tertiary"
							size="xsmall"
							data-link-name="meta-syndication-article"
							href={`https://syndication.theguardian.com/automation/?url=${encodeURIComponent(
								webUrl,
							)}&type=article&internalpagecode=${pageId}`}
							target="_blank"
							rel="noopener"
							title="Reuse this content"
						>
							Reuse this content
						</LinkButton>
					</div>
				</div>
			)}
		</div>
	);
};
