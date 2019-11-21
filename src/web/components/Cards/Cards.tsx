import React from 'react';
import { css } from 'emotion';

import { Card } from './Card/Card';

type Props = {
    cards: CardType[];
    direction?: 'row' | 'column';
};

export const Cards = ({ cards, direction = 'column' }: Props) => {
    return (
        <ul
            className={css`
                display: flex;
                flex-direction: ${direction};
            `}
        >
            <>
                {cards.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </>
        </ul>
    );
};
