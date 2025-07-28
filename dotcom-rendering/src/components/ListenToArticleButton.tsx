import { css } from '@emotion/react';
import { height, space } from '@guardian/source/foundations';
import {
	Button,
	SvgMediaControlsPlay,
} from '@guardian/source/react-components';
import { palette } from '../palette';

const buttonCss = css`
	display: flex;
	align-items: center;
	background-color: ${palette('--follow-icon-fill')};
	color: ${palette('--follow-icon-background')};
	&:active,
	&:focus,
	&:hover {
		background-color: ${palette('--follow-icon-fill')};
	}
	margin-bottom: ${space[4]}px;
	margin-left: ${space[2]}px;
	padding-left: ${space[2]}px;
	padding-right: ${space[4]}px;
	padding-bottom: 0px;
	font-size: 15px;
	height: ${height.ctaSmall}px;
	min-height: ${height.ctaSmall}px;

	.src-button-space {
		width: 3px;
	}
`;

const dividerCss = css`
	width: 1px;
	height: 100%;
	border-left: 1px solid ${palette('--follow-icon-background')};
	margin-left: ${space[2]}px;
	margin-right: ${space[2]}px;
`;

const durationCss = css`
	font-weight: 300;
`;

type ButtonProps = {
	onClickHandler: () => void;
	audioDuration?: string;
};
export const ListenToArticleButton = ({
	onClickHandler,
	audioDuration,
}: ButtonProps) => (
	<Button
		onClick={onClickHandler}
		size="default"
		iconSide="left"
		cssOverrides={buttonCss}
		icon={<SvgMediaControlsPlay />}
	>
		{audioDuration === undefined || audioDuration === '' ? null : (
			<>
				<span css={durationCss}>{audioDuration}</span>
				<span css={dividerCss}></span>
			</>
		)}
		Listen to this article
	</Button>
);
