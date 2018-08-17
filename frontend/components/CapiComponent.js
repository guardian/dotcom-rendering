// @flow
import { Component } from 'react';
import { connect } from 'unistore/react';

type CapiKey = string;

export const keyRegister: Set<CapiKey> = new Set();

type Props = {
    htmlTag: string,
    className: string,
    capiKey: string,
};

export const CapiComponent = class extends Component<Props> {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {
            htmlTag,
            className,
            capiKey
        } = this.props;

        const ContentComponent = connect('CAPI')(({ CAPI = {} }) => {
            const capiContent = CAPI[capiKey];

            keyRegister.add(capiKey);

            return (
                <>
                    {React.createElement(
                        htmlTag,
                        {
                            className,
                            dangerouslySetInnerHTML: {__html: capiContent}
                        },
                    )}
                </>
            );
        });

        return <ContentComponent />;
    }
}