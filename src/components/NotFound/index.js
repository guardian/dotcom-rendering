// @flow

import palette from 'pasteup/palette';
import styled from 'preact-emotion';
import { egyptian } from 'pasteup/fonts';
import { tablet, desktop, leftCol, wide } from 'pasteup/breakpoints';
import { screenReaderOnly } from 'pasteup/mixins';
import GuardianLogo from './GuardianLogo';
import NotFoundLogo from './NotFoundLogo';
import BackToGuardianButton from './BackToGuardianButton';

const beaconUrl = '//beacon.gu-web.net';

const VisuallyHidden = styled('span')(screenReaderOnly);

const NotFoundWrapper = styled('div')({
    content: '',
    background: '#e7edef',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    fontFamily: egyptian,
});

const MainContent = styled('div')({
    margin: '0 auto',
    padding: '0 10px 24px',
    position: 'relative',

    [desktop]: {
        width: '980px',
    },

    [leftCol]: {
        width: '1140px',
    },

    [wide]: {
        width: '1300px',
    },
});

const LogoWrapper = styled('a')({
    display: 'block',
    margin: '6px 0 36px auto',
    maxWidth: '295px',
    width: '55%',
    position: 'relative',
    zIndex: 1,
    [tablet]: {
        width: '295px',
    },
    [desktop]: {
        marginBottom: '-94px',
    },
});

const ContentText = styled('div')({
    [tablet]: {
        marginLeft: '160px',
    },

    [desktop]: {
        marginLeft: '320px',
    },

    [leftCol]: {
        marginLeft: '480px',
    },
});

const Heading = styled('h1')({
    color: palette.neutral['1'],
    fontSize: '28px',
    fontWeight: 200,
    lineHeight: 1.15,
    marginBottom: '12px',
    maxWidth: '540px',
    [tablet]: {
        fontSize: '42px',
    },
});

const BodyCopy = styled('p')({
    color: palette.neutral['1'],
    fontSize: '15px',
    marginBottom: '24px',
    maxWidth: '220px',
    lineHeight: '27px',

    [tablet]: {
        fontSize: '18px',
        maxWidth: '300px',
    },
});

const NeutralLink = styled('a')({
    borderBottom: '2px solid #aabfc7',
    color: palette.neutral['1'],
    paddingBottom: '3px',
    textDecoration: 'none',
    transition: 'border-color .3s',
    '&:hover': {
        borderColor: palette.neutral['1'],
    },
});

export default () => (
    <NotFoundWrapper>
        <MainContent>
            <LogoWrapper href="https://www.theguardian.com/">
                <GuardianLogo />
                <VisuallyHidden>The Guardian</VisuallyHidden>
            </LogoWrapper>
            <NotFoundLogo />
            <ContentText>
                <Heading>
                    Sorry – the page you have requested does not exist
                </Heading>
                <BodyCopy>
                    You may have followed an outdated link, or have mistyped a
                    URL. If you believe this to be an error, please&nbsp;
                    <NeutralLink href="https://www.theguardian.com/info/tech-feedback">
                        {' '}
                        report it{' '}
                    </NeutralLink>.
                </BodyCopy>
                <BackToGuardianButton />
            </ContentText>
        </MainContent>

        <script
            dangerouslySetInnerHTML={{
                __html: `
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
                    ga('create', 'UA-78705427-1', 'auto');
                    ga('set', 'dimension3', 'theguardian.com');
                    ga('set', 'dimension14', '404');
                    ga('send', 'pageview');
                `,
            }}
        />

        <script src="https://pasteup.guim.co.uk/js/lib/requirejs/2.1.5/require.min.js" />

        <script
            dangerouslySetInnerHTML={{
                __html: `
                    require.config({
                        paths: {
                            'ophan/http-status' : '//j.ophan.co.uk/ophan.http-status',
                        }
                    });
                    require(['ophan/http-status'], function(reporter) {
                    reporter.reportStatus('next-gen', 404);
                    });
                `,
            }}
        />
        <img
            src={`${beaconUrl}/count/40x.gif`}
            alt=""
            style={{ display: 'none' }}
            rel="nofollow"
        />
    </NotFoundWrapper>
);
