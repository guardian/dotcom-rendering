module.exports = {
    plugins: [
        'babel-plugin-dynamic-import-node',
        "@babel/plugin-proposal-class-properties",
        ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }]
    ],
    presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
                useBuiltIns: 'usage',
                modules: false,
            },
        ],
    ],
};
