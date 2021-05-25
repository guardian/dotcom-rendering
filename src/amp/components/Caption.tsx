import React from 'react';
import { css } from '@emotion/react';

import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';

import { pillarPalette_DO_NOT_USE } from '@root/src/lib/pillars';
import TriangleIcon from '@frontend/static/icons/triangle.svg';

const figureStyle = css`
	margin-bottom: 8px;
`;
const captionStyle = css`
	padding-top: 10px;
	${textSans.xxsmall()};
	word-wrap: break-word;
	color: ${text.supporting};
`;

const captionPadding = css`
	padding-left: 8px;
	padding-right: 8px;
`;

export const Caption: React.FC<{
	captionText?: string;
	pillar: Theme;
	padCaption?: boolean;
	credit?: string;
	displayCredit?: boolean;
}> = ({
	captionText,
	pillar,
	padCaption = false,
	credit,
	displayCredit = true,
	children,
}) => {
	const iconStyle = css`
		fill: ${pillarPalette_DO_NOT_USE[pillar].main};
		padding-right: 3px;
	`;

	const captionLink = css`
		a {
			color: ${pillarPalette_DO_NOT_USE[pillar].main};
			text-decoration: none;
		}
		a:hover {
			text-decoration: underline;
		}
		strong {
			font-weight: bold;
		}
	`;

	const getCaptionHtml = () => {
		return (
			<span
				css={captionLink}
				dangerouslySetInnerHTML={{
					__html: captionText || '',
				}}
				key="caption"
			/>
		);
	};

	return (
		<figure css={figureStyle}>
			{children}
			{captionText && (
				<>
					<figcaption
						css={[captionStyle, padCaption && captionPadding]}
					>
						<span css={iconStyle}>
							<TriangleIcon />
						</span>
						{getCaptionHtml()} {displayCredit && credit}
					</figcaption>
				</>
			)}
		</figure>
	);
};
