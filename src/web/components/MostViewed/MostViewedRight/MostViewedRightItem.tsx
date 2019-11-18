import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { AgeWarning } from '@root/src/web/components/AgeWarning';
import { SmallHeadline } from '@root/src/web/components/SmallHeadline';

const listItemStyles = css`
    display: flex;
    list-style: none;
    padding-top: 4px;
    margin-bottom: 12px;
    border-top: 1px solid ${palette.neutral[86]};

    &:first-child {
        padding-top: 0;
        border-top: none;
    }

    position: relative;
`;

const headlineWrapperStyles = css`
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
    prefix?: HeadlinePrefix;
};

export const MostViewedRightItem = ({ trail }: Props) => {
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
                    link={{
                        to: trail.url,
                        visitedColour: palette.neutral[46],
                        expanded: true,
                    }}
                    {...itemProps}
                />
                {trail.ageWarning && (
                    <AgeWarning age={trail.ageWarning} size="small" />
                )}
            </div>
        </li>
    );
};
