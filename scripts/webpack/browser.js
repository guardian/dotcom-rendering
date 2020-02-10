const webpack = require('webpack');
const AssetsManifest = require('webpack-assets-manifest');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');
const {
    siteName
} = require('../frontend/config');

const friendlyErrorsWebpackPlugin = () =>
    new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
            messages: [
                `DEV server running at ${chalk.blue.underline(
                    'http://localhost:3030',
                )}`,
            ],
        },
    });

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';

// We need to distinguish files compiled by @babel/preset-env with the prefix "legacy"
const generateName = isLegacyJS => {
    const legacyString = isLegacyJS ? '.legacy' : '';
    const chunkhashString = PROD ? '.[chunkhash]' : '';
    return `[name]${legacyString}${chunkhashString}.js`;
};

// used to stop multiple compilers overwriting other compiler's data
const manifestData = {};
const legacyManifestData = {};

const scriptPath = package => [
    `./src/web/browser/${package}/init.ts`,
    DEV &&
    'webpack-hot-middleware/client?name=browser&overlayWarnings=true',
].filter(Boolean);

module.exports = ({
    isLegacyJS
}) => ({
    entry: {
        sentry: scriptPath('sentry'),
        ga: scriptPath('ga'),
        ophan: scriptPath('ophan'),
        react: scriptPath('react'),
        lotame: scriptPath('lotame'),
    },
    output: {
        filename: generateName(isLegacyJS),
        chunkFilename: generateName(isLegacyJS),
    },
    plugins: [
        PROD &&
        new AssetsManifest({
            writeToDisk: true,
            assets: isLegacyJS ? legacyManifestData : manifestData,
            // Need to explicitly define output file names to avoid overwrites
            output: isLegacyJS ? 'manifest.legacy.json' : 'manifest.json',
        }),
        DEV && new webpack.HotModuleReplacementPlugin(),
        DEV && new webpack.NamedModulesPlugin(),
        DEV && friendlyErrorsWebpackPlugin(),
        // https://www.freecodecamp.org/forum/t/algorithm-falsy-bouncer-help-with-how-filter-boolean-works/25089/7
        // [...].filter(Boolean) why it is used
    ].filter(Boolean),
    module: {
        rules: [{
                test: /(\.tsx)|(\.js)|(\.ts)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-typescript',
                            '@babel/preset-react',
                            // @babel/preset-env is used for legacy browsers
                            // @babel/preset-modules is used for modern browsers
                            // this allows us to reduce bundle sizes
                            isLegacyJS ?
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        ie: '11',
                                    },
                                    modules: false,
                                },
                            ] :
                            '@babel/preset-modules',
                        ],
                    },
                }, ],
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['desvg-loader/react', 'svg-loader'],
            },
        ],
    },
});
