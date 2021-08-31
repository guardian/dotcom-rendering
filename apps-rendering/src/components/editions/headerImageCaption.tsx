import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { SvgCamera } from '@guardian/src-icons';
import type { Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { pipe } from 'lib';
import type { FC, ReactElement, ReactNode } from 'react';

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

		${isFullWidthImage &&
		`${from.tablet} {
			padding-left: ${remSpace[6]};
		}
		${from.desktop} {
			padding-left: 9rem;
		}`}
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
}: Props) =>
	pipe(
		caption,
		map((cap) => (
			<figcaption
				css={[
					HeaderImageCaptionStyles(
						isFullWidthImage,
						iconBackgroundColor,
					),
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
						{renderText(cap)} {withDefault('')(credit)}
					</span>
				</details>
			</figcaption>
		)),
		withDefault<ReactElement | null>(null),
	);

export default HeaderImageCaption;

export { captionId };
