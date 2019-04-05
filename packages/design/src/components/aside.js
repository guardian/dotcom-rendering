import React from "react"

import styles from "./aside.module.css"

const Aside = ({ children, title }) => (
  <aside class={styles.base}>
    <h2>{title}:</h2>
    <p>{children}</p>
  </aside>
)

const ResearchAside = ({ children }) => (
  <Aside title="Research insight">{children}</Aside>
)
const SeeAlsoAside = ({ children }) => (
  <Aside title="See also">{children}</Aside>
)

export { Aside, ResearchAside, SeeAlsoAside }
