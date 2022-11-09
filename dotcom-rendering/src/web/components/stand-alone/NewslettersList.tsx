import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations/dist/cjs/typography/api';
import { EmailSignup } from '../EmailSignup';
import { Section } from '../Section';

export interface NewslettersListProps {
	newsletters: Newsletter[];
}

export const NewslettersList = ({ newsletters }: NewslettersListProps) => (
	<main>
		<Section fullWidth={true}>
			<h1
				css={css`
					${headline.large()}
				`}
			>
				Email newsletters on the Guardian
			</h1>
		</Section>
		<Section>
			<p>We have {newsletters.length} of them </p>

			{newsletters.map((newsletter) => (
				<EmailSignup {...newsletter} />
			))}
		</Section>
	</main>
);
