import { css } from '@emotion/react';

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { Pagination } from './Pagination';

export default {
	component: Pagination,
	title: 'Components/Pagination',
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			padding: 20px;
		`}
	>
		{children}
	</div>
);

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.News,
};

export const defaultStory = () => {
	return (
		<Container>
			<Pagination currentPage={2} totalPages={6} format={defaultFormat} />
		</Container>
	);
};
defaultStory.story = { name: 'default' };
