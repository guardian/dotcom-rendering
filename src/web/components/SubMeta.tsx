import React from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';

import { ShareIcons } from '@frontend/web/components/ShareIcons';
import { SubMetaLinksList } from '@frontend/web/components/SubMetaLinksList';
import { SyndicationButton } from '@frontend/web/components/SyndicationButton';
import { Badge } from '@frontend/web/components/Badge';
import { until } from '@guardian/src-foundations/mq';

const subMetaLabel = css`
	${textSans.xsmall()};
	display: block;
	color: ${neutral[60]};
`;

const subMetaSharingIcons = css`
	:after {
		content: '';
		display: block;
		clear: left;
	}
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

type Props = {
	pillar: Theme;
	subMetaSectionLinks: SimpleLinkType[];
	subMetaKeywordLinks: SimpleLinkType[];
	pageId: string;
	webUrl: string;
	webTitle: string;
	showBottomSocialButtons: boolean;
	badge?: BadgeType;
};

export const SubMeta = ({
	pillar,
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
				<SubMetaLinksList
					links={subMetaSectionLinks}
					isSectionLinkList={true}
					pillar={pillar}
				/>
			)}
			{hasSubMetaKeywordLinks && (
				<SubMetaLinksList
					links={subMetaKeywordLinks}
					isSectionLinkList={false}
					pillar={pillar}
				/>
			)}
			{showBottomSocialButtons && (
				<ShareIcons
					className={subMetaSharingIcons}
					pageId={pageId}
					webTitle={webTitle}
					pillar={pillar}
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
			)}
			{showBottomSocialButtons && (
				<SyndicationButton webUrl={webUrl} internalPageCode={pageId} />
			)}
		</div>
	);
};
