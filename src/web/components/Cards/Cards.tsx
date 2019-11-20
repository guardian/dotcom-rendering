import React from 'react';

import { Card } from './Card/Card';

type Props = {
    cards: CardType[];
    inColumn?: boolean;
};

export const Cards = ({ cards, inColumn }: Props) => {
    return (
        <>
            {cards.map((card, index) => {
                const notLastItem = index < cards.length - 1;
                const notFirstItem = index > 0;

                return (
                    <Card
                        key={index}
                        showDivider={!inColumn && notFirstItem}
                        bottomMargin={inColumn && notLastItem}
                        {...card}
                    />
                );
            })}
        </>
    );
};
