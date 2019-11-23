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
`;

const lineWrapperStyles = css`
    display: flex;
`;

const headlineWrapperStyles = css`
    width: calc(100% - 82px);
    display: flex;
    flex-direction: column;
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

type Props = {
    trail: TrailType;
};

type ItemConditionalProps = {
    kicker?: KickerType;
};

export const MostViewedRightItem = ({ trail }: Props) => {
    const [hoverRef, isHovered] = useHover<HTMLAnchorElement>();

    const itemProps: ItemConditionalProps = {};
    if (trail.isLiveBlog) {
        itemProps.kicker = {
            text: 'Live',
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
                <div className={lineWrapperStyles}>
                    <div className={imageWrapperStyles}>
                        <img
                            src={trail.image}
                            role="presentation"
                            alt=""
                            className={imageTagStyles}
                        />
                    </div>
                    <div className={headlineWrapperStyles}>
                        <SmallHeadline
                            headlineString={trail.linkText}
                            pillar={trail.pillar}
                            size="tiny"
                            showUnderline={isHovered}
                            {...itemProps}
                            link={{
                                to: trail.url,
                                visitedColour: palette.neutral[46],
                                preventFocus: true,
                            }}
                        />
                        {trail.ageWarning && (
                            <AgeWarning age={trail.ageWarning} size="small" />
                        )}
                    </div>
                </div>
            </a>
        </li>
    );
};
