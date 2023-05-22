import type { ArticleFormat } from '@guardian/libs';
import type { NavType } from '../../model/extract-nav';
import type { FEArticleType } from '../../types/frontend';
import type { RenderingTarget } from '../../types/renderingTarget';
import { Island } from '../components/Island';
import { RecipeRender } from '../components/RecipeRender.importable';

interface Props {
	article: FEArticleType;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
}

interface WebProps extends Props {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppProps extends Props {
	renderingTarget: 'Apps';
}

function getRecipeId(url: string) {
	switch (url) {
		case 'https://www.theguardian.com/food/2023/may/16/nigel-slater-recipe-for-apricots-with-french-toast':
			return 1;
		case 'https://www.theguardian.com/food/2023/may/15/1-pound-meals-budget-midweek-meal-chickpeas-nancy-birtwhistle-vegan':
			return 2;
		default:
			return 3;
	}
}

export const RecipeLayout = (props: WebProps | AppProps) => {
	const { article, format, renderingTarget } = props;
	console.log(format, renderingTarget);
	const url = article.webURL;

	return (
		<Island>
			<RecipeRender recipeId={getRecipeId(url)} />
		</Island>
	);
};
