import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { AgeWarning } from '@root/src/web/components/AgeWarning';
import { SmallHeadline } from '@root/src/web/components/SmallHeadline';
import { useHover } from '@root/src/web/components/lib/useHover';

const listItemStyles = css`
    list-style: none;
    padding-top: 4px;
    margin-bottom: 12px;
    border-top: 1px solid ${palette.neutral[86]};

    &:first-child {
        padding-top: 0;
        border-top: none;
    }
`;

const linkTagStyles = css`
    text-decoration: none;
    font-weight: 500;
    ${headline.tiny()};

    &:link,
    &:active {
        color: ${palette.neutral[7]};
    }

    &:hover .linkText {
        text-decoration: underline;
    }

    &:visited .linkText {
        color: ${palette.neutral[46]};
    }
`;

const textWrapperStyles = css`
    display: flex;
`;

const imageWrapperStyles = css`
    width: 72px;
    min-height: 72px;
    padding-top: 3px;
    margin-right: 10px;
    overflow: hidden;
    position: relative;
    box-sizing: content-box;
    flex-grow: 0;
    flex-shrink: 0;
`;

const imageTagStyles = css`
    position: absolute;
    width: auto;
    height: 72px;
    left: -24px;
    clip-path: circle(36% at 50% 50%);
`;

const ageWarningStyles = css`
    margin-top: 8px;
`;

type Props = {
    trail: TrailType;
};

type ItemConditionalProps = {
    prefix?: HeadlinePrefix;
};

export const MostViewedListItem = ({ trail }: Props) => {
    const [hoverRef, isHovered] = useHover<HTMLAnchorElement>();

    const itemProps: ItemConditionalProps = {};
    if (trail.isLiveBlog) {
        itemProps.prefix = {
            text: 'Live',
            pillar: trail.pillar,
            showSlash: false,
        };
    }

    return (
        <li className={listItemStyles}>
            <a
                className={linkTagStyles}
                href={trail.url}
                data-link-name={'article'}
                ref={hoverRef}
            >
                <div className={textWrapperStyles}>
                    <div className={imageWrapperStyles}>
                        <img
                            src={trail.image}
                            role="presentation"
                            alt=""
                            className={imageTagStyles}
                        />
                    </div>
                    <SmallHeadline
                        headlineString={trail.linkText}
                        pillar={trail.pillar}
                        size="tiny"
                        showUnderline={isHovered}
                        {...itemProps}
                    />
                </div>
                {trail.ageWarning && (
                    <div className={ageWarningStyles}>
                        <AgeWarning age={trail.ageWarning} size="small" />
                    </div>
                )}
            </a>
        </li>
    );
};
