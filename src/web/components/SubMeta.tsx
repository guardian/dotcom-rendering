import React from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';

import { SharingIcons } from '@frontend/web/components/ShareIcons';
import { SubMetaLinksList } from '@frontend/web/components/SubMetaLinksList';
import { SyndicationButton } from '@frontend/web/components/SyndicationButton';
import { getSharingUrls } from '@frontend/lib/sharing-urls';

const subMetaLabel = css`
    ${textSans.xsmall()};
    display: block;
    color: ${palette.neutral[60]};
`;

const subMetaSharingIcons = css`
    :after {
        content: '';
        display: block;
        clear: left;
    }
`;

type Props = {
    pillar: Pillar;
    subMetaSectionLinks: SimpleLinkType[];
    subMetaKeywordLinks: SimpleLinkType[];
    pageId: string;
    webUrl: string;
    webTitle: string;
    showBottomSocialButtons: boolean;
};

export const SubMeta = ({
    pillar,
    subMetaKeywordLinks,
    subMetaSectionLinks,
    pageId,
    webUrl,
    webTitle,
    showBottomSocialButtons,
}: Props) => {
    const hasSubMetaSectionLinks = subMetaSectionLinks.length > 0;
    const hasSubMetaKeywordLinks = subMetaKeywordLinks.length > 0;
    const sharingUrls = getSharingUrls(pageId, webTitle);
    return (
        <>
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
                <SharingIcons
                    className={subMetaSharingIcons}
                    sharingUrls={sharingUrls}
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
        </>
    );
};
