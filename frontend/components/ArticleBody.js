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

        position: relative;
        :before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            height: 100%;
            width: 1px;
            background: #dcdcdc;
        }
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

    grid-template-area: section;

    font-size: 22px;
    line-height: 28px;
    font-family: 'Guardian Egyptian Web', Georgia, serif;
    font-weight: 900;
    line-height: 20px;
`;

const headline = css`
    grid-template-area: headline;
`;

const meta = css`
    ${leftColWidth};

    grid-template-area: meta;

    ${from.tablet.until.leftCol} {
        order: 1;
    }

    background-image: repeating-linear-gradient(
        to bottom,
        #dcdcdc,
        #dcdcdc 0.0625rem,
        transparent 0.0625rem,
        transparent 0.25rem
    );
    background-repeat: repeat-x;
    background-position: top;
    background-size: 0.0625rem 0.8125rem;
    padding-top: 0.9375rem;
    margin-bottom: 0.375rem;
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
    </div>
);

export default ArticleBody;
