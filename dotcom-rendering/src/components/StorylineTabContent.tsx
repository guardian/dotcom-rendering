import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSans20,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import type { DCRGroupedTrails } from '../types/front';
import type { Category } from '../types/tagPageAIContent';
import { FlexibleGeneral } from './FlexibleGeneral';
import { FlexibleSpecial } from './FlexibleSpecial';

const categoryTitleCss = css`
	${textSans20};
	font-weight: 700;
	color: ${sourcePalette.news[300]};
	margin: ${space[2]}px 0;
	padding: ${space[2]}px 0;
	${from.tablet} {
		margin: 10px;
	}

	border-top: 1px solid ${palette('--section-border-secondary')};
`;

const contentCss = css`
	margin-bottom: ${space[4]}px;
	${from.leftCol} {
		border-left: 1px solid ${sourcePalette.neutral[86]};
	}
`;

export const StorylineTabContent = ({ content }: { content: Category[] }) => {
	// key stories - flexible general, megaboosted first standard card - done?
	// other categories - flex gen secondary
	// explainers/multimedia with default
	// opinion with default boost and design 8 (comment) - missing avatar url
	// deep reads/profiles with contents->display->is immersive true
	const DecideContainer = ({
		containerType,
		groupedTrails,
	}: {
		containerType: string;
		groupedTrails: DCRGroupedTrails;
	}) => {
		switch (containerType) {
			case 'flexible/special':
				return (
					<FlexibleSpecial
						groupedTrails={groupedTrails}
						imageLoading={'eager'}
						aspectRatio={'5:4'}
						collectionId={0}
						SCStyle={true}
						containerLevel="Secondary"
					/>
				);
			case 'flexible/general':
				return (
					<FlexibleGeneral
						groupedTrails={groupedTrails}
						imageLoading={'eager'}
						aspectRatio={'5:4'}
						collectionId={0}
						containerLevel="Secondary"
						SCStyle={true}
					/>
				);
			default:
				return (
					<div>
						Container type {containerType} not implemented yet.
					</div>
				);
		}
	};

	return (
		<>
			{content.map((category, idx) => (
				<div key={idx} css={contentCss}>
					{category.title !== 'Key Stories' && (
						<h2 css={categoryTitleCss}>{category.title}</h2>
					)}
					<DecideContainer
						containerType={category.containerType}
						groupedTrails={category.groupedTrails}
					/>
				</div>
			))}
		</>
	);
};
