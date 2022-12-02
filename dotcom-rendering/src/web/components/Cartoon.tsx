import { css } from '@emotion/react';
import { from, until } from '@guardian/source-foundations';

type ViewportSize = 'small' | 'medium' | 'large';

type Image = {
	mimeType: 'image/jpeg' | 'image/png' | 'image/svg+xml';
	file: string;
	width: number;
	height: number;
};

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

function decideBreakpointStyles(
	viewportSize: ViewportSize,
	viewports: ViewportSize[],
) {
	// const sizeMapping = {
	// 	'small': 0,
	// 	'medium': 1,
	// 	'large': 2,
	// }
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
		<section>
			<figure
				css={css`
					display: flex;
					flex-direction: column;
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
		</section>
	);
};
