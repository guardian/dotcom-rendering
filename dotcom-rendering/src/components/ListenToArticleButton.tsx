import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	Button,
	SvgMediaControlsPlay,
} from '@guardian/source/react-components';
import { palette } from '../palette';

const button = css`
	background-color: ${palette('--follow-icon-fill')};
	&:active,
	&:focus,
	&:hover {
		background-color: ${palette('--follow-icon-fill')};
	}
	color: ${palette('--follow-icon-background')};
	margin-bottom: ${space[4]}px;
	margin-left: ${space[2]}px;
`;

const durationPadding = css`
	padding-left: ${space[2]}px;
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
		size="small"
		cssOverrides={button}
		icon={<SvgMediaControlsPlay />}
	>
		<span css={durationPadding}>
			{!!audioDuration && `${audioDuration}`}
		</span>
		<span>Listen to article</span>
	</Button>
);
