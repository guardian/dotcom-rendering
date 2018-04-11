// @flow
import { Component } from 'preact';

const contentReferences = [];

const serverSideOnlyComponent = (MyComponent, contentReference) =>
    class extends Component {
        constructor(props) {
            super(props);

            if (contentReference) {
                this.props[`data-content-${contentReference}`] = true;

                if (!contentReferences.includes(contentReference)) {
                    contentReferences.push(contentReference);
                }
            }
        }

        shouldComponentUpdate() {
            return false;
        }

        render() {
            return <MyComponent {...this.props} />;
        }
    };

export { contentReferences, serverSideOnlyComponent };
