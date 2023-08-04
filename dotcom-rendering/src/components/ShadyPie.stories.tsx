import { ShadyPie } from './ShadyPie.tsx';

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
Default.storyName = 'Default';
