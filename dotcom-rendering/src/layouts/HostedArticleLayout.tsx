import { css } from '@emotion/react';
import { grid } from '../grid';
import type { DCRHostedContent } from '../types/hostedContent';
import type { RenderingTarget } from '../types/renderingTarget';

interface Props {
	renderingTarget: RenderingTarget;
	content: DCRHostedContent;
}

interface WebProps extends Props {
	renderingTarget: 'Web';
}

interface AppProps extends Props {
	renderingTarget: 'Apps';
}

const border = css`
	border: 1px solid black;
`;

export const HostedArticleLayout = (props: WebProps | AppProps) => {
	const {
		content: {
			frontendData: { headline, standfirst },
		},
		renderingTarget,
	} = props;

	return (
		<>
			{renderingTarget === 'Web' ? 'Masthead' : null}
			<main>
				<header css={[grid.container, border]}>
					<div css={[grid.column.all]}>Main media</div>
					<div
						css={[grid.between('centre-column-start', 'grid-end')]}
					>
						{/** @todo Use ArticleHeadline component */}
						{headline}
					</div>
				</header>
				<div css={[grid.container]}>
					<div css={[grid.column.left, 'grid-row: 1']}>
						Left column
					</div>
					<div css={[grid.column.right, 'grid-row: 1']}>
						Onward content
					</div>
					<div css={[border, grid.column.centre, 'grid-row: 1']}>
						{standfirst}
					</div>
					<div css={[border, grid.column.centre]}>Meta</div>
					<article css={[border, grid.column.centre]}>Body</article>
				</div>
				<div css={[grid.container, border]}>
					<div css={[grid.column.all]}>Footer</div>
				</div>
			</main>
		</>
	);
};
