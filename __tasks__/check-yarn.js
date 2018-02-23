// @flow
const ensure = require('./lib/ensure');

const YARN_VERSION = '1.3.2';

(async () => {
    const [execa] = await ensure('execa');
    try {
        const { stdout: version } = execa.sync('yarn', ['-v']);

        if (version !== YARN_VERSION) {
            await require('./lib/log').warn(
                `You need to update yarn to ${YARN_VERSION}`,
                `Your installed version is ${version}`,
                `See https://yarnpkg.com/lang/en/docs/install`,
            );
            process.exit(1);
        }
    } catch (e) {
        await require('./lib/log').warn(
            `You need to install yarn@${YARN_VERSION}`,
            `https://yarnpkg.com/lang/en/docs/install`,
        );
        process.exit(1);
    }
})();
