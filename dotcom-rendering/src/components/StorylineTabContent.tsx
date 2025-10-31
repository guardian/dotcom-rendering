import { DCRGroupedTrails } from 'src/types/front';
import { FlexibleGeneral } from './FlexibleGeneral';
import { FlexibleSpecial } from './FlexibleSpecial';
import { css } from '@emotion/react';
import { palette } from '../palette';
import { Category } from './StorylinesSection.importable';

const categoryTitleCss = css`
	fontsize: 20px;
	fontweight: 700;
	color: #ab0613;
	margin: 4px;
	padding: 8px;
	border-top: 1px solid ${palette('--section-border-primary')};
`;

export const StorylineTabContent = ({ content }: { content: Category[] }) => {
	// key stories - flexible general, megaboosted first standard card
	// other categories - flex gen
	// explainers/multimedia with default
	// opinion with default boost and design 8 (comment)
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
					/>
				);
			case 'flexible/general':
				return (
					<FlexibleGeneral
						groupedTrails={groupedTrails}
						imageLoading={'eager'}
						aspectRatio={'5:4'}
						collectionId={0}
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
				<div key={idx}>
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
