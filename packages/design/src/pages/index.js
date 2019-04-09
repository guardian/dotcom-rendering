import React from 'react';
import { Layout } from '../components/layout';
import logo from './tierz.svg';
import '../templates/page';

import styles from './index.module.css';

// tslint:disable-next-line:no-default-export
export default () => (
    <Layout>
        <div className={styles.root}>
            <img
                className={styles.logo}
                src={logo}
                alt="Revisiting the rendering tier"
            />
            <p className={styles.standfirst}>
                A guide to digital design at The Guardian
            </p>
        </div>
    </Layout>
);
