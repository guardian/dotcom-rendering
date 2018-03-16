// @flow
import styled from 'preact-emotion';
import { Component } from 'preact';

import { desktop } from 'pasteup/breakpoints';

import SubNavButton from './SubNavButton';
import SecondarySubNavList from './SecondarySubNavList';

const SubNavListItemStyled = styled('li')({
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    [desktop]: {
        float: 'left',
        overflow: 'visible',
        width: 118,
        padding: '0 5px 12px',
    },
});
SubNavListItemStyled.displayName = 'SubNavListItem';

export default class SubNavListItem extends Component {
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
        return (
            <SubNavListItemStyled>
                <SubNavButton
                    {...this.props}
                    toggleSecondaryNav={() => {
                        this.toggleSecondaryNav();
                    }}
                    showSecondaryNav={this.state.showSecondaryNav}
                />
                <SecondarySubNavList
                    {...this.props}
                    showSecondaryNav={this.state.showSecondaryNav}
                />
            </SubNavListItemStyled>
        );
    }
}
