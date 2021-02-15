import { css } from '@emotion/react';

import { space } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';

import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';
import { Caption } from '@frontend/web/components/Caption';
import { GridItem } from '@root/src/web/components/GridItem';

type Props = {
	images: ImageBlockElement[];
	format: Format;
	palette: Palette;
	caption?: string;
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
	palette,
	caption,
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
						palette={palette}
						format={format}
						element={images[0]}
						hideCaption={true}
						role={images[0].role}
					/>
					{caption && (
						<Caption
							palette={palette}
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
								palette={palette}
								element={images[0]}
								format={format}
								hideCaption={true}
								role={images[0].role}
							/>
						</GridItem>
						<GridItem area="second">
							<ImageComponent
								palette={palette}
								element={images[1]}
								format={format}
								hideCaption={true}
								role={images[1].role}
							/>
						</GridItem>
					</SideBySideGrid>
					{caption && (
						<Caption
							palette={palette}
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
								palette={palette}
								element={images[0]}
								format={format}
								hideCaption={true}
								role={images[0].role}
							/>
						</GridItem>
						<GridItem area="second">
							<ImageComponent
								palette={palette}
								element={images[1]}
								format={format}
								hideCaption={true}
								role={images[1].role}
							/>
						</GridItem>
						<GridItem area="third">
							<ImageComponent
								palette={palette}
								element={images[2]}
								format={format}
								hideCaption={true}
								role={images[2].role}
							/>
						</GridItem>
					</OneAboveTwoGrid>
					{caption && (
						<Caption
							palette={palette}
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
								palette={palette}
								element={images[0]}
								format={format}
								hideCaption={true}
								role={images[0].role}
							/>
						</GridItem>
						<GridItem area="second">
							<ImageComponent
								palette={palette}
								element={images[1]}
								format={format}
								hideCaption={true}
								role={images[1].role}
							/>
						</GridItem>
						<GridItem area="third">
							<ImageComponent
								palette={palette}
								element={images[2]}
								format={format}
								hideCaption={true}
								role={images[2].role}
							/>
						</GridItem>
						<GridItem area="forth">
							<ImageComponent
								palette={palette}
								element={images[3]}
								format={format}
								hideCaption={true}
								role={images[3].role}
							/>
						</GridItem>
					</GridOfFour>
					{caption && (
						<Caption
							palette={palette}
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
