import { AgeWarning } from './AgeWarning';

export default {
	component: AgeWarning,
	title: 'Components/AgeWarning',
};

export const defaultStory = () => {
	return <AgeWarning age="10 years old" />;
};
defaultStory.story = { name: 'default' };

export const SmallWarning = () => {
	return <AgeWarning age="5 months old" size="small" />;
};
SmallWarning.story = { name: 'with size set to small' };

export const ScreenReaderVersion = () => {
	return <AgeWarning age="20 million years old" isScreenReader={true} />;
};
ScreenReaderVersion.story = { name: 'with screen reader true (invisible)' };

export const MissingOldText = () => {
	return <AgeWarning age="5 years" />;
};
MissingOldText.story = { name: 'with old text missing from input' };
