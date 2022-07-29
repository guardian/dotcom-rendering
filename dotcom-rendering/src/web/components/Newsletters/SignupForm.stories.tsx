import { SignupForm } from './SignupForm';

export default {
	component: SignupForm,
	title: 'Components/Newsletters/SignupForm',
};

export const Default = () => {
	return <SignupForm newsletterId="1234" />;
};

Default.story = { name: 'Default' };
