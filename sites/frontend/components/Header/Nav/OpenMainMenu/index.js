// @flow
import { styled, Component } from '@guardian/guui';

import { desktop } from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { headline } from '@guardian/pasteup/fonts';

import VeggieBurger from './VeggieBurger';

const ScreenReadable = styled('span')(screenReaderOnly);

const navPrimaryColour = '#121212';
const navSecondaryColour = '#5d5f5f';
const openMainMenuStyles = {
    display: 'none',
    fontFamily: headline,
    fontWeight: 400,
    textDecoration: 'none',
    color: navSecondaryColour,
    cursor: 'pointer',
    lineHeight: 1,
    position: 'relative',
    overflow: 'hidden',
    border: 0,
    backgroundColor: 'transparent',
    fontSize: 22,
    height: 48,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 20,
    paddingLeft: 5,
    [desktop]: {
        display: 'block',
    },
    ':hover': {
        color: navPrimaryColour,
    },
    ':focus': {
        color: navPrimaryColour,
    },
};

const OpenMainMenuCheckbox = styled('input')({
    ...screenReaderOnly,
    ':checked': {
        '+ div': {
            display: 'block',
        },
    },
});
OpenMainMenuCheckbox.displayName = 'OpenMainMenuCheckbox';

const OpenMainMenuLabel = styled('label')({
    ...openMainMenuStyles,
    [desktop]: {
        display: 'inline-block',
    },
});
OpenMainMenuLabel.displayName = 'OpenMainMenu';

const OpenMainMenuButton = styled('button')({
    ...openMainMenuStyles,
});
OpenMainMenuButton.displayName = 'OpenMainMenu';

const OpenMainMenuText = styled('span')({
    display: 'block',
    height: '100%',
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
});

type Props = {
    toggleMainMenu: () => void,
    showMainMenu: boolean,
    ariaControls: string,
};

class OpenMainMenu extends Component<Props, { enhanceCheckbox: boolean }> {
    constructor(props: Props) {
        super(props);

        this.state = {
            enhanceCheckbox: false,
        };
    }

    componentDidMount() {
        /**
            componentDidMount is only executed in the browser therefore if
            enhanceCheckbox is set to true it indicates that JS is running 
            in the browser and we should re-render without the NO JS fallback.
            Overriding eslint as you can call setState in componentDidMount:
            https://reactjs.org/docs/react-component.html#componentdidmount
        * */
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
            enhanceCheckbox: true,
        });
    }

    render() {
        const { toggleMainMenu, ariaControls, showMainMenu } = this.props;
        const { enhanceCheckbox } = this.state;
        const CHECKBOX_ID = 'main-menu-toggle';

        if (enhanceCheckbox) {
            return [
                <VeggieBurger
                    showMainMenu={showMainMenu}
                    toggleMainMenu={toggleMainMenu}
                    enhanceCheckbox={enhanceCheckbox}
                    htmlFor={CHECKBOX_ID}
                    ariaControls={ariaControls}
                    key="VeggieBurger"
                />,
                <OpenMainMenuButton
                    onClick={() => toggleMainMenu()}
                    aria-controls={ariaControls}
                    key="OpenMainMenuButton"
                >
                    <ScreenReadable>Show</ScreenReadable>
                    <OpenMainMenuText>More</OpenMainMenuText>
                </OpenMainMenuButton>,
            ];
        }

        return [
            <VeggieBurger
                showMainMenu={showMainMenu}
                toggleMainMenu={toggleMainMenu}
                enhanceCheckbox={enhanceCheckbox}
                htmlFor={CHECKBOX_ID}
                ariaControls={ariaControls}
                key="VeggieBurger"
            />,
            <OpenMainMenuLabel
                htmlFor={CHECKBOX_ID}
                tabindex="0"
                key="OpenMainMenuLabel"
            >
                <ScreenReadable>Show</ScreenReadable>
                <OpenMainMenuText>More</OpenMainMenuText>
            </OpenMainMenuLabel>,
            <OpenMainMenuCheckbox
                type="checkbox"
                id={CHECKBOX_ID}
                aria-controls={ariaControls}
                tabindex="-1"
                key="OpenMainMenuCheckbox"
                role="menuitemcheckbox"
            />,
        ];
    }
}

export default OpenMainMenu;
