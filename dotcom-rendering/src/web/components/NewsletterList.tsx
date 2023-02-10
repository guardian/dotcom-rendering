import { css } from '@emotion/react';
import { brandAlt, headline, space } from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';
import type { Newsletter } from '../../types/content';
import type { EditionId } from '../lib/edition';
import { getEditionFromId } from '../lib/edition';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { Section } from './Section';

export interface NewslettersListProps {
	newsletters: Newsletter[];
	headingText: string;
	mmaUrl?: string;
	editionId: EditionId;
}

export const NewslettersList = ({
	newsletters,
	headingText,
	mmaUrl,
	editionId,
}: NewslettersListProps) => {
	const edition = getEditionFromId(editionId);

	return (
		<>
			<Section fullWidth={true} element="header" padBottom={true}>
				<h1
					css={css`
						${headline.large()}
					`}
				>
					{headingText}
				</h1>
				<div
					css={css`
						${headline.small()}
					`}
				>
					{edition.longTitle}
				</div>

				{!!mmaUrl && (
					<LinkButton href={`${mmaUrl}/email-prefs`} size={'small'}>
						Manage my newsletters
					</LinkButton>
				)}
			</Section>

			<Section fullWidth={true} padBottom={true}>
				<div
					css={css`
						background-color: ${brandAlt[400]};
						padding: ${space[2]}px ${space[4]}px;
					`}
				>
					<NewsletterPrivacyMessage />
				</div>
			</Section>

			<Section fullWidth={true} padBottom={true}>
				{newsletters.map((newsletter) => {
					return <p key={newsletter.name}>{newsletter.name}</p>;
				})}
			</Section>
		</>
	);
};
