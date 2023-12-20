import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	brandAlt,
	neutral,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { SvgCamera } from '@guardian/source-react-components';
import type { Option } from '../../../vendor/@guardian/types/index';
import {
	map,
	OptionKind,
	withDefault,
} from '../../../vendor/@guardian/types/index';
import { pipe } from 'lib';
import type { FC, ReactNode } from 'react';
import { articlePaddingStyles } from './styles';

const captionId = 'header-image-caption';

const HeaderImageCaptionStyles = (
	isFullWidthImage: boolean,
	iconBackgroundColor?: string,
): SerializedStyles => css`
	summary {
		display: block;
		pointer-events: auto;
		text-align: center;
		background-color: ${iconBackgroundColor
			? iconBackgroundColor
			: brandAlt[400]};
		width: 34px;
		height: 34px;
		position: absolute;
		bottom: ${remSpace[3]};
		right: ${remSpace[3]};
		border-radius: 100%;
		outline: none;

		&::-webkit-details-marker {
			display: none;
		}
	}

	details[open] {
		min-height: 44px;
		max-height: 999px;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		padding: ${remSpace[3]};
		overflow: hidden;
		padding-right: ${remSpace[12]};
		z-index: 1;
		color: ${neutral[100]};
		${textSans.small()};
		box-sizing: border-box;

		${isFullWidthImage && articlePaddingStyles}
	}
	pointer-events: none;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
`;

const svgStyle = (iconColor?: string): SerializedStyles => css`
	line-height: 32px;
	font-size: 0;
	svg {
		width: 75%;
		height: 75%;
		margin: 12.5%;
	}
	path {
		fill: ${iconColor ? iconColor : neutral[7]};
	}
`;

interface Props {
	caption: Option<DocumentFragment>;
	credit: Option<string>;
	styles?: SerializedStyles;
	iconColor?: string;
	iconBackgroundColor?: string;
	isFullWidthImage: boolean;
}

const toReact = (node: Node, key: number): ReactNode => {
	switch (node.nodeName) {
		case 'EM':
			return <em>{node.textContent}</em>;
		case 'A':
			return <span>{node.textContent}</span>;
		case '#text':
			return node.textContent;
	}
};

const renderText = (caption: DocumentFragment): ReactNode =>
	Array.from(caption.childNodes).map((node, i) => toReact(node, i));

const HeaderImageCaption: FC<Props> = ({
	caption,
	credit,
	styles,
	iconColor,
	iconBackgroundColor,
	isFullWidthImage,
}: Props) => {
	if (caption.kind === OptionKind.None && credit.kind === OptionKind.None) {
		return null;
	}

	return (
		<figcaption
			css={[
				HeaderImageCaptionStyles(isFullWidthImage, iconBackgroundColor),
				styles,
			]}
		>
			<details>
				<summary>
					<span css={svgStyle(iconColor)}>
						<SvgCamera />
						Click to see figure caption
					</span>
				</summary>
				<span id={captionId}>
					{pipe(caption, map(renderText), withDefault<ReactNode>(''))}{' '}
					{withDefault('')(credit)}
				</span>
			</details>
		</figcaption>
	);
};

export default HeaderImageCaption;

export { captionId };
