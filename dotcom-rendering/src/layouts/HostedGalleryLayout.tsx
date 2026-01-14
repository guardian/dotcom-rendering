import { css } from '@emotion/react';
import { grid } from '../grid';
import type { RenderingTarget } from '../types/renderingTarget';
import type { HostedContent } from '../types/hostedContent';

interface Props {
	hostedContent: HostedContent;
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
					<article css={[grid.column.all]}>
						<div css={border}>Gallery</div>
						<div css={border}>Onward</div>
					</article>
				</div>
				<div css={[grid.container, border]}>
					<div css={[grid.column.all]}>Footer</div>
				</div>
			</main>
		</>
	);
};
