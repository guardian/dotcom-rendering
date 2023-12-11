// ----- Imports ----- //
import { some } from '../../../vendor/@guardian/types/index';
import { article } from 'fixtures/item';
import { live } from 'fixtures/live';
import type { FC } from 'react';
import Logo from './';

const branding = some({
	aboutUri:
		'x-gu://item/mobile.guardianapis.com/uk/items/info/2016/jan/25/content-funding',
	altLogo:
		'https://static.theguardian.com/commercial/sponsor/05/May/2020/ca7c95d2-6aef-4710-ac1b-ad539763ed9f-JNI_rgb_rev_180.png',
	brandingType: 'sponsored',
	label: 'Supported by',
	logo: 'https://static.theguardian.com/commercial/sponsor/05/May/2020/2b724f07-add3-4abb-b7a3-b6bbb05a3bd0-JNI_rgb_180.png',
	sponsorName: 'Judith Nielson Institute',
	sponsorUri: 'https://jninstitute.org/',
});

// ----- Stories ----- //

const Default: FC = () => (
	<Logo
		item={{
			...article,
			branding,
		}}
	/>
);

const Blogs: FC = () => (
	<Logo
		item={{
			...live,
			branding,
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Logo,
	title: 'AR/Logo',
};

export { Default, Blogs };
