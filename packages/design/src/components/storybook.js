import React from "react"
import * as Modul from "@guardian/pasteup"

import styles from "./storybook.module.css"

const Storybook = () => {
  return <div className={styles.base} />
}

const StoryRow = ({ children, ...props }) => {
  return (
    <tr>
      <td>
        <Storybook {...props} />
      </td>
      <td>{children}</td>
    </tr>
  )
}

export { StoryRow }

export default Storybook
