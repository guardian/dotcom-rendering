import { css } from '@emotion/react';
import { grid } from '../grid';
import type { NavType } from '../model/extract-nav';
import type { Gallery } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';

interface Props {
	gallery: Gallery;
	renderingTarget: RenderingTarget;
}

interface WebProps extends Props {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppProps extends Props {
	renderingTarget: 'Apps';
}

const border = css({
	borderWidth: 1,
	borderStyle: 'solid',
});

export const GalleryLayout = (props: WebProps | AppProps) => (
	<>
		{props.renderingTarget === 'Web' ? 'Masthead' : null}
		<main>
			<div css={border}>Labs header</div>
			<header css={[grid.container]}>
				<div css={[grid.column.all, border]}>Main media</div>
				<div
					css={[
						border,
						grid.between('centre-column-start', 'grid-end'),
					]}
				>
					Headline
				</div>
				<div
					css={[
						border,
						grid.between('centre-column-start', 'grid-end'),
					]}
				>
					Standfirst
				</div>
				<div css={[border, grid.column.left]}>Main media caption</div>
				<div
					css={[
						border,
						grid.between('centre-column-start', 'grid-end'),
					]}
				>
					Meta
				</div>
			</header>
			<div css={border}>Body</div>
			<div css={border}>Submeta</div>
		</main>
	</>
);
