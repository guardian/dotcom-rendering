// @flow
import { styled } from '@guardian/guui';

import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';

const Main = styled('div')({
    margin: 'auto',
    color: 'white',
    padding: '1em',
    fontWeight: 'bold',
    backgroundColor: 'red',
    fontFamily: 'arial'
});

export default () => (
    <Main><p>Hello, I am a component!</p></Main>
);
