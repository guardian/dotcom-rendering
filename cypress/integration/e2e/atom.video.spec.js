import { disableCMP } from '../../lib/disableCMP.js';

const mainMediaVideo = 'https://www.theguardian.com/uk-news/2020/dec/04/edinburgh-hit-by-thundersnow-as-sonic-boom-wakes-residents'
const mainMediaPlayEvent = {"id":"gu-video-youtube-2b33a7b7-e639-4232-9ecd-0fb920fa8147","eventType":"video:content:play"}

const embedMediaVideo = 'https://www.theguardian.com/us-news/2020/oct/29/lordstown-ohio-trump-gm-plant-election'
const embedPlayEvent = {"id":"gu-video-youtube-35f9a38f-c0c5-4bbd-9395-e338c9e97d30","eventType":"video:content:play"}

describe('Video', function () {
    describe('Main media youtube video', function () {
        beforeEach(function () {
            disableCMP();
        });
        it('should render', function() {
            cy.visit(`/Article?url=${mainMediaVideo}`);
            cy.get(`#youtube-block-main-media-0`).should('be.visible');
        })

        it('should hide overlay on click', function() {
            cy.get(`#youtube-overlay-S0CE1n-R3OY`).should('be.visible');
            cy.get(`#youtube-overlay-S0CE1n-R3OY`).click();
            cy.get(`#youtube-overlay-S0CE1n-R3OY`).should('not.be.visible');
        })

        it('should dispatch play to server', function () {
            const listOfOphanVideoValues = []

            cy.intercept({
                url: /^http:\/\/ophan\.theguardian\.com\/img\/2/,
                query: {
                    viewId: /^\.*/,
                    video: /^\.*/,
                }
            }, (req) => {
                const url = new URL(req.url)
                const videoValue = url.searchParams.get('video')
                if (videoValue) listOfOphanVideoValues.push(JSON.parse(videoValue))
            })

            cy.visit(`/Article?url=${mainMediaVideo}`);
            cy.get(`#youtube-block-main-media-0`).should('be.visible');


            cy.get(`#youtube-overlay-S0CE1n-R3OY`).should('be.visible');
            cy.get(`#youtube-overlay-S0CE1n-R3OY`).click();
            cy.get(`#youtube-overlay-S0CE1n-R3OY`).should('not.be.visible');

            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(2000).then(function(){
                expect(listOfOphanVideoValues).to.deep.include(mainMediaPlayEvent);
            })

        })
    })

    describe('Embed youtube video', function () {
        it('should render', function() {
            cy.visit(`/Article?url=${embedMediaVideo}`);
            cy.get(`#youtube-block-41`).scrollIntoView();
            cy.get(`#youtube-block-41`).should('be.visible');
        })

        it('should hide overlay on click', function() {
            cy.get(`#youtube-overlay-N9Cgy-ke5-s`).should('be.visible');
            cy.get(`#youtube-overlay-N9Cgy-ke5-s`).click();
            cy.get(`#youtube-overlay-N9Cgy-ke5-s`).should('not.be.visible');
        })

        it('should dispatch play to server', function () {
            const listOfOphanVideoValues = []
            cy.intercept({
                url: /^http:\/\/ophan\.theguardian\.com\/img\/2/,
                query: {
                    viewId: /^\.*/,
                    video: /^\.*/,
                }
            }, (req) => {
                const url = new URL(req.url)
                const videoValue = url.searchParams.get('video')
                if (videoValue) listOfOphanVideoValues.push(JSON.parse(videoValue))
            })

            cy.visit(`/Article?url=${embedMediaVideo}`);
            cy.get(`#youtube-block-41`).scrollIntoView();
            cy.get(`#youtube-block-41`).should('be.visible');


            cy.get(`#youtube-overlay-N9Cgy-ke5-s`).should('be.visible');
            cy.get(`#youtube-overlay-N9Cgy-ke5-s`).click();
            cy.get(`#youtube-overlay-N9Cgy-ke5-s`).should('not.be.visible');

            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(2000).then(function(){
                expect(listOfOphanVideoValues).to.deep.include(embedPlayEvent);
            })

        })
    })
})
