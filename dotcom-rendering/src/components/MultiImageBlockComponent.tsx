import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source-foundations';
import type { ImageBlockElement } from '../types/content';
import { Caption } from './Caption';
import { GridItem } from './GridItem';
import { ImageComponent } from './ImageComponent';

type Props = {
	images: ImageBlockElement[];
	format: ArticleFormat;
	caption?: string;
	isInLightboxTest: boolean;
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
	isInLightboxTest,
}: {
	images: [ImageBlockElement];
	format: ArticleFormat;
	caption?: string;
	isInLightboxTest: boolean;
}) => (
	<div css={wrapper}>
		<ImageComponent
			format={format}
			element={images[0]}
			hideCaption={true}
			role={images[0].role}
			isInLightboxTest={isInLightboxTest}
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
	isInLightboxTest,
}: {
	images: [ImageBlockElement, ImageBlockElement];
	format: ArticleFormat;
	caption?: string;
	isInLightboxTest: boolean;
}) => (
	<div css={wrapper}>
		<SideBySideGrid>
			<GridItem area="first">
				<ImageComponent
					element={images[0]}
					format={format}
					hideCaption={true}
					role={images[0].role}
					isInLightboxTest={isInLightboxTest}
				/>
			</GridItem>
			<GridItem area="second">
				<ImageComponent
					element={images[1]}
					format={format}
					hideCaption={true}
					role={images[1].role}
					isInLightboxTest={isInLightboxTest}
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
	isInLightboxTest,
}: {
	images: [ImageBlockElement, ImageBlockElement, ImageBlockElement];
	format: ArticleFormat;
	caption?: string;
	isInLightboxTest: boolean;
}) => (
	<div css={wrapper}>
		<OneAboveTwoGrid>
			<GridItem area="first">
				<ImageComponent
					element={images[0]}
					format={format}
					hideCaption={true}
					role={images[0].role}
					isInLightboxTest={isInLightboxTest}
				/>
			</GridItem>
			<GridItem area="second">
				<ImageComponent
					element={images[1]}
					format={format}
					hideCaption={true}
					role={images[1].role}
					isInLightboxTest={isInLightboxTest}
				/>
			</GridItem>
			<GridItem area="third">
				<ImageComponent
					element={images[2]}
					format={format}
					hideCaption={true}
					role={images[2].role}
					isInLightboxTest={isInLightboxTest}
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
	isInLightboxTest,
}: {
	images: [
		ImageBlockElement,
		ImageBlockElement,
		ImageBlockElement,
		ImageBlockElement,
	];
	format: ArticleFormat;
	caption?: string;
	isInLightboxTest: boolean;
}) => (
	<div css={wrapper}>
		<GridOfFour>
			<GridItem area="first">
				<ImageComponent
					element={images[0]}
					format={format}
					hideCaption={true}
					role={images[0].role}
					isInLightboxTest={isInLightboxTest}
				/>
			</GridItem>
			<GridItem area="second">
				<ImageComponent
					element={images[1]}
					format={format}
					hideCaption={true}
					role={images[1].role}
					isInLightboxTest={isInLightboxTest}
				/>
			</GridItem>
			<GridItem area="third">
				<ImageComponent
					element={images[2]}
					format={format}
					hideCaption={true}
					role={images[2].role}
					isInLightboxTest={isInLightboxTest}
				/>
			</GridItem>
			<GridItem area="forth">
				<ImageComponent
					element={images[3]}
					format={format}
					hideCaption={true}
					role={images[3].role}
					isInLightboxTest={isInLightboxTest}
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
	isInLightboxTest,
}: Props) => {
	const [one, two, three, four] = images;

	if (one && two && three && four) {
		return (
			<FourImage
				images={[one, two, three, four]}
				format={format}
				caption={caption}
				isInLightboxTest={isInLightboxTest}
			/>
		);
	}

	if (one && two && three) {
		return (
			<ThreeImage
				images={[one, two, three]}
				format={format}
				caption={caption}
				isInLightboxTest={isInLightboxTest}
			/>
		);
	}

	if (one && two) {
		return (
			<TwoImage
				images={[one, two]}
				format={format}
				caption={caption}
				isInLightboxTest={isInLightboxTest}
			/>
		);
	}

	if (one) {
		return (
			<OneImage
				images={[one]}
				format={format}
				caption={caption}
				isInLightboxTest={isInLightboxTest}
			/>
		);
	}

	return null;
};
