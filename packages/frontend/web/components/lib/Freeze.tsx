import React from 'react';

interface Props {
    children: React.ReactNode;
}

export class Freeze extends React.Component<Props> {
    public render() {
        const { children } = this.props;

        return typeof window === 'undefined' ? (
            <div>{children}</div>
        ) : (
            // tslint:disable-next-line:react-no-dangerous-html
            <div
                dangerouslySetInnerHTML={{
                    __html: '',
                }}
                suppressHydrationWarning={true}
            />
        );
    }
}

export default Freeze;
