import { css } from '@emotion/react';
import {
	brandAlt,
	headline,
	neutral,
	space,
} from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';
import type { EditionLinkType } from 'src/model/extract-nav';
import type { Newsletter } from '../../types/content';
import type { EditionId } from '../lib/edition';
import { getEditionFromId } from '../lib/edition';
import { Hide } from './Hide';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { Section } from './Section';

export interface NewslettersListProps {
	newsletters: Newsletter[];
	headingText: string;
	mmaUrl?: string;
	editionId: EditionId;
}

type GroupedNewsletters = { groupName: string; newsletters: Newsletter[] }[];

const putNewslettersInGroups = (
	newsletters: Newsletter[],
	edition?: EditionLinkType,
): GroupedNewsletters => {
	const groupedList: GroupedNewsletters = [];

	if (edition) {
		const regionalNewsletters = newsletters.filter(
			(newsletter) => newsletter.regionFocus === edition.editionId,
		);

		if (regionalNewsletters.length > 0) {
			groupedList.push({
				groupName: edition.longTitle,
				newsletters: regionalNewsletters,
			});
		}
	}

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

const cardStyle = css`
	display: inline-block;
	border: ${neutral[0]} 3px dashed;
	border-radius: 12px;
	margin-bottom: ${space[3]}px;
	padding: ${space[2]}px;
`;

/**
 * @description
 * This is a placeholder component to test the handleNewslettersPage method
 * on the dev server - not an approved / final design.
 */
export const NewslettersList = ({
	newsletters,
	headingText,
	mmaUrl,
	editionId,
}: NewslettersListProps) => {
	const edition = getEditionFromId(editionId);
	const groupedNewsletters = putNewslettersInGroups(newsletters, edition);

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
						<div css={cardStyle} key={newsletter.listId}>
							<h3>{newsletter.name}</h3>
							<p>{newsletter.description}</p>
						</div>
					))}
				</Section>
			))}
		</>
	);
};
