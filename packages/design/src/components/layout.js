import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styles from "./layout.module.css"
import "./fonts.css"

export default ({ children }) => {
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
  `)
  return (
    <div className={styles.base}>
      <nav className={styles.sidebar}>
        <ul>
          <li>
            <h2>Navigation</h2>
          </li>
          {data.allMdx.edges.map(({ node }) => (
            <li key={node.id}>
              <Link activeClassName={styles.activeLink} to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  )
}
