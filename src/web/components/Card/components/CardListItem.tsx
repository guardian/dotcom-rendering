import React from 'react';
import { css } from 'emotion';

const listStyles = css`
    /* Here we ensure the card stretches to fill the containing space */
    flex-basis: 100%;
    /* display block here prevents that annoying bar at the bottom of the image problem
    we might be able to remove this if this is already set in global css */
    display: flex;

    /* We absolutely position the 1 pixel top bar in
       the card so this is required here */
    position: relative;

    /* Set spacing margins on the li element */
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 12px;
`;

type Props = {
    children: JSX.Element | JSX.Element[];
};

export const CardListItem = ({ children }: Props) => (
    <li className={listStyles}>{children}</li>
);
