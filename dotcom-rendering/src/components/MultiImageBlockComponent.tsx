import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source-foundations';
import type { Switches } from '../types/config';
import type { ImageBlockElement } from '../types/content';
import { Caption } from './Caption';
import { GridItem } from './GridItem';
import { ImageComponent } from './ImageComponent';

type Props = {
	images: ImageBlockElement[];
	format: ArticleFormat;
	caption?: string;
	switches?: Switches;
};

const ieFallback = css`
	display: flex;
	flex-direction: column;
	${until.leftCol} {
		margin-left: 0px;
	}
	${from.leftCol} {
		margin-left: 151px;
	}
	${from.wide} {
		margin-left: 230px;
	}
`;

const wrapper = css`
	margin-top: 12px;
	margin-bottom: 12px;
	img {
		object-fit: cover;
		width: 100%;
	}
`;

const SideBySideGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			${ieFallback}
			@supports (display: grid) {
				margin-left: 0;
				margin-right: ${space[3]}px;
				display: grid;
				grid-gap: ${space[3]}px;
				grid-template-columns:
					50% /* Left column */
					50%; /* Right column */
				grid-template-areas: 'first second';
			}
		`}
	>
		{children}
	</div>
);

const OneAboveTwoGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			${ieFallback}
			@supports (display: grid) {
				margin-left: 0;
				margin-right: ${space[3]}px;
				display: grid;
				grid-gap: ${space[3]}px;
				grid-template-columns:
					50% /* Left column */
					50%; /* Right column */
				grid-template-areas:
					'first first'
					'second third';
			}
		`}
	>
		{children}
	</div>
);

const GridOfFour = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			${ieFallback}
			@supports (display: grid) {
				margin-left: 0;
				margin-right: ${space[3]}px;
				display: grid;
				grid-gap: ${space[3]}px;
				grid-template-columns:
					50% /* Left column */
					50%; /* Right column */
				grid-template-areas:
					'first second'
					'third forth';
			}
		`}
	>
		{children}
	</div>
);

const OneImage = ({
	images,
	format,
	caption,
	switches,
}: {
	images: [ImageBlockElement];
	format: ArticleFormat;
	caption?: string;
	switches?: Switches;
}) => (
	<div css={wrapper}>
		<ImageComponent
			format={format}
			element={images[0]}
			hideCaption={true}
			role={images[0].role}
			switches={switches}
		/>
		{!!caption && (
			<Caption
				format={format}
				captionText={caption}
				shouldLimitWidth={false}
			/>
		)}
	</div>
);

const TwoImage = ({
	images,
	format,
	caption,
	switches,
}: {
	images: [ImageBlockElement, ImageBlockElement];
	format: ArticleFormat;
	caption?: string;
	switches?: Switches;
}) => (
	<div css={wrapper}>
		<SideBySideGrid>
			<GridItem area="first">
				<ImageComponent
					element={images[0]}
					format={format}
					hideCaption={true}
					role={images[0].role}
					switches={switches}
				/>
			</GridItem>
			<GridItem area="second">
				<ImageComponent
					element={images[1]}
					format={format}
					hideCaption={true}
					role={images[1].role}
					switches={switches}
				/>
			</GridItem>
		</SideBySideGrid>
		{!!caption && (
			<Caption
				captionText={caption}
				format={format}
				shouldLimitWidth={false}
			/>
		)}
	</div>
);

const ThreeImage = ({
	images,
	format,
	caption,
	switches,
}: {
	images: [ImageBlockElement, ImageBlockElement, ImageBlockElement];
	format: ArticleFormat;
	caption?: string;
	switches?: Switches;
}) => (
	<div css={wrapper}>
		<OneAboveTwoGrid>
			<GridItem area="first">
				<ImageComponent
					element={images[0]}
					format={format}
					hideCaption={true}
					role={images[0].role}
					switches={switches}
				/>
			</GridItem>
			<GridItem area="second">
				<ImageComponent
					element={images[1]}
					format={format}
					hideCaption={true}
					role={images[1].role}
					switches={switches}
				/>
			</GridItem>
			<GridItem area="third">
				<ImageComponent
					element={images[2]}
					format={format}
					hideCaption={true}
					role={images[2].role}
					switches={switches}
				/>
			</GridItem>
		</OneAboveTwoGrid>
		{!!caption && (
			<Caption
				captionText={caption}
				format={format}
				shouldLimitWidth={false}
			/>
		)}
	</div>
);

const FourImage = ({
	images,
	format,
	caption,
	switches,
}: {
	images: [
		ImageBlockElement,
		ImageBlockElement,
		ImageBlockElement,
		ImageBlockElement,
	];
	format: ArticleFormat;
	caption?: string;
	switches?: Switches;
}) => (
	<div css={wrapper}>
		<GridOfFour>
			<GridItem area="first">
				<ImageComponent
					element={images[0]}
					format={format}
					hideCaption={true}
					role={images[0].role}
					switches={switches}
				/>
			</GridItem>
			<GridItem area="second">
				<ImageComponent
					element={images[1]}
					format={format}
					hideCaption={true}
					role={images[1].role}
					switches={switches}
				/>
			</GridItem>
			<GridItem area="third">
				<ImageComponent
					element={images[2]}
					format={format}
					hideCaption={true}
					role={images[2].role}
					switches={switches}
				/>
			</GridItem>
			<GridItem area="forth">
				<ImageComponent
					element={images[3]}
					format={format}
					hideCaption={true}
					role={images[3].role}
					switches={switches}
				/>
			</GridItem>
		</GridOfFour>
		{!!caption && (
			<Caption
				captionText={caption}
				format={format}
				shouldLimitWidth={false}
			/>
		)}
	</div>
);

export const MultiImageBlockComponent = ({
	images,
	format,
	caption,
	switches,
}: Props) => {
	const [one, two, three, four] = images;

	if (one && two && three && four) {
		return (
			<FourImage
				images={[one, two, three, four]}
				format={format}
				caption={caption}
				switches={switches}
			/>
		);
	}

	if (one && two && three) {
		return (
			<ThreeImage
				images={[one, two, three]}
				format={format}
				caption={caption}
				switches={switches}
			/>
		);
	}

	if (one && two) {
		return (
			<TwoImage
				images={[one, two]}
				format={format}
				caption={caption}
				switches={switches}
			/>
		);
	}

	if (one) {
		return (
			<OneImage
				images={[one]}
				format={format}
				caption={caption}
				switches={switches}
			/>
		);
	}

	return null;
};
