import React from 'react';
import { InnerContainer } from '@frontend/amp/components/InnerContainer';
import { css } from 'emotion';
import { ArticleModel } from '@frontend/amp/pages/Article';
import { TopMeta } from '@frontend/amp/components/TopMeta';
import { SubMeta } from '@frontend/amp/components/SubMeta';
import { getToneType, StyledTone } from '@frontend/amp/lib/tag-utils';
import { palette } from '@guardian/pasteup/palette';
import { KeyEvents } from '@frontend/amp/components/KeyEvents';
import { headline, textSans } from '@guardian/pasteup/typography';
import { Blocks } from '@frontend/amp/components/Blocks';
import RefreshIcon from '@guardian/pasteup/icons/refresh.svg';
import ChevronRightSingle from '@guardian/pasteup/icons/chevron-right-single.svg';
import ChevronRightDouble from '@guardian/pasteup/icons/chevron-right-double.svg';
import ChevronLeftSingle from '@guardian/pasteup/icons/chevron-left-single.svg';
import ChevronLeftDouble from '@guardian/pasteup/icons/chevron-left-double.svg';

// TODO check if liveblog background colours are more complex - like regular
// article is

// TODO add styling for ul and blockquote
const body = (pillar: Pillar, tone: StyledTone) => css`
    background-color: ${palette.neutral[97]};

    p {
        font-size: 16px;
    }

    h2 {
        ${headline(3)};
        font-weight: 500;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
`;

const updateButtonStyle = css`
    position: fixed;
    top: 12px;
    left: 0;
    z-index: 1015;

    display: flex;
    justify-content: center;
    width: 100%;

    button {
        border: none;
        border-radius: 1000px;
        height: 36px;
        padding: 0 12px;

        background-color: ${palette.news.main};
        color: ${palette.neutral[100]};
        font-weight: bold;
        ${textSans(1)};

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    svg {
        height: 20px;
        width: 20px;
        margin-right: 6px;
    }
`;

// TODO create link style css function and pass in isActive, isMarginRight to
// improve things
const paginationStyle = css`
    ${textSans(1)};
    font-weight: bold;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const paginationLinkStyle = (isActive: boolean, isMarginRight: boolean) => css`
    width: 2.25rem;
    border-radius: 100%;

    position: relative;
    color: ${palette.neutral[7]};
    border: 1px solid ${palette.neutral[86]};
    height: 36px;
    line-height: 38px;
    display: inline-block;

    margin-right: ${isMarginRight ? '5px' : '0px'};

    span {
        fill: ${palette.neutral[100]};

        svg {
            position: absolute;
            top: 10px;
            left: 9px;
            width: 16px;
            height: 16px;
            fill: ${isActive ? palette.neutral[46] : palette.neutral[86]};
        }
    }
`;

const Pagination: React.SFC<{
    pagination?: Pagination;
    guardianURL: string;
}> = ({ pagination, guardianURL }) => {
    const link = (
        url: string,
        icon: JSX.Element,
        suffix?: string,
        hasRightMargin: boolean = false,
    ): JSX.Element => {
        const styles = paginationLinkStyle(
            suffix !== undefined,
            hasRightMargin,
        );

        const attrs = {
            className: styles,
            href: suffix ? url + suffix : undefined,
        };

        return (
            <a {...attrs}>
                <span>{icon}</span>
            </a>
        );
    };

    if (!pagination) {
        return null;
    }

    return (
        <div className={paginationStyle}>
            <span>
                {link(
                    guardianURL,
                    <ChevronLeftDouble />,
                    pagination.newest,
                    true,
                )}
                {link(guardianURL, <ChevronLeftSingle />, pagination.newer)}
            </span>

            <span>
                {pagination.currentPage} of {pagination.totalPages}
            </span>

            <span>
                {link(
                    guardianURL,
                    <ChevronRightSingle />,
                    pagination.older,
                    true,
                )}
                {link(guardianURL, <ChevronRightDouble />, pagination.oldest)}
            </span>
        </div>
    );
};

export const Body: React.FC<{
    pillar: Pillar;
    data: ArticleModel;
    config: ConfigType;
}> = ({ pillar, data, config }) => {
    const tone = getToneType(data.tags);
    const url = `${data.guardianBaseURL}/${data.pageId}`;
    const isFirstPage = data.pagination
        ? data.pagination.currentPage === 1
        : false;

    return (
        <InnerContainer className={body(pillar, tone)}>
            <TopMeta tone={tone} data={data} />
            <KeyEvents events={data.keyEvents} pillar={pillar} url={url} />

            {!isFirstPage && (
                <Pagination guardianURL={url} pagination={data.pagination} />
            )}

            <amp-live-list
                id="live-blog-entries-7ea0dbef"
                data-max-items-per-page="20" // TODO confirm if this should be dynamic
            >
                <div update="" className={updateButtonStyle}>
                    <button on="tap:my-live-list.update">
                        <RefreshIcon />
                        <span>You have updates</span>
                    </button>
                </div>
                <div items="">
                    <Blocks
                        pillar={pillar}
                        blocks={data.blocks}
                        // stuff for ads
                        edition={data.editionId}
                        section={data.sectionName}
                        contentType={data.contentType}
                        switches={config.switches}
                        commercialProperties={data.commercialProperties}
                        url={url}
                        shouldHideAds={data.shouldHideAds}
                    />
                </div>
            </amp-live-list>

            <Pagination guardianURL={url} pagination={data.pagination} />

            <SubMeta
                sections={data.subMetaSectionLinks}
                keywords={data.subMetaKeywordLinks}
                pillar={pillar}
                sharingURLs={data.sharingUrls}
                pageID={data.pageId}
                isCommentable={data.isCommentable}
                guardianBaseURL={data.guardianBaseURL}
            />
        </InnerContainer>
    );
};
