import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { between, until } from '@guardian/src-utilities';

import { ShareCount } from './ShareCount';
import { Dateline } from './Dateline';
import { SharingIcons } from './ShareIcons';
import { Byline } from '@frontend/web/components/Byline';
import { getSharingUrls } from '@frontend/lib/sharing-urls';

const guardianLines = css`
    background-image: repeating-linear-gradient(
        to bottom,
        ${palette.neutral[86]},
        ${palette.neutral[86]} 1px,
        transparent 1px,
        transparent 4px
    );
    background-repeat: repeat-x;
    background-position: top;
    background-size: 1px 13px;
    padding-top: 15px;
    margin-bottom: 6px;
`;

const meta = css`
    ${between.tablet.and.leftCol} {
        order: 1;
    }

    ${until.phablet} {
        padding-left: 10px;
        padding-right: 10px;
    }
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
        <div className={cx(meta, guardianLines)}>
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
                <ShareCount config={config} pageId={CAPI.pageId} />
            </div>
        </div>
    );
};
