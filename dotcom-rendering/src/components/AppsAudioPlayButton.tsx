import { ListenToArticleButton } from './ListenToArticleButton';

type Props = {
	onClickHandler: () => void;
	audioDuration?: string;
};

export const AppsAudioPlayButton = ({
	onClickHandler,
	audioDuration,
}: Props) => (
	<ListenToArticleButton
		onClickHandler={onClickHandler}
		audioDuration={audioDuration}
		waveFormSeed="apps-audio-play"
		label="Listen to this podcast"
	/>
);
