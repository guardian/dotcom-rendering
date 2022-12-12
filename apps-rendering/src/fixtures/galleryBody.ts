import type { Body } from 'bodyElement';
import { ImageSubtype } from 'image/image';
import { Optional } from 'optional';

const captionFragment = (headline: string, body: string): DocumentFragment => {
	const frag = new DocumentFragment();
	const headlineEl = document.createElement('strong');
	headlineEl.appendChild(document.createTextNode(headline));
	frag.appendChild(headlineEl);
	const bodyEl = document.createTextNode(body);
	frag.appendChild(bodyEl);
	return frag;
};

export const galleryBody: Body = [
	{
		kind: 1,
		src: 'https://i.guim.co.uk/img/media/2232f7bb9c21692cae8f499c70fde2c599f07b1e/0_0_5699_3799/master/5699.jpg?width=500&quality=85&fit=bounds&s=b4c08994b6aad3ffcea8e242793755f3',
		srcset: 'https://i.guim.co.uk/img/media/2232f7bb9c21692cae8f499c70fde2c599f07b1e/0_0_5699_3799/master/5699.jpg?width=140&quality=85&fit=bounds&s=c125868b875fa9ec4a8ce180360836e0 140w, https://i.guim.co.uk/img/media/2232f7bb9c21692cae8f499c70fde2c599f07b1e/0_0_5699_3799/master/5699.jpg?width=500&quality=85&fit=bounds&s=b4c08994b6aad3ffcea8e242793755f3 500w, https://i.guim.co.uk/img/media/2232f7bb9c21692cae8f499c70fde2c599f07b1e/0_0_5699_3799/master/5699.jpg?width=1000&quality=85&fit=bounds&s=dde3e8a919521443e8b0f5fba726fb24 1000w, https://i.guim.co.uk/img/media/2232f7bb9c21692cae8f499c70fde2c599f07b1e/0_0_5699_3799/master/5699.jpg?width=1500&quality=85&fit=bounds&s=3b57ebd649babc411c89f62a27bd800a 1500w, https://i.guim.co.uk/img/media/2232f7bb9c21692cae8f499c70fde2c599f07b1e/0_0_5699_3799/master/5699.jpg?width=2000&quality=85&fit=bounds&s=d0d5bfe2a9ce9000f6d8afc8b864fe92 2000w',
		dpr2Srcset:
			'https://i.guim.co.uk/img/media/2232f7bb9c21692cae8f499c70fde2c599f07b1e/0_0_5699_3799/master/5699.jpg?width=140&quality=45&fit=bounds&s=253ff45edb114b0605b7bce66b7f78f3 140w, https://i.guim.co.uk/img/media/2232f7bb9c21692cae8f499c70fde2c599f07b1e/0_0_5699_3799/master/5699.jpg?width=500&quality=45&fit=bounds&s=3be9e2a7e7f1b2ac4efab144d6c07a28 500w, https://i.guim.co.uk/img/media/2232f7bb9c21692cae8f499c70fde2c599f07b1e/0_0_5699_3799/master/5699.jpg?width=1000&quality=45&fit=bounds&s=14c3c8f7d54a8d8794664492efc68641 1000w, https://i.guim.co.uk/img/media/2232f7bb9c21692cae8f499c70fde2c599f07b1e/0_0_5699_3799/master/5699.jpg?width=1500&quality=45&fit=bounds&s=2745788813a433224e06421647d60b2c 1500w, https://i.guim.co.uk/img/media/2232f7bb9c21692cae8f499c70fde2c599f07b1e/0_0_5699_3799/master/5699.jpg?width=2000&quality=45&fit=bounds&s=dcdc2c3d03aee717124c58914a5c39de 2000w',
		alt: {
			kind: 0,
			value: 'Washington, DC, US Subcommittee chair Sheila Jackson Lee shows a photograph from the 6 January attack on the US Capitol, during a House Judiciary subcommittee on Crime, Terrorism, and Homeland Security hearing',
		},
		width: 5699,
		height: 3799,
		caption: {
			kind: 0,
			value: captionFragment(
				'Washington DC, US',
				'Sheila Jackson Lee shows a photograph from the 6 January attack on the US Capitol during a House judiciary subcommittee hearing',
			),
		},
		credit: { kind: 0, value: 'Photograph: Al Drago/Getty Images' },
		nativeCaption: {
			kind: 0,
			value: '<strong>Washington DC, US</strong> <br><br>Sheila Jackson Lee shows a photograph from the 6 January attack on the US Capitol during a House judiciary subcommittee hearing',
		},
		role: 0,
		imageSubtype: Optional.some(ImageSubtype.Jpeg),
	},
	{
		kind: 1,
		src: 'https://i.guim.co.uk/img/media/00a3f00503f26ab688f32c7b5acaa60fc2e7755f/0_0_5472_3648/master/5472.jpg?width=500&quality=85&fit=bounds&s=6b5da882eaec6ebf16644dedbb902063',
		srcset: 'https://i.guim.co.uk/img/media/00a3f00503f26ab688f32c7b5acaa60fc2e7755f/0_0_5472_3648/master/5472.jpg?width=140&quality=85&fit=bounds&s=00a782574440af9727bf87616b94d572 140w, https://i.guim.co.uk/img/media/00a3f00503f26ab688f32c7b5acaa60fc2e7755f/0_0_5472_3648/master/5472.jpg?width=500&quality=85&fit=bounds&s=6b5da882eaec6ebf16644dedbb902063 500w, https://i.guim.co.uk/img/media/00a3f00503f26ab688f32c7b5acaa60fc2e7755f/0_0_5472_3648/master/5472.jpg?width=1000&quality=85&fit=bounds&s=d4b61df8dc308483ca3b92c7da5de42e 1000w, https://i.guim.co.uk/img/media/00a3f00503f26ab688f32c7b5acaa60fc2e7755f/0_0_5472_3648/master/5472.jpg?width=1500&quality=85&fit=bounds&s=b9a3f3096a28cadaef022bbbf5322c56 1500w, https://i.guim.co.uk/img/media/00a3f00503f26ab688f32c7b5acaa60fc2e7755f/0_0_5472_3648/master/5472.jpg?width=2000&quality=85&fit=bounds&s=c476519c6a377a16d963a8cf9888713a 2000w',
		dpr2Srcset:
			'https://i.guim.co.uk/img/media/00a3f00503f26ab688f32c7b5acaa60fc2e7755f/0_0_5472_3648/master/5472.jpg?width=140&quality=45&fit=bounds&s=20c42477022d7ce2b2ac2d0b5cb688de 140w, https://i.guim.co.uk/img/media/00a3f00503f26ab688f32c7b5acaa60fc2e7755f/0_0_5472_3648/master/5472.jpg?width=500&quality=45&fit=bounds&s=dff09e82b640f93f268212b3a0de5b4e 500w, https://i.guim.co.uk/img/media/00a3f00503f26ab688f32c7b5acaa60fc2e7755f/0_0_5472_3648/master/5472.jpg?width=1000&quality=45&fit=bounds&s=a4e0cdc7de19d34a17c874c3a81a1ebe 1000w, https://i.guim.co.uk/img/media/00a3f00503f26ab688f32c7b5acaa60fc2e7755f/0_0_5472_3648/master/5472.jpg?width=1500&quality=45&fit=bounds&s=478eaedffbc1085109b5b4e29f2200b9 1500w, https://i.guim.co.uk/img/media/00a3f00503f26ab688f32c7b5acaa60fc2e7755f/0_0_5472_3648/master/5472.jpg?width=2000&quality=45&fit=bounds&s=e8e63bb3ec8ead5b6607b25fea2cd528 2000w',
		alt: {
			kind: 0,
			value: 'Prayagraj, India A Hindu holy man lies in front of an image of the goddess of learning at Sangam, the sacred confluence of the Ganga, Yamuna and Saraswati rivers, during Magh Mela festival',
		},
		width: 5472,
		height: 3648,
		caption: {
			kind: 0,
			value: captionFragment(
				'Prayagraj, India',
				'A Hindu holy man lies in front of an image of the goddess of learning at Sangam, the sacred confluence of the Ganga, Yamuna and Saraswati rivers',
			),
		},
		credit: { kind: 0, value: 'Photograph: Rajesh Kumar Singh/AP' },
		nativeCaption: {
			kind: 0,
			value: '<strong>Prayagraj, India</strong> <br><br>A Hindu holy man lies in front of an image of the goddess of learning at Sangam, the sacred confluence of the Ganga, Yamuna and Saraswati rivers',
		},
		role: 0,
		imageSubtype: Optional.some(ImageSubtype.Jpeg),
	},
	{
		kind: 1,
		src: 'https://i.guim.co.uk/img/media/0673ebd6b05c437c792a24c375b3be3204fe8283/0_0_4482_2988/master/4482.jpg?width=500&quality=85&fit=bounds&s=d824f8198249e9b1b119070023b1850c',
		srcset: 'https://i.guim.co.uk/img/media/0673ebd6b05c437c792a24c375b3be3204fe8283/0_0_4482_2988/master/4482.jpg?width=140&quality=85&fit=bounds&s=7231bc978677afa567b999de7645602a 140w, https://i.guim.co.uk/img/media/0673ebd6b05c437c792a24c375b3be3204fe8283/0_0_4482_2988/master/4482.jpg?width=500&quality=85&fit=bounds&s=d824f8198249e9b1b119070023b1850c 500w, https://i.guim.co.uk/img/media/0673ebd6b05c437c792a24c375b3be3204fe8283/0_0_4482_2988/master/4482.jpg?width=1000&quality=85&fit=bounds&s=cdeb3b040ff85ccebaa83f54643c87cb 1000w, https://i.guim.co.uk/img/media/0673ebd6b05c437c792a24c375b3be3204fe8283/0_0_4482_2988/master/4482.jpg?width=1500&quality=85&fit=bounds&s=61bde3db8713dfa8ab6c9d94d3b53d3e 1500w, https://i.guim.co.uk/img/media/0673ebd6b05c437c792a24c375b3be3204fe8283/0_0_4482_2988/master/4482.jpg?width=2000&quality=85&fit=bounds&s=fe5d0c455c7a8bf71082086f9b24e934 2000w',
		dpr2Srcset:
			'https://i.guim.co.uk/img/media/0673ebd6b05c437c792a24c375b3be3204fe8283/0_0_4482_2988/master/4482.jpg?width=140&quality=45&fit=bounds&s=b6beebe9a75fe6d5ce9475c0d13e429c 140w, https://i.guim.co.uk/img/media/0673ebd6b05c437c792a24c375b3be3204fe8283/0_0_4482_2988/master/4482.jpg?width=500&quality=45&fit=bounds&s=1516f1b11f5a186d13bc2e7dc56eecde 500w, https://i.guim.co.uk/img/media/0673ebd6b05c437c792a24c375b3be3204fe8283/0_0_4482_2988/master/4482.jpg?width=1000&quality=45&fit=bounds&s=665b8f94e20042d415967c7a382cd561 1000w, https://i.guim.co.uk/img/media/0673ebd6b05c437c792a24c375b3be3204fe8283/0_0_4482_2988/master/4482.jpg?width=1500&quality=45&fit=bounds&s=7bb7869708fa9d17b025aa334ba3a564 1500w, https://i.guim.co.uk/img/media/0673ebd6b05c437c792a24c375b3be3204fe8283/0_0_4482_2988/master/4482.jpg?width=2000&quality=45&fit=bounds&s=3c40f4ca2a68a4393201f94f025eb68a 2000w',
		alt: {
			kind: 0,
			value: 'Hua Hin, Thailand A bird flies over the abandoned sculpture of a Buddhist monk in Cha-am outside Hua Hin, south of Bangkok',
		},
		width: 4482,
		height: 2988,
		caption: {
			kind: 0,
			value: captionFragment(
				'Hua Hin, Thailand',
				'A bird flies over the abandoned sculpture of a Buddhist monk south of Bangkok',
			),
		},
		credit: {
			kind: 0,
			value: 'Photograph: Mladen Antonov/AFP/Getty Images',
		},
		nativeCaption: {
			kind: 0,
			value: '<strong>Hua Hin, Thailand <br><br></strong>A bird flies over the abandoned sculpture of a Buddhist monk south of Bangkok',
		},
		role: 0,
		imageSubtype: Optional.some(ImageSubtype.Jpeg),
	},
	{
		kind: 1,
		src: 'https://i.guim.co.uk/img/media/300a7451bd9b52d2a7ec7466619c7108ecba43a7/0_0_3600_2400/master/3600.jpg?width=500&quality=85&fit=bounds&s=3f341f45e1c1ce8c8c0f28d07cdf6867',
		srcset: 'https://i.guim.co.uk/img/media/300a7451bd9b52d2a7ec7466619c7108ecba43a7/0_0_3600_2400/master/3600.jpg?width=140&quality=85&fit=bounds&s=dc30181295bcbe657a051d55966d119a 140w, https://i.guim.co.uk/img/media/300a7451bd9b52d2a7ec7466619c7108ecba43a7/0_0_3600_2400/master/3600.jpg?width=500&quality=85&fit=bounds&s=3f341f45e1c1ce8c8c0f28d07cdf6867 500w, https://i.guim.co.uk/img/media/300a7451bd9b52d2a7ec7466619c7108ecba43a7/0_0_3600_2400/master/3600.jpg?width=1000&quality=85&fit=bounds&s=59187d1926376734fedf391885c21c75 1000w, https://i.guim.co.uk/img/media/300a7451bd9b52d2a7ec7466619c7108ecba43a7/0_0_3600_2400/master/3600.jpg?width=1500&quality=85&fit=bounds&s=31b6374d30517dca65cbb0d7c0454535 1500w, https://i.guim.co.uk/img/media/300a7451bd9b52d2a7ec7466619c7108ecba43a7/0_0_3600_2400/master/3600.jpg?width=2000&quality=85&fit=bounds&s=15e40dc6afcdbfefe241ddb4748c8ac5 2000w',
		dpr2Srcset:
			'https://i.guim.co.uk/img/media/300a7451bd9b52d2a7ec7466619c7108ecba43a7/0_0_3600_2400/master/3600.jpg?width=140&quality=45&fit=bounds&s=0f3c3dbd3fc24dc38b6a25593933d036 140w, https://i.guim.co.uk/img/media/300a7451bd9b52d2a7ec7466619c7108ecba43a7/0_0_3600_2400/master/3600.jpg?width=500&quality=45&fit=bounds&s=3eb9e25c8e38ec8ae5e9b0a7e10c6c67 500w, https://i.guim.co.uk/img/media/300a7451bd9b52d2a7ec7466619c7108ecba43a7/0_0_3600_2400/master/3600.jpg?width=1000&quality=45&fit=bounds&s=317b489ad130fde80b1ea52214b0341a 1000w, https://i.guim.co.uk/img/media/300a7451bd9b52d2a7ec7466619c7108ecba43a7/0_0_3600_2400/master/3600.jpg?width=1500&quality=45&fit=bounds&s=e0770f452eb0745fa25c47b78cdff4b4 1500w, https://i.guim.co.uk/img/media/300a7451bd9b52d2a7ec7466619c7108ecba43a7/0_0_3600_2400/master/3600.jpg?width=2000&quality=45&fit=bounds&s=798fd1d9b81dc6b3fa425022e6201e64 2000w',
		alt: {
			kind: 0,
			value: 'Mulhouse, France A polar bear cub makes its first steps outside, in an enclosure at the Zoological and Botanical park in eastern France. The cub was born in November 2020',
		},
		width: 3600,
		height: 2400,
		caption: {
			kind: 0,
			value: captionFragment(
				'Mulhouse, France',
				'A polar bear cub takes its first steps outside in an enclosure at the zoological and botanical park',
			),
		},
		credit: {
			kind: 0,
			value: 'Photograph: Sébastien Bozon/AFP/Getty Images',
		},
		nativeCaption: {
			kind: 0,
			value: '<strong>Mulhouse, France</strong> <br><br>A polar bear cub takes its first steps outside in an enclosure at the zoological and botanical park',
		},
		role: 0,
		imageSubtype: Optional.some(ImageSubtype.Jpeg),
	},
];
