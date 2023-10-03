import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source-foundations';
import { getSourceImageUrl } from '../../lib/getSourceImageUrl_temp_fix';
import type { RoleType } from '../../types/content';
import type { ImageWidthType } from '../Picture';
import { generateSources, getFallbackSource, Sources } from '../Picture';

type Props = {
	image: string;
	role: RoleType;
	alt: string;
	height: number;
	width: number;
	isMainMedia?: boolean;
};

const decideImageWidths = (
	role: RoleType,
	isMainMedia: boolean,
): [ImageWidthType, ...ImageWidthType[]] => {
	switch (role) {
		case 'inline':
			return [
				{
					breakpoint: breakpoints.phablet,
					width: 620,
				},
			];
		case 'halfWidth':
			return [
				{
					breakpoint: breakpoints.phablet,
					width: 300,
				},
			];
		case 'thumbnail':
			// TODO: This should always be 140px regardless of display size
			return [
				{
					breakpoint: breakpoints.mobile,
					width: 140,
				},
			];
		case 'immersive':
			// Immersive MainMedia elements fill the height of the viewport, meaning
			// on mobile devices even though the viewport width is small, we'll need
			// a larger image to maintain quality. To solve this problem we're using
			// the viewport height (vh) to calculate width. The value of 167vh
			// relates to an assumed image ratio of 5:3 which is equal to
			// 167 (viewport height)  : 100 (viewport width).

			// Immersive body images stretch the full viewport width below wide,
			// but do not stretch beyond 1300px after that.
			return isMainMedia
				? [
						// TODO: Above logic. Not easy with generateSources, may need to refactor how <Sources /> works
						{
							breakpoint: breakpoints.wide,
							width: 1300,
						},
				  ]
				: [
						{
							breakpoint: breakpoints.wide,
							width: 1300,
						},
				  ];
		case 'supporting':
			return [
				{
					breakpoint: breakpoints.wide,
					width: 380,
				},
			];
		case 'showcase':
			return isMainMedia
				? [
						{ breakpoint: breakpoints.wide, width: 1020 },
						{ breakpoint: breakpoints.leftCol, width: 940 },
						{ breakpoint: breakpoints.tablet, width: 700 },
						{ breakpoint: breakpoints.phablet, width: 660 },
				  ]
				: [
						{ breakpoint: breakpoints.wide, width: 860 },
						{ breakpoint: breakpoints.leftCol, width: 780 },
						{ breakpoint: breakpoints.tablet, width: 620 },
				  ];
	}
};

export const YoutubeAtomPicture = ({
	image,
	role,
	alt,
	height,
	width,
	isMainMedia = false,
}: Props) => {
	const sources = generateSources(
		getSourceImageUrl(image),
		decideImageWidths(role, isMainMedia),
	);
	const fallbackSource = getFallbackSource(sources);

	return (
		<picture itemProp="contentUrl">
			<Sources sources={sources} />

			<img
				alt={alt}
				src={fallbackSource.lowResUrl}
				height={height}
				width={width}
				// https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom
				// why did we add the css `vertical-align: middle;` to the img tag
				css={css`
					vertical-align: middle;
				`}
			/>
		</picture>
	);
};
