import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
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

export const ArticleTitle = ({
	format,
	tags,
	sectionLabel,
	sectionUrl,
	guardianBaseURL,
	isMatch,
}: Props) => (
	<div css={[sectionStyles]}>
		<div
			css={[
				format.display === ArticleDisplay.Immersive &&
					format.design !== ArticleDesign.PrintShop &&
					immersiveMargins,
			]}
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
