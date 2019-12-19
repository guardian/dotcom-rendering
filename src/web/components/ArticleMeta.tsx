import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';

import { SharingIcons } from './ShareIcons';
import { Contributor } from '@root/src/web/components/Contributor';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { Dateline } from './Dateline';

const meta = css`
    padding-top: 2px;

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
        margin-left: -20px;
        margin-right: -20px;
        padding-left: 20px;
        padding-right: 20px;
    }
`;

const articleMetaStyles = css`
    padding-right: 10px;
    max-width: 230px;

    order: 5;
    flex-basis: 230px;

    border-right: 1px solid ${palette.neutral[86]};

    ${until.wide} {
        max-width: 151px;
        flex-basis: 151px;
    }

    ${until.leftCol} {
        padding-right: 0;
        max-width: 620px;

        order: 7;
        flex-basis: 620px;

        border-right: 0;
    }

    ${until.desktop} {
        max-width: 100%;
        flex-basis: 100%;
    }

    ${until.phablet} {
        margin-top: 10px;
    }
`;

const showcaseLayout = css`
    order: 4;
    ${until.phablet} {
        margin-top: 0;
    }
`;

type Props = {
    CAPI: CAPIType;
    layoutType?: LayoutType;
    hasSquigglyLines?: boolean;
};

export const ArticleMeta = ({
    CAPI,
    layoutType = 'Standard',
    hasSquigglyLines = false,
}: Props) => {
    const sharingUrls = getSharingUrls(CAPI.pageId, CAPI.webTitle);

    return (
        <div
            className={cx(
                articleMetaStyles,
                layoutType === 'Showcase' && showcaseLayout,
            )}
        >
            <GuardianLines pillar={CAPI.pillar} squiggly={hasSquigglyLines} />
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
