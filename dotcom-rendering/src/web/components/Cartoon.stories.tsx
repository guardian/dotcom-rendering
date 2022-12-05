import { css } from '@emotion/react';
import { fontWeights } from '@guardian/source-foundations';
import type { CartoonType, Variant } from './Cartoon';
import { Cartoon } from './Cartoon';

const variant: Variant = {
	viewportSize: 'small',
	images: [
		{
			height: 2074,
			width: 3110,
			mimeType: 'image/jpeg',
			file: 'https://media.guim.co.uk/7cffd9d6809318a9d92c719c473d193caf95d601/0_0_3110_2074/3110.jpg',
		},
		{
			height: 2074,
			width: 3110,
			mimeType: 'image/jpeg',
			file: 'https://media.guim.co.uk/e0fa5bdfa0e6910b9b58ccc98c3247217566bf9f/0_0_3110_2074/3110.jpg',
		},
	],
};

const fixture1: CartoonType = {
	type: 'cartoon',
	caption: 'Cartoon data model spike demo',
	displayCredit: true,
	alt: 'This is alt text',
	credit: 'Artist name, 2022',
	variants: [variant],
	transcript:
		'<strong>Strong text</strong><br /><a href="theguardian.com">a link</a><br /><ul><li>list</li><li>items</li></ul>',
};

export default {
	component: Cartoon,
	title: 'Components/Cartoon',
};

export const Default = () => (
	<section
		css={css`
			padding: 50px 0;
			max-width: 400px;
			margin: 0 auto;
			/* to demo that the transcript markup inherits styling */
			& li {
				list-style-type: disc;
			}
			& strong {
				font-weight: ${fontWeights['bold']};
			}
		`}
	>
		<Cartoon cartoon={fixture1} />
	</section>
);

Default.story = {
	name: 'Data model demo',
};
