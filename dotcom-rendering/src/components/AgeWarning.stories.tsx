import { AgeWarning } from './AgeWarning';

export default {
	component: AgeWarning,
	title: 'Components/AgeWarning',
};

export const defaultStory = () => {
	return <AgeWarning age="10 years old" />;
};
defaultStory.storyName = 'default';

export const SmallWarning = () => {
	return <AgeWarning age="5 months old" size="small" />;
};
SmallWarning.storyName = 'with size set to small';

export const ScreenReaderVersion = () => {
	return <AgeWarning age="20 million years old" isScreenReader={true} />;
};
ScreenReaderVersion.storyName = 'with screen reader true (invisible)';

export const MissingOldText = () => {
	return <AgeWarning age="5 years" />;
};
MissingOldText.storyName = 'with old text missing from input';
