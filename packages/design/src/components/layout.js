import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Details } from './details';

import styles from './layout.module.css';
import './fonts.css';
import './vars.css';
import { inject as injectCssGlobals } from '../helpers/css-globals';
import roundel from './roundel.svg';

injectCssGlobals();

export const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query {
            allMdx {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            }
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);
    const top = data.allMdx.edges.filter(
        ({
            node: {
                fields: { slug },
            },
        }) => slug.split('/').length === 2,
    );
    const components = data.allMdx.edges.filter(
        ({
            node: {
                fields: { slug },
            },
        }) => slug.split('/')[1] === 'components',
    );
    const principles = data.allMdx.edges.filter(
        ({
            node: {
                fields: { slug },
            },
        }) => slug.split('/')[1] === 'principles',
    );
    return (
        <div className={styles.base}>
            <nav className={styles.sidebar}>
                <img alt="Paper design system" src={roundel} />
                <ul>
                    <li>
                        <Link
                            className={styles.topLink}
                            activeClassName={styles.activeLink}
                            to={'/'}
                        >
                            Welcome
                        </Link>
                    </li>
                    {top.map(({ node }) => (
                        <li key={node.id}>
                            <Link
                                className={styles.topLink}
                                activeClassName={styles.activeLink}
                                to={node.fields.slug}
                            >
                                {node.frontmatter.title}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Details initialOpenState>
                            <summary className={styles.topLink}>
                                Principles
                            </summary>
                            <ul>
                                {principles.map(({ node }) => (
                                    <li key={node.id}>
                                        <Link
                                            className={styles.link}
                                            activeClassName={styles.activeLink}
                                            to={node.fields.slug}
                                        >
                                            {node.frontmatter.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Details>
                    </li>
                    <li>
                        <Details initialOpenState>
                            <summary className={styles.topLink}>
                                Components
                            </summary>
                            <ul>
                                {components.map(({ node }) => (
                                    <li key={node.id}>
                                        <Link
                                            className={styles.link}
                                            activeClassName={styles.activeLink}
                                            to={node.fields.slug}
                                        >
                                            {node.frontmatter.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Details>
                    </li>
                </ul>
            </nav>
            <main>{children}</main>
        </div>
    );
};
