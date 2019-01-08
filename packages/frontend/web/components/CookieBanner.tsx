import React, { Component } from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { headline, textSans } from '@guardian/pasteup/typography';
import { Container } from '@guardian/guui';
import TickIcon from '@guardian/pasteup/icons/tick.svg';
import { getCookie, addCookie } from '@frontend/web/client/cookie';

const banner = css`
    position: fixed;
    bottom: 0;
    background-color: ${palette.sport.dark};
    padding: 10px 0 24px;
    width: 100%;

    p {
        ${textSans(5)};
        margin-top: 0;
        margin-bottom: 8px;
        color: ${palette.neutral[100]};
    }

    a {
        color: ${palette.neutral[100]};
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        text-decoration: none;

        :hover {
            border-color: ${palette.neutral[100]};
        }
    }
`;

const inner = css`
    padding: 0 10px;
`;

const header = css`
    ${headline(6)};
    font-weight: bold;
    padding-bottom: 12px;
    color: ${palette.highlight.main};
`;

const more = css`
    margin-left: 12px;
    ${textSans(3)};
`;

const button = css`
    ${textSans(5)};
    border-radius: 1000px;
    height: 42px;
    background: ${palette.highlight.main};
    color: ${palette.neutral[7]};
    padding: 0 25px 0 46px;
    display: block;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    border: 0;
    white-space: nowrap;
    display: inline-block;

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

export default class CookieBanner extends Component<{}, { show: boolean }> {
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
                <Container className={inner}>
                    <h1 className={header}>Your privacy</h1>
                    <p>
                        We use cookies to improve your experience on our site
                        and to show you relevant advertising.
                    </p>
                    <p>
                        To find out more, read our updated{' '}
                        <a href="/help/privacy-policy">privacy policy</a> and{' '}
                        <a href="/info/cookies">cookie policy</a>.
                    </p>
                    <div className={actions}>
                        <button className={button} onClick={this.accept}>
                            <TickIcon />
                            OK
                        </button>
                        <a
                            className={more}
                            href="https://profile.theguardian.com/privacy-settings"
                        >
                            More information
                        </a>
                    </div>
                </Container>
            </div>
        );
    }
}
