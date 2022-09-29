import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import type { TableOfContentsItem } from 'src/types/frontend';
import { TableOfContents } from './TableOfContents';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				padding: 20px;
				max-width: 700px;
				${from.tablet} {
					width: 700px;
				}
			`}
		>
			{children}
		</div>
	);
};

export default {
	component: TableOfContents,
	title: 'Components/TableOfContents',
};

export const defaultStory = () => {
	const headline1: TableOfContentsItem = {
		id: 'first-h2-text',
		title: 'First h2 text',
	};
	const headline2: TableOfContentsItem = {
		id: 'second-h2-text',
		title: 'Second h2 text',
	};
	const headline3: TableOfContentsItem = {
		id: 'third-h2-text',
		title: 'Third h2 text',
	};

	const tableItems = [headline1, headline2, headline3];

	return (
		<Wrapper>
			<TableOfContents tableOfContents={tableItems} />
		</Wrapper>
	);
};

defaultStory.story = { name: 'default' };
