import { css } from '@emotion/react';

import { until , body } from '@guardian/source-foundations';

type Props = {
	children: string;
	palette: Palette;
};

export const StandfirstWrapper = ({ children, palette }: Props) => (
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
