import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { between, until } from '@guardian/src-foundations/mq';

import { Byline } from '@root/src/web/components/Byline';
import { Contributor } from '@root/src/web/components/Contributor';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { SharingIcons } from './ShareIcons';
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
    designType: DesignType;
    pillar: Pillar;
    pageId: string;
    webTitle: string;
    author: AuthorType;
    tags: TagType[];
    webPublicationDateDisplay: string;
};

const decideEffect = (
    designType: DesignType,
    pillar: Pillar,
): LineEffectType => {
    if (pillar === 'sport') {
        return 'dotted';
    }
    if (designType === 'Feature') {
        return 'squiggly';
    }
    return 'straight';
};

export const ArticleMeta = ({
    designType,
    pillar,
    pageId,
    webTitle,
    author,
    tags,
    webPublicationDateDisplay,
}: Props) => {
    const sharingUrls = getSharingUrls(pageId, webTitle);

    return (
        <div className={metaContainer}>
            <GuardianLines
                pillar={pillar}
                effect={decideEffect(designType, pillar)}
            />
            <div className={cx(meta)}>
                <Contributor
                    designType={designType}
                    author={author}
                    tags={tags}
                    pillar={pillar}
                />
                <Dateline
                    dateDisplay={webPublicationDateDisplay}
                    descriptionText="Published on"
                />
                <div className={metaExtras}>
                    <SharingIcons
                        sharingUrls={sharingUrls}
                        pillar={pillar}
                        displayIcons={['facebook', 'twitter', 'email']}
                    />
                    <div data-island="share-count" />
                </div>
            </div>
        </div>
    );
};
