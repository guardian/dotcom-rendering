// @flow
module.exports = ({ stats }: { stats: {} }) => ({
    browser: {
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            publicPath: '/assets/javascript/',
            port: 3000,
            overlay: true,
            stats: { ...stats, timings: true },
            before(app: any) {
                app.get('/', (req, res) => {
                    // make sure each reload is a fresh rendering
                    Object.keys(require.cache).forEach(
                        key => delete require.cache[key],
                    );

                    // eslint-disable-next-line global-require
                    const { html, stylesForHead } = require('./index.server');

                    // eslint-disable-next-line global-require
                    const document = require('./app/__html').default;

                    res.send(document({ html, stylesForHead }));
                });
            },
        },
    },
});
