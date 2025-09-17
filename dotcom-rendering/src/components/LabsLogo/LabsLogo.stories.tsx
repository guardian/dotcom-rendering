// LabsLogo.stories.tsx
import type { StoryObj } from '@storybook/react';
import { LabsLogo } from './LabsLogo';
import type { LabsLogoProps } from './LabsLogo';

export default {
	title: 'Components/LabsLogo',
	component: LabsLogo,
};

export const Default: StoryObj<LabsLogoProps> = {
	args: { size: 100 },
};

export const Small = () => <LabsLogo size={50} />;
export const Large = () => <LabsLogo size={200} />;

export const SizeComparison = () => (
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
