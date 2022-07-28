import { SecondaryPromotedNewsletter } from './SecondaryPromotedNewsletter';

export default {
	component: SecondaryPromotedNewsletter,
	title: 'Components/SecondaryPromotedNewsletter',
};

const altPromotedNewsletter = {
	name: 'Pushing Buttons',
	description:
		'Start the day one step ahead. Our email breaks down the key stories of the day and why they matter.',
	frequency: 'Weekly',
};

export const Default = () => {
	return <SecondaryPromotedNewsletter {...altPromotedNewsletter} />;
};

Default.story = { name: 'Default' };
