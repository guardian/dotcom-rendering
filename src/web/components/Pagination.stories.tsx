import React from 'react';
import { css } from 'emotion';

import { Design, Display, Pillar } from '@guardian/types';

import { Pagination } from './Pagination';

export default {
	component: Pagination,
	title: 'Components/Pagination',
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			padding: 20px;
		`}
	>
		{children}
	</div>
);

export const defaultStory = () => {
	return (
		<Container>
			<Pagination
				format={{
					display: Display.Standard,
					design: Design.LiveBlog,
					theme: Pillar.News,
				}}
				currentPage={2}
				totalPages={6}
			/>
		</Container>
	);
};
defaultStory.story = { name: 'default' };
