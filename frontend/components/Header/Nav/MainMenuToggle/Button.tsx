import React, { Component } from 'react';
import { Span } from './Span';

interface Props {
    inFocus: boolean;
}

export class Button extends Component<Props, { count: number }> {
    constructor(props: Props) {
        super(props);

        this.state = {
            count: 0,
        };
    }

    public render() {
        return (
            <button onClick={this.handleClick}>
                <Span>Clicked {this.state.count} times</Span>
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
