import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Design, Display, Pillar } from '@guardian/types';
import { text, withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import { selectPillar } from '../storybookHelpers';
import RichLink, { richLinkWidth } from './richLink';

const overrideStyle = css`
	${from.wide} {
		margin-left: calc(${richLinkWidth} + ${remSpace[4]} + ${remSpace[6]});
	}
`;

const url = (): string => text('Link', 'https://theguardian.com');

const linkText = (): string =>
	text(
		'Link Text',
		'Axolotls in crisis: the fight to save the water monster of Mexico City.',
	);

const Default: FC = () => (
	<section css={overrideStyle}>
		<RichLink
			format={{
				design: Design.Article,
				display: Display.Standard,
				theme: selectPillar(Pillar.News),
			}}
			linkText={linkText()}
			url={url()}
		></RichLink>
	</section>
);

export default {
	component: RichLink,
	title: 'AR/Rich Link',
	decorators: [withKnobs],
};

export { Default };
