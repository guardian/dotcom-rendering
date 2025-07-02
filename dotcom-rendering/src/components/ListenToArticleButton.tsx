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
	margin-bottom: ${space[4]}px;
	margin-left: ${space[2]}px;
`;
type ButtonProps = {
	onClickHandler: () => void;
};
export const ListenToArticleButton = ({ onClickHandler }: ButtonProps) => (
	<Button
		onClick={onClickHandler}
		size="small"
		cssOverrides={button}
		icon={<SvgMediaControlsPlay />}
	>
		Listen to article
	</Button>
);
