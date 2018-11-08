import React from 'react';
import { css, cx } from 'react-emotion';
import { sans, serif } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';
import { pillarMap, pillarPalette } from '../../lib/pillars';
import {
    from,
    until,
    wide,
    leftCol,
    desktop,
    tablet,
} from '@guardian/pasteup/breakpoints';

const byline = css`
    font-style: italic;
`;

const bylineLink = css`
    font-style: normal;
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

const headerStyle = css`
    font-size: 34px;
    line-height: 38px;
    font-family: ${serif.headline};
    font-weight: 500;
    padding-bottom: 24px;
    padding-top: 3px;

    ${tablet} {
        padding-bottom: 36px;
    }
`;

const headline = css`
    @supports (display: grid) {
        grid-template-areas: 'headline';
    }
    ${until.phablet} {
        padding: 0 10px;
    }
`;

const header = css`
    ${until.phablet} {
        margin: 0 -10px;
    }
`;

const leftColWidth = css`
    ${leftCol} {
        width: 140px;
    }

    ${wide} {
        width: 220px;
    }
`;

const section = css`
    ${leftColWidth};
    @supports (display: grid) {
        grid-template-areas: 'section';
    }
    font-size: 16px;
    line-height: 20px;
    font-family: ${serif.headline};
    font-weight: 700;

    ${leftCol} {
        font-size: 22px;
        line-height: 28px;
    }

    ${until.phablet} {
        padding: 0 10px;
    }
`;
const sectionLabelLink = css`
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

const listStyles = css`
    li {
        font-family: ${serif.body};
        margin-bottom: 6px;
        padding-left: 20px;
        font-size: 17px;
        line-height: 24px;

        p {
            display: inline;
        }
    }

    li:before {
        display: inline-block;
        content: '';
        border-radius: 6px;
        height: 12px;
        width: 12px;
        margin-right: 8px;
        background-color: ${palette.neutral[86]};
        margin-left: -20px;
    }
`;

const standfirst = css`
    font-family: ${serif.body};
    font-weight: 700;
    font-size: 17px;
    line-height: 22px;
    color: ${palette.neutral[7]};
    margin-bottom: 12px;

    ${listStyles};

    p {
        margin-bottom: 8px;
    }
`;

const standfirstLinks = pillarMap(
    pillar =>
        css`
            a {
                color: ${pillarPalette[pillar].dark};
                text-decoration: none;
                border-bottom: 1px solid ${palette.neutral[86]};
                transition: border-color 0.15s ease-out;
            }
        `,
);

const pillarColours = pillarMap(
    pillar =>
        css`
            color: ${pillarPalette[pillar].main};
        `,
);
export const MainBlock: React.SFC<{
    CAPI: CAPIType;
}> = ({CAPI}) => (
    <header className={header}>
        {CAPI.sectionLabel &&
            CAPI.sectionUrl && (
                <div className={section}>
                    <a
                        className={cx(
                            sectionLabelLink,
                            pillarColours[CAPI.pillar],
                        )}
                        href={`https://www.theguardian.com/${CAPI.sectionUrl}`}
                        data-link-name="article section"
                    >
                        {CAPI.sectionLabel}
                    </a>
                </div>
            )}
        <div className={headline}>
            <h1 className={headerStyle}>{CAPI.headline}</h1>
            <div
                className={cx(standfirst, standfirstLinks[CAPI.pillar])}
                dangerouslySetInnerHTML={{
                    __html: CAPI.standfirst,
                }}
            />
    </div>
    </header>
)