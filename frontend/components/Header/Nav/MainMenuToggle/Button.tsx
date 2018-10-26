import React, { Component } from 'react';
import { css, cx } from 'react-emotion';

import { Span } from './Span';

const button = css`
    font-size: 10px;
    color: red;
`;

const focus = css`
    color: blue;
`;

interface Props {
    inFocus: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export class Button extends Component<Props, { count: number }> {
    constructor(props: Props) {
        super(props);

        this.state = {
            count: 0,
        };
    }

    public doSomethingToState() {
        const currentCount = this.state.count;

        this.setState({
            count: currentCount + 1,
        });
    }

    public render() {
        const { inFocus, onMouseEnter, onMouseLeave } = this.props;
        return (
            <button
                className={cx(button, {
                    [focus]: inFocus,
                })}
                onClick={this.handleClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <Span count={this.state.count} />
            </button>
        );
    }

    public handleClick: () => void = () => {
        const currentCount = this.state.count;
        this.setState({
            count: currentCount + 1,
        });
    };
}
