/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/components/CustomArticleCountCopy.tsx
 */
import { css } from '@emotion/react';
import { from, headline, space } from '@guardian/source/foundations';
import type { BannerTemplateSettings } from '../settings';
import { DesignableBannerArticleCountOptOut } from './DesignableBannerArticleCountOptOut';

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
	settings: BannerTemplateSettings;
}

export function CustomArticleCountCopy({
	copy,
	numArticles,
	settings,
}: CustomArticleCountProps): JSX.Element {
	/**
	 * E.g. the string:
	 *   "You’ve read %%ARTICLE_COUNT%% articles in the last few weeks."
	 * needs to be split into:
	 * - "You’ve read"
	 * - "articles"
	 * - "in the last few weeks."
	 */
	const [copyHead, copyTail] = copy.split('%%ARTICLE_COUNT%%');
	const [nextWord, ...rest] = (copyTail ?? '').trim().split(' ');

	return (
		<p css={styles.container}>
			{copyHead}{' '}
			<DesignableBannerArticleCountOptOut
				numArticles={numArticles}
				nextWord={` ${nextWord}`}
				settings={settings}
			/>{' '}
			{rest.join(' ')}
		</p>
	);
}
