// client side
module.exports = {
    plugins: [
        'babel-plugin-dynamic-import-node',
        "@babel/plugin-proposal-class-properties",
        ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
        "emotion"
    ],
    presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        "@emotion/babel-preset-css-prop",
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: [
                        "android >= 5",
                        "ios >= 11",
                    ]
                },
                useBuiltIns: 'usage',
                modules: false,
            },
        ],
    ],
};
