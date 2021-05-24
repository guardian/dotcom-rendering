import { css } from '@emotion/react';

import { Display, Design, Pillar } from '@guardian/types';
import { decidePalette } from '@root/src/web/lib/decidePalette';

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
		css={css`
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
				format={{
					theme: Pillar.News,
					display: Display.Standard,
					design: Design.Article,
				}}
				palette={decidePalette({
					theme: Pillar.News,
					display: Display.Standard,
					design: Design.Article,
				})}
				height={259}
				width={460}
				caption="blah"
				credit=""
				title=""
			/>
			<p>abc</p>
		</Container>
	);
};
standardAspectRatio.story = { name: 'with standard aspect ratio' };
