// @flow
import styled from 'react-emotion';
// import React, { Component } from 'react';

import {
    tablet,
    desktop,
} from 'pasteup/breakpoints';
import { screenReaderOnly } from 'pasteup/mixins';
import { headline } from 'pasteup/fonts';

const ScreenReadable = styled('span')(screenReaderOnly);

const SubNavLink = styled('div')(props => {
    const navPrimaryColour = '#121212';
    const navSecondaryColour = '#5d5f5f';

    let styles = {
        fontFamily: headline,
        fontWeight: 400,
        textDecoration: 'none',
        color: navSecondaryColour,
        cursor: 'pointer',
        fontSize: '15.4px',
        height: 30,
        lineHeight: 1,
        padding: '0 4px',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: '1px solid #abc2c9',
        [tablet]: {
            fontSize: '22px',
            height: '42px',
            paddingRight: '20px',
            paddingLeft: '5px',
        },
        [desktop]: {
            height: '48px',
        },
        '&:hover': {
            color: navPrimaryColour,
        },
        '&:focus': {
            color: navPrimaryColour,
        },
        ':after': {
            content: '""',
            border: '2px solid currentColor',
            borderLeft: 'transparent',
            borderTop: 'transparent',
            display: 'inline-block',
            height: 8,
            marginLeft: 6,
            transform: 'translateY(-3px) rotate(45deg)',
            transition: 'transform 250ms ease-out',
            verticalAlign: 'middle',
            width: 8,
        },
        ':hover:after': {
            transform: 'translateY(0) rotate(45deg)',
        },
    };

    return styles;
});

export default () => (
    <SubNavLink>
        <ScreenReadable>Show</ScreenReadable>
        More
    </SubNavLink>
);
