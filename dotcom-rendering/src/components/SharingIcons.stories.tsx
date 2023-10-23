import { sharingUrls } from '../../fixtures/manual/sharingUrls';
import { SharingIcons } from './SharingIcons';

export default {
	title: 'SharingIcons',
	component: SharingIcons,
};

export const SharingIconsDefault = (): JSX.Element => (
	<SharingIcons
		sharingUrls={sharingUrls}
		displayIcons={[
			'facebook',
			'twitter',
			'email',
			'whatsApp',
			'messenger',
			'pinterest',
			'linkedIn',
		]}
	/>
);
