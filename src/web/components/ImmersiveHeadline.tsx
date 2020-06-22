import React from 'react';
import { css, cx } from 'emotion';

import { from } from '@guardian/src-foundations/mq';

import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { LeftColumn } from '@root/src/web/components/LeftColumn';
import { Flex } from '@root/src/web/components/Flex';
import { Caption } from '@root/src/web/components/Caption';

type Props = {
    display: Display;
    designType: DesignType;
    tags: TagType[];
    author: AuthorType;
    headline: string;
    sectionLabel: string;
    sectionUrl: string;
    guardianBaseURL: string;
    pillar: Pillar;
    captionText?: string;
    badge?: BadgeType;
};

const center = css`
    position: relative;
    margin: auto;

    ${from.tablet} {
        max-width: 740px;
    }

    ${from.desktop} {
        max-width: 980px;
    }

    ${from.leftCol} {
        max-width: 1140px;
    }

    ${from.wide} {
        max-width: 1300px;
    }
`;

const blackBlock = css`
    ::after {
        background-color: black;
        position: absolute;
        content: '';
        width: 0%;
        ${from.phablet} {
            width: 15%;
        }
        ${from.wide} {
            width: 20%;
        }
        right: 0;
        bottom: 0;
        display: block;
        z-index: 1;

        top: -68px;
        ${from.leftCol} {
            top: -64px;
        }
    }
`;

const padding = css`
    padding-left: 0px;

    ${from.phablet} {
        padding-left: 20px;
    }
`;

const postionRelative = css`
    position: relative;
`;

const PositionHeadline = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => (
    <div
        className={css`
            margin-top: -100px;
            flex-grow: 1;
        `}
    >
        {children}
    </div>
);

export const ImmersiveHeadline = ({
    display,
    designType,
    tags,
    author,
    headline,
    sectionLabel,
    sectionUrl,
    guardianBaseURL,
    pillar,
    captionText,
    badge,
}: Props) => (
    <div className={cx(postionRelative)}>
        <div className={blackBlock}>
            <div className={cx(center, padding)}>
                <Flex>
                    <LeftColumn showRightBorder={false}>
                        <Caption
                            display={display}
                            designType={designType}
                            captionText={captionText}
                            pillar={pillar}
                            shouldLimitWidth={true}
                        />
                    </LeftColumn>
                    <PositionHeadline>
                        <ArticleTitle
                            display={display}
                            designType={designType}
                            tags={tags}
                            sectionLabel={sectionLabel}
                            sectionUrl={sectionUrl}
                            guardianBaseURL={guardianBaseURL}
                            pillar={pillar}
                            badge={badge}
                        />
                        <ArticleHeadline
                            display={display}
                            headlineString={headline}
                            designType={designType}
                            pillar={pillar}
                            tags={tags}
                            byline={author.byline}
                        />
                    </PositionHeadline>
                </Flex>
            </div>
        </div>
    </div>
);
