const { resolve } = require('path');

module.exports = () => ({
    entry: {
        'gap-core': './packages/gap/gap-core/gap-core.ts',
        'gap-list': './packages/gap/gap-list/gap-list.ts',
    },
    output: {
        path: resolve(__dirname, `../../packages/gap/dist/`),
        filename: `[name].js`,
        chunkFilename: `[name].js`,
        libraryTarget: 'global',
        pathinfo: true,
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    target: 'web',
});
