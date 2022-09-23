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
	const headline1: TableOfContentsItem = { id: '1234', title: 'Headline1' };
	const headline2: TableOfContentsItem = { id: '1235', title: 'Headline2' };
	const headline3: TableOfContentsItem = { id: '1236', title: 'Headline3' };

	const tableItems = [headline1, headline2, headline3];

	return (
		<Wrapper>
			<TableOfContents tableOfContents={tableItems} />
		</Wrapper>
	);
};

defaultStory.story = { name: 'default' };
