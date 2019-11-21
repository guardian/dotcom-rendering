import React, { Component } from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { headline, textSans, body } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';
import TickIcon from '@frontend/static/icons/tick.svg';
import RoundelIcon from '@frontend/static/icons/the-guardian-roundel.svg';
import { getCookie, addCookie } from '@root/src/web/browser/cookie';

const banner = css`
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: ${palette.neutral[20]};
    padding: 10px 0 24px;
    width: 100%;
    z-index: 2;
`;

const inner = css`
    padding: 0 10px;
    max-width: 60%;
    position: relative;
    margin: 0 20%;
    p {
        ${body.medium()};
        margin-top: 0;
        color: ${palette.neutral[100]};
        margin-bottom: 8px;
    }

    a {
        color: ${palette.neutral[100]};
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        text-decoration: none;

        :hover {
            border-color: ${palette.neutral[100]};
        }
    }
    ${until.phablet} {
        max-width: 90%;
        margin: auto;
        padding: 0;
        p {
            ${body.small()};
        }
    }
`;

const header = css`
    ${headline.medium()};
    font-weight: bold;
    padding-bottom: 12px;
    color: ${palette.neutral[100]};
`;

const more = css`
    margin-left: 12px;
    ${textSans.small()};
    font-weight: bold;
`;

const iconCss = css`
    max-width: 20%;
    position: absolute;
    left: 45px;
    ${until.phablet} {
        display: none;
    }
`;

const button = css`
    ${textSans.medium()};
    border-radius: 1000px;
    height: 42px;
    background: ${palette.yellow.main};
    color: ${palette.neutral[7]};
    padding: 0 25px 0 46px;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    border: 0;
    white-space: nowrap;
    display: inline-block;
    font-weight: bold;

    svg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        width: 42px;
        height: 42px;
        transform: scale(0.5);
    }
`;

const actions = css`
    margin-top: 24px;
`;

const consentCookie = 'GU_TK';

export class CookieBanner extends Component<{}, { show: boolean }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            show: false,
        };
    }

    public accept = () => {
        // The value is [1|0].[ms since epoch], where 1 indicates assent to tracking
        // See: https://github.com/guardian/frontend/blob/master/static/src/javascripts/projects/common/modules/commercial/ad-prefs.lib.js#L26
        const cookieValue = `1.${Date.now()}`;
        addCookie(consentCookie, cookieValue, 30 * 18, true);
        this.setState({ show: false });
    };

    public componentDidMount() {
        const seenBanner = getCookie(consentCookie);
        if (!seenBanner) {
            this.setState({ show: true });
        }
    }

    public render() {
        if (!this.state.show) {
            return null;
        }

        return (
            <div className={banner}>
                <div className={iconCss}>
                    <RoundelIcon />
                </div>
                <div className={inner}>
                    <h1 className={header}>Your privacy</h1>
                    <p>
                        We use cookies to improve your experience on our site
                        and to show you personalised advertising.
                    </p>
                    <p>
                        To find out more, read our{' '}
                        <a href="/help/privacy-policy">privacy policy</a> and{' '}
                        <a href="/info/cookies">cookie policy</a>.
                    </p>
                    <div className={actions}>
                        <button className={button} onClick={this.accept}>
                            <TickIcon />
                            I'm OK with that
                        </button>
                        <a
                            className={more}
                            href="https://profile.theguardian.com/privacy-settings"
                        >
                            My options
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
