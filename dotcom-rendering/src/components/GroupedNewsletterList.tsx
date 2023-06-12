import { css } from '@emotion/react';
import {
	headlineObjectStyles,
	palette,
	space,
} from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import type { GroupedNewsletters } from '../types/newslettersPage';
import { NewsletterDetail } from './NewsletterDetail';
import { Section } from './Section';

export interface NewslettersListProps {
	groupedNewsletters: GroupedNewsletters;
}

const groupContainerStyle = css`
	display: flex;
	flex-wrap: wrap;
`;

const groupItemStyle = css`
	flex-basis: ${200}px;
	margin-right: ${space[3]}px;
	margin-bottom: ${space[3]}px;
	padding: ${space[1] / 2}px;
	min-height: ${215}px;
	background-color: ${palette.neutral[97]};

	h3 {
		${headlineObjectStyles.xxxsmall()};
		margin-bottom: ${space[3]}px;
	}
`;

export const GroupedNewslettersList = ({
	groupedNewsletters,
}: NewslettersListProps) => {
	return (
		<>
			{groupedNewsletters.groups.map((group) => (
				<Section title={group.title} padBottom={true} key={group.title}>
					<div css={groupContainerStyle}>
						{group.newsletters.map((newsletter) => {
							return (
								<div key={newsletter.name} css={groupItemStyle}>
									<NewsletterDetail
										text={newsletter.frequency}
									/>
									<h3>{newsletter.name}</h3>
									<p>{newsletter.description}</p>
									<Button
										data-newsletter-id={
											newsletter.identityName
										}
										data-role="GroupedNewslettersList-sign-up-button"
										size="small"
									>
										sign-up
									</Button>
								</div>
							);
						})}
					</div>
				</Section>
			))}
		</>
	);
};
