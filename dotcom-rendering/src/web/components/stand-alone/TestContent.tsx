import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations/dist/cjs/typography/api';
import { Section } from '../Section';

export interface TestContentProps {
	message: string;
}

export const TestContent = ({ message }: TestContentProps) => (
	<main>
		<Section>
			<h1
				css={css`
					${headline.medium()}
				`}
			>
				This is a test page Component
			</h1>
			<p>Message: {message}</p>
		</Section>
	</main>
);
