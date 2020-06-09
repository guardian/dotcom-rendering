import React from 'react';
import { css } from 'emotion';

import { Placeholder } from './Placeholder';

const Container = ({ children }: { children: React.ReactNode }) => (
    <div
        className={css`
            width: 620px;
            padding: 20px;
        `}
    >
        {children}
    </div>
);

const Row = ({ children }: { children: React.ReactNode }) => (
    <div
        className={css`
            display: flex;
            flex-direction: row;
        `}
    >
        {children}
    </div>
);

const Column = ({ children }: { children: React.ReactNode }) => (
    <div
        className={css`
            display: flex;
            flex-direction: column;
        `}
    >
        {children}
    </div>
);

export default {
    component: Placeholder,
    title: 'Components/Placeholder',
};

export const Basic = () => {
    return (
        <Container>
            <Placeholder height={200} />
        </Container>
    );
};
Basic.story = { name: 'with 200px height' };

export const Square = () => {
    return (
        <Container>
            <Placeholder height={200} width={200} />
        </Container>
    );
};
Square.story = { name: 'with equal height and width' };

export const InARow = () => {
    return (
        <Container>
            <Row>
                <Placeholder height={200} width={200} spaceLeft={2} />
                <Placeholder height={200} width={200} spaceLeft={2} />
                <Placeholder height={200} width={200} spaceLeft={2} />
            </Row>
        </Container>
    );
};
InARow.story = { name: 'with elements in a row' };

export const Stacked = () => {
    return (
        <Container>
            <Column>
                <Placeholder height={200} spaceBelow={5} />
                <Placeholder height={200} spaceBelow={5} />
                <Placeholder height={200} spaceBelow={5} />
            </Column>
        </Container>
    );
};
Stacked.story = { name: 'with elements stacked' };

export const Root = () => {
    return (
        <Container>
            <Placeholder height={200} rootId="usedWithPortals" />
        </Container>
    );
};
Root.story = { name: 'with rootId set' };
