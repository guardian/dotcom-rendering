import React from 'react';

import styles from './list.module.css';

const List = ({ children }) => <ul className={styles.base}>{children}</ul>;

const ListItem = ({ children }) => <li>{children}</li>;
const HappyListItem = ({ children }) => (
    <li className={styles.happy}>{children}</li>
);
const SadListItem = ({ children }) => (
    <li className={styles.sad}>{children}</li>
);

export { List, ListItem, HappyListItem, SadListItem };
