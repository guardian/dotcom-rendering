import { brandBackground, resets } from '@guardian/source-foundations';
import { ASSET_ORIGIN } from '../../lib/assets';
import { getFontsCss } from '../../lib/fonts-css';
import { getHttp3Url } from '../lib/getHttp3Url';

export const frontTemplate = ({
	title = 'The Guardian',
	priorityScriptTags,
	lowPriorityScriptTags,
	css,
	html,
	windowGuardian,
	gaPath,
	keywords,
	offerHttp3,
}: {
	title?: string;
	priorityScriptTags: string[];
	lowPriorityScriptTags: string[];
	css: string;
	html: string;
	windowGuardian: string;
	gaPath: { modern: string; legacy: string };
	keywords: string;
	offerHttp3: boolean;
}): string => {
	const favicon =
		process.env.NODE_ENV === 'production'
			? 'favicon-32x32.ico'
			: 'favicon-32x32-dev-yellow.ico';

	/**
	 * Preload the following woff2 font files
	 * TODO: Identify critical fonts to preload
	 */
	const fontFiles = [
		// 'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.woff2',
		// 'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff2',
		// 'https://assets.guim.co.uk/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff2',
		// 'http://assets.guim.co.uk/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff2',
	].map((font) => (offerHttp3 ? getHttp3Url(font) : font));

	const fontPreloadTags = fontFiles.map(
		(fontFile) =>
			`<link rel="preload" href="${fontFile}" as="font" crossorigin>`,
	);

	// Opt out of having information from our website used for personalization of content and suggestions for Twitter users, including ads
	// See https://developer.twitter.com/en/docs/twitter-for-websites/webpage-properties/overview
	const twitterSecAndPrivacyMetaTags = `<meta name="twitter:dnt" content="on">`;

	/**
	 * Duplicated prefetch and preconnect tags from DCP:
	 * Documented here: https://github.com/guardian/frontend/pull/12935
	 * Preconnect should be used for the most crucial third party domains
	 * "use preconnect when you know for sure that you’re going to be accessing a resource"
	 * - https://www.smashingmagazine.com/2019/04/optimization-performance-resource-hints/
	 * DNS-prefetch should be used for other third party domains that we are likely to connect to but not sure (ads)
	 * Preconnecting to too many URLs can reduce page performance
	 * DNS-prefetch can also be used as a fallback for IE11
	 * More information on preconnecting:
	 * https://css-tricks.com/using-relpreconnect-to-establish-network-connections-early-and-increase-performance/
	 * More information on prefetching:
	 * https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch
	 */
	const staticPreconnectUrls = [
		`${ASSET_ORIGIN}`,
		`https://i.guim.co.uk`,
		`https://j.ophan.co.uk`,
		`https://ophan.theguardian.com`,
	];

	const staticPrefetchUrls = [
		...staticPreconnectUrls,
		`https://api.nextgen.guardianapps.co.uk`,
		`https://hits-secure.theguardian.com`,
		`https://interactive.guim.co.uk`,
		`https://phar.gu-web.net`,
		`https://static.theguardian.com`,
		`https://support.theguardian.com`,
	];

	const allStaticPreconnectUrls =
		process.env.NODE_ENV === 'production'
			? [...staticPreconnectUrls, 'https://sourcepoint.theguardian.com']
			: staticPreconnectUrls;

	const preconnectTags = allStaticPreconnectUrls.map(
		(src) => `<link rel="preconnect" href="${src}">`,
	);

	const prefetchTags = staticPrefetchUrls.map(
		(src) => `<link rel="dns-prefetch" href="${src}">`,
	);

	const weAreHiringMessage = `
<!--

We are hiring, ever thought about joining us?
https://workforus.theguardian.com/careers/product-engineering/


                                    GGGGGGGGG
                           GGGGGGGGGGGGGGGGGGGGGGGGGG
                       GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                    GGGGGGGGGGGGGGGGG      GG   GGGGGGGGGGGGG
                  GGGGGGGGGGGG        GGGGGGGGG      GGGGGGGGGG
                GGGGGGGGGGG         GGGGGGGGGGGGG       GGGGGGGGG
              GGGGGGGGGG          GGGGGGGGGGGGGGGGG     GGGGGGGGGGG
             GGGGGGGGG           GGGGGGGGGGGGGGGGGGG    GGGGGGGGGGGG
            GGGGGGGGG           GGGGGGGGGGGGGGGGGGGGGG  GGGGGGGGGGGGG
           GGGGGGGGG            GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
           GGGGGGGG             GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
          GGGGGGGG              GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
          GGGGGGGG              GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
          GGGGGGGG              GGGGGGGGGGGG              GGGGGGGGGGGGG
           GGGGGGG              GGGGGGGGGGGGG           GGGGGGGGGGGGGG
           GGGGGGGG             GGGGGGGGGGGGG           GGGGGGGGGGGGGG
            GGGGGGGG            GGGGGGGGGGGGG           GGGGGGGGGGGGG
             GGGGGGGG            GGGGGGGGGGGG           GGGGGGGGGGGG
              GGGGGGGGG           GGGGGGGGGGG           GGGGGGGGGGG
                GGGGGGGGGG         GGGGGGGGGG           GGGGGGGGG
                  GGGGGGGGGGG        GGGGGGGG        GGGGGGGGGG
                    GGGGGGGGGGGGGG      GGGGG  GGGGGGGGGGGGGG
                       GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                            GGGGGGGGGGGGGGGGGGGGGGGGG
                                    GGGGGGGGG


         GGGGG    GGG     GGG
        G     G  G   G   G   G     G   G  GGGGGG    GG    GGGGG    GGGG
              G G     G G     G     G G   G        G  G   G    G  G
         GGGGG  G     G G     G      G    GGGGG   G    G  G    G   GGGG
        G       G     G G     G      G    G       GGGGGG  GGGGG        G
        G        G   G   G   G       G    G       G    G  G   G   G    G
        GGGGGGG   GGG     GGG        G    GGGGGG  G    G  G    G   GGGG

--->`;

	return `<!doctype html>
        <html lang="en">
            <head>
			    ${weAreHiringMessage}
                <title>${title}</title>
                <meta name="description" content="Latest news, sport, business, comment, analysis and reviews from the Guardian, the world&#x27;s leading liberal voice" />
                <meta charset="utf-8">

                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
                <meta name="theme-color" content="${brandBackground.primary}" />
                <link rel="icon" href="https://static.guim.co.uk/images/${favicon}">

                ${preconnectTags.join('\n')}
                ${prefetchTags.join('\n')}
                ${fontPreloadTags.join('\n')}

                ${twitterSecAndPrivacyMetaTags}

                <!--  This tag enables pages to be featured in Google Discover as large previews
                    See: https://developers.google.com/search/docs/advanced/mobile/google-discover?hl=en&visit_id=637424198370039526-3805703503&rd=1 -->
                <meta name="robots" content="max-image-preview:large">

                <script>
					window.guardian = ${windowGuardian};
                    window.guardian.queue = []; // Queue for functions to be fired by polyfill.io callback
                </script>

                <script type="module">
                    window.guardian.mustardCut = true;
                    window.guardian.gaPath = "${gaPath.modern}";
                </script>

                <script nomodule>
                    // Browser fails mustard check
                    window.guardian.mustardCut = false;
                    window.guardian.gaPath = "${gaPath.legacy}";
                </script>

                <script>
                    // Noop monkey patch perf.mark and perf.measure if not supported
                    if(window.performance !== undefined && window.performance.mark === undefined) {
                        window.performance.mark = function(){};
                        window.performance.measure = function(){};
                    }
                </script>

                <script>
                    // this is a global that's called at the bottom of the pf.io response,
                    // once the polyfills have run. This may be useful for debugging.
                    // mainly to support browsers that don't support async=false or defer
                    function guardianPolyfilled() {
                        window.guardian.polyfilled = true;
                        if (window.guardian.mustardCut === false) {
                            window.guardian.queue.forEach(function(startup) { startup() })
                        }
                    }

                    // We've got contracts to abide by with the Ophan tracker
                    // Setting pageViewId here ensures we're not getting race-conditions at all
                    window.guardian.config.ophan = {
                        // This is duplicated from
                        // https://github.com/guardian/ophan/blob/master/tracker-js/assets/coffee/ophan/transmit.coffee
                        // Please do not change this without talking to the Ophan project first.
                        pageViewId:
                            new Date().getTime().toString(36) +
                            'xxxxxxxxxxxx'.replace(/x/g, function() {
                                return Math.floor(Math.random() * 36).toString(36);
                            }),
                    };
                </script>

                <script>
                    // Set the browserId from the bwid cookie on the ophan object created above
                    // This will need to be replaced later with an async request to an endpoint
                    (function (window, document) {

                        function getCookieValue(name) {
                            var nameEq = name + "=",
                                cookies = document.cookie.split(';'),
                                value = null;
                            cookies.forEach(function (cookie) {
                                while (cookie.charAt(0) === ' ') {
                                    cookie = cookie.substring(1, cookie.length);
                                }
                                if (cookie.indexOf(nameEq) === 0) {
                                    value = cookie.substring(nameEq.length, cookie.length);
                                }
                            });
                            return value;
                        }

                        window.guardian.config.ophan.browserId = getCookieValue("bwid");

                    })(window, document);
                </script>

				<script>
					window.curlConfig = {
						baseUrl: '${ASSET_ORIGIN}assets',
						apiName: 'require'
					};
					window.curl = window.curlConfig;
				</script>


                <noscript>
                    <img src="https://sb.scorecardresearch.com/p?${new URLSearchParams(
						{
							c1: '2',
							c2: '6035250',
							cv: '2.0',
							cj: '1',
							cs_ucfr: '0',
							comscorekw: keywords,
						},
					).toString()}" />
                </noscript>
                ${priorityScriptTags.join('\n')}
                <style class="webfont">${getFontsCss()}</style>
                <style>${resets.resetCSS}</style>
				${css}
				<link rel="stylesheet" media="print" href="${ASSET_ORIGIN}static/frontend/css/print.css">
			</head>

			<body>
                ${html}
                ${[...lowPriorityScriptTags].join('\n')}
            </body>
        </html>`;
};
