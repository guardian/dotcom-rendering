import { css } from '@emotion/react';
import {
	headlineObjectStyles,
	palette,
	space,
} from '@guardian/source-foundations';
import {
	Button,
	SvgCheckmark,
	SvgPlus,
} from '@guardian/source-react-components';
import type { GroupedNewsletters } from '../types/newslettersPage';
import { NewsletterDetail } from './NewsletterDetail';
import { Section } from './Section';

interface Props {
	groupedNewsletters: GroupedNewsletters;
}

export const BUTTON_ROLE = 'GroupedNewslettersList-sign-up-button';
export const BUTTON_SELECTED_CLASS =
	'js-GroupedNewslettersList-sign-up-button--selected';
const ICON_PLUS_CLASS = 'js-GroupedNewslettersList-sign-up-button__plus-icon';
const ICON_TICK_CLASS = 'js-GroupedNewslettersList-sign-up-button__tick-icon';

const groupContainerStyle = css`
	display: flex;
	flex-wrap: wrap;
`;

const groupItemStyle = css`
	display: flex;
	flex-direction: column;
	flex-basis: 200px;
	margin-right: ${space[3]}px;
	margin-bottom: ${space[3]}px;
	padding: ${space[1]}px;
	padding-bottom: ${space[2]}px;
	min-height: 215px;
	background-color: ${palette.neutral[97]};

	h3 {
		${headlineObjectStyles.xxxsmall()};
		margin-bottom: ${space[3]}px;
	}
`;

const buttonHolderStyle = css`
	margin-top: auto;
`;

const buttonStyle = css`
	background-color: ${palette.neutral[100]};
	color: ${palette.neutral[7]};
	border-color: ${palette.neutral[7]};
	.${ICON_TICK_CLASS} {
		display: none;
	}

	&.${BUTTON_SELECTED_CLASS} {
		background-color: ${palette.neutral[7]};
		color: ${palette.neutral[100]};

		.${ICON_PLUS_CLASS} {
			display: none;
		}
		.${ICON_TICK_CLASS} {
			display: inline;
		}
	}

	&:hover {
		background-color: ${palette.neutral[86]};
	}

	&.${BUTTON_SELECTED_CLASS}:hover {
		background-color: ${palette.neutral[46]};
		border-color: ${palette.neutral[46]};
	}
`;

export const GroupedNewslettersList = ({ groupedNewsletters }: Props) => {
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

									<div css={buttonHolderStyle}>
										<Button
											priority="tertiary"
											size="xsmall"
											iconSide="left"
											icon={
												<>
													<span
														className={
															ICON_PLUS_CLASS
														}
													>
														<SvgPlus />
													</span>
													<span
														className={
															ICON_TICK_CLASS
														}
													>
														<SvgCheckmark />
													</span>
												</>
											}
											cssOverrides={buttonStyle}
											data-newsletter-id={
												newsletter.identityName
											}
											data-role={BUTTON_ROLE}
										>
											Sign up
										</Button>
									</div>
								</div>
							);
						})}
					</div>
				</Section>
			))}
		</>
	);
};
