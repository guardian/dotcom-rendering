import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { GutterAsk } from './gutterAsk';

export default {
	component: GutterAsk,
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
			<GutterAsk
				url="https://www.theguardian.com/uk"
				onCtaClick={() => {}}
			/>
		</Wrapper>
	);
};

Default.storyName = 'Default';
