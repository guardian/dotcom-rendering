/* eslint-disable */
import amphtmlValidator from 'amphtml-validator';
import http from 'node:http';

const domain = 'http://localhost:9000';

console.log(`Testing AMP validation on ${domain}`);
amphtmlValidator.getInstance().then((validator) => {
	[
		'technology/2021/feb/02/jeff-bezos-amazon-ceo-resigns-steps-down',
		'us-news/2021/feb/02/trump-capitol-riot-powder-keg-impeachment-prosecutors',
		'us-news/2021/feb/02/biden-to-launch-task-force-to-reunite-families-separated-at-us-mexico-border',
		'science/2021/feb/02/spacex-starship-rocket-test-flight-explodes-elon-musk',
		'us-news/2021/feb/02/two-fbi-agents-shot-dead-florida',
		'us-news/2021/feb/02/prisons-coronavirus-covid-deaths-california-pandemic',
		'world/2021/feb/03/myanmar-coup-aung-san-suu-kyi-workers-hospitals-civil-disobedience-aung-san-suu-kyi',
		'world/2021/feb/02/russian-opposition-leader-alexei-navalny-jailed',
		'us-news/2021/feb/02/rochester-new-york-police-pepper-spray-girl-mayor',
		'business/2021/feb/02/gamestop-shares-plunge-as-traders-dump-stock',
		'world/2021/feb/02/arizona-covid-19-surge-navajo-nation-mae-tso',
		'world/live/2021/feb/03/coronavirus-live-news-who-warns-vaccine-nationalism-will-spawn-new-covid-mutations',
		'world/2021/feb/02/beaver-creek-coronavirus-vaccination-rod-ekaterina-baker',
		'society/2021/feb/02/how-matt-hancocks-obsession-with-matt-damon-film-inspired-uks-vaccine-strategy',
		'film/2021/feb/02/jean-reno-leon-hitman-eurobaddie',
		'tv-and-radio/2021/feb/03/deutschland-89-stasi-horror-spy-trilogy',
		'law/2021/feb/03/icc-ready-to-rule-on-dominic-ongwen-ex-child-soldier-accused-of-war-crimes',
		'environment/commentisfree/2021/feb/03/the-african-painted-dogs-that-vote-by-sneezing-and-run-on-shadow-puppet-legs',
		'commentisfree/2021/feb/02/alexandria-ocasio-cortez-republican-accountability-capitol-attack',
		'commentisfree/2021/feb/03/gamestop-platform-populism-uber-airbnb-wework-robinhood-democracy',
		'commentisfree/2021/feb/02/flint-michigan-water-environment-biden',
		'commentisfree/2021/feb/02/alexei-navalny-jailed-vladimir-putin-opposition-russians-kremlin',
		'commentisfree/2021/feb/03/what-a-picture-of-alexandria-ocasio-cortez-in-a-bikini-tells-us-about-the-disturbing-future-of-ai',
		'commentisfree/2021/feb/02/house-prices-are-falling-for-the-super-rich-but-thats-no-use-for-the-rest-of-us',
		'sport/2021/feb/03/worlds-top-six-women-all-grace-melbourne-park-on-same-day-as-ash-barty-wins-thriller',
		'sport/2021/feb/03/patrick-mahomes-tom-brady-super-bowl-quarterbacks-michael-jordan-nfl',
		'sport/2021/feb/02/lebron-james-fan-hawks-lakers-atlanta-ejected-nba-basketball',
		'football/2021/feb/02/manchester-united-southampton-premier-league-match-report',
		'sport/2021/feb/02/mickey-callaway-new-york-mets-angels-harassment-allegations-mlb-baseball',
		'football/2021/feb/02/wolves-arsenal-premier-league-match-report',
		'music/2021/feb/02/marilyn-manson-removed-from-us-tv-shows-following-abuse-allegations',
		'culture/2021/feb/02/trevor-noah-qanon-not-just-extreme-delusional',
		'music/2021/feb/02/sophie-triumphantly-plastic-music-moulded-a-new-world-for-trans-people',
		'music/2021/feb/02/the-velvet-mafia-the-gay-men-who-helped-shape-music-in-the-60s',
		'world/2021/feb/02/queens-gambit-ignites-sales-for-spanish-chessboard-maker',
		'film/2021/feb/02/pleasure-review-la-porn-drama-sundance',
		'music/2021/feb/02/dolly-parton-turned-down-presidential-medal-of-freedom-twice-trump',
		'film/2021/feb/02/hal-holbrook-dies-aged-95-deep-throat-all-the-presidents-men-mark-twain',
		'us-news/2021/feb/02/groundhog-day-prediction-winter-punxsutawney-phil',
		'us-news/2021/feb/02/biden-trump-environment-climate-crisis',
		'business/2021/feb/03/us-mint-couldnt-meet-demand-for-gold-and-silver-coins-due-to-pandemic-buying',
		'technology/2021/feb/02/apple-iphone-update-solves-problem-of-unlocking-faceid-in-a-mask',
		'business/2021/feb/02/alphabet-google-earnings-fourth-quarter',
		'us-news/2021/feb/02/andrew-yang-tests-positive-covid-19-new-york-city',
		'us-news/2021/feb/02/pete-buttigieg-confirmed-transportation-secretary',
		'global-development/2021/feb/02/myanmar-coup-military-tightens-grip-amid-calls-for-suu-kyi-to-be-freed',
		'world/2021/feb/03/academic-jailed-in-iran-pulls-off-daring-escape-back-to-britain-kameel-ahmady',
		'business/live/2021/feb/03/global-stocks-and-oil-prices-rise-amid-stimulus-and-vaccine-optimism-gamestop-business-live',
		'global-development/2021/feb/03/decades-of-progress-on-extreme-poverty-now-in-reverse-due-to-covid',
		'sport/2021/feb/02/trump-organization-finances-scottish-golf-courses-turnberry',
		'world/2021/feb/02/vienna-man-body-apartment-two-months-forgotten',
		'world/2021/feb/02/italian-president-sergio-mattarella-to-seek-a-high-profile-government',
		'environment/2021/feb/02/beekeeper-stung-by-post-brexit-ban-and-threat-to-burn-15m-bees',
		'environment/2021/feb/02/sea-level-rise-could-be-worse-than-feared-warn-researchers',
		'uk-news/2021/feb/02/captain-sir-tom-moore-dies-at-100-after-testing-positive-for-covid',
		'food/2021/feb/02/the-real-thing-my-battle-to-beat-a-27-year-diet-coke-addiction',
		'money/2020/may/08/homebuyers-plotting-move-to-country-amid-increased-home-working',
	].map((url) => {
		// COPIED DIRECTLY FROM https://www.npmjs.com/package/amphtml-validator
		http.get(
			`${domain}/AMPArticle/https://amp.theguardian.com/${url}`,
			(res) => {
				let data = '';
				res.on('data', function (chunk) {
					data += chunk;
				});
				res.on('end', function () {
					const result = validator.validateString(data);
					console.log(url);
					if (result.status === 'PASS') {
						console.log('PASS');
					} else {
						console.error('FAIL');
						for (let ii = 0; ii < result.errors.length; ii++) {
							const error = result.errors[ii];
							let msg = `line ${error.line}, col ${error.col}: ${error.message}`;
							if (error.specUrl !== null) {
								msg += ` (see ${error.specUrl})`;
							}
							(error.severity === 'ERROR'
								? console.error
								: console.warn)(msg);
						}
						throw new Error('Failed AMP Validation');
					}
				});
			},
		);
	});
});
