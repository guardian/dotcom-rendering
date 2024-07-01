import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { StickyLiveblogAsk } from './StickyLiveblogAskWrapper.importable';

export default {
	component: StickyLiveblogAsk,
	title: 'Components/Marketing/StickyLiveblogAsk',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			margin-left: ${space[5]}px;
			margin-top: ${space[6]}px;
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
		</Wrapper>
	);
};

Default.storyName = 'Default';
