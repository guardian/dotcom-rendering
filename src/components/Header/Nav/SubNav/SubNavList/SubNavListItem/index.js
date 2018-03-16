// @flow
import styled from 'preact-emotion';
import { Component } from 'preact';

import { desktop } from 'pasteup/breakpoints';

import SubNavButton from './SubNavButton';
import SecondarySubNavList from './SecondarySubNavList';

const SubNavListItemStyled = styled('li')({
    fontSize: 18,
    listStyle: 'none',
    margin: 0,
    padding: '0 0 12px',
    [desktop]: {
        width: 118,
        float: 'left',
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
