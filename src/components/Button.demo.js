// @flow
import Button from './Button';

export const standardButton = () => (
    <Button onClick={() => alert('only get this once JS loads')}>
        standard button
    </Button>
);
export const newsButton = () => <Button pillar="news">news button</Button>;
