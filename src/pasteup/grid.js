import {Component} from 'preact';
import styled from 'preact-emotion';
import {
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

const GridStyled = styled('div')();
const RowStyled = styled('div')();
const ColStyled = styled('div')(({ wide, leftCol }) => {
    console.log(wide)
    const leftColStyles = leftCol ? {
        [leftColMq]: {
            float: 'left',
            width: (leftCol * columns.leftCol.width) +
            ((leftCol - 1) * columns.leftCol.gutter),
            paddingRight: columns.leftCol.gutter,
            ':last-of-type': {
                paddingRight: 0,
            }
        },
    } : {};
    const wideStyles = wide ? {
        [wideMq]: {
            float: 'left',
            width: (wide * columns.wide.width) +
                ((wide - 1) * columns.wide.gutter),
            paddingRight: columns.wide.gutter,
            ':last-of-type': {
                paddingRight: 0,
            }
        },
    } : {};

    const styles = {
        ...leftColStyles,
        ...wideStyles,
    };

    return styles;
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
                wide={this.props.wide}
                leftCol={this.props.leftCol}
            >
                {this.props.children}
            </ColStyled>
        );
    }

}
