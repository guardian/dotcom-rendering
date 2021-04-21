import React from 'react';
import { css } from 'emotion';

import { border } from '@guardian/src-foundations/palette';

type Props = {
	size?: 'full' | 'half';
};
export const DividerBlockComponent = ({ size = 'half' }: Props) => {
	switch (size) {
		case 'full':
			return (
				<hr
					className={css`
						width: 100%;
						height: 1px;
						border: 0;
						margin-left: -10px;
						margin-top: 48px;
						margin-bottom: 3px;
						background-color: ${border.secondary};
					`}
				/>
			);
		case 'half':
		default:
			return (
				<hr
					className={css`
						width: 150px;
						height: 1px;
						border: 0;
						margin-left: -10px;
						margin-top: 48px;
						margin-bottom: 3px;
						background-color: ${border.secondary};
					`}
				/>
			);
	}
};
