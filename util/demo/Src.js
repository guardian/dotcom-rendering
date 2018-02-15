// @flow

import { styled } from 'styletron-react';
import decamelize from 'decamelize'; // eslint-disable-line import/no-extraneous-dependencies

const Component = styled('li', {
    paddingBottom: '2rem',
});

const Title = styled('div', {
    fontFamily: 'Guardian Agate Sans',
    fontSize: '13px',
    textTransform: 'capitalize',
    paddingBottom: '1rem',
});

const Stage = styled('div', {
    backgroundColor: 'white',
});

const Message = styled('div', {
    fontFamily: 'Guardian Agate Sans',
    backgroundColor: 'yellow',
    display: 'inline-block',
    fontSize: '13px',
});

const Monospace = styled('span', {
    fontFamily: 'Inconsolata',
});

export default ({
    demos,
    path,
}: {
    demos: { [string]: Component },
    path: string,
}) => (
    <ul>
        {Object.keys(demos).length ? (
            Object.keys(demos).map(demo => {
                const Demo = demos[demo];
                return (
                    <Component key={demo}>
                        <Title>{decamelize(demo, ' ')}</Title>
                        <Stage>
                            <Demo />
                        </Stage>
                    </Component>
                );
            })
        ) : (
            <div>
                <Message>
                    Cannot find a demo for <Monospace>{path}</Monospace>
                </Message>
            </div>
        )}
    </ul>
);
