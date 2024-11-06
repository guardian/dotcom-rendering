import { EditionsCrossword } from '../components/EditionsCrossword.importable';
import { Island } from '../components/Island';
import type { Article } from '../types/article';

interface Props {
	article: Article;
}

export const EditionsCrosswordLayout = ({ article }: Props) => {
	const { crossword } = article.frontendData;
	if (
		!crossword?.id ||
		!crossword.number ||
		!crossword.name ||
		!crossword.date ||
		crossword.webPublicationDate == null ||
		!crossword.solutionAvailable ||
		crossword.dateSolutionAvailable == null ||
		!crossword.pdf
	) {
		console.error('Crossword data is missing or incomplete:', crossword);
		return null;
	}
	return (
		<main data-layout="EditionsCrosswordLayout">
			<Island priority="critical">
				<EditionsCrossword
					data={{
						id: crossword.id,
						number: crossword.number,
						name: crossword.name,
						date: crossword.date,
						webPublicationDate: crossword.webPublicationDate,
						entries: crossword.entries,
						solutionAvailable: crossword.solutionAvailable,
						dateSolutionAvailable: crossword.dateSolutionAvailable,
						dimensions: crossword.dimensions,
						crosswordType: crossword.crosswordType,
						pdf: crossword.pdf,
					}}
				/>
			</Island>
		</main>
	);
};
