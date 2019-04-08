import React from 'react';
import { Layout } from '../components/layout';
import logo from './tierz.svg';
import { css } from 'emotion';
import '../templates/page';

// tslint:disable-next-line:no-default-export
export default () => (
    <Layout>
        <div
            className={css`
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            `}
        >
            <img
                className={css`
                    width: 75%;
                    margin: 0.5rem auto 2em;
                `}
                src={logo}
                alt="Revisiting the rendering tier"
            />
            <p
                className={css`
                    text-align: center;
                `}
            >
                A guide to digital design at The Guardian
            </p>
        </div>
    </Layout>
);
