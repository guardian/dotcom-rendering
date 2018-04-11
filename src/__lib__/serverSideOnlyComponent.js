// @flow
import { Component } from 'preact';
import { connect } from 'unistore/preact';

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
            if (contentReference) {
                const ContentComponent = connect('content')(({ content }) => (
                    <MyComponent
                        {...this.props}
                        dangerouslySetInnerHTML={{
                            __html: content[contentReference],
                        }}
                    />
                ));

                return <ContentComponent />;
            }

            return <MyComponent {...this.props} />;
        }
    };

export { contentReferences, serverSideOnlyComponent };
