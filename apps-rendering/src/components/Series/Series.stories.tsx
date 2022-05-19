import { deadBlog } from 'fixtures/live';
import type { ReactElement } from 'react';
import Series from './';

const DeadBlogNews = (): ReactElement => <Series item={{ ...deadBlog }} />;

export default {
	component: Series,
	title: 'AR/Series',
};

export { DeadBlogNews };
