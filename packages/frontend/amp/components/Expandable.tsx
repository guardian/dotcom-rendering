import React from 'react';
import { css, cx } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import InfoIcon from '@guardian/pasteup/icons/info.svg';
import PlusIcon from '@guardian/pasteup/icons/plus.svg';

import { body, textSans, headline } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { TextStyle } from '@frontend/amp/components/elements/Text';

const wrapper = (pillar: Pillar) => css`
    background: ${palette.neutral[93]};
    position: relative;
    padding: 0 5px 6px;
    margin: 16px 0 36px;

    border-top: 13px solid ${palette.neutral[7]};
    border-image: repeating-linear-gradient(
            to bottom,
            #dcdcdc,
            #dcdcdc 1px,
            transparent 1px,
            transparent 4px
        )
        13;

    ${TextStyle(pillar)}

    ${body(2)};
`;

const buttonStyles = css`
    height: 32px;
    background-color: ${palette.neutral[7]};
    border-radius: 1600px;
    color: ${palette.neutral[100]};
    border: none;
    ${textSans(2)};
    font-weight: 700;
    padding: 0 15px 0 7px;

    display: inline-flex;
    align-items: center;

    position: absolute;
    bottom: 0;
    transform: translate(0, 50%);

    span {
        display: inline-flex;
        align-items: center;
    }

    svg {
        fill: ${palette.neutral[100]};
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
`;

const headerStyle = css`
    ${headline(3)};
`;

const creditStyle = css`
    ${textSans(2)};
    display: block;
    margin: 12px 0;
`;

const pillarColour = (pillar: Pillar) => css`
    color: ${pillarPalette[pillar].main};
`;

const headers = css`
    margin: 0 0 16px;
`;

const innerStyle = css`
    padding-bottom: 24px;
`;

const iconStyle = css`
    display: inline-flex;
    background: ${palette.neutral[60]};
    border-radius: 100%;
    width: 16px;
    height: 16px;
    align-items: center;
    justify-content: center;
    margin-right: 5px;

    svg {
        height: 12px;
        fill: ${palette.neutral[100]};
    }
`;

const imageStyle = css`
    width: 100px;
    height: 100px;
    display: block;
    float: left;
    margin-right: 10px;
    margin-bottom: 6px;

    img {
        object-fit: cover;
        border-radius: 50%;
    }
`;

export const Expandable: React.FC<{
    id: string;
    type: string;
    title: string;
    img?: string;
    html: string;
    credit?: string;
    pillar: Pillar;
}> = ({ id, type, title, img, html, credit, pillar }) => (
    <aside className={wrapper(pillar)}>
        <div className={headers}>
            <span className={cx(headerStyle, pillarColour(pillar))}>
                {type}
            </span>
            <h2 className={headerStyle}>{title}</h2>
        </div>

        <div className={innerStyle} hidden={true} id={id}>
            {img && (
                <amp-img
                    class={imageStyle}
                    src={img}
                    alt={`Image for ${title} explainer`}
                    layout="fixed"
                    width="100"
                    height="100"
                />
            )}
            <div // tslint:disable-line:react-no-dangerous-html
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            />
            {credit && (
                <span className={creditStyle}>
                    <span className={iconStyle}>
                        <InfoIcon />
                    </span>{' '}
                    {credit}
                </span>
            )}
        </div>

        <button
            on={`tap:${id}.toggleVisibility,show-${id}.toggleVisibility,hide-${id}.toggleVisibility`}
            className={buttonStyles}
        >
            <span id={`show-${id}`}>
                <PlusIcon />
                Show
            </span>
            <span hidden={true} id={`hide-${id}`}>
                <PlusIcon />
                Hide
            </span>
        </button>
    </aside>
);
