import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source-foundations';
import type { ImageBlockElement } from '../../types/content';
import { Platform } from '../../types/platform';
import { Caption } from './Caption';
import { GridItem } from './GridItem';
import { ImageComponent } from './ImageComponent';

type Props = {
	images: ImageBlockElement[];
	format: ArticleFormat;
	caption?: string;
	platform: Platform;
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

export const MultiImageBlockComponent = ({
	images,
	format,
	caption,
	platform,
}: Props) => {
	const imageCount = images.length;

	switch (imageCount) {
		case 1:
			return (
				<div
					css={css`
						margin-top: 12px;
						margin-bottom: 12px;
						img {
							object-fit: cover;
							width: 100%;
						}
					`}
				>
					<ImageComponent
						format={format}
						element={images[0]}
						hideCaption={true}
						role={images[0].role}
						platform={platform}
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
		case 2:
			return (
				<div
					css={css`
						margin-top: 12px;
						margin-bottom: 12px;

						img {
							object-fit: cover;
							width: 100%;
						}
					`}
				>
					<SideBySideGrid>
						<GridItem area="first">
							<ImageComponent
								element={images[0]}
								format={format}
								hideCaption={true}
								role={images[0].role}
								platform={platform}
							/>
						</GridItem>
						<GridItem area="second">
							<ImageComponent
								element={images[1]}
								format={format}
								hideCaption={true}
								role={images[1].role}
								platform={platform}
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
		case 3:
			return (
				<div
					css={css`
						margin-top: 12px;
						margin-bottom: 12px;

						img {
							object-fit: cover;
							width: 100%;
						}
					`}
				>
					<OneAboveTwoGrid>
						<GridItem area="first">
							<ImageComponent
								element={images[0]}
								format={format}
								hideCaption={true}
								role={images[0].role}
								platform={platform}
							/>
						</GridItem>
						<GridItem area="second">
							<ImageComponent
								element={images[1]}
								format={format}
								hideCaption={true}
								role={images[1].role}
								platform={platform}
							/>
						</GridItem>
						<GridItem area="third">
							<ImageComponent
								element={images[2]}
								format={format}
								hideCaption={true}
								role={images[2].role}
								platform={platform}
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
		case 4:
			return (
				<div
					css={css`
						margin-top: 12px;
						margin-bottom: 12px;
						img {
							object-fit: cover;
							width: 100%;
						}
					`}
				>
					<GridOfFour>
						<GridItem area="first">
							<ImageComponent
								element={images[0]}
								format={format}
								hideCaption={true}
								role={images[0].role}
								platform={platform}
							/>
						</GridItem>
						<GridItem area="second">
							<ImageComponent
								element={images[1]}
								format={format}
								hideCaption={true}
								role={images[1].role}
								platform={platform}
							/>
						</GridItem>
						<GridItem area="third">
							<ImageComponent
								element={images[2]}
								format={format}
								hideCaption={true}
								role={images[2].role}
								platform={platform}
							/>
						</GridItem>
						<GridItem area="forth">
							<ImageComponent
								element={images[3]}
								format={format}
								hideCaption={true}
								role={images[3].role}
								platform={platform}
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
		default:
			return null;
	}
};
