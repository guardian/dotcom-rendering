import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import { PodcastMeta } from './PodcastMeta';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 620px;
			padding: 20px;
			background-color: ${palette.neutral[7]};
		`}
	>
		{children}
	</div>
);

export const Default = () => (
	<Wrapper>
		<PodcastMeta
			spotifyUrl="#"
			subscriptionUrl="#"
			rssFeedUrl="#"
			downloadUrl="#"
		/>
	</Wrapper>
);

export default {
	component: PodcastMeta,
	title: 'Components/PodcastMeta',
};
