import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { between, until } from '@guardian/src-foundations/mq';

import { SharingIcons } from './ShareIcons';
import { Byline } from '@root/src/web/components/Byline';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { Dateline } from './Dateline';

const meta = css`
    ${between.tablet.and.leftCol} {
        order: 1;
    }

    ${until.phablet} {
        padding-left: 10px;
        padding-right: 10px;
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
        margin-left: -10px;
        margin-right: -10px;
        padding-left: 10px;
        padding-right: 10px;
    }
`;

type Props = {
    CAPI: CAPIType;
    config: ConfigType;
};

export const ArticleMeta = ({ CAPI, config }: Props) => {
    const sharingUrls = getSharingUrls(CAPI.pageId, CAPI.webTitle);

    return (
        <>
            <GuardianLines pillar={CAPI.pillar} />
            <div className={cx(meta)}>
                <Byline
                    author={CAPI.author}
                    tags={CAPI.tags}
                    pillar={CAPI.pillar}
                />
                <Dateline
                    dateDisplay={CAPI.webPublicationDateDisplay}
                    descriptionText={'Published on'}
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
        </>
    );
};
