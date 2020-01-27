import React from 'react';
import { palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { textSans } from '@guardian/src-foundations/typography';
import { css, cx } from 'emotion';
import { pillarPalette } from '@root/src/lib/pillars';
import TriangleIcon from '@frontend/static/icons/triangle.svg';

const figureStyle = css`
    margin-bottom: 6px;
`;
const captionStyle = (role?: RoleType) => css`
    padding-top: 6px;
    ${textSans.xsmall()};
    word-wrap: break-word;
    color: ${palette.neutral[46]};
`;

const limitedWidth = css`
    ${from.leftCol} {
        width: 140px;
        position: absolute;
    }
    ${from.wide} {
        width: 220px;
    }
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
    credit?: string;
    displayCredit?: boolean;
    role?: RoleType;
    isMainMedia?: boolean;
}> = ({
    captionText,
    pillar,
    padCaption = false,
    dirtyHtml = false,
    credit,
    displayCredit = true,
    children,
    role,
    isMainMedia,
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
                    className={captionLink}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: captionText || '',
                    }}
                    key="caption"
                />
            );
        }
        return captionText;
    };

    const shouldLimitWidth =
        !isMainMedia && (role === 'showcase' || role === 'supporting');

    return (
        <figure className={figureStyle}>
            {children}
            {captionText && (
                <>
                    <figcaption
                        className={cx(
                            captionStyle(role),
                            shouldLimitWidth && limitedWidth,
                            { [captionPadding]: padCaption },
                        )}
                    >
                        <span className={iconStyle}>
                            <TriangleIcon />
                        </span>
                        {getCaptionHtml()} {displayCredit && credit}
                    </figcaption>
                </>
            )}
        </figure>
    );
};
