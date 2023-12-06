// ----- Imports ----- //

import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	between,
	brandAlt,
	neutral,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { SvgCamera } from '@guardian/source-react-components';
import type { Option } from '../../../vendor/@guardian/types/index';
import { OptionKind, withDefault } from '../../../vendor/@guardian/types/index';
import type { Styleable } from 'lib';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import Caption from './Caption';

// ----- Component ----- //

const defaultStyles = css`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
`;

const detailsStyles = css`
	&[open] {
		min-height: 44px;
		max-height: 999px;
		background-color: rgba(0, 0, 0, 0.8);
		padding: ${remSpace[3]};
		overflow: hidden;
		padding-right: ${remSpace[12]};
		z-index: 1;
		${textSans.small()};
		box-sizing: border-box;

		${darkModeCss`
			color: ${neutral[60]};
		`}
	}
`;

const iconStyles = css`
	display: block;
	text-align: center;
	background-color: ${brandAlt[400]};
	width: 34px;
	height: 34px;
	position: absolute;
	bottom: 8px;
	right: 8px;
	border-radius: 100%;
	outline: none;

	&::-webkit-details-marker {
		display: none;
	}

	${darkModeCss`
		background-color: ${neutral[93]};
	`}

	${between.mobileLandscape.and.tablet} {
		right: ${remSpace[5]};
	}
`;

const svgStyles = css`
	line-height: 32px;
	font-size: 0;

	svg {
		width: 75%;
		height: 75%;
		margin: 12.5%;
	}

	path {
		fill: ${neutral[7]};
	}
`;

const textStyles = css`
	${textSans.xsmall({
		lineHeight: 'regular',
	})}
	color: ${neutral[100]};
`;

type Props = Styleable<{
	caption: Option<DocumentFragment>;
	credit: Option<string>;
	format: ArticleFormat;
	id: string;
}>;

const DefaultMainMediaCaption: FC<Props> = ({
	caption,
	className,
	credit,
	format,
	id,
}) => {
	if (caption.kind === OptionKind.None && credit.kind === OptionKind.None) {
		return null;
	}

	return (
		<figcaption css={className}>
			<details css={detailsStyles}>
				<summary css={iconStyles}>
					<span css={svgStyles}>
						<SvgCamera />
						Click to see figure caption
					</span>
				</summary>
				<span id={id} css={textStyles}>
					<Caption caption={caption} format={format} />{' '}
					{withDefault<string | null>(null)(credit)}
				</span>
			</details>
		</figcaption>
	);
};

// ----- Exports ----- //

export { defaultStyles };

export default DefaultMainMediaCaption;
