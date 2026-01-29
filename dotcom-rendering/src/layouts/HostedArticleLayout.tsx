import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { HostedContentHeader } from '../components/HostedContentHeader';
import { Island } from '../components/Island';
import { Section } from '../components/Section';
import { ShareButton } from '../components/ShareButton.importable';
import { grid } from '../grid';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import type { HostedContent } from '../types/hostedContent';
import type { RenderingTarget } from '../types/renderingTarget';
import { Stuck } from './lib/stickiness';

interface Props {
	renderingTarget: RenderingTarget;
	content: HostedContent;
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

const shareButtonWrapper = css`
	${grid.column.centre}
	grid-row: 1 / -2;

	${from.leftCol} {
		${grid.column.left}
	}
`;

export const HostedArticleLayout = (props: WebProps | AppProps) => {
	const {
		content: {
			frontendData: { headline, standfirst },
		},
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
						css={[
							grid.column.all,
							css`
								min-height: 200px;
							`,
						]}
					>
						Main media
					</div>
					<div
						css={[grid.between('centre-column-start', 'grid-end')]}
					>
						{/** @todo Use ArticleHeadline component */}
						{headline}
					</div>
				</header>
				<div
					css={[
						grid.container,
						css`
							padding-top: ${space[12]}px;

							${from.leftCol} {
								padding-top: ${space[5]}px;
							}
						`,
					]}
				>
					<div css={shareButtonWrapper}>
						<div data-print-layout="hide" css={metaFlex}>
							{props.renderingTarget === 'Web' && (
								<Island
									priority="feature"
									defer={{ until: 'visible' }}
								>
									<ShareButton
										pageId={'replace with actual pageId'}
										webTitle={
											'replace with actual webTitle'
										}
										format={{
											theme: ArticleSpecial.Labs,
											design: ArticleDesign.Standard,
											display: ArticleDisplay.Standard,
										}} // replace with Hosted Content format if there is one
										context="ArticleMeta"
									/>
								</Island>
							)}
						</div>
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
