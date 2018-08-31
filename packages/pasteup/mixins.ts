// https://github.com/twbs/bootstrap/blob/v4-dev/scss/mixins/_screen-reader.scss
export const screenReaderOnly = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
};

// https://css-tricks.com/snippets/css/clear-fix/
export const clearFix = {
    ':after': {
        content: '""',
        display: 'table',
        clear: 'both',
    },
};
