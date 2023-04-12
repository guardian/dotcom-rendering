import type { ArticleFormat } from '@guardian/libs';
import type { NavType } from '../../model/extract-nav';
import type { FEArticleType } from '../../types/frontend';
import { StandardLayout } from '../../web/layouts/StandardLayout';

type Props = {
	article: FEArticleType;
	NAV: NavType;
	format: ArticleFormat;
};

export const DecideLayout = ({ article, NAV, format }: Props) => {
	// TODO we can probably better express this as data

	return (
		<StandardLayout
			article={article}
			NAV={NAV}
			format={format}
			renderingTarget="Apps"
		/>
	);
};
