import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { AffiliateDisclaimer } from '../../components/AffiliateProducts/AffiliateDisclaimer';
import { Standfirst } from '../../components/Standfirst';
import type { ArticleFormat } from '../../lib/articleFormat';
import type { ArticleDeprecated } from '../../types/article';
import type { ArticleGridLayout } from './deriveArticleGridLayout';
import { GridItem } from './GridItem';
import { topHatFurnitureBackgroundStyles } from './sharedStandardLayoutArticleGridStyles';

export const ArticleGridStandfirst = ({
	article,
	format,
	layout,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
	layout: ArticleGridLayout;
}) => {
	const {
		hasPageSkin,
		hasImmersiveAffiliateDisclaimer,
		isImmersive,
		isImmersiveLandscape,
		isInteractiveTopHat,
		layoutType,
	} = layout;

	return (
		<GridItem
			area="standfirst"
			layoutType={layoutType}
			format={format}
			hasPageSkin={hasPageSkin}
			css={[
				isImmersive &&
					css`
						${until.tablet} {
							padding-top: ${hasImmersiveAffiliateDisclaimer
								? space[3]
								: space[2]}px;
						}
					`,
				isImmersiveLandscape &&
					css`
						${from.desktop} {
							padding-top: ${hasImmersiveAffiliateDisclaimer
								? space[3]
								: space[8]}px;
						}

						${from.leftCol} {
							padding-bottom: 14px;
						}
					`,
				isInteractiveTopHat && topHatFurnitureBackgroundStyles,
			]}
		>
			{hasImmersiveAffiliateDisclaimer && (
				<AffiliateDisclaimer
					cssOverrides={css`
						margin: 0 0 ${space[2]}px;
					`}
				/>
			)}
			<Standfirst
				format={format}
				standfirst={article.standfirst}
				layoutType={layoutType}
			/>
		</GridItem>
	);
};
