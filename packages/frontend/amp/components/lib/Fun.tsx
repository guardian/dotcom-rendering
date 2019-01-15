import React from 'react';

export interface FProps<T> {
    initial: T;
    children: React.SFC<{ data: T }>;
}
/**
 * This puts its own setState on the window object.
 * I don't know anyone who would advocate this particularly strongly.
 *
 * But we want to allow a second script loaded on this page to change this state.
 * And more elegant solutions are for after the proof of concept.
 */
export class Fun<T> extends React.Component<FProps<T>, { data: T }> {
    public state = { data: this.props.initial };
    public componentDidMount() {
        window.guardian.update = (x: T) => this.setState(x);
    }
    public render() {
        const data = this.state.data;
        return this.props.children({ data });
    }
}
