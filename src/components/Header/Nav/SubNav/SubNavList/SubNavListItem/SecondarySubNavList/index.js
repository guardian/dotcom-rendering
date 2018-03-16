import styled from 'preact-emotion';

import { 
    desktop,
} from 'pasteup/breakpoints';

import SecondarySubNavListItem from './SecondarySubNavListItem';

const SecondarySubNavList = styled('ul')(({ showSecondaryNav }) => ({
    boxSizing: 'border-box',
    display: showSecondaryNav ? 'flex' : 'none',
    fontSize: 18,
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
    padding: '0 0 12px',
    position: 'relative',
    backgroundColor: '#d9e4e7',
    [desktop]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        order: 1,
        paddingBottom: 0,
        backgroundColor: 'transparent',
        width: '100%',
    }
}));

export default (props) => (
    <SecondarySubNavList showSecondaryNav={props.showSecondaryNav}>
        {props.pillar.links.map((link, i) => (
            <SecondarySubNavListItem {...props} link={link} />
        ))}
    </SecondarySubNavList>
);