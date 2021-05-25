import React from 'react';
import { css } from '@emotion/react';
import { pillarPalette_DO_NOT_USE } from '@root/src/lib/pillars';
import InfoIcon from '@frontend/static/icons/info.svg';
import PlusIcon from '@frontend/static/icons/plus.svg';

import { palette } from '@guardian/src-foundations';
import { body, textSans, headline } from '@guardian/src-foundations/typography';
import { TextStyle } from '@root/src/amp/components/elements/TextBlockComponent';

const wrapper = (pillar: Theme) => css`
	background: ${palette.neutral[93]};
	position: relative;
	padding: 0 5px 6px;
	margin: 16px 0 36px;

	border-top: 13px solid ${palette.neutral[7]};
	border-image: repeating-linear-gradient(
			to bottom,
			${palette.neutral[86]},
			${palette.neutral[86]} 1px,
			transparent 1px,
			transparent 4px
		)
		13;

	${TextStyle(pillar)}

	${body.medium()};
`;

const buttonStyles = css`
	height: 32px;
	background-color: ${palette.neutral[7]};
	border-radius: 1600px;
	color: ${palette.neutral[100]};
	border: none;
	${textSans.small()};
	font-weight: 700;
	padding: 0 15px 0 7px;

	display: inline-flex;
	align-items: center;

	position: absolute;
	bottom: 0;
	transform: translate(0, 50%);

	span {
		display: inline-flex;
		align-items: center;
	}

	svg {
		fill: ${palette.neutral[100]};
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}
`;

const headerStyle = css`
	${headline.xxsmall()};
`;

const creditStyle = css`
	${textSans.small()};
	display: block;
	margin: 12px 0;
`;

const pillarColour = (pillar: Theme) => css`
	color: ${pillarPalette_DO_NOT_USE[pillar].main};
`;

const headers = css`
	margin: 0 0 16px;
`;

const innerStyle = css`
	padding-bottom: 24px;
`;

const iconStyle = css`
	display: inline-flex;
	background: ${palette.neutral[60]};
	border-radius: 100%;
	width: 16px;
	height: 16px;
	align-items: center;
	justify-content: center;
	margin-right: 5px;

	svg {
		height: 12px;
		fill: ${palette.neutral[100]};
	}
`;

const imageStyle = css`
	width: 100px;
	height: 100px;
	display: block;
	float: left;
	margin-right: 10px;
	margin-bottom: 6px;

	img {
		object-fit: cover;
		border-radius: 50%;
	}
`;

export const Expandable: React.FC<{
	id: string;
	type: string;
	title: string;
	img?: string;
	html: string;
	credit?: string;
	pillar: Theme;
}> = ({ id, type, title, img, html, credit, pillar }) => (
	<aside className={wrapper(pillar)}>
		<div className={headers}>
			<span className={cx(headerStyle, pillarColour(pillar))}>
				{type}
			</span>
			<h2 className={headerStyle}>{title}</h2>
		</div>

		<div className={innerStyle} hidden={true} id={id}>
			{img && (
				<amp-img
					class={imageStyle}
					src={img}
					alt={`Image for ${title} explainer`}
					layout="fixed"
					width="100"
					height="100"
				/>
			)}
			<div
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			/>
			{credit && (
				<span className={creditStyle}>
					<span className={iconStyle}>
						<InfoIcon />
					</span>{' '}
					{credit}
				</span>
			)}
		</div>

		<button
			on={`tap:${id}.toggleVisibility,show-${id}.toggleVisibility,hide-${id}.toggleVisibility`}
			className={buttonStyles}
		>
			<span id={`show-${id}`}>
				<PlusIcon />
				Show
			</span>
			<span hidden={true} id={`hide-${id}`}>
				<PlusIcon />
				Hide
			</span>
		</button>
	</aside>
);
