import React from "react"

import styles from "./storybook.module.css"
import { Dropdown } from "@guardian/guui/index.ts"

const Storybook = () => {
  return (
    <div className={styles.base}>
      <Dropdown label="My account" links={[]} id="my-account" />
    </div>
  )
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
