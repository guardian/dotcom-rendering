import React from 'react';

export interface ClientComponentProps<T> {
    f: () => Promise<T>;
    children: React.FC<{ data: T | undefined }>;
}

export class AsyncClientComponent<T> extends React.Component<
    ClientComponentProps<T>,
    { data: T | undefined }
> {
    public state = { data: undefined };
    public componentDidMount() {
        this.props.f().then(data => {
            this.setState({ data });
        });
    }
    public render() {
        const data = this.state.data;
        return this.props.children({ data });
    }
}
