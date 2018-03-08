// @flow

import GuardianLogo from './GuardianLogo';
import NotFoundLogo from './NotFoundLogo';
import BackToGuardianButton from './BackToGuardianButton';

import {
    Wrapper,
    MainContent,
    LogoWrapper,
    VisuallyHidden,
    BodyCopy,
    Heading,
    ContentText,
    Link,
} from './styles';

const beaconUrl = '//beacon.gu-web.net';

export default () => (
    <div className={Wrapper}>
        <div className={MainContent}>
            <a href="https://www.theguardian.com/" className={LogoWrapper}>
                <GuardianLogo />
                <span className={VisuallyHidden}>The Guardian</span>
            </a>
            <NotFoundLogo />
            <div className={ContentText}>
                <h1 className={Heading}>
                    Sorry – the page you have requested does not exist
                </h1>
                <p className={BodyCopy}>
                    You may have followed an outdated link, or have mistyped a
                    URL. If you believe this to be an error, please&nbsp;
                    <a
                        href="https://www.theguardian.com/info/tech-feedback"
                        className={Link}
                    >
                        {' '}
                        report it{' '}
                    </a>.
                </p>
                <BackToGuardianButton />
            </div>
        </div>

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
    </div>
);
