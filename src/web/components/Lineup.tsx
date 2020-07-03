import React from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';

type Props = {
    players: PlayerType[];
};

const Row = ({ children }: { children: React.ReactNode }) => (
    <div
        className={css`
            display: flex;
            flex-direction: row;
            position: relative;
        `}
    >
        {children}
    </div>
);

const svgBackgroundRed = encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 1 1"><rect fill="#cc2b12" width="1" height="1"></svg>',
);

const svgBackgroundYellow = encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 1 1"><rect fill="#fb0" width="1" height="1"></svg>',
);

const Event = ({
    type,
    time,
}: {
    type: 'substitution' | 'dismissal' | 'booking';
    time: string;
}) => {
    switch (type) {
        case 'dismissal':
            return (
                <i
                    className={css`
                        display: inline-block;
                        background-image: url('data:image/svg+xml, ${svgBackgroundRed}');
                        background-position: 0 0;
                        width: 0.5625rem;
                        height: 0.75rem;
                        transform: rotate(8deg);
                        background-size: contain;
                    `}
                />
            );
        case 'booking':
            return (
                <i
                    className={css`
                        display: inline-block;
                        background-image: url('data:image/svg+xml, ${svgBackgroundYellow}');
                        background-position: 0 0;
                        width: 0.5625rem;
                        height: 0.75rem;
                        transform: rotate(8deg);
                        background-size: contain;
                    `}
                />
            );
        case 'substitution':
            return <span>{`(s ${time}')`}</span>;
    }
};

export const Lineup = ({ players }: Props) => {
    return (
        <ul>
            {players.map((player) => (
                <li
                    className={css`
                        ${textSans.small()}
                    `}
                >
                    <Row>
                        <div
                            className={css`
                                font-weight: bold;
                            `}
                        >
                            {player.shirtNumber}
                        </div>
                        <div
                            className={css`
                                position: absolute;
                                left: 40px;
                            `}
                        >
                            <Row>
                                {player.name}
                                {player.events.map((event: EventType) => (
                                    <div
                                        className={css`
                                            margin-left: 4px;
                                        `}
                                    >
                                        <Event
                                            type={event.eventType}
                                            time={event.eventTime}
                                        />
                                    </div>
                                ))}
                            </Row>
                        </div>
                    </Row>
                </li>
            ))}
        </ul>
    );
};
