// @flow

import { Subscribe } from 'unstated';

import Header from 'components/Header';
import App from 'lib/AppContainer';

const Article = () => (
    <>
        <Header />
        <Subscribe to={[App]}>
            {app => <h1>{app.state.config.page.headline}</h1>}
        </Subscribe>
    </>
);

export default Article;
