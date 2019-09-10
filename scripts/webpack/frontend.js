const path = require('path');
const webpack = require('webpack');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const { smart: merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ReportBundleSize = require('./plugins/report-bundle-size');
const { root, dist, siteName } = require('../frontend/config');

const PROD = process.env.NODE_ENV === 'production';

const reportBundleSize = new ReportBundleSize();

const common = ({ platform, page = '' }) => ({
    name: platform,
    mode: process.env.NODE_ENV,
    output: {
        publicPath: '/assets/',
        path: dist,
    },
    stats: 'errors-only',
    devtool:
        process.env.NODE_ENV === 'production'
            ? 'sourcemap'
            : 'cheap-module-eval-source-map',
    resolve: {
        alias: {
            '@root': path.resolve(__dirname, '.'),
            '@frontend': path.resolve(__dirname, 'packages', 'frontend'),
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /(\.tsx)|(\.js)|(\.ts)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-typescript',
                                '@babel/preset-react',
                                [
                                    '@babel/preset-env',
                                    platform === 'browser'
                                        ? {
                                              targets: {
                                                  ie: '11',
                                              },
                                              modules: false,
                                              debug: true,
                                          }
                                        : {
                                              targets: {
                                                  node: 'current',
                                              },
                                              debug: true,
                                          },
                                ],
                            ],
                        },
                    },
                    {
                        loader: 'string-replace-loader',
                        options: {
                            multiple: [
                                {
                                    search: '__PAGE__',
                                    replace: page,
                                    flags: 'g',
                                },
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['desvg-loader/react', 'svg-loader'],
            },
            {
                // make sure webpack tree-shakes this stuff
                // https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free
                include: [
                    path.resolve(root, 'packages', 'guui'),
                    path.resolve(root, 'packages', 'pasteup'),
                ],
                sideEffects: false,
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        PROD && !process.env.HIDE_BUNDLES && reportBundleSize,
        PROD &&
            new BundleAnalyzerPlugin({
                reportFilename: path.join(dist, `${platform}-bundles.html`),
                analyzerMode: 'static',
                openAnalyzer: false,
                logLevel: 'warn',
            }),
    ].filter(Boolean),
});

const getPagesForSite = () =>
    glob('*.ts*(x)', { cwd: `packages/frontend/web/pages` }).then(paths =>
        paths.map(p => p.replace(/\.[^/.]+$/, '')),
    );

module.exports = getPagesForSite()
    .then(pages => [
        // server bundle config
        merge(
            require(`./server`)(),
            common({
                platform: 'server',
            }),
        ),
        // browser bundle configs
        ...pages.map(page =>
            merge(
                require(`./browser`)({ page }),
                common({
                    platform: 'browser',
                    page,
                }),
            ),
        ),
    ])
    // flatten the nested page configs:
    // [site, [page1]] => [site, page1]
    .then(configs => [].concat(...configs));
