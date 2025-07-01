import { ListenToAudioButton } from './ListenToArticleButton';

export default {
	component: [ListenToAudioButton],
	title: 'Components/ListenToAudio',
};

export const Default = () => {
	return (
		<>
			<ListenToAudioButton onClickHandler={() => undefined} />
		</>
	);
};
