import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';

type Props = {
	children: React.ReactNode;
	format: ArticleFormat;
};

const containerStyles = css`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
`;

export const Counts = ({ children, format }: Props) => (
	<div css={[containerStyles, format.design === ArticleDesign.LiveBlog]}>
		{children}
	</div>
);
