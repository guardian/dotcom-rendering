// @flow
import { styled, Component } from '@guardian/guui';

import { desktop } from '@guardian/pasteup/breakpoints';

import MainMenuPillarButton from './MainMenuPillarButton';
import MainMenuPillarLinks from './MainMenuPillarLinks';

import type { PillarType } from '../../../Pillars/Pillar';

const MainMenuPillarStyled = styled('li')({
    fontSize: 18,
    listStyle: 'none',
    margin: 0,
    padding: '0 0 12px',
    [desktop]: {
        width: 140,
        float: 'left',
        position: 'relative',
        ':after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: '#abc2c9',
        },
    },
});
MainMenuPillarStyled.displayName = 'MainMenuPillarStyled';

type Props = { pillar: PillarType };

export default class MainMenuPillar extends Component<
    Props,
    { showPillarLinks: boolean },
> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showPillarLinks: false,
        };
    }

    togglePillarLinks() {
        this.setState({
            showPillarLinks: !this.state.showPillarLinks,
        });
    }

    render() {
        const { showPillarLinks } = this.state;
        const { pillar } = this.props;
        const subNavId = `${pillar.label.toLowerCase()}PillarLinks`;

        return (
            <MainMenuPillarStyled role="none">
                <MainMenuPillarButton
                    pillar={pillar}
                    showPillarLinks={showPillarLinks}
                    togglePillarLinks={() => {
                        this.togglePillarLinks();
                    }}
                    ariaControls={subNavId}
                />
                <MainMenuPillarLinks
                    pillar={pillar}
                    showPillarLinks={showPillarLinks}
                    id={subNavId}
                />
            </MainMenuPillarStyled>
        );
    }
}
