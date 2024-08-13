import React from 'react';
import { css } from '@emotion/react';
import { from, headline } from '@guardian/source/foundations';
import { DesignableBannerArticleCountOptOut } from './DesignableBannerArticleCountOptOut';
import { BannerTemplateSettings } from '../settings';
import { CustomArticleCountCopy } from './CustomArticleCountCopy';

export const containsArticleCountTemplate = (copy: string): boolean =>
	copy.includes('%%ARTICLE_COUNT%%');

// ---- Component ---- //

interface DesignableBannerArticleCountProps {
	numArticles: number;
	settings: BannerTemplateSettings;
	copy?: string;
}
export function DesignableBannerArticleCount({
	copy,
	numArticles,
	settings,
}: DesignableBannerArticleCountProps): JSX.Element {
	if (copy && containsArticleCountTemplate(copy)) {
		// Custom article count message
		return <CustomArticleCountCopy numArticles={numArticles} copy={copy} />;
	} else if (numArticles >= 50) {
		return (
			<div css={styles.container(settings.articleCountTextColour)}>
				Congratulations on being one of our top readers globally –
				you&apos;ve read{' '}
				<DesignableBannerArticleCountOptOut
					numArticles={numArticles}
					nextWord=" articles"
					settings={settings}
				/>{' '}
				in the last year
			</div>
		);
	} else {
		return (
			<div css={styles.container(settings.articleCountTextColour)}>
				You&apos;ve read{' '}
				<DesignableBannerArticleCountOptOut
					numArticles={numArticles}
					nextWord=" articles"
					settings={settings}
				/>{' '}
				in the last year
			</div>
		);
	}
}

// ---- Styles ---- //

const styles = {
	container: (textColor: string = 'inherit') => css`
		margin: 0;
		color: ${textColor};
		${headline.xxxsmall({ fontWeight: 'bold' })};
		font-size: ${15 /
		16}rem; /* root element 16px, headline 15px, allows browser font resize */
		${from.desktop} {
			font-size: ${17 /
			16}rem; /* root element 16px, headline.xxxsmall 17px */
		}
	`,
};
