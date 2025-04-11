/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/lib/replaceArticleCount.tsx
 */
import type { JSX } from 'react';
import type {
	ArticleCountOptOutType,
	OphanTracking,
} from '../shared/ArticleCountOptOutPopup';
import { ArticleCountOptOutPopup } from '../shared/ArticleCountOptOutPopup';

export const replaceArticleCountWithLink = (
	text: string,
	numArticles: number,
	articleCountOptOutType: ArticleCountOptOutType,
	tracking?: OphanTracking,
): Array<JSX.Element> => {
	const nextWords: Array<string | null> = [];
	const subbedText = text.replace(
		/%%ARTICLE_COUNT%%( \w+)?/g,
		(_, nextWord) => {
			nextWords.push(nextWord);
			return '%%ARTICLE_COUNT_AND_NEXT_WORD%%';
		},
	);

	const parts = subbedText.split(/%%ARTICLE_COUNT_AND_NEXT_WORD%%/);
	const elements = [];
	let key = 0;
	for (let i = 0; i < parts.length - 1; i += 1) {
		elements.push(
			<span
				dangerouslySetInnerHTML={{ __html: parts[i] as string }}
				key={key++}
			/>,
		);
		elements.push(
			<ArticleCountOptOutPopup
				numArticles={numArticles}
				nextWord={nextWords[i] as string}
				type={articleCountOptOutType}
				tracking={tracking}
				key={key++}
			/>,
		);
	}
	elements.push(
		<span
			dangerouslySetInnerHTML={{
				__html: parts[parts.length - 1] as string,
			}}
			key={key++}
		/>,
	);

	return elements;
};

export const replaceArticleCount = (
	text: string,
	numArticles: number,
	articleCountOptOutType: ArticleCountOptOutType,
	tracking?: OphanTracking,
	optOutLink = true,
): Array<JSX.Element> | JSX.Element => {
	if (optOutLink) {
		return replaceArticleCountWithLink(
			text,
			numArticles,
			articleCountOptOutType,
			tracking,
		);
	}
	return (
		<span
			dangerouslySetInnerHTML={{
				__html: text.replace(/%%ARTICLE_COUNT%%/, `${numArticles}`),
			}}
		/>
	);
};
