// ----- Imports ----- //

import type { ReactElement } from 'react';
import Video from './index';

// ----- Setup ------ //

const video = {
	posterUrl:
		'https://media.guim.co.uk/032aa99755664104fbfc4cbe45cfae0243dce462/0_0_3972_2234/master/3972.jpg',
	videoId: 'wD_bWOEuuoc',
	duration: 59,
	atomId: '26401ff7-24d0-4ba5-8882-2c32c2b379f0',
	title:
		'Super Bowl LV: Tom Brady MVP as Buccaneers beat Chiefs 31-9 – video report',
};

// ----- Stories ----- //

const Default = (): ReactElement => <Video {...video} />;

// ----- Exports ----- //

export default {
	component: Video,
	title: 'Editions/Video',
};

export { Default };
