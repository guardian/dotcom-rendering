import { css } from '@emotion/react';
import { height, space } from '@guardian/source/foundations';
import {
	Button,
	SvgMediaControlsPlay,
} from '@guardian/source/react-components';
import { palette } from '../palette';

const buttonCss = (audioDuration: string | undefined) => css`
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
	padding-right: ${audioDuration === undefined ? space[4] : space[3]}px;
	padding-bottom: 0px;
	font-size: 15px;
	height: ${height.ctaSmall}px;
	min-height: ${height.ctaSmall}px;

	.src-button-space {
		width: 0px;
	}
`;

const dividerCss = css`
	width: 0.5px;
	height: 100%;
	opacity: 0.5;
	border-left: 1px solid ${palette('--follow-icon-background')};
	margin-left: ${space[2]}px;
	margin-right: ${space[2]}px;
`;

const durationCss = css`
	font-weight: 300;
`;

const baselineCss = css`
	padding-bottom: 2px;
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
		cssOverrides={buttonCss(audioDuration)}
		icon={<SvgMediaControlsPlay />}
	>
		{audioDuration === undefined || audioDuration === '' ? null : (
			<>
				<span css={[durationCss, baselineCss]}>{audioDuration}</span>
				<span css={dividerCss}></span>
			</>
		)}
		<span css={baselineCss}>Listen to this article</span>
	</Button>
);
