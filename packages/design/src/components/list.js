import React from "react"

import styles from "./list.module.css"

const List = ({ children }) => <ul class={styles.base}>{children}</ul>

const ListItem = ({ children }) => <li>{children}</li>
const HappyListItem = ({ children }) => <li class={styles.happy}>{children}</li>
const SadListItem = ({ children }) => <li class={styles.sad}>{children}</li>

export { List, ListItem, HappyListItem, SadListItem }
