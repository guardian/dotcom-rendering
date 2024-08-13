/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/components/CustomArticleCountCopy.tsx
 */
import { css } from '@emotion/react';
import { from, headline, space } from '@guardian/source/foundations';

const styles = {
	container: css`
		${headline.xxxsmall({ fontWeight: 'bold' })}
		font-size: 15px;
		margin: 0 0 ${space[1]}px;

		${from.tablet} {
			font-size: 17px;
		}
	`,
};

interface CustomArticleCountProps {
	copy: string;
	numArticles: number;
}

export function CustomArticleCountCopy({
	copy,
	numArticles,
}: CustomArticleCountProps): JSX.Element {
	const [copyHead, copyTail] = copy.split('%%ARTICLE_COUNT%%');

	return (
		<p css={styles.container}>
			{copyHead}
			<span>{numArticles}&nbsp;articles</span>
			{copyTail?.substring(1, 9) === 'articles'
				? copyTail.substring(9)
				: copyTail}
		</p>
	);
}
