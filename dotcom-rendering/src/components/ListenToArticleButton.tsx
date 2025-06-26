import { css } from '@emotion/react';
import { Button } from '@guardian/source/react-components';
import { palette } from '../palette';

const button = css`
	background-color: ${palette('--follow-icon-fill')};
`;
type ButtonProps = {
	isPlaying: boolean;
	onClickHandler: () => void;
};
export const ListenToAudioButton = ({ onClickHandler }: ButtonProps) => {
	return (
		<Button onClick={onClickHandler} size={'small'} cssOverrides={[button]}>
			Listen to article
		</Button>
	);
};
