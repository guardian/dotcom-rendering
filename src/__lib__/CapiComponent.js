// @flow
import { Component } from 'preact';
import { connect } from 'unistore/preact';

const getExistingHtml = identifier => {
    if (typeof document === 'undefined') {
        return;
    }

    const node = document.querySelector(`[${identifier}]`);

    return node && node.innerHTML;
}

const getComponent = (Component, props, html) => (
    <Component
        {...props}
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);

const htmlStore = {};

export const registeredCapiComponents = new Set();

export const CapiComponent = (MyComponent, contentReference) => {
    const identifier = `data-content-${contentReference}`;
    
    registeredCapiComponents.add(contentReference);

    return class extends Component {
        constructor(props) {
            super(props);
            this.props[identifier] = true;
        }

        shouldComponentUpdate() {
            return false;
        }

        render() {
            // return html if we've already looked this up from DOM once
            const storedCapiContent = htmlStore[contentReference];

            if (storedCapiContent) {
                return getComponent(MyComponent, this.props, storedCapiContent);
            }

            const ContentComponent = connect('content')(({ content }) => {
                const capiContent = content[contentReference] || getExistingHtml(identifier);
                
                if (capiContent) {
                    htmlStore[contentReference] = capiContent;
                    return getComponent(MyComponent, this.props, capiContent);
                }
            });

            if (ContentComponent) {
                return <ContentComponent />;
            }

            // if no CAPI data found return original component
            return <MyComponent {...this.props} />;
        }
    };
};
