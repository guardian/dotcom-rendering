module.exports = ({ config }) => {
    const rules = config.module.rules;

    rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve('awesome-typescript-loader'),
            },
        ],
    });

    // modify storybook's file-loader rule to avoid conflicts with our svg
    // https://stackoverflow.com/questions/54292667/react-storybook-svg-failed-to-execute-createelement-on-document
    const fileLoaderRule = rules.find(rule => rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    rules.push({
        test: /\.svg$/,
        use: ['desvg-loader/react', 'svg-loader'],
    });

    rules.push({
        test: /\.stories\.tsx?$/,
        loaders: [
            {
                loader: require.resolve('@storybook/addon-storysource/loader'),
                options: { parser: 'typescript' },
            },
        ],
        enforce: 'pre',
    });

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
