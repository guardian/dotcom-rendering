import { css } from '@emotion/react';
import {
	body,
	headline,
	palette,
	textSans,
} from '@guardian/source-foundations';
import React from 'react';
import { neutralBorder, pillarPalette_DO_NOT_USE } from '../lib/pillars';
import InfoIcon from '../static/icons/info.svg';
import PlusIcon from '../static/icons/plus.svg';

const ListStyle = (iconColour: string) => css`
	li {
		margin-bottom: 6px;
		padding-left: 20px;
		p {
			display: inline;
		}
	}

	li:before {
		display: inline-block;
		content: '';
		border-radius: 6px;
		height: 12px;
		width: 12px;
		margin-right: 8px;
		background-color: ${iconColour};
		margin-left: -20px;
	}
`;

const LinkStyle = (pillar: ArticleTheme) => css`
	a {
		color: ${pillarPalette_DO_NOT_USE[pillar].dark};
		text-decoration: none;
		border-bottom: 1px solid ${neutralBorder(pillar)};
		:hover {
			border-bottom: 1px solid ${pillarPalette_DO_NOT_USE[pillar].dark};
		}
	}
`;

const TextStyle = (pillar: ArticleTheme) => css`
	strong {
		font-weight: 700;
	}
	p {
		padding: 0 0 12px;
		${body.medium()};
		font-weight: 300;
		word-wrap: break-word;
		color: ${palette.neutral[7]};
	}

	blockquote {
		margin-left: 20px;
		font-style: italic;
	}

	${body.medium()};

	${LinkStyle(pillar)};
	${ListStyle(neutralBorder(pillar))};
`;

const wrapper = (pillar: ArticleTheme) => css`
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

const pillarColour = (pillar: ArticleTheme) => css`
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

type Props = {
	id: string;
	type: string;
	title: string;
	img?: string;
	credit?: string;
	pillar: ArticleTheme;
	children: React.ReactNode;
};

export const Expandable = ({
	id,
	type,
	title,
	img,
	children,
	credit,
	pillar,
}: Props) => (
	<aside css={wrapper(pillar)}>
		<div css={headers}>
			<span css={[headerStyle, pillarColour(pillar)]}>{type}</span>
			<h2 css={headerStyle}>{title}</h2>
		</div>

		<div css={innerStyle} hidden={true} id={id}>
			{!!img && (
				<amp-img
					class={imageStyle}
					src={img}
					alt={`Image for ${title} explainer`}
					layout="fixed"
					width="100"
					height="100"
				/>
			)}
			{children}
			{!!credit && (
				<span css={creditStyle}>
					<span css={iconStyle}>
						<InfoIcon />
					</span>{' '}
					{credit}
				</span>
			)}
		</div>

		<button
			on={`tap:${id}.toggleVisibility,show-${id}.toggleVisibility,hide-${id}.toggleVisibility`}
			css={buttonStyles}
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
