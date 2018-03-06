// @flow

import Header from 'components/Header';

const Article = ({ data }) => (
    <>
        <Header data={data} />
        <h1>{data.config.page.headline}</h1>
    </>
);

export default Article;
