import { css } from '@emotion/react';

import { until } from '@guardian/src-foundations/mq';
import { body } from '@guardian/src-foundations/typography';

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
