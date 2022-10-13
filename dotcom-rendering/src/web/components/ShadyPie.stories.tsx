import { ShadyPie } from './ShadyPie';

export default {
	component: ShadyPie,
	title: 'Components/ShadyPie',
};

export const Default = () => {
	return (
		<div style={{ width: '300px' }}>
			<ShadyPie />
		</div>
	);
};
Default.story = {
	name: 'Default',
};
