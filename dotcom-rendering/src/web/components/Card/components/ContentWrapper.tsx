import { css, SerializedStyles } from '@emotion/react';

import { between, from } from '@guardian/source-foundations';

const sizingStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const flexBasisStyles = ({
	imagePosition,
	imageSize,
}: {
	imagePosition: ImagePositionType;
	imageSize: ImageSizeType;
}): SerializedStyles | null => {
	switch (imagePosition) {
		case 'top':
		case 'bottom':
			// If the image is top or bottom positioned then it takes 100% of the width and
			// we want the content to grow into the remaining vertical space
			return css`
				flex-grow: 1;
			`;
		case 'left':
		case 'right':
			switch (imageSize) {
				case 'small':
					return css`
						flex-basis: 75%;
						${between.tablet.and.desktop} {
							flex-basis: 60%;
						}
						${from.desktop} {
							flex-basis: 67%;
						}
					`;
				case 'medium':
					return css`
						flex-basis: 50%;
					`;
				case 'large':
					return css`
						flex-basis: 34%;
					`;
				case 'jumbo':
					return css`
						flex-basis: 25%;
					`;
			}
		// eslint-disable-next-line no-fallthrough
		case 'none':
			return null;
	}
};

type Props = {
	children: React.ReactNode;
	imageSize?: ImageSizeType;
	imagePosition: ImagePositionType;
};

export const ContentWrapper = ({
	children,
	imageSize = 'small',
	imagePosition,
}: Props) => (
	<div css={[sizingStyles, flexBasisStyles({ imageSize, imagePosition })]}>
		{children}
	</div>
);
