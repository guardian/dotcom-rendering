import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { Caption } from '../../components/Caption';
import type { ArticleFormat } from '../../lib/articleFormat';
import type { ArticleGridLayout } from './deriveArticleGridLayout';
import { GridItem } from './GridItem';

export const ArticleGridCaption = ({
	format,
	layout,
}: {
	format: ArticleFormat;
	layout: ArticleGridLayout;
}) => {
	const { captionText, hasPageSkin, layoutType } = layout;

	return (
		<GridItem
			area="caption"
			layoutType={layoutType}
			format={format}
			hasPageSkin={hasPageSkin}
			css={css`
				padding-top: ${space[2]}px;
			`}
		>
			<Caption
				captionText={captionText}
				format={format}
				shouldLimitWidth={false}
				isLeftCol={true}
				isMainMedia={true}
				showIconBelowLeftCol={true}
			/>
		</GridItem>
	);
};
