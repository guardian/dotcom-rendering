import { StrictMode } from 'react';
import { EditionsCrosswordLayout } from '../layouts/EditionsCrosswordLayout';
import type { Article } from '../types/article';

interface Props {
	article: Article;
}

export const EditionsCrosswordPage = ({ article }: Props) => {
	return (
		<StrictMode>
			<EditionsCrosswordLayout article={article} />
		</StrictMode>
	);
};
