import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import Storybook, { StoryRow } from "../components/storybook"
import styles from "./page.module.css"

export default ({ data: { mdx } }) => {
  return (
    <Layout>
      <div className={styles.md}>
        <h1>{mdx.frontmatter.title}</h1>
        <MDXRenderer scope={{ Storybook, StoryRow, React }}>
          {mdx.code.body}
        </MDXRenderer>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`
