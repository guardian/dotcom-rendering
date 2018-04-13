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
            const storedHtml = htmlStore[contentReference];

            if (storedHtml) {
                return getComponent(MyComponent, this.props, storedHtml);
            }

            const ContentComponent = connect('content')(({ content }) => {
                const storedContent = content[contentReference];

                // if the content is available in the store use that
                if (storedContent) {
                    return getComponent(MyComponent, this.props, storedContent);
                }

                // if content isn't available in store it must be in the DOM so look it up
                const html = getExistingHtml(identifier);

                if (html) {
                    // store html to save future DOM look ups
                    htmlStore[contentReference] = html;
                    return getComponent(MyComponent, this.props, html);
                }
            });

            return <ContentComponent />;
        }
    };
};
