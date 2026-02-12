import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { CallToActionAtom } from '../components/CallToActionAtom';
import { HostedContentHeader } from '../components/HostedContentHeader';
import { Island } from '../components/Island';
import { Section } from '../components/Section';
import { ShareButton } from '../components/ShareButton.importable';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import type { Article } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { Stuck } from './lib/stickiness';

interface Props {
	content: Article;
	format: ArticleFormat;
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

const metaFlex = css`
	margin-bottom: ${space[3]}px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

export const HostedGalleryLayout = (props: WebProps | AppProps) => {
	const {
		content: {
			frontendData: { pageId, webTitle },
		},
		format,
	} = props;

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
						{props.content.frontendData.headline}
					</div>
				</header>
				<div css={[grid.container]}>
					<article css={[grid.column.all]}>
						<div css={border}>Gallery</div>
						<div css={border}>Onward</div>
					</article>
				</div>
				<div
					css={[
						grid.container,
						border,
						css`
							padding: ${space[2]}px;

							${from.desktop} {
								padding: ${space[4]}px ${space[8]}px;
							}
						`,
					]}
				>
					<div css={[grid.column.all]}>
						<div css={[grid.column.left]}>
							<div data-print-layout="hide" css={metaFlex}>
								{props.renderingTarget === 'Web' && (
									<Island
										priority="feature"
										defer={{ until: 'visible' }}
									>
										<ShareButton
											pageId={pageId}
											webTitle={webTitle}
											format={format}
											context="ArticleMeta"
										/>
									</Island>
								)}
							</div>
						</div>
					</div>
				</div>
			</main>
			<footer
				css={css`
					margin: 0 auto;

					${from.desktop} {
						max-width: 980px;
					}

					${from.leftCol} {
						max-width: 1140px;
					}

					${from.wide} {
						max-width: 1300px;
					}
				`}
			>
				<div
					css={[
						grid.container,
						border,
						css`
							height: 200px;

							${from.tablet} {
								height: 250px;
							}

							${from.desktop} {
								height: 300px;
							}
						`,
					]}
				>
					<div css={[grid.column.all]}>
						<CallToActionAtom
							ctaLinkURL="Link URL"
							ctaBackgroundImage="Image URL"
							ctaText="This is a call to action"
							ctaButtonText="Learn more"
							accentColour={sourcePalette.brand[400]}
						/>
					</div>
				</div>
			</footer>
		</>
	);
};
