// @flow

/* eslint-disable react/no-danger */

import styled from 'preact-emotion';
import { connect } from 'unistore/preact';

import { textEgyptian, headline } from 'pasteup/fonts';
import palette from 'pasteup/palette';
import { clearFix } from 'pasteup/mixins';
import { Row, Cols } from 'pasteup/grid';

import MostViewed from 'components/MostViewed';
import Header from 'components/Header';
import Epic from 'components/Epic';

const Headline = styled('h1')({
    fontFamily: headline,
    fontSize: 34,
    lineHeight: 1.1,
    fontWeight: 700,
    color: palette.red.dark,
    paddingBottom: 36,
    paddingTop: 3,
});

const Body = styled('section')({
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
    '.gu-video': {
        maxWidth: '100%',
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

    '.bullet': {
        color: 'transparent',
        height: '0.75em',
        width: '0.75em',
        borderRadius: '50%',
        marginRight: 2,
        backgroundColor: palette.red.dark,
        display: 'inline-block',
        lineHeight: 0.8,
    },
});

const Labels = styled('div')({ ...clearFix, paddingTop: 6 });

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

export default connect('content')(({ content }) => (
    <article>
        <Header />
        <Row>
            <Cols wide={4} leftCol={4}>
                <Labels>
                    <SectionLabel>The NSA files</SectionLabel>
                    <SeriesLabel>
                        Glenn Greenwald on security and liberty
                    </SeriesLabel>
                </Labels>
            </Cols>
            <Cols wide={12} leftCol={10}>
                <Headline>{content.headline}</Headline>
                <Standfirst
                    dangerouslySetInnerHTML={{
                        __html: content.standfirst,
                    }}
                />
            </Cols>
        </Row>
        <div
            dangerouslySetInnerHTML={{
                __html: content.main,
            }}
        />
        <Body
            dangerouslySetInnerHTML={{
                __html: content.body,
            }}
        />
        <MostViewed />
        <Epic>
            <strong>
                Unlike many news organisations, we haven’t put up a paywall – we
                want to keep our journalism as open as we can.
            </strong>{' '}
            The Guardian’s independent, investigative journalism takes a lot of
            time, money and hard work to produce. But the revenue we get from
            advertising is falling, so we increasingly need our readers to fund
            us. If everyone who reads our reporting, who likes it, helps fund
            it, our future would be much more secure.{' '}
            <strong>
                Support The Guardian for just 17p a day or £5 a month.
            </strong>
        </Epic>
    </article>
));
