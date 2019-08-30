const { warn, log } = require('../env/log');
const execa = require('execa');

const run = async () => {
    try {
        await execa('command', ['-v', 'fast']);
        const { stdout } = await execa('fast', [
            '--start-cmd',
            'make build;make start',
            '--stop-cmd',
            'make stop',
            '--target-url',
            'http://localhost:9000/ArticlePerfTest',
        ]);

        log(stdout);
    } catch (e) {
        warn(err.stack);
        process.exit(1);
    }
};

run();
