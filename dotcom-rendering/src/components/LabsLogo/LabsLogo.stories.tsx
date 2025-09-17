import { LabsLogo } from './LabsLogo';

export default {
	title: 'Components/LabsLogo',
	component: LabsLogo,
};

export const Default = () => (
	<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
		<div>
			<LabsLogo size={50} />
			<p>Small (50px)</p>
		</div>
		<div>
			<LabsLogo size={100} />
			<p>Default (100px)</p>
		</div>
		<div>
			<LabsLogo size={200} />
			<p>Large (200px)</p>
		</div>
	</div>
);
