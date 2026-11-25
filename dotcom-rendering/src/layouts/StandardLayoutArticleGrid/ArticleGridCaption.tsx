import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
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
	const { captionText, hasPageSkin, isImmersivePortrait, layoutType } =
		layout;
	const caption = (
		<Caption
			captionText={captionText}
			format={format}
			shouldLimitWidth={false}
			isLeftCol={true}
			isMainMedia={true}
			showIconBelowLeftCol={true}
		/>
	);

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
			{isImmersivePortrait ? (
				caption
			) : (
				<Hide from="leftCol">{caption}</Hide>
			)}
		</GridItem>
	);
};
