import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { GutterAsk } from './gutterAsk';
import { props } from './utils/storybook';

const { variant, enrichedUrl, onCtaClick } = props;

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
				variant={variant}
				enrichedUrl={enrichedUrl}
				onCtaClick={onCtaClick}
			/>
		</Wrapper>
	);
};

Default.storyName = 'Default';
