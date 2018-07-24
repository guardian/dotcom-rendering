const path = require('path');
// const webpack = require('webpack');

// const commonConfig = {
//     mode: 'production',
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: ['babel-loader'],
//             },
//             {
//                 test: /\.svg$/,
//                 use: ['desvg-loader/react', 'svg-loader'],
//             },
//         ],
//     },
//     plugins: [new webpack.IgnorePlugin(/.\/manifest.json/)],
// };

// const rootConfig = Object.assign({}, commonConfig, {
//     entry: {
//         document: './packages/guui/document.js',
//         grid: './packages/guui/grid.js',
//         htmlTemplate: './packages/guui/htmlTemplate.js',
//     },
//     output: {
//         filename: '[name].js',
//         path: path.join(__dirname, '..', 'packages', 'guui', 'dist'),
//         library: 'guui',
//         libraryTarget: 'commonjs2',
//     },
// });

// const libConfig = Object.assign({}, commonConfig, {
//     entry: {
//         assets: './packages/guui/lib/assets.js',
//         'reset-css': './packages/guui/lib/reset-css.js',
//     },
//     output: {
//         filename: '[name].js',
//         path: path.join(__dirname, '..', 'packages', 'guui', 'dist', 'lib'),
//         library: 'guui',
//         libraryTarget: 'commonjs2',
//     },
// });

// const componentConfig = Object.assign({}, commonConfig, {
//     entry: {
//         CloseButton: './packages/guui/components/CloseButton/index.js',
//         Number: './packages/guui/components/Number/index.js',
//         SiteMessage: './packages/guui/components/SiteMessage/index.js',
//     },
//     output: {
//         filename: '[name].js',
//         path: path.join(
//             __dirname,
//             '..',
//             'packages',
//             'guui',
//             'dist',
//             'components',
//         ),
//         library: 'guui',
//         libraryTarget: 'commonjs2',
//     },
//     // use the dependencies of consumer project importing guui components
//     externals: {
//         react: 'react',
//         'react-dom': 'react-dom',
//         'react-emotion': 'react-emotion',
//     },
// });

const componentConfig = {
    mode: 'production',
    entry: './packages/guui/index.js',
    output: {
        path: path.join(__dirname, '..', 'packages', 'guui', 'dist'),
        filename: 'index.js',
        library: 'guui',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.svg$/,
                use: ['desvg-loader/react', 'svg-loader'],
            },
        ],
    },
    externals: {
        emotion: 'emotion',
        react: 'react',
        'react-emotion': 'react-emotion',
    },
};

module.exports = [
    // rootConfig,
    // libConfig,
    componentConfig,
];
