import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';
import type { EditionId } from '../lib/edition';
import { getEditionFromId } from '../lib/edition';
import { Section } from './Section';

export interface NewslettersListProps {
	headingText: string;
	mmaUrl?: string;
	editionId: EditionId;
}

export const NewslettersPageHeading = ({
	headingText,
	mmaUrl,
	editionId,
}: NewslettersListProps) => {
	const edition = getEditionFromId(editionId);

	return (
		<Section fullWidth={true} element="header" padBottom={true}>
			<h1
				css={css`
					${headline.medium()}
				`}
			>
				{headingText}
			</h1>
			<div
				css={css`
					${headline.xxsmall()}
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
	);
};
