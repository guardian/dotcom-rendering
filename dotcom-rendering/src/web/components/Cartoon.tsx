import { css } from '@emotion/react';
import { from, until } from '@guardian/source-foundations';

type ViewportSize = 'small' | 'medium' | 'large';

/**
 * This doesn't exactly map onto CAPI or DCR models, but the exact structure
 * can be adjusted to fit.
 */
type Image = {
	mimeType: 'image/jpeg' | 'image/png' | 'image/svg+xml';
	file: string;
	width: number;
	height: number;
};

/**
 * @todo: we probably want to rename this type; the idea is that a 'variant'
 * is a set of images which corresponds to a 'crop' for a given screen size
 * (e.g. one large image for desktop, or a set of 5 crops for mobile, etc.)
 */
export type Variant = {
	viewportSize: 'small' | 'medium' | 'large';
	images: Image[];
};

export type CartoonType = {
	type: 'cartoon';
	caption: string;
	displayCredit: boolean;
	alt: string;
	credit: string;
	variants: Variant[];
	transcript: string; // HTML
};

type Props = {
	cartoon: CartoonType;
};

/**
 * We'll almost certainly need some CSS to show/hide the right images for a given breakpoint,
 * (i.e. we can't rely on the media queries in a <picture> tag, and we don't want to use js unless
 * it's necessary).
 * The exact implementation is tbc, but the logic sketched in this function is accounting for the
 * possibility that e.g. variants haven't been provided for all of the possible ViewportSizes.
 */
function decideBreakpointStyles(
	viewportSize: ViewportSize,
	viewports: ViewportSize[],
) {
	switch (viewportSize) {
		case 'small':
			if (viewports.includes('medium')) {
				return `
					${from['tablet']} {
						display: none;
					}
				`;
			}
			if (viewports.includes('large')) {
				return `
					${from['desktop']} {
						display: none;
					}
				`;
			} else {
				return '';
			}
		case 'medium':
			return 'TODO';
		case 'large':
			return 'TODO';
	}
}

export const Cartoon = ({ cartoon }: Props) => {
	return (
		<>
			<figure
				/**
				 * Just minimal styling while we explore the data model.
				 */
				css={css`
					display: flex;
					flex-direction: column;
					gap: 12px;
				`}
			>
				<figcaption>{cartoon.caption}</figcaption>
				{cartoon.variants.map((variant) => {
					return variant.images.map((image, index) => (
						<img
							width="400"
							src={image.file}
							alt={`${cartoon.alt}: Part ${index + 1}`}
						/>
					));
				})}
			</figure>
			<div dangerouslySetInnerHTML={{ __html: cartoon.transcript }} />
		</>
	);
};
