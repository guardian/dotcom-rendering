import React from 'react';
import { css } from 'emotion';

import { space } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';

import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';
import { Caption } from '@frontend/web/components/Caption';
import { GridItem } from '@root/src/web/components/GridItem';
import { Display, Design } from '@guardian/types/Format';

type Props = {
	design: Design;
	images: ImageBlockElement[];
	caption?: string;
	pillar: CAPIPillar;
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

const SideBySideGrid = ({
	children,
}: {
	children: JSX.Element | JSX.Element[];
}) => (
	<div
		className={css`
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

const OneAboveTwoGrid = ({
	children,
}: {
	children: JSX.Element | JSX.Element[];
}) => (
	<div
		className={css`
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

const GridOfFour = ({
	children,
}: {
	children: JSX.Element | JSX.Element[];
}) => (
	<div
		className={css`
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
	design,
	caption,
	images,
	pillar,
}: Props) => {
	const imageCount = images.length;

	switch (imageCount) {
		case 1:
			return (
				<div
					className={css`
						margin-top: 12px;
						margin-bottom: 12px;
						img {
							object-fit: cover;
							width: 100%;
						}
					`}
				>
					<ImageComponent
						display={Display.Standard}
						design={design}
						element={images[0]}
						pillar={pillar}
						hideCaption={true}
						role={images[0].role}
					/>
					{caption && (
						<Caption
							display={Display.Standard}
							design={design}
							captionText={caption}
							pillar={pillar}
							shouldLimitWidth={false}
						/>
					)}
				</div>
			);
		case 2:
			return (
				<div
					className={css`
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
								display={Display.Standard}
								design={Design.Article}
								element={images[0]}
								pillar={pillar}
								hideCaption={true}
								role={images[0].role}
							/>
						</GridItem>
						<GridItem area="second">
							<ImageComponent
								display={Display.Standard}
								design={Design.Article}
								element={images[1]}
								pillar={pillar}
								hideCaption={true}
								role={images[1].role}
							/>
						</GridItem>
					</SideBySideGrid>
					{caption && (
						<Caption
							display={Display.Standard}
							design={design}
							captionText={caption}
							pillar={pillar}
							shouldLimitWidth={false}
						/>
					)}
				</div>
			);
		case 3:
			return (
				<div
					className={css`
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
								display={Display.Standard}
								design={Design.Article}
								element={images[0]}
								pillar={pillar}
								hideCaption={true}
								role={images[0].role}
							/>
						</GridItem>
						<GridItem area="second">
							<ImageComponent
								display={Display.Standard}
								design={Design.Article}
								element={images[1]}
								pillar={pillar}
								hideCaption={true}
								role={images[1].role}
							/>
						</GridItem>
						<GridItem area="third">
							<ImageComponent
								display={Display.Standard}
								design={Design.Article}
								element={images[2]}
								pillar={pillar}
								hideCaption={true}
								role={images[2].role}
							/>
						</GridItem>
					</OneAboveTwoGrid>
					{caption && (
						<Caption
							display={Display.Standard}
							design={design}
							captionText={caption}
							pillar={pillar}
							shouldLimitWidth={false}
						/>
					)}
				</div>
			);
		case 4:
			return (
				<div
					className={css`
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
								display={Display.Standard}
								design={Design.Article}
								element={images[0]}
								pillar={pillar}
								hideCaption={true}
								role={images[0].role}
							/>
						</GridItem>
						<GridItem area="second">
							<ImageComponent
								display={Display.Standard}
								design={Design.Article}
								element={images[1]}
								pillar={pillar}
								hideCaption={true}
								role={images[1].role}
							/>
						</GridItem>
						<GridItem area="third">
							<ImageComponent
								display={Display.Standard}
								design={Design.Article}
								element={images[2]}
								pillar={pillar}
								hideCaption={true}
								role={images[2].role}
							/>
						</GridItem>
						<GridItem area="forth">
							<ImageComponent
								display={Display.Standard}
								design={Design.Article}
								element={images[3]}
								pillar={pillar}
								hideCaption={true}
								role={images[3].role}
							/>
						</GridItem>
					</GridOfFour>
					{caption && (
						<Caption
							display={Display.Standard}
							design={design}
							captionText={caption}
							pillar={pillar}
							shouldLimitWidth={false}
						/>
					)}
				</div>
			);
		default:
			return null;
	}
};
