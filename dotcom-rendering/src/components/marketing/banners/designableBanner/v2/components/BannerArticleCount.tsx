import { css } from '@emotion/react';
import {
	from,
	headlineBold15,
	headlineBold17,
	space,
} from '@guardian/source/foundations';
import { CustomArticleCountCopy } from '../../components/CustomArticleCountCopy';
import { DesignableBannerArticleCountOptOut } from '../../components/DesignableBannerArticleCountOptOut';
import type { BannerData } from '../BannerProps';

const containsArticleCountTemplate = (copy: string): boolean =>
	copy.includes('%%ARTICLE_COUNT%%');

const styles = {
	container: (textColor: string = 'inherit') => css`
		margin: 0;
		margin-bottom: ${space[3]}px;
		color: ${textColor};
		${headlineBold15}
		${from.desktop} {
			${headlineBold17}
		}
	`,
};

export const BannerArticleCount = ({
	bannerData,
}: {
	bannerData: BannerData;
}): JSX.Element | null => {
	if (!bannerData.selectors.showArticleCount) {
		return null;
	}

	const numArticles = bannerData.articleCounts.forTargetedWeeks;
	const copy = bannerData.separateArticleCountSettings?.copy;

	if (copy && containsArticleCountTemplate(copy)) {
		return (
			<CustomArticleCountCopy
				numArticles={numArticles}
				copy={copy}
				settings={bannerData.settings}
			/>
		);
	}

	return (
		<div css={styles.container(bannerData.settings.articleCountTextColour)}>
			{numArticles >= 50
				? "Congratulations on being one of our top readers globally - you've read "
				: "You've read "}
			<DesignableBannerArticleCountOptOut
				numArticles={numArticles}
				nextWord=" articles"
				settings={bannerData.settings}
			/>{' '}
			in the last year
		</div>
	);
};
