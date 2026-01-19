import { css } from '@emotion/react';
import {
	from,
	headlineBold15,
	headlineBold17,
	space,
} from '@guardian/source/foundations';
import { CustomArticleCountCopy } from '../../components/CustomArticleCountCopy';
import { DesignableBannerArticleCountOptOut } from '../../components/DesignableBannerArticleCountOptOut';
import { useBanner } from '../useBanner';

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

export const BannerArticleCount = (): JSX.Element | null => {
	const {
		articleCounts,
		settings,
		separateArticleCountSettings,
		isCollapsed,
	} = useBanner();

	// Don't render article count when banner is collapsed
	if (isCollapsed) {
		return null;
	}

	const numArticles = articleCounts.forTargetedWeeks;
	const copy = separateArticleCountSettings?.copy;

	if (copy && containsArticleCountTemplate(copy)) {
		return (
			<CustomArticleCountCopy
				numArticles={numArticles}
				copy={copy}
				settings={settings}
			/>
		);
	}

	return (
		<div css={styles.container(settings.articleCountTextColour)}>
			{numArticles >= 50
				? "Congratulations on being one of our top readers globally - you've read "
				: "You've read "}
			<DesignableBannerArticleCountOptOut
				numArticles={numArticles}
				nextWord=" articles"
				settings={settings}
			/>{' '}
			in the last year
		</div>
	);
};
