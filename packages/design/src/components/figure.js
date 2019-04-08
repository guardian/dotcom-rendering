import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styles from './figure.module.css';
import { scope } from '../helpers/mdx-scope';

const Figure = ({ children, appearance }) => {
    const [open, setOpen] = useState(false);
    return (
        <figure data-appearance={appearance} className={styles.base}>
            <LiveProvider scope={scope} code={children}>
                <div className={styles.preview}>
                    <LivePreview />
                    <LiveError />
                    <button
                        className={styles.btn}
                        onClick={() => setOpen(current => !current)}
                    >
                        {open ? 'close' : 'show code'}
                    </button>
                </div>
                {open && (
                    <div className={styles.code}>
                        <LiveEditor />
                    </div>
                )}
            </LiveProvider>
        </figure>
    );
};

const FigureTable = ({ children }) => (
    <table data-type="preview">
        <tbody>{children}</tbody>
    </table>
);

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
    );
};

export { Figure, FigureRow, FigureTable };
