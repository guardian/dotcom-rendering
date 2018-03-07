// @flow

import styled from 'react-emotion';

const NotFound = styled('div')({
    color: 'red'
});

export default () => (
    <NotFound>
        <p>page not found</p>
    </NotFound>
);
