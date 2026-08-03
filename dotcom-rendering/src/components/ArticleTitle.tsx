import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { grid } from '../../src/grid';
import type { LayoutType } from '../layouts/lib/articleArrangements';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
} from '../lib/articleFormat';
import type { TagType } from '../types/tag';
import { SeriesSectionLink } from './SeriesSectionLink';

type Props = {
	format: ArticleFormat;
	layoutType?: LayoutType;
	sectionLabel: string;
	tags: TagType[];
	sectionUrl: string;
	guardianBaseURL: string;
	isMatch?: boolean;
};

const sectionStyles = css`
	padding-top: 8px;
	display: flex;
	flex-direction: row;
	${from.leftCol} {
		flex-direction: column;
	}
`;

const immersiveMargins = css`
	max-width: 500px;
	min-width: 200px;
	margin-bottom: 4px;
	${from.tablet} {
		margin-left: -4px;
	}
`;

const legacyImmersiveMargins = css`
	max-width: 400px;
	min-width: 200px;
	margin-bottom: 4px;
	${from.tablet} {
		margin-left: 16px;
	}
	${from.leftCol} {
		margin-left: 25px;
	}
`;

const galleryStyles = css`
	${grid.column.all}

	grid-row: 6/7;
	max-width: 400px;
	min-width: 200px;

	${from.tablet} {
		${grid.between('centre-column-start', 'grid-end')};
		margin-left: -10px;
	}
`;

const immersivePortraitStyles = css`
	${from.desktop} {
		height: 100%;
		justify-content: flex-end;
	}
`;

export const ArticleTitle = ({
	format,
	layoutType,
	tags,
	sectionLabel,
	sectionUrl,
	guardianBaseURL,
	isMatch,
}: Props) => (
	<div
		css={[
			[ArticleDesign.Gallery, ArticleDesign.HostedGallery].includes(
				format.design,
			) && galleryStyles,
			(layoutType === 'immersivePortraitDefault' ||
				layoutType === 'immersivePortraitFeature') &&
				immersivePortraitStyles,
			sectionStyles,
		]}
	>
		<div
			css={
				format.display === ArticleDisplay.Immersive
					? layoutType == null
						? legacyImmersiveMargins
						: immersiveMargins
					: undefined
			}
		>
			<SeriesSectionLink
				format={format}
				layoutType={layoutType}
				tags={tags}
				sectionLabel={sectionLabel}
				sectionUrl={sectionUrl}
				guardianBaseURL={guardianBaseURL}
				isMatch={isMatch}
			/>
		</div>
	</div>
);
