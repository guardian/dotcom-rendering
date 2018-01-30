// @flow

const redText = { color: 'blue' };

export default () => (
    <p>
        Hello{' '}
        <span css={{ ...redText, fontStyle: 'italic', fontWeight: 'bold' }}>
            world
        </span>
    </p>
);
