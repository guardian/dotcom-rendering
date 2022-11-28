import { css } from '@emotion/react';
import { brandAlt, space } from '@guardian/source-foundations';
import { headline } from '@guardian/source-foundations/dist/cjs/typography/api';
import { LinkButton } from '@guardian/source-react-components';
import type { Newsletter } from '../../../../src/types/content';
import { EmailSignup } from '../EmailSignup';
import { Hide } from '../Hide';
import { NewsletterPrivacyMessage } from '../NewsletterPrivacyMessage';
import { Section } from '../Section';

export interface NewslettersListProps {
	newsletters: Newsletter[];
	headingText: string;
	mmaUrl?: string;
}

type GroupedNewsletters = { groupName: string; newsletters: Newsletter[] }[];

const putNewslettersInGroups = (
	newsletters: Newsletter[],
): GroupedNewsletters => {
	const groupedList: GroupedNewsletters = [];

	newsletters.forEach((newsletter) => {
		const { group: groupName } = newsletter;

		const existingGroup = groupedList.find(
			(grouping) => grouping.groupName === groupName,
		);

		if (existingGroup) {
			existingGroup.newsletters.push(newsletter);
		} else {
			groupedList.push({ groupName, newsletters: [newsletter] });
		}
	});

	return groupedList;
};

export const NewslettersList = ({
	newsletters,
	headingText,
	mmaUrl,
}: NewslettersListProps) => {
	const groupedNewsletters = putNewslettersInGroups(newsletters);

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

			{groupedNewsletters.map((group) => (
				<Section
					leftContent={
						<h2
							css={css`
								${headline.xxsmall()}
							`}
						>
							{group.groupName}({group.newsletters.length})
						</h2>
					}
					key={group.groupName}
				>
					<Hide when="above" breakpoint="leftCol" el="span">
						<h2
							css={css`
								${headline.xxsmall()}
							`}
						>
							{group.groupName}({group.newsletters.length})
						</h2>
					</Hide>
					{group.newsletters.map((newsletter) => (
						<EmailSignup
							{...newsletter}
							hidePrivacyMessage={true}
						/>
					))}
				</Section>
			))}
		</>
	);
};
