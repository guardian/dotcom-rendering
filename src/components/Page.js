// @flow
import styled from 'preact-emotion';
import Header from 'components/Header';
import Epic from 'components/Epic';

import {
    mobileLandscape,
    tablet,
    desktop,
    leftCol,
    wide,
} from 'pasteup/breakpoints';

const PageWrapper = styled('div')({
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

export default function Page({ children }) {
    return (
        <PageWrapper>
            <Header />
            {children}
            <Epic>
                <strong>
                    Unlike many news organisations, we haven’t put up a paywall
                    – we want to keep our journalism as open as we can.
                </strong>{' '}
                The Guardian’s independent, investigative journalism takes a lot
                of time, money and hard work to produce. But the revenue we get
                from advertising is falling, so we increasingly need our readers
                to fund us. If everyone who reads our reporting, who likes it,
                helps fund it, our future would be much more secure.{' '}
                <strong>
                    Support The Guardian for just 17p a day or £5 a month.
                </strong>
            </Epic>
        </PageWrapper>
    );
}
