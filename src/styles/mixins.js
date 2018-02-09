// @flow
export const hidden = {
    border: '0 !important',
    clip: 'rect(0 0 0 0) !important',
    height: '0.0625rem !important',
    margin: '-0.0625rem !important',
    overflow: 'hidden !important',
    padding: '0 !important',
    position: 'absolute !important',
    width: '0.0625rem !important',
};

export const clearFix = {
    ':before': {
        content: '""',
        display: 'table',
    },
    ':after': {
        content: '""',
        display: 'table',
        clear: 'both',
    },
};
