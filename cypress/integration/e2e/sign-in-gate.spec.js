/* eslint-disable no-undef */
/* eslint-disable func-names */

describe('Sign In Gate Tests', () => {
    const setArticleCount = (n) => {
        // set article count for today to be n
        localStorage.setItem('gu.history.dailyArticleCount', JSON.stringify({ value: [{ day: Math.floor(Date.now() / 86400000), count: n }] }));
    }

    const setMvtCookie = (str) => {
        cy.setCookie('GU_mvt_id_local', str, {
            log: true
        })
    }

    const setCookieConsent = () => {
        // the value for the consent cookies is an actual value added to the cookie when the cmp is dismissed as setting it to arbitrary values
        // caused the following error "ConsentString - Unsupported version 45 in the string to decode"
        cy.setCookie('euconsent', 'BO08eEOO08eEOBwABAENDOiAAAAwJ7_______9______9uz_Ov_v_f__33e8__9v_l_7_-___u_-23d4u_1vf99yfm1-7etr3tp_47ues2_Xur__71__3z3_9pxP78k89r7335Ew_v-_v-b7BCPN9Y3v-8K96g', {
            log: true
        });
        cy.setCookie('guconsent', 'BO08eEOO08eEOBwABAENDOiAAAAwJ7_______9______9uz_Ov_v_f__33e8__9v_l_7_-___u_-23d4u_1vf99yfm1-7etr3tp_47ues2_Xur__71__3z3_9pxP78k89r7335Ew_v-_v-b7BCPN9Y3v-8K96g', {
            log: true
        });
        cy.setCookie('GU_TK', 'BO08eEOO08eEOBwABAENDOiAAAAwJ7_______9______9uz_Ov_v_f__33e8__9v_l_7_-___u_-23d4u_1vf99yfm1-7etr3tp_47ues2_Xur__71__3z3_9pxP78k89r7335Ew_v-_v-b7BCPN9Y3v-8K96g', {
            log: true
        });
    }

    // helper method over the cypress visit method to avoid having to repeat the same url by setting a default
    // can override the parameter if required
    const visitArticle = (url = 'https://www.theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview') => {
        cy.visit(
            `Article?url=${url}`,
        );
    }

    // as the sign in gate is lazy loaded, we need to scroll to the rough position where it
    // will be inserted to make it visible
    // can override position if required
    const scrollToGateForLazyLoading = (roughPosition = 1000) => {
        cy.scrollTo(0, roughPosition, { duration: 500 });
    }

    // we call visit and scroll for most test, so this wrapper combines the two
    // while preserving the ability to set the parameters if required
    const visitArticleAndScrollToGateForLazyLoad = ({ url, roughPosition } = {}) => {
        visitArticle(url);
        scrollToGateForLazyLoading(roughPosition);
    }

    describe('SignInGateMain', () => {
        beforeEach(() => {
            // sign in gate main runs from 0-900000 MVT IDs, so 500 forces user into test
            setMvtCookie('500');

            // set article count to be min number to view gate
            setArticleCount(3);

            // set consent cookie to hide cmp banner
            setCookieConsent();
        })

        it('should load the sign in gate', () => {
            visitArticleAndScrollToGateForLazyLoad();

            cy.get('[data-cy=sign-in-gate-main]').should('be.visible');
        });

        it('should not load the sign in gate if the user has not read at least 3 article in a day', () => {
            setArticleCount(1);

            visitArticleAndScrollToGateForLazyLoad();

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('should not load the sign in gate if the user is signed in', () => {
            // use GU_U cookie to determine if user is signed in
            cy.setCookie('GU_U', 'MCwCFHbDHWevL_GqgH0CcbeDWp4N9kR5AhQ2lD3zMjjbKJAgC7FUDtc18Ac8BA', { log: true });

            visitArticleAndScrollToGateForLazyLoad()

            // when using GU_U cookie, there is an issue with the commercial.dcr.js bundle
            // causing a URI Malformed error in cypress
            // we use this uncaught exception in this test to catch this and continue the rest of the test
            cy.on('uncaught:exception', () => {
                done();
                return false;
            })

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('should not load the sign in gate if the user has already dismissed the gate', () => {
            localStorage.setItem('gu.prefs.sign-in-gate', '{"SignInGateMain-main-variant-1":"2020-07-22T08:25:05.567Z"}')

            visitArticleAndScrollToGateForLazyLoad();

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('should not load the sign in gate if the article is not a valid section (membership)', () => {
            visitArticleAndScrollToGateForLazyLoad({ url: 'https://www.theguardian.com/membership/2018/nov/15/support-guardian-readers-future-journalism' })

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('should not load the sign in gate on a device with an ios9 user agent string', () => {
            // can't use visitArticleAndScrollToGateForLazyLoad for this method as overriding user agent
            cy.visit('Article?url=https://www.theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview', {
                onBeforeLoad: win => {
                    Object.defineProperty(win.navigator, 'userAgent', {
                        value: 'Mozilla/5.0 (iPad; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4',
                    });
                },
            });
            scrollToGateForLazyLoading();

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('should not load sign in gate if the cmp banner is visible', () => {
            cy.clearCookie('euconsent');
            cy.clearCookie('guconsent');
            cy.clearCookie('GU_TK');

            visitArticleAndScrollToGateForLazyLoad();

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('should remove gate when the dismiss button is clicked', () => {
            visitArticleAndScrollToGateForLazyLoad();

            cy.get('[data-cy=sign-in-gate-main]').should('be.visible');

            cy.get('[data-cy=sign-in-gate-main_dismiss]').click();

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('register button should contain profile.theguardian.com href', () => {
            visitArticleAndScrollToGateForLazyLoad();

            cy.get('[data-cy=sign-in-gate-main]').should('be.visible');

            cy.get('[data-cy=sign-in-gate-main_register]')
                .invoke('attr', 'href').should('contains', 'profile.theguardian.com');
        });

        it('sign in link should contain profile.theguardian.com href', () => {
            visitArticleAndScrollToGateForLazyLoad();

            cy.get('[data-cy=sign-in-gate-main]').should('be.visible');


            cy.get('[data-cy=sign-in-gate-main_signin]')
                .invoke('attr', 'href').should('contains', 'profile.theguardian.com');
        });

        it('should show cmp ui when privacy settings link is clicked', () => {
            visitArticleAndScrollToGateForLazyLoad();

            cy.get('[data-cy=sign-in-gate-main]').should('be.visible');

            cy.get('[data-cy=sign-in-gate-main_privacy]').click();

            cy.contains('Your privacy options');
        });
    });

    describe('SignInGatePatientia', () => {
        beforeEach(() => {
            // sign in gate patientia runs from 999901-1000000 MVT IDs, so 999901 forces user into test variant
            setMvtCookie('999901');

            // set article count to be min number to view gate
            setArticleCount(3);

            // set consent cookie to hide cmp banner
            setCookieConsent();
        });

        it('should load the sign in gate', () => {
            visitArticleAndScrollToGateForLazyLoad();

            cy.get('[data-cy=sign-in-gate-patientia]').should('be.visible');
        });

        it('should remove gate when the dismiss button is clicked', () => {
            visitArticleAndScrollToGateForLazyLoad();

            cy.get('[data-cy=sign-in-gate-patientia]').should('be.visible');

            cy.get('[data-cy=sign-in-gate-patientia_dismiss]').click();

            cy.get('[data-cy=sign-in-gate-patientia]').should('not.be.visible');
        });
    })
});
