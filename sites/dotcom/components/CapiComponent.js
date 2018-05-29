// @flow
import { Component } from 'preact';
import { connect } from 'unistore/preact';

export const keyRegister = new Set();

export const CapiComponent = (MyComponent, capiKey) =>
    class extends Component {
        shouldComponentUpdate() {
            return false;
        }

        render() {
            const ContentComponent = connect('CAPI')(({ CAPI = {} }) => {
                const capiContent = CAPI[capiKey];

                keyRegister.add(capiKey);

                return (
                    <MyComponent
                        {...this.props}
                        data-capi-key={capiKey}
                        dangerouslySetInnerHTML={{
                        __html: capiContent,
                        }}
                    />
                );
            });

            return <ContentComponent />;
        }
    };