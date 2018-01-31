// @flow

const redText = { color: 'hotpink' };

export default () => (
    <p>
        Hello{' '}
        <span css={{ ...redText, fontStyle: 'italic', fontWeight: 'bold' }}>
            world
        </span>
    </p>
);
