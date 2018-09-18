import { css } from 'react-emotion';

export const screenReaderOnly = css`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`;

export const clearFix = css`
    :after {
        content: '';
        display: table;
        clear: both;
    }
`;
