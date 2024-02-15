import { css, keyframes } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { palette as schemedPalette } from '../../palette';
import { Column } from './Column';
import { Row } from './Row';

const BACKGROUND_COLOUR = schemedPalette('--discussion-loading-background');

const shimmer = keyframes`
  0% {
    background-position: -1500px 0;
  }
  100% {
    background-position: 1500px 0;
  }
`;

const shimmerStyles = css`
	animation: ${shimmer} 2s infinite linear;
	background: linear-gradient(
		to right,
		${BACKGROUND_COLOUR} 4%,
		${schemedPalette('--discussion-loading-shimmer')} 25%,
		${BACKGROUND_COLOUR} 36%
	);
	background-size: 1500px 100%;
`;

const containerStyles = css`
	border-bottom: 1px solid ${schemedPalette('--discussion-border')};
	width: 620px;
	display: flex;
	padding: ${space[2]}px 0;
`;

const avatarStyles = (size: number) => css`
	border-radius: ${size + 10}px;
	width: ${size}px;
	height: ${size}px;
	background-color: ${BACKGROUND_COLOUR};
	margin-right: ${space[2]}px;

	${shimmerStyles}
`;

const Grey = ({
	height,
	width,
	spaceBelow,
	spaceLeft,
}: {
	height: number;
	width?: number;
	spaceBelow?: 1 | 2 | 3 | 4 | 5 | 6 | 9;
	spaceLeft?: 1 | 2 | 3 | 4 | 5 | 6 | 9;
}) => (
	<div
		css={css`
			height: ${height}px;
			width: ${width !== undefined && width !== 0 && !isNaN(width)
				? `${width}px`
				: '100%'};
			margin-bottom: ${spaceBelow && space[spaceBelow]}px;
			margin-left: ${spaceLeft && space[spaceLeft]}px;
			background-color: ${BACKGROUND_COLOUR};

			${shimmerStyles}
		`}
	/>
);

export const LoadingComments = () => (
	<div css={containerStyles} data-testid="loading-comments">
		<div css={avatarStyles(48)} />
		<Column>
			<Row>
				<Grey height={20} width={140} spaceBelow={9} />
				<Grey height={15} width={100} spaceBelow={9} spaceLeft={2} />
			</Row>
			<Grey height={20} spaceBelow={1} />
			<Grey height={20} spaceBelow={1} />
			<Grey height={20} width={200} spaceBelow={5} />

			<Row>
				<Grey height={15} width={40} />
				<Grey height={15} width={40} spaceLeft={6} />
			</Row>
		</Column>
	</div>
);
