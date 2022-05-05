import { css } from '@emotion/react';

import { until, body } from '@guardian/source-foundations';
import { decidePalette } from '../../../lib/decidePalette';

type Props = {
	children: string | React.ReactNode;
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
};

export const TrailTextWrapper = ({
	children,
	format,
	containerPalette,
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				color: ${palette.text.cardStandfirst};

				${body.small()};
				font-size: 14px;

				padding-left: 5px;
				padding-right: 5px;
				padding-bottom: 6px;

				${until.tablet} {
					display: none;
				}
			`}
		>
			{children}
		</div>
	);
};
