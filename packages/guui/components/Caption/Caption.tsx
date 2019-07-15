import React from 'react';
import { textSans } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { css, cx } from 'emotion';
import { pillarPalette } from '@guardian/frontend-rendering/lib/pillars';
import TriangleIcon from '@guardian/pasteup/icons/triangle.svg';

const figureStyle = css`
    margin-bottom: 8px;
`;
const captionStyle = css`
    padding-top: 10px;
    ${textSans(1)};
    word-wrap: break-word;
    color: ${palette.neutral[46]};
`;

const captionPadding = css`
    padding-left: 8px;
    padding-right: 8px;
`;

export const Caption: React.FC<{
    captionText?: string;
    pillar: Pillar;
    padCaption?: boolean;
    dirtyHtml?: boolean;
}> = ({
    captionText,
    pillar,
    padCaption = false,
    dirtyHtml = false,
    children,
}) => {
    const iconStyle = css`
        fill: ${pillarPalette[pillar].main};
        padding-right: 3px;
    `;

    const captionLink = css`
        a {
            color: ${pillarPalette[pillar].main};
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        strong {
            font-weight: bold;
        }
    `;

    const getCaptionHtml = () => {
        if (dirtyHtml) {
            return (
                <span
                    // tslint:disable-line:react-no-dangerous-html
                    className={captionLink}
                    dangerouslySetInnerHTML={{
                        __html: captionText || '',
                    }}
                    key={'caption'}
                />
            );
        }
        return captionText;
    };

    return (
        <figure className={figureStyle}>
            {children}
            {captionText && (
                <>
                    <figcaption
                        className={cx(captionStyle, {
                            [captionPadding]: padCaption,
                        })}
                    >
                        <span className={iconStyle}>
                            <TriangleIcon />
                        </span>
                        {getCaptionHtml()}
                    </figcaption>
                </>
            )}
        </figure>
    );
};
