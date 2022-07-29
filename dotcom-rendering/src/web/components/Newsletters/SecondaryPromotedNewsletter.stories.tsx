import { SecondaryPromotedNewsletter } from './SecondaryPromotedNewsletter';

export default {
	component: SecondaryPromotedNewsletter,
	title: 'Components/Newsletters/SecondaryPromotedNewsletter',
};

const altPromotedNewsletter = {
	name: 'Pushing Buttons',
	description:
		'Start the day one step ahead. Our email breaks down the key stories of the day and why they matter.',
	frequency: 'Weekly',
	mainMedia:
		'https://i.guim.co.uk/img/uploads/2022/01/11/pushing_buttons_thrasher_hi.png?width=700&quality=50&s=f4be90f0ca470076df70cf895aeecda1',
	signupPage: 'https://www.google.com',
	listId: 1234,
	identityName: 'Pushing buttons',
	successDescription: 'nice 1',
	theme: 'culture',
	group: 'culture',
};

export const Default = () => {
	return <SecondaryPromotedNewsletter newsletter={altPromotedNewsletter} />;
};

Default.story = { name: 'Default' };
