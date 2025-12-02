import { css } from '@emotion/react';
import { RenderingTarget } from 'src/types/renderingTarget';
import { grid } from '../grid';

interface Props {
	renderingTarget: RenderingTarget;
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

export const HostedGalleryLayout = (props: WebProps | AppProps) => {
	return (
		<>
			{props.renderingTarget === 'Web' ? 'Masthead' : null}
			<main>
				<header css={[grid.container, border]}>
					<div
						css={[grid.between('centre-column-start', 'grid-end')]}
					>
						Headline
					</div>
				</header>
				<div css={[grid.container]}>
					<article css={[border, grid.column.all]}>Gallery</article>
				</div>
				<div css={[grid.container, border]}>
					<div css={[grid.column.all]}>Footer</div>
				</div>
			</main>
		</>
	);
};
