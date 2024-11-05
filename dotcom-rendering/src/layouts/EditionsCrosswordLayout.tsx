import { Crossword } from '@guardian/source-development-kitchen/dist/react-components';
import type { Article } from '../types/article';

interface Props {
	article: Article;
}

export const EditionsCrosswordLayout = ({ article }: Props) => {
	console.log(article.frontendData);
	return (
		<main data-layout="EditionsCrosswordLayout">
			<Crossword
				data={{
					crosswordType: 'quick',
					date: '2023-10-01',
					dimensions: { cols: 15, rows: 15 },
					entries: [],
					id: 'example-id',
					number: 1,
					solutionAvailable: false,
					name: 'Example Crossword',
				}}
			/>
			;
			{/* <div>
				{article.frontendData.crossword?.entries.map((entry, index) => (
					<div key={index}>{JSON.stringify(entry)}</div>
				))}
			</div> */}
		</main>
	);
};
