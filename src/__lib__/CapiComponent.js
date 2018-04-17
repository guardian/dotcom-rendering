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

export const keyRegister = new Set();

export const CapiComponent = (MyComponent, capiKey) =>
    class extends Component {
        shouldComponentUpdate() {
            return false;
        }

        render() {
            const ContentComponent = connect('content')(({ content }) => {
                const iterator = this.context.capiComponentRegister[capiKey]
                    ? this.context.capiComponentRegister[capiKey] + 1
                    : 1;
                const identifier = `capi-content-${capiKey}-${iterator}`;
                const capiContent =
                    content[capiKey] || getExistingHtml(identifier);

                this.context.capiComponentRegister[capiKey] = iterator;

                /**
                 * on the server keys from previous render contexts will
                 * persist in the keyRegister, we must therefore clean the
                 * keyRegister of keys not used in the current render context
                 */
                keyRegister.forEach(key => {
                    if (!this.context.capiComponentRegister[key]) {
                        keyRegister.delete(key);
                    }
                });
                keyRegister.add(capiKey);

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
