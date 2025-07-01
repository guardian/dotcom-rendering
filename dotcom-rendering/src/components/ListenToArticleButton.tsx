import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	Button,
	SvgMediaControlsPlay,
} from '@guardian/source/react-components';
import { palette } from '../palette';

const button = css`
	background-color: ${palette('--follow-icon-fill')};
	&:active {
		background-color: ${palette('--follow-icon-fill')};
	}
	&:focus {
		background-color: ${palette('--follow-icon-fill')};
	}
	&:hover {
		background-color: ${palette('--follow-icon-fill')};
	}
	margin-bottom: ${space[4]}px;
	margin-left: ${space[2]}px;
`;
type ButtonProps = {
	onClickHandler: () => void;
};
export const ListenToAudioButton = ({ onClickHandler }: ButtonProps) => {
	return (
		<Button
			onClick={onClickHandler}
			size={'small'}
			cssOverrides={[button]}
			icon={<SvgMediaControlsPlay />}
		>
			Listen to article
		</Button>
	);
};
