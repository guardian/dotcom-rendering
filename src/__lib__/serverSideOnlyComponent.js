import { Component } from 'preact';
import { connect } from 'unistore/preact';

const contentReferences = [];

const serverSideOnlyComponent = (MyComponent, contentReference) => class extends Component {
    constructor(props) {
        super(props);

        this.props[`data-content-${contentReference}`] = true;

        if (!contentReferences.includes(contentReference)) {
            contentReferences.push(contentReference);
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        return false;
    }

    render () {
        const Component = connect('content')(({ content }) => (
            <MyComponent 
                {...this.props}
                dangerouslySetInnerHTML={{
                    __html: content[contentReference],
                }}
            />
        ));

        return <Component />;
    }
};

export {
    contentReferences,
    serverSideOnlyComponent
}