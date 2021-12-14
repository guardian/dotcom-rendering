import { deadBlog } from 'fixtures/live';
import { ReactElement } from 'react';
import Series from './series';

const DeadBlogNews = (): ReactElement => <Series item={{...deadBlog}} />;

export default {
	component: Series,
	title: 'AR/Series',
};

export { DeadBlogNews };
