// @flow
module.exports = ({ stats }: { stats: {} }) => ({
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
                const doc = require('./dist/app.server');
                res.send(doc());
            });
        },
    },
});
