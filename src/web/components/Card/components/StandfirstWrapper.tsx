import React from 'react';
import { css } from 'emotion';

import { until } from '@guardian/src-foundations/mq';
import { body } from '@guardian/src-foundations/typography';

type Props = {
	children: string;
};

export const StandfirstWrapper = ({ children }: Props) => (
	<div
		className={css`
			display: flex;
			flex-direction: column;

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
