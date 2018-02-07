// @flow
import React from 'react';
import { styled } from 'styletron-react';
import decamelize from 'decamelize'; // eslint-disable-line import/no-extraneous-dependencies

const Path = styled('div', {
    fontFamily: 'Guardian Agate Sans',
    fontSize: '16px',
    // paddingBottom: '1rem',
});

const Message = styled('div', {
    backgroundColor: 'yellow',
    display: 'inline-block',
});

const Component = styled('div', {
    paddingTop: '2rem',
});

const Title = styled('div', {
    fontFamily: 'Guardian Agate Sans',
    fontSize: '13px',
    textTransform: 'capitalize',
    lineHeight: 1.5,
});

const Stage = styled('div', {
    backgroundColor: 'white',
});

export default ({
    demos,
    path,
}: {
    demos: { [string]: React.Node },
    path: string,
}) => (
    <div>
        <Path>{path}</Path>
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
            <Message>There is no demo for {path}.</Message>
        )}
    </div>
);
