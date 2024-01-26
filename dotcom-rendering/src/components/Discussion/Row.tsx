import { css, type SerializedStyles } from '@emotion/react';

type Props = {
	children: React.ReactNode;
	cssOverrides?: SerializedStyles | SerializedStyles[];
};

const rowStyles = css`
	display: flex;
	flex-direction: row;
`;

export const Row = ({ children, cssOverrides }: Props) => (
	<div css={[rowStyles, cssOverrides]}>{children}</div>
);
