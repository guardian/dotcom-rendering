// @flow
import React from 'react';
import { styled } from 'styletron-react';
import decamelize from 'decamelize'; // eslint-disable-line import/no-extraneous-dependencies

const Monospace = styled('span', {
    fontFamily: 'Inconsolata',
});

const Header = styled('div', {
    fontFamily: 'Guardian Agate Sans',
    fontSize: '13px',
    paddingBottom: '2rem',
});

const Message = styled('div', {
    fontFamily: 'Guardian Agate Sans',
    backgroundColor: 'yellow',
    display: 'inline-block',
    fontSize: '13px',
});

const Component = styled('div', {
    paddingBottom: '2rem',
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
        <Header>
            <Monospace>
                <a
                    href={`https://github.com/guardian/guui/blob/master/src/${path}.js`}
                >
                    /src/{path}.js
                </a>
            </Monospace>
        </Header>
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
    </div>
);
