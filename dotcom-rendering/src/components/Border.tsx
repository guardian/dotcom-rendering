import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { palette as themePalette } from '../palette';

export const Border = () => (
	<div
		css={css`
			${from.leftCol} {
				border-left: 1px solid ${themePalette('--article-border')};
				height: 100%;
			}
		`}
	/>
);
