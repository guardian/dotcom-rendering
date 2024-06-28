import { css } from '@emotion/react';
import { StickyLiveblogAsk } from './StickyLiveblogAskWrapper.importable';

export default {
	component: StickyLiveblogAsk,
	title: 'Components/Marketing/StickyLiveblogAsk',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			background-color: #ededed;
			margin-left: 20px;
			margin-top: 24px;
		`}
	>
		{children}
	</div>
);

export const Default = () => {
	return (
		<Wrapper>
			<StickyLiveblogAsk
				url="https://www.theguardian.com/uk"
				onCtaClick={() => {}}
			/>
			/
		</Wrapper>
	);
};

Default.storyName = 'Default';
