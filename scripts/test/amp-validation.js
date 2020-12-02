const amphtmlValidator = require('amphtml-validator');
const http = require('http');

const domain = 'http://localhost:3030';

console.log(`Testing AMP validation on ${domain}`);
amphtmlValidator.getInstance().then((validator) => {
    [
        'politics/2020/dec/02/brexit-uk-has-lowered-demands-on-fish-catches-says-eu',
        'uk-news/2020/dec/02/man-57-is-arrested-on-suspicion-of-attempted-in-burnley-ms',
        'business/2020/dec/02/minister-asks-watchdog-to-examine-conduct-of-arcadia-group-bosses',
        'artanddesign/2020/dec/02/muhammad-ali-cleveland-williams-neil-leifers-best-photograph',
        'football/live/2020/dec/02/sevilla-v-chelsea-champions-league-live',
        'commentisfree/2020/dec/02/cautious-christmas-covid',
    ].map((url) => {
        // COPIED DIRECTLY FROM https://www.npmjs.com/package/amphtml-validator
        http.get(
            `${domain}/AmpArticle?url=https://www.theguardian.com/${url}`,
            (res) => {
                let data = '';
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on('end', function () {
                    const result = validator.validateString(data);
                    console.log(url);
                    (result.status === 'PASS'
                        ? console.log
                        : console.error)(result.status);
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
                });
            },
        );
    });
});
