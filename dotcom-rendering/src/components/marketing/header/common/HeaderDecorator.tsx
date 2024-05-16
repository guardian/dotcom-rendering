/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/4925ef1e0ced5d221f1122afe79f93bd7448e0e5/packages/modules/src/modules/headers/common/HeaderDecorator.tsx
 */
import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import type { Decorator } from '@storybook/react';
import { palette as themePalette } from '../../../../palette';

const topBarStyles = css`
	background-color: ${themePalette('--masthead-top-bar-background')};
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 52px;
	box-sizing: border-box;
	padding: 0 10px;

	margin: auto;

	${from.mobileLandscape} {
		padding: 0 ${space[5]}px;
	}

	${from.tablet} {
		height: 60px;
	}

	${from.desktop} {
		height: 64px;
	}
`;

export const HeaderDecorator: Decorator = (Story) => (
	<div css={[topBarStyles]}>
		<Story />
	</div>
);
