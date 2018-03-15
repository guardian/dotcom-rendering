// @flow
import styled from 'preact-emotion';
import { Component } from 'preact';

import { 
    headline,
    egyptian,
} from 'pasteup/fonts';
import { pillars } from 'pasteup/palette';
import { 
    tablet,
    desktop,
} from 'pasteup/breakpoints';

const subNavListItem = {
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
};

const PrimarySubNavList = styled('ul')({
    fontSize: 18,
    listStyle: 'none',
    margin: 0,
    padding: '0 0 12px',
    [desktop]: {
        width: 118,
        float: 'left',
        borderLeft: '1px solid #abc2c9',
    }
});

const PrimarySubNavListItem = styled('li')({
    ...subNavListItem,
    [desktop]: {
        float: 'left',
        overflow: 'visible',
        width: 118,
        padding: '0 5px 12px',
    }
});

const SubNavButton = styled('button')(({ pillar, isLastIndex, showSecondaryNav }) => {
    const styles = {
        backgroundColor: 'transparent',
        border: 0,
        boxSizing: 'border-box',
        color: pillars[pillar],
        cursor: 'pointer',
        display: 'block',
        fontFamily: headline,
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 1,
        outline: 'none',
        padding: '6px 34px 18px 50px',
        position: 'relative',
        textAlign: 'left',
        width: '100%',
        '> *': {
            pointerEvents: 'none',
        },
        textTransform: 'capitalize',
        ':before': {
            marginTop: showSecondaryNav ? 8 : 4,
            color: '#5d5f5f',
            left: 25,
            position: 'absolute',
            border: '2px solid currentColor',
            borderTop: 0,
            borderLeft: 0,
            content: '""',
            display: 'inline-block',
            height: 10,
            transform: showSecondaryNav ? 'rotate(-135deg)' : 'rotate(45deg)',
            width: 10,
        },
        [desktop]: {
            display: 'none',
        },
        ':after': {
            backgroundColor: '#abc2c9',
            bottom: 0,
            content: '""',
            display: !showSecondaryNav && !isLastIndex ? 'block' : 'none',
            height: 1,
            left: 50,
            position: 'absolute',
            width: '100%',
        }
    };

    return styles;
});

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

const SecondarySubNavListItem = styled('li')({
    ...subNavListItem
});

const SubNavTitle = styled('a')({
    backgroundColor: 'transparent',
    border: 0,
    boxSizing: 'border-box',
    color: '#121212',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: 20,
    fontFamily: egyptian,
    fontWeight: 400,
    outline: 'none',
    padding: '8px 34px 8px 50px',
    position: 'relative',
    textAlign: 'left',
    width: '100%',
    [tablet]: {
        paddingLeft: 60,
    },
    [desktop]: {
        fontSize: 15,
        lineHeight: 1.2,
        padding: '6px 0',
    },
    ':hover': {
        color: '#5d5f5f',
    },
    ':focus': {
        color: '#5d5f5f',
    },
    '> *': {
        pointerEvents: 'none',
    }
});

export default class SubNavList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSecondaryNav: false,
        };
    }

    toggleSecondaryNav() {
        this.setState({
            showSecondaryNav: !this.state.showSecondaryNav,
        });
    }

    render() {
        console.log('this.state.showSecondaryNav', this.state.showSecondaryNav);

        return (
            <PrimarySubNavList index={this.props.index}>
                <PrimarySubNavListItem>
                    <SubNavButton 
                        pillar={this.props.pillar.pillar}
                        isLastIndex={this.props.isLastIndex}
                        showSecondaryNav={this.state.showSecondaryNav}
                        onClick={() => {
                            this.toggleSecondaryNav();
                        }}>
                        {this.props.pillar.label}
                    </SubNavButton>
                    <SecondarySubNavList showSecondaryNav={this.state.showSecondaryNav}>
                        <li>xxx</li>
                    </SecondarySubNavList>
                </PrimarySubNavListItem>
            </PrimarySubNavList>
        );
    }
}