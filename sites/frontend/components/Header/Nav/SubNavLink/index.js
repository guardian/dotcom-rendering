// @flow
import { styled, Component } from '@guardian/guui';

import { desktop } from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { headline } from '@guardian/pasteup/fonts';

import VeggieBurger from './VeggieBurger';

const ScreenReadable = styled('span')(screenReaderOnly);

const navPrimaryColour = '#121212';
const navSecondaryColour = '#5d5f5f';
const openSubNavStyles = {
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
    borderLeft: '1px solid #abc2c9',
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

const OpenSubNavCheckbox = styled('input')({
    ...screenReaderOnly,
    ':checked': {
        '+ div': {
            display: 'block',
        },
    },
});
OpenSubNavCheckbox.displayName = 'OpenSubNavCheckbox';

const OpenSubNavLabel = styled('label')({
    ...openSubNavStyles,
    [desktop]: {
        display: 'inline-block',
    },
});
OpenSubNavLabel.displayName = 'OpenSubNav';

const OpenSubNavButton = styled('button')({
    ...openSubNavStyles,
});
OpenSubNavButton.displayName = 'OpenSubNav';

const OpenSubNavText = styled('span')({
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
    toggleSubNav: () => void,
    showSubNav: boolean,
    ariaControls: string,
};

class SubNavLink extends Component<Props, { enhanceCheckbox: boolean }> {
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
        const { toggleSubNav, ariaControls, showSubNav } = this.props;
        const { enhanceCheckbox } = this.state;
        const CHECKBOX_ID = 'main-menu-toggle';

        if (enhanceCheckbox) {
            return [
                <VeggieBurger
                    showSubNav={showSubNav}
                    toggleSubNav={toggleSubNav}
                    enhanceCheckbox={enhanceCheckbox}
                    htmlFor={CHECKBOX_ID}
                    ariaControls={ariaControls}
                    key="VeggieBurger"
                />,
                <OpenSubNavButton
                    onClick={() => toggleSubNav()}
                    aria-controls={ariaControls}
                    key="OpenSubNavButton"
                >
                    <ScreenReadable>Show</ScreenReadable>
                    <OpenSubNavText>More</OpenSubNavText>
                </OpenSubNavButton>,
            ];
        }

        return [
            <VeggieBurger
                showSubNav={showSubNav}
                toggleSubNav={toggleSubNav}
                enhanceCheckbox={enhanceCheckbox}
                htmlFor={CHECKBOX_ID}
                ariaControls={ariaControls}
                key="VeggieBurger"
            />,
            <OpenSubNavLabel
                htmlFor={CHECKBOX_ID}
                tabindex="0"
                key="OpenSubNavLabel"
            >
                <ScreenReadable>Show</ScreenReadable>
                <OpenSubNavText>More</OpenSubNavText>
            </OpenSubNavLabel>,
            <OpenSubNavCheckbox
                type="checkbox"
                id={CHECKBOX_ID}
                aria-controls={ariaControls}
                tabindex="-1"
                key="OpenSubNavCheckbox"
                role="menuitemcheckbox"
            />,
        ];
    }
}

export default SubNavLink;
