// @flow
import { styled, Component } from '@guardian/guui';

import { desktop } from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { headline } from '@guardian/pasteup/fonts';

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
            display: 'block'
        }
    }
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
    ...openSubNavStyles
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
    toggleSubNav: Function,
};

class SubNavLink extends Component<{}, { showSubNav: boolean }> {
    constructor(props: Props) {
        super(props);

        this.state = {
            enhanceCheckbox: false,
        };
    }

    componentDidMount() {
        this.setState({
            enhanceCheckbox: true
        });    
    }

    render() {
        const { toggleSubNav, ariaControls } = this.props;

        if (this.state.enhanceCheckbox) {
            return (
                <OpenSubNavButton onClick={() => toggleSubNav()} aria-controls={ariaControls}>
                    <ScreenReadable>Show</ScreenReadable>
                    <OpenSubNavText>More</OpenSubNavText>
                </OpenSubNavButton>
            );
        }

        return [
            <OpenSubNavLabel htmlFor='main-menu-toggle' tabindex='0'>
                <ScreenReadable>Show</ScreenReadable>
                <OpenSubNavText>More</OpenSubNavText>
            </OpenSubNavLabel>,
            <OpenSubNavCheckbox type='checkbox' id='main-menu-toggle' aria-controls={ariaControls} tabindex='-1'/>,
        ];
    }
}

export default SubNavLink;