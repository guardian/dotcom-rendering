// @flow
const { log } = require('util');

// @flow

const rollup = require('rollup');
const rollupConfig = require('./rollup.config').default;

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = () => ({
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        publicPath: '/assets/javascript/',
        port: 3000,
        overlay: true,
        quiet: true,
        before(app: any) {
            app.get('/', async (req, res) => {
                try {
                    // make sure each reload is a fresh rendering
                    Object.keys(require.cache).forEach(
                        key => delete require.cache[key],
                    );

                    // re-bundle the server app
                    const bundle = await rollup.rollup({ ...rollupConfig });
                    const { code } = await bundle.generate({ ...rollupConfig });

                    // in prod this would be a require statement,
                    // so it's ok really 😌
                    // eslint-disable-next-line no-eval
                    res.send(eval(code)());
                } catch (e) {
                    log(e);
                }
            });
        },
    },
    plugins: [new FriendlyErrorsWebpackPlugin()],
});
