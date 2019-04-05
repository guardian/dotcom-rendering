import React from "react"

import styles from "./figure.module.css"

const Figure = ({ children }) => {
  return <div className={styles.base}>{children}</div>
}

const FigureTable = ({ children }) => (
  <table data-type="preview">
    <tbody>{children}</tbody>
  </table>
)

const FigureRow = ({ name, usage, children }) => {
  return (
    <tr>
      <td>
        <Figure>{children}</Figure>
      </td>
      <td>
        <strong>{name}</strong>
        <p>{usage}</p>
      </td>
    </tr>
  )
}

export { Figure, FigureRow, FigureTable }
