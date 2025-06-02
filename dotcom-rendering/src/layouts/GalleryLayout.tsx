import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { MainMediaGallery } from '../components/MainMediaGallery';
import { Masthead } from '../components/Masthead/Masthead';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import type { NavType } from '../model/extract-nav';
import type { Gallery } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';

interface Props {
	gallery: Gallery;
	renderingTarget: RenderingTarget;
	format: ArticleFormat;
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

export const GalleryLayout = (props: WebProps | AppProps) => {
	const gallery = props.gallery;
	const frontendData = gallery.frontendData;

	const format: ArticleFormat = {
		design: gallery.design,
		display: gallery.display,
		theme: gallery.theme,
	};

	return (
		<>
			{props.renderingTarget === 'Web' && (
				<Masthead
					nav={props.NAV}
					editionId={frontendData.editionId}
					idUrl={frontendData.config.idUrl}
					mmaUrl={frontendData.config.mmaUrl}
					discussionApiUrl={frontendData.config.discussionApiUrl}
					idApiUrl={frontendData.config.idApiUrl}
					contributionsServiceUrl={
						frontendData.contributionsServiceUrl
					}
					showSubNav={false}
					showSlimNav={true}
					hasPageSkin={false}
					hasPageSkinContentSelfConstrain={false}
					pageId={frontendData.pageId}
				/>
			)}
			<main>
				<div css={border}>Labs header</div>
				<header css={[grid.container]}>
					<MainMediaGallery
						mainMedia={props.gallery.mainMedia}
						format={props.format}
					/>
					<ArticleHeadline
						format={props.format}
						headlineString={props.gallery.frontendData.headline}
						tags={props.gallery.frontendData.tags}
						byline={props.gallery.frontendData.byline}
						webPublicationDateDeprecated={
							props.gallery.frontendData
								.webPublicationDateDeprecated
						}
					/>
					<div
						css={[
							border,
							grid.between('centre-column-start', 'grid-end'),
						]}
					>
						Standfirst
					</div>
					<div
						css={[
							border,
							css`
								${grid.column.centre}
								${from.leftCol} {
									${grid.column.left}
								}
							`,
						]}
					>
						Main media caption
					</div>
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
};
