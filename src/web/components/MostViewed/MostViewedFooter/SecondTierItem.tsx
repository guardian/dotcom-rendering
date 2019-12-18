import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

import { AgeWarning } from '@root/src/web/components/AgeWarning';
import { Avatar } from '@root/src/web/components/Avatar';
import { LinkHeadline } from '@root/src/web/components/LinkHeadline';
import { Flex } from '@root/src/web/components/Flex';

const itemStyles = (showRightBorder?: boolean) => css`
    position: relative;

    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 12px;

    border-top: 1px solid ${palette.neutral[86]};
    ${from.tablet} {
        border-right: ${showRightBorder && `1px solid ${palette.neutral[86]}`};
    }

    min-height: 3.25rem;

    flex-basis: 50%;

    &:hover {
        cursor: pointer;
    }

    &:hover,
    :focus {
        background: ${palette.neutral[97]};
    }
`;

const titleStyles = css`
    ${headline.xxxsmall({ fontWeight: 'bold' })}
    padding-top: 4px;
`;

const headlineStyles = css`
    word-wrap: break-word;
    overflow: hidden;
`;

const headlineLink = css`
    text-decoration: none;
    color: ${palette.neutral[7]};
    font-weight: 500;
    ${headline.xxxsmall()};
`;

const ageWarningStyles = css`
    margin-top: 4px;
`;

const avatarSizeStyles = css`
    height: 90px;
    width: 90px;
`;

const avatarContainerStyles = css`
    display: flex;
    flex-direction: row-reverse;

    margin-left: 5px;
    margin-top: 24px;
`;

type Props = {
    trail: TrailType;
    heading: string;
    showRightBorder?: boolean; // Prevents double borders
};

export const SecondTierItem = ({ trail, heading, showRightBorder }: Props) => {
    const {
        url,
        isLiveBlog,
        avatarUrl,
        image,
        designType,
        byline,
        showByline,
        pillar,
        ageWarning,
        linkText,
    } = trail;

    const avatarToShow = avatarUrl || image;

    return (
        <div className={itemStyles(showRightBorder)}>
            {/* tslint:disable-next-line:react-a11y-anchors */}
            <a className={headlineLink} href={url} data-link-name={'article'}>
                <Flex>
                    <div className={headlineStyles}>
                        <div className={titleStyles}>{heading}</div>
                        {isLiveBlog ? (
                            <LinkHeadline
                                designType={designType}
                                headlineText={linkText}
                                pillar={pillar}
                                size="small"
                                byline={showByline ? byline : undefined}
                            />
                        ) : (
                            <LinkHeadline
                                designType={designType}
                                headlineText={linkText}
                                pillar={pillar}
                                size="small"
                                byline={showByline ? byline : undefined}
                            />
                        )}
                        {ageWarning && (
                            <div className={ageWarningStyles}>
                                <AgeWarning age={ageWarning} size="small" />
                            </div>
                        )}
                    </div>
                    <>
                        {avatarToShow && (
                            <div className={avatarContainerStyles}>
                                <div className={avatarSizeStyles}>
                                    <Avatar
                                        imageSrc={avatarToShow}
                                        imageAlt={''}
                                        pillar={pillar}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                </Flex>
            </a>
        </div>
    );
};
