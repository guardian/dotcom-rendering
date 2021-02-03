import React from 'react';
import { css, cx } from 'emotion';

import { neutral, border, text } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton } from '@guardian/src-button';

import { ShareIcons } from '@frontend/web/components/ShareIcons';
import { Badge } from '@frontend/web/components/Badge';
import { until } from '@guardian/src-foundations/mq';
import { pillarMap, pillarPalette } from '@root/src/lib/pillars';

const pillarColours = pillarMap(
	(pillar) =>
		css`
			color: ${pillarPalette[pillar].main};
		`,
);
const subMetaLabel = css`
	${textSans.xsmall()};
	display: block;
	color: ${neutral[60]};
`;

const badgeWrapper = css`
	float: right;
	margin-top: 6px;
`;

const bottomPadding = css`
	padding-bottom: 72px;
	${until.desktop} {
		padding-bottom: 58px;
	}
`;

const subMetaLinksList = css`
	list-style: none;
`;

const subMetaKeywordLinksList = css`
	padding-bottom: 12px;
	margin-bottom: 6px;
	border-bottom: 1px solid ${border.secondary};
`;

const subMetaLinksListItem = css`
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
		color: ${neutral[86]};
	}
	a:hover {
		text-decoration: underline;
	}
`;

const subMetaLink = css`
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
`;

const subMetaSectionLink = css`
	${headline.xxxsmall()};
`;

const subMetaKeywordLink = css`
	${textSans.small()};
`;

const hideSlash = css`
	a::after {
		content: '';
	}
`;

type Props = {
	pillar: Theme;
	palette: Palette;
	subMetaSectionLinks: SimpleLinkType[];
	subMetaKeywordLinks: SimpleLinkType[];
	pageId: string;
	webUrl: string;
	webTitle: string;
	showBottomSocialButtons: boolean;
	badge?: BadgeType;
};

const syndicationButtonOverrides = css`
	> a {
		color: ${text.supporting};
		border-color: ${border.secondary};
		font-weight: normal;
	}
`;

export const SubMeta = ({
	pillar,
	palette,
	subMetaKeywordLinks,
	subMetaSectionLinks,
	pageId,
	webUrl,
	webTitle,
	showBottomSocialButtons,
	badge,
}: Props) => {
	const hasSubMetaSectionLinks = subMetaSectionLinks.length > 0;
	const hasSubMetaKeywordLinks = subMetaKeywordLinks.length > 0;
	return (
		<div data-print-layout="hide" className={bottomPadding}>
			{badge && (
				<div className={badgeWrapper}>
					<Badge
						imageUrl={badge.imageUrl}
						seriesTag={badge.seriesTag}
					/>
				</div>
			)}
			{(hasSubMetaSectionLinks || hasSubMetaKeywordLinks) && (
				<span className={subMetaLabel}>Topics</span>
			)}
			{hasSubMetaSectionLinks && (
				<ul className={subMetaLinksList}>
					{subMetaSectionLinks.map((link, i) => (
						<li
							className={cx(
								subMetaLinksListItem,
								subMetaSectionLink,
								i === subMetaSectionLinks.length - 1 &&
									hideSlash,
							)}
							key={link.url}
						>
							<a
								className={cx(
									subMetaLink,
									pillarColours[pillar],
								)}
								href={link.url}
							>
								{link.title}
							</a>
						</li>
					))}
				</ul>
			)}
			{hasSubMetaKeywordLinks && (
				<ul className={cx(subMetaLinksList, subMetaKeywordLinksList)}>
					{subMetaKeywordLinks.map((link, i) => (
						<li
							className={cx(
								subMetaLinksListItem,
								subMetaKeywordLink,
								i === subMetaKeywordLinks.length - 1 &&
									hideSlash,
							)}
							key={link.url}
						>
							<a
								className={cx(
									subMetaLink,
									pillarColours[pillar],
								)}
								href={link.url}
							>
								{link.title}
							</a>
						</li>
					))}
				</ul>
			)}
			{showBottomSocialButtons && (
				<div
					className={css`
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
							'pinterest',
							'whatsApp',
							'messenger',
						]}
					/>
					<div className={syndicationButtonOverrides}>
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
