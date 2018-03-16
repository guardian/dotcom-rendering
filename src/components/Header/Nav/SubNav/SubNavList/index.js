// @flow
import styled from 'preact-emotion';
import { Component } from 'preact';

import { desktop } from 'pasteup/breakpoints';

import SubNavListItem from './SubNavListItem';

const SubNavListStyled = styled('ul')({
    fontSize: 18,
    listStyle: 'none',
    margin: 0,
    padding: '0 0 12px',
    [desktop]: {
        width: 118,
        float: 'left',
    },
});
SubNavListStyled.displayName = 'SubNavList';

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

    render(props) {
        return (
            <SubNavListStyled>
                <SubNavListItem
                    {...props}
                    toggleSecondaryNav={() => {
                        this.toggleSecondaryNav();
                    }}
                    showSecondaryNav={this.state.showSecondaryNav}
                />
            </SubNavListStyled>
        );
    }
}
