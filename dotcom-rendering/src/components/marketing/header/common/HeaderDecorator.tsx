/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/4925ef1e0ced5d221f1122afe79f93bd7448e0e5/packages/modules/src/modules/headers/common/HeaderDecorator.tsx
 */
import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import type { Decorator } from '@storybook/react';

const background = css`
	background-color: ${palette.brand[400]};
	padding: 10px;
`;

export const HeaderDecorator: Decorator = (Story) => (
	<div css={background}>
		<Story />
	</div>
);
