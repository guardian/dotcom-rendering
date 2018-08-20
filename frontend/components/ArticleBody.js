// @flow

import { css } from 'react-emotion';
import palette from '@guardian/pasteup/palette';

import {
    from,
    until,
    wide,
    leftCol,
    desktop,
} from '@guardian/pasteup/breakpoints';

const wrapper = css`
    padding-top: 6px;
    margin-right: 0;
    margin-left: 0;

    ${desktop} {
        max-width: 620px;
        margin-right: 310px;
        padding-left: 10px;
    }

    ${leftCol} {
        margin-left: 150px;
        margin-right: 310px;
    }

    ${wide} {
        margin-left: 230px;
    }

    header {
        display: flex;
        flex-direction: column;

        ${leftCol} {
            display: grid;
            grid-template-areas: 'section headline' 'meta main-media';
            grid-template-columns: 160px 1fr;
            margin-left: -160px;
        }

        ${wide} {
            grid-template-columns: 240px 1fr;
            margin-left: -240px;
        }
    }
`;

const standfirst = css`
    font-family: 'Guardian Text Egyptian Web', Georgia, serif;
    font-weight: 700;
    font-size: 17px;
    line-height: 22px;
    color: ${palette.neutral[1]};
    margin-bottom: 12px;
`;

const secondaryColumn = css`
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 20px;
    width: 300px;
    margin-left: 20px;
    margin-top: 6px;

    background-color: ${palette.neutral[6]};
    min-height: 300px;
    display: none;

    ${desktop} {
        display: block;
    }
`;

const section = css`
    grid-template-area: section;
`;

const headline = css`
    grid-template-area: headline;
`;

const meta = css`
    grid-template-area: meta;

    ${from.tablet.until.leftCol} {
        order: 1;
    }
`;

const mainMedia = css`
    grid-template-area: main-media;

    margin-bottom: 6px;

    ${until.tablet} {
        margin: 0 -20px;
        order: -1;

        figcaption {
            display: none;
        }
    }

    img {
        width: 100%;
        height: 100%;
    }

    figcaption {
        font-size: 12px;
        line-height: 16px;
        font-family: 'Guardian Text Sans Web', 'Helvetica Neue', Helvetica,
            Arial, 'Lucida Grande', sans-serif;
        color: ${palette.neutral[3]};
    }
`;

const headerStyle = css`
    font-size: 34px;
    line-height: 38px;
    font-family: 'Guardian Egyptian Web', Georgia, serif;
    font-weight: 400;
    padding-bottom: 24px;
`;

const bodyStyle = css`
    ${from.tablet.until.desktop} {
        padding-right: 80px;
    }

    p {
        font-size: 16px;
        line-height: 24px;
        font-family: 'Guardian Text Egyptian Web', Georgia, serif;
        margin-bottom: 12px;
    }
`;

type Props = {
    CAPI: CAPIType,
};

const ArticleBody = ({ CAPI }: Props) => (
    /* eslint-disable react/no-danger */
    <div className={wrapper}>
        <header>
            <div className={section}>Section</div>
            <div className={headline}>
                <h1 className={headerStyle}>{CAPI.headline}</h1>
                <div
                    className={standfirst}
                    dangerouslySetInnerHTML={{
                        __html: CAPI.standfirst,
                    }}
                />
            </div>
            <div className={meta}>Meta</div>
            <div
                className={mainMedia}
                dangerouslySetInnerHTML={{
                    __html: CAPI.main,
                }}
            />
        </header>
        <div>
            <div
                className={bodyStyle}
                dangerouslySetInnerHTML={{
                    __html: CAPI.body,
                }}
            />
            <div>Submeta</div>
        </div>
        <div className={secondaryColumn} />
    </div>
);

export default ArticleBody;
