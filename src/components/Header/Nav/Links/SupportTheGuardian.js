// @flow

import styled from 'react-emotion';

export default styled('a')(props => ({
    color: '#e9eff1',
    fontFamily:
        '"Guardian Egyptian Web", "Guardian Text Egyptian Web", "Georgia", "serif"',
    fontWeight: 800,
    textDecoration: 'none',
    position: 'relative',
    width: 155,
    display: 'block',
    textAlign: 'center',
    paddingTop: 6,
    zIndex: 0,
    float: 'left',
    ':before': {
        backgroundColor: '#121212',
        borderRadius: '50%',
        top: -100,
        left: 0,
        right: 0,
        paddingTop: '100%',
        content: '""',
        display: 'block',
        position: 'absolute',
        transition: 'background-color 250ms ease-out',
        zIndex: -1,
    },
    ':hover:before': {
        backgroundColor: props.theme.pillar.news.color,
    },
}));
