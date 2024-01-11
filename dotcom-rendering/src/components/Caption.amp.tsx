import { css } from '@emotion/react';
import { palette, textSans } from '@guardian/source-foundations';
import React from 'react';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';
import TriangleIcon from '../static/icons/triangle.svg';

const figureStyle = css`
	margin-bottom: 8px;
`;
const captionStyle = css`
	padding-top: 10px;
	${textSans.xxsmall()};
	word-wrap: break-word;
	color: ${palette.neutral[46]};
`;

const captionPadding = css`
	padding-left: 8px;
	padding-right: 8px;
`;

export const Caption = ({
	captionText,
	pillar,
	padCaption = false,
	credit,
	displayCredit = true,
	children,
}: {
	captionText?: string;
	pillar: ArticleTheme;
	padCaption?: boolean;
	credit?: string;
	displayCredit?: boolean;
	children: React.ReactNode;
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
					__html: captionText ?? '',
				}}
				key="caption"
			/>
		);
	};

	return (
		<figure css={figureStyle}>
			{children}
			{!!captionText && (
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
