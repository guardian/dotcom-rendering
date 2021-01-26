import React from 'react';
import { css } from 'emotion';

import { Display, Design, Pillar } from '@guardian/types';
import { YoutubeEmbedBlockComponent } from './YoutubeEmbedBlockComponent';

export default {
	component: YoutubeEmbedBlockComponent,
	title: 'Components/YoutubeEmbedComponent',
	parameters: {
		chromatic: {
			disable: true,
		},
	},
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			max-width: 620px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

export const standardAspectRatio = () => {
	return (
		<Container>
			<p>abc</p>
			<YoutubeEmbedBlockComponent
				embedUrl="https://www.youtube-nocookie.com/embed/79fzeNUqQbQ?wmode=opaque&feature=oembed"
				pillar={Pillar.News}
				height={259}
				width={460}
				caption="blah"
				credit=""
				title=""
				display={Display.Standard}
				design={Design.Article}
			/>
			<p>abc</p>
		</Container>
	);
};
standardAspectRatio.story = { name: 'with standard aspect ratio' };
