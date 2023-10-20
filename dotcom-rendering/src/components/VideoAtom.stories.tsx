import { css } from '@emotion/react';
import { VideoAtom } from './VideoAtom';

export default {
	title: 'VideoAtom',
	component: VideoAtom,
	parameters: {
		// Chromatic ignores video elements by design so there's no point trying to snapshot here
		// https://www.chromatic.com/docs/ignoring-elements
		chromatic: { disable: true },
	},
};

export const DefaultStory = () => {
	return (
		<div
			css={css`
				width: 800px;
				margin: 25px;
			`}
		>
			<VideoAtom
				poster="https://media.guim.co.uk/29638c3179baea589b10fbd4dbbc223ea77027ae/0_0_3589_2018/master/3589.jpg"
				assets={[
					{
						url: 'https://uploads.guim.co.uk/2020%2F23%2F04%2Ffor+testing+purposes+only--ef8e62ab-bc06-4892-8da1-65a7e5bacb77-1.mp4',
						mimeType: 'video/mp4',
					},
				]}
			/>
		</div>
	);
};

export const LargeStory = () => {
	return (
		<div
			css={css`
				width: 800px;
				margin: 25px;
			`}
		>
			<VideoAtom
				poster="https://media.guim.co.uk/29638c3179baea589b10fbd4dbbc223ea77027ae/0_0_3589_2018/master/3589.jpg"
				assets={[
					{
						url: 'https://uploads.guim.co.uk/2020%2F23%2F04%2Ffor+testing+purposes+only--ef8e62ab-bc06-4892-8da1-65a7e5bacb77-1.mp4',
						mimeType: 'video/mp4',
					},
				]}
				height={500}
				width={880}
			/>
		</div>
	);
};

export const NoPosterStory = () => {
	return (
		<div
			css={css`
				width: 800px;
				margin: 25px;
			`}
		>
			<VideoAtom
				assets={[
					{
						url: 'https://uploads.guim.co.uk/2020%2F23%2F04%2Ffor+testing+purposes+only--ef8e62ab-bc06-4892-8da1-65a7e5bacb77-1.mp4',
						mimeType: 'video/mp4',
					},
				]}
			/>
		</div>
	);
};
