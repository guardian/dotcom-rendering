// @flow
import { styled, Component } from '@guardian/guui';

import { desktop } from '@guardian/pasteup/breakpoints';

import SubNavButton from './SubNavButton';
import SecondarySubNavList from './SecondarySubNavList';

import type { PillarType } from '../../../Pillars/Pillar';

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

type Props = { pillar: PillarType };

export default class SubNavListItem extends Component<
    Props,
    { showSecondaryNav: boolean },
> {
    constructor(props: Props) {
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
        const { showSecondaryNav } = this.state;
        const { pillar } = this.props;

        return (
            <SubNavListItemStyled role='none'>
                <SubNavButton
                    pillar={pillar}
                    showSecondaryNav={showSecondaryNav}
                    toggleSecondaryNav={() => {
                        this.toggleSecondaryNav();
                    }}
                />
                <SecondarySubNavList
                    pillar={pillar}
                    showSecondaryNav={showSecondaryNav}                 
                />
            </SubNavListItemStyled>
        );
    }
}
