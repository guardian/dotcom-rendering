import { css } from '@emotion/react';
import { palette as sourcePalette } from '@guardian/source/foundations';
import { HostedContentHeader } from '../components/HostedContentHeader';
import { Section } from '../components/Section';
import { grid } from '../grid';
import type { RenderingTarget } from '../types/renderingTarget';
import { Stuck } from './lib/stickiness';

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
			{props.renderingTarget === 'Web' ? (
				<Stuck>
					<Section
						fullWidth={true}
						showSideBorders={false}
						showTopBorder={false}
						shouldCenter={false}
						backgroundColour={sourcePalette.neutral[7]}
						padSides={false}
						element="aside"
					>
						<HostedContentHeader
							accentColor={sourcePalette.brand[400]}
							branding="logo"
						/>
					</Section>
				</Stuck>
			) : null}
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
