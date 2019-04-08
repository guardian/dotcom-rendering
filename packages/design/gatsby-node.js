const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({ node, getNode, basePath: `content` });
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
    }
};

exports.createPages = ({ graphql, actions: { createPage } }) => {
    return graphql(`
        {
            allMdx {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            reject(result.errors);
        }
        // We'll call `createPage` for each result
        result.data.allMdx.edges.forEach(({ node }) => {
            createPage({
                // This is the slug we created before
                // (or `node.frontmatter.slug`)
                path: node.fields.slug,
                // This component will wrap our MDX content
                component: path.resolve(`./src/templates/page.js`),
                // We can use the values in this context in
                // our page layout component
                context: { id: node.id },
            });
        });
    });
};
