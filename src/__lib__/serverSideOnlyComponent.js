// @flow
import { Component } from 'preact';
import { connect } from 'unistore/preact';

const contentReferences = [];

const serverSideOnlyComponent = (MyComponent, contentReference) =>
    class extends Component {
        constructor(props) {
            super(props);

            this.selector = `data-content-${contentReference}`;
            this.props[this.selector] = true;

            if (!contentReferences.includes(contentReference)) {
                contentReferences.push(contentReference);
            }
        }

        shouldComponentUpdate() {
            return false;
        }

        getExistingHtml() {
            if (typeof document === 'undefined') {
                return;
            }

            const node = document.querySelector(`[${this.selector}]`);

            return node && node.innerHTML;
        }

        getComponent(html) {
            return (
                <MyComponent
                    {...this.props}
                    dangerouslySetInnerHTML={{
                        __html: html,
                    }}
                />
            );
        }

        render() {
            const html = this.getExistingHtml();

            if (html) {
                return this.getComponent(html);
            }

            const ContentComponent = connect('content')(({ content }) =>
                this.getComponent(content[contentReference]),
            );

            return <ContentComponent />;
        }
    };

export { contentReferences, serverSideOnlyComponent };
