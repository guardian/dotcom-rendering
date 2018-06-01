// @flow
import createStore from 'unistore';
import { Provider } from 'unistore/preact';

type Props = {
    data: {},
    Page: React.ComponentType<{}>,
};

export default ({ data, Page }: Props) => (
    <Provider store={createStore(data)}>
        <Page />
    </Provider>
);
