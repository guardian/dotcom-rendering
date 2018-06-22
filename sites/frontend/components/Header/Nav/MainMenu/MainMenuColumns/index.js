// @flow
import { styled } from '@guardian/guui';

import { desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';

import MainMenuColumn from './MainMenuColumn';
import { columnsConfig } from '../../../Nav/__config__';

const MainMenuColumns = styled('ul')({
    boxSizing: 'border-box',
    maxWidth: 'none',
    [desktop]: {
        maxWidth: 980,
        backgroundColor: '#e9eff1',
        padding: '0 20px',
        position: 'relative',
        margin: '0 auto',
        display: 'flex',
    },
    [leftCol]: {
        maxWidth: 1140,
    },
    [wide]: {
        maxWidth: 1300,
    },
});
MainMenuColumns.displayName = 'MainMenuColumns';

export default () => (
    <MainMenuColumns role="menubar" tabindex="-1">
        {columnsConfig.map(column => (
            <MainMenuColumn column={column} key={column.id} />
        ))}
    </MainMenuColumns>
);
