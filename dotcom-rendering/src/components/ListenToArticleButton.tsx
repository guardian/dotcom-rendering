import { css } from '@emotion/react';
import { palette } from '../palette';

const button = css`
	background-color: ${palette('--follow-icon-fill')};
	border: none;
	color: white;
	padding: 8px 12px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	border-radius: 40px;
	font-weight: bold;
`;
type ButtonProps = {
	isPlaying: boolean;
	onClickHandler: () => void;
};
export const ListenToAudioButton = ({ onClickHandler }: ButtonProps) => {
	return (
		<button onClick={onClickHandler} type="button" css={[button]}>
			Listen to article
		</button>
	);
};
