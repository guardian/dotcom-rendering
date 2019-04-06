import React from "react"

import styles from "./figure.module.css"

const Figure = ({ children, appearance }) => {
  return (
    <figure data-appearance={appearance} className={styles.base}>
      {children}
    </figure>
  )
}

const FigureTable = ({ children }) => (
  <table data-type="preview">
    <tbody>{children}</tbody>
  </table>
)

const FigureRow = ({ name, usage, ...props }) => {
  return (
    <tr>
      <td>
        <Figure {...props} />
      </td>
      <td>
        <strong>{name}</strong>
        <p>{usage}</p>
      </td>
    </tr>
  )
}

export { Figure, FigureRow, FigureTable }
