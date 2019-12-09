import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { between, until } from '@guardian/src-foundations/mq';

import { SharingIcons } from './ShareIcons';
import { Contributor } from '@root/src/web/components/Contributor';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { Dateline } from './Dateline';

const meta = css`
    ${between.tablet.and.leftCol} {
        order: 1;
    }

    ${until.phablet} {
        padding-left: 20px;
        padding-right: 20px;
    }
    padding-top: 2px;
`;

const metaExtras = css`
    border-top: 1px solid ${palette.neutral[86]};
    padding-top: 6px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    ${until.phablet} {
        margin-left: -20px;
        margin-right: -20px;
        padding-left: 20px;
        padding-right: 20px;
    }
`;

const metaContainer = css`
    ${until.phablet} {
        margin-left: -20px;
        margin-right: -20px;
    }
`;

type Props = {
    CAPI: CAPIType;
};

export const ArticleMeta = ({ CAPI }: Props) => {
    const sharingUrls = getSharingUrls(CAPI.pageId, CAPI.webTitle);

    return (
        <div className={metaContainer}>
            <GuardianLines pillar={CAPI.pillar} />
            <div className={cx(meta)}>
                <Contributor
                    author={CAPI.author}
                    tags={CAPI.tags}
                    pillar={CAPI.pillar}
                />
                <Dateline
                    dateDisplay={CAPI.webPublicationDateDisplay}
                    descriptionText="Published on"
                />
                <div className={metaExtras}>
                    <SharingIcons
                        sharingUrls={sharingUrls}
                        pillar={CAPI.pillar}
                        displayIcons={['facebook', 'twitter', 'email']}
                    />
                    <div data-island="share-count" />
                </div>
            </div>
        </div>
    );
};
