// @flow

/* eslint-disable react/no-danger */

import styled from 'preact-emotion';
import { connect } from 'unistore/preact';
import { textEgyptian, headline } from 'pasteup/fonts';
import palette from 'pasteup/palette';

import { string as curly } from 'curlyquotes';

import Header from 'components/Header';
import {
    mobileLandscape,
    tablet,
    desktop,
    leftCol,
    wide,
} from 'pasteup/breakpoints';
import { clearFix } from 'pasteup/mixins';

const Article = styled('article')({
    margin: 'auto',
    paddingLeft: 4,
    paddingRight: 4,
    [mobileLandscape]: {
        paddingLeft: 24,
        paddingRight: 24,
    },
    [tablet]: {
        maxWidth: '740px',
    },
    [desktop]: {
        maxWidth: '980px',
    },
    [leftCol]: {
        maxWidth: '1140px',
    },
    [wide]: {
        maxWidth: '1300px',
    },
});

const Headline = styled('h1')({
    fontFamily: headline,
    fontSize: 34,
    lineHeight: 1.1,
    fontWeight: 700,
    color: palette.red.dark,
    paddingBottom: 36,
    paddingTop: 3,
});

const ArticleBody = styled('section')({
    p: {
        fontFamily: textEgyptian,
        lineHeight: 1.4,
        marginBottom: '1rem',
        color: palette.neutral[1],
    },
    h2: {
        fontFamily: headline,
        color: palette.neutral[1],
        fontSize: 20,
        lineHeight: 1.2,
        fontWeight: 900,
        marginTop: 27,
        marginBottom: 1,
    },
});

const Standfirst = styled('p')({
    color: palette.neutral[1],
    fontFamily: textEgyptian,
    fontSize: 20,
    fontWeight: 100,
    lineHeight: 1.2,
    marginBottom: 12,
    maxWidth: 540,
    paddingTop: 2,

    a: {
        color: palette.red.dark,
        textDecoration: 'none',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: palette.neutral[5],
    },
});

const ArticleLabels = styled('div')({ ...clearFix, paddingTop: 6 });

const SectionLabel = styled('div')({
    color: palette.red.dark,
    fontFamily: textEgyptian,
    fontWeight: 900,
    paddingRight: 6,
    float: 'left',
});

const SeriesLabel = styled(SectionLabel)({
    fontSize: 15,
    fontWeight: 500,
});

export default connect('config,contentFields')(({ config, contentFields }) => (
    <div>
        <Header />
        <Article>
            <ArticleLabels>
                <SectionLabel>The NSA files</SectionLabel>
                <SeriesLabel>
                    Glenn Greenwald on security and liberty
                </SeriesLabel>
            </ArticleLabels>
            <Headline>{curly(config.page.headline)}</Headline>
            <Standfirst
                dangerouslySetInnerHTML={{
                    __html: contentFields.fields.standfirst,
                }}
            />
            <div
                dangerouslySetInnerHTML={{
                    __html: contentFields.fields.main,
                }}
            />
            <ArticleBody
                dangerouslySetInnerHTML={{
                    __html: contentFields.fields.blocks.body
                        .map(block => block.bodyHtml)
                        .filter(Boolean)
                        .join(''),
                }}
            />
        </Article>
    </div>
));
