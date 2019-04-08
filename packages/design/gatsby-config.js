module.exports = {
    siteMetadata: {
        title: `Title from siteMetadata`,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/`,
            },
        },
        `gatsby-mdx`,
        `gatsby-plugin-typescript`,
    ],
};
