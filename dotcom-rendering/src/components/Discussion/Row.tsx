import { css, type SerializedStyles } from '@emotion/react';

type Props = {
	children: React.ReactNode;
	wrap?: boolean;
	cssOverrides?: SerializedStyles | SerializedStyles[];
};

const rowStyles = css`
	display: flex;
	flex-direction: row;
`;

export const Row = ({ children, wrap = false, cssOverrides }: Props) => (
	<div
		css={[rowStyles, cssOverrides]}
		style={{ flexWrap: wrap ? 'wrap' : undefined }}
	>
		{children}
	</div>
);
