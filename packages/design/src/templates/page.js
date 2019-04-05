import React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/layout"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import * as figures from "../components/figure"
import * as lists from "../components/list"
import * as asides from "../components/aside"

import * as guui from "@guardian/guui/index.ts"

import styles from "./page.module.css"

// tslint:disable-next-line:no-default-export
export default ({ data: { mdx } }) => {
  return (
    <Layout>
      <div className={styles.md}>
        <h1>{mdx.frontmatter.title}</h1>
        <MDXRenderer
          components={{
            ul: lists.List,
          }}
          scope={{ React, ...asides, ...lists, ...figures, ...guui }}
        >
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
