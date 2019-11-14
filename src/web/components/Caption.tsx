import React from 'react';
import { palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { textSans } from '@guardian/src-foundations/typography';
import { css, cx } from 'emotion';
import { pillarPalette } from '@root/src/lib/pillars';
import TriangleIcon from '@frontend/static/icons/triangle.svg';

const figureStyle = css`
    margin-bottom: 8px;
`;
const captionStyle = (role?: RoleType) => css`
    padding-top: 10px;
    ${textSans.xsmall()};
    word-wrap: break-word;
    color: ${palette.neutral[46]};
    ${from.leftCol} {
        width: ${role && role === 'showcase' && '200px'};
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
}> = ({
    captionText,
    pillar,
    padCaption = false,
    dirtyHtml = false,
    credit,
    displayCredit = true,
    children,
    role,
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
                        className={cx(captionStyle(role), {
                            [captionPadding]: padCaption,
                        })}
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
