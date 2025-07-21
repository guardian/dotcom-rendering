import { css } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import { grid } from '../../src/grid';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
} from '../lib/articleFormat';
import type { TagType } from '../types/tag';
import { SeriesSectionLink } from './SeriesSectionLink';

type Props = {
	format: ArticleFormat;
	tags: TagType[];
	sectionLabel: string;
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
	max-width: 400px;
	min-width: 200px;
	margin-bottom: 4px;
	/*
        Make sure we vertically align the title font with the body font
    */
	${from.tablet} {
		margin-left: 16px;
	}
	${from.leftCol} {
		margin-left: 25px;
	}
`;

const galleryStyles = css`
	${grid.between('centre-column-start', 'grid-end')};
	grid-row: 6/7;
	max-width: 400px;
	min-width: 200px;

	${until.tablet} {
		${grid.column.all}
	}
`;

export const ArticleTitle = ({
	format,
	tags,
	sectionLabel,
	sectionUrl,
	guardianBaseURL,
	isMatch,
}: Props) => (
	<div
		css={[
			format.design === ArticleDesign.Gallery && galleryStyles,
			sectionStyles,
		]}
	>
		<div
			css={
				format.display === ArticleDisplay.Immersive
					? immersiveMargins
					: undefined
			}
		>
			<SeriesSectionLink
				format={format}
				tags={tags}
				sectionLabel={sectionLabel}
				sectionUrl={sectionUrl}
				guardianBaseURL={guardianBaseURL}
				isMatch={isMatch}
			/>
		</div>
	</div>
);
