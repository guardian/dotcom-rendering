import { ListenToAudioButton } from './ListenToArticleButton';

export default {
	component: [ListenToAudioButton],
	title: 'Components/ListenToAudio',
	args: {
		isPlaying: false,
	},
};

export const Default = ({ isPlaying }: { isPlaying: boolean }) => {
	return (
		<>
			<ListenToAudioButton
				isPlaying={isPlaying}
				onClickHandler={() => undefined}
			/>
		</>
	);
};
