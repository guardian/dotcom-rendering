import {Component} from 'preact';
import styled from 'preact-emotion';
import {
    tablet as tabletMq,
    desktop as desktopMq,
    leftCol as leftColMq,
    wide as wideMq,
} from './breakpoints';

const columns = {
    tablet: {
        max: 12,
        width: 40,
        gutter: 20,
    },
    desktop: {
        max: 12,
        width: 60,
        gutter: 20,
    },
    leftCol: {
        max: 14,
        width: 60,
        gutter: 20,
    },
    wide: {
        max: 16,
        width: 60,
        gutter: 20,
    },
};

const breakpointMqs = {
    tablet: tabletMq,
    desktop: desktopMq,
    leftCol: leftColMq,
    wide: wideMq,
};

const gridStyles = (breakpoint, columnCount) => ({
    [breakpointMqs[breakpoint]]: {
        float: 'left',
        width: (columnCount * columns[breakpoint].width) +
            ((columnCount - 1) * columns[breakpoint].gutter),
        paddingRight: columns[breakpoint].gutter,
        ':last-of-type': {
            paddingRight: 0,
        }
    },
});

const GridStyled = styled('div')();
const RowStyled = styled('div')();
const ColStyled = styled('div')(({ tablet, desktop, leftCol, wide }) => {
    const tabletStyles = tablet ? gridStyles('tablet', tablet) : {};
    const desktopStyles = desktop ? gridStyles('desktop', desktop) : {};
    const leftColStyles = leftCol ? gridStyles('leftCol', leftCol) : {};
    const wideStyles = wide ? gridStyles('wide', wide) : {};

    return {
        ...tabletStyles,
        ...desktopStyles,
        ...leftColStyles,
        ...wideStyles,
    };
});


export class Grid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GridStyled>
                {this.props.children}
            </GridStyled>
        );
    }
}

export class Row extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RowStyled>
                {this.props.children}
            </RowStyled>
        );
    }
}

export class Col extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ColStyled
                tablet={this.props.tablet}
                desktop={this.props.desktop}
                leftCol={this.props.leftCol}
                wide={this.props.wide}
            >
                {this.props.children}
            </ColStyled>
        );
    }

}
