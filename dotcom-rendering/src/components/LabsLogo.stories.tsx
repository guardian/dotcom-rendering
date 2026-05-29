import preview from '../../.storybook/preview';
import { LabsLogo } from './LabsLogo';

const meta = preview.meta({
	title: 'Components/LabsLogo',
	component: LabsLogo,
});

export const Default = meta.story(() => (
	<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
		<div>
			<LabsLogo size={50} />
			<p>Small (50px)</p>
		</div>
		<div>
			<LabsLogo />
			<p>Default (71px)</p>
		</div>
		<div>
			<LabsLogo size={200} />
			<p>Large (200px)</p>
		</div>
	</div>
));
