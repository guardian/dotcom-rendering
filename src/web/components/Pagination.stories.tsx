import { css } from '@emotion/react';

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

export const defaultStory = () => {
	return (
		<Container>
			<Pagination currentPage={2} totalPages={6} />
		</Container>
	);
};
defaultStory.story = { name: 'default' };
