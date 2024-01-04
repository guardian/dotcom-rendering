import { css } from '@emotion/react';
import {
	space,
	palette as srcPalette,
	textSans,
} from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';

type Props = {
	captionText?: string;
	format: ArticleFormat;
	credit?: string;
	displayCredit?: boolean;
};

export const LightboxCaption = ({
	captionText,
	format,
	credit,
	displayCredit,
}: Props) => {
	const palette = decidePalette(format);

	return (
		<figcaption
			css={css`
				${textSans.xsmall()};
				line-height: 135%;
				overflow-wrap: break-all;
				padding-top: ${space[2]}px;
				padding-bottom: ${space[2]}px;
				border-top: 3px solid ${palette.background.lightboxDivider};
			`}
		>
			{!!captionText && (
				<span
					css={[
						css`
							color: ${srcPalette.neutral[97]};
							a {
								color: inherit;
							}
							strong {
								font-weight: bold;
							}
						`,
					]}
					dangerouslySetInnerHTML={{
						__html: captionText || '',
					}}
					key="caption"
				/>
			)}
			{!!credit && displayCredit && (
				<div
					css={css`
						color: ${srcPalette.neutral[60]};
					`}
				>
					{credit}
				</div>
			)}
		</figcaption>
	);
};
