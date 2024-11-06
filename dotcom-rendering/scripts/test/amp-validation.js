/* eslint-disable */
const amphtmlValidator = require('amphtml-validator');
const http = require('http');

const domain = 'http://localhost:9000';

console.log(`Testing AMP validation on ${domain}`);
amphtmlValidator.getInstance().then((validator) => {
	[
		'tv-and-radio/2021/feb/03/deutschland-89-stasi-horror-spy-trilogy',
		'environment/commentisfree/2021/feb/03/the-african-painted-dogs-that-vote-by-sneezing-and-run-on-shadow-puppet-legs',
		'commentisfree/2021/feb/02/alexei-navalny-jailed-vladimir-putin-opposition-russians-kremlin',
		'sport/2021/feb/03/worlds-top-six-women-all-grace-melbourne-park-on-same-day-as-ash-barty-wins-thriller',
		'football/2021/feb/02/manchester-united-southampton-premier-league-match-report',
		'football/2021/feb/02/wolves-arsenal-premier-league-match-report',
		'global-development/2021/feb/02/myanmar-coup-military-tightens-grip-amid-calls-for-suu-kyi-to-be-freed',
		'world/2021/feb/03/academic-jailed-in-iran-pulls-off-daring-escape-back-to-britain-kameel-ahmady',
		,
		'global-development/2021/feb/03/decades-of-progress-on-extreme-poverty-now-in-reverse-due-to-covid',
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
