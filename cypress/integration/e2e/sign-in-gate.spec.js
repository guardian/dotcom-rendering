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
            cy.visit(
                'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
            );

            cy.get('[data-cy=sign-in-gate-main]').should('be.visible');
        });

        it('should not load the sign in gate if the user has not read at least 3 article in a day', () => {
            setArticleCount(1);

            cy.visit(
                'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
            );

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('should not load the sign in gate if the user is signed in', () => {
            // use GU_U cookie to determine if user is signed in
            cy.setCookie('GU_U', 'MCwCFHbDHWevL_GqgH0CcbeDWp4N9kR5AhQ2lD3zMjjbKJAgC7FUDtc18Ac8BA', { log: true });

            cy.visit(
                'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
            );

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

            cy.visit(
                'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
            );

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('should not load the sign in gate if the page is not an article ie a live blog', () => {
            cy.visit(
                'Article?url=https://www.theguardian.com/football/live/2018/jul/03/world-cup-2018-england-v-colombia-switzerland-v-sweden-buildup-live',
            );

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('should not load thew sign in gate on a device with an ios9 user agent string', () => {
            cy.visit('Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries', {
                onBeforeLoad: win => {
                    Object.defineProperty(win.navigator, 'userAgent', {
                        value: 'Mozilla/5.0 (iPad; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4',
                    });
                },
            });

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('should no load sign in gate if the cmp banner is visible', () => {
            cy.clearCookie('euconsent');
            cy.clearCookie('guconsent');
            cy.clearCookie('GU_TK');

            cy.visit(
                'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
            );

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('should remove gate when the dismiss button is clicked', () => {
            cy.visit(
                'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
            );

            cy.get('[data-cy=sign-in-gate-main]').should('be.visible');

            cy.get('[data-cy=sign-in-gate-main_dismiss]').click();

            cy.get('[data-cy=sign-in-gate-main]').should('not.be.visible');
        });

        it('register button should contain profile.theguardian.com href', () => {
            cy.visit(
                'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
            );

            cy.get('[data-cy=sign-in-gate-main]').should('be.visible');

            cy.get('[data-cy=sign-in-gate-main_register]')
                .invoke('attr', 'href').should('contains', 'profile.theguardian.com');
        });

        it('sign in link should contain profile.theguardian.com href', () => {
            cy.visit(
                'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
            );

            cy.get('[data-cy=sign-in-gate-main]').should('be.visible');

            cy.get('[data-cy=sign-in-gate-main_signin]')
                .invoke('attr', 'href').should('contains', 'profile.theguardian.com');
        });

        it('should show cmp ui when privacy settings link is clicked', () => {
            cy.visit(
                'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
            );

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
            cy.visit(
                'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
            );

            cy.get('[data-cy=sign-in-gate-patientia]').should('be.visible');
        });

        it.only('should remove gate when the dismiss button is clicked', () => {
            cy.visit(
                'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
            );

            cy.get('[data-cy=sign-in-gate-patientia]').should('be.visible');

            cy.get('[data-cy=sign-in-gate-patientia_dismiss]').click();

            cy.get('[data-cy=sign-in-gate-patientia]').should('not.be.visible');
        });
    })
});
