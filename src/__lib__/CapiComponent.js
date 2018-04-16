// @flow
import { Component } from 'preact';
import { connect } from 'unistore/preact';

const getExistingHtml = id => {
    if (typeof document === 'undefined') {
        return;
    }

    const node = document.getElementById(id);

    return node && node.innerHTML;
};

const componentRegister = {};

export const registeredCapiKeys = new Set();

export const CapiComponent = (MyComponent, capiKey) => {
    registeredCapiKeys.add(capiKey);

    return class extends Component {
        shouldComponentUpdate() {
            return false;
        }

        render() {
            const ContentComponent = connect('content')(({ content }) => {
                const iterator =
                    typeof componentRegister[capiKey] !== 'undefined'
                        ? componentRegister[capiKey] + 1
                        : 0;
                const identifier = `capi-content-${capiKey}-${iterator}`;
                const capiContent =
                    content[capiKey] || getExistingHtml(identifier);

                componentRegister[capiKey] = iterator;

                return (
                    <MyComponent
                        {...this.props}
                        id={identifier}
                        dangerouslySetInnerHTML={{
                            __html: capiContent,
                        }}
                    />
                );
            });

            return <ContentComponent />;
        }
    };
};
