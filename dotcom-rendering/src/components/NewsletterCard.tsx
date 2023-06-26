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
import type { Newsletter } from '../types/content';
import { NewsletterDetail } from './NewsletterDetail';

export const BUTTON_ROLE = 'GroupedNewslettersList-sign-up-button';
export const BUTTON_SELECTED_CLASS =
	'js-GroupedNewslettersList-sign-up-button--selected';
export const ICON_PLUS_CLASS =
	'js-GroupedNewslettersList-sign-up-button__plus-icon';
export const ICON_TICK_CLASS =
	'js-GroupedNewslettersList-sign-up-button__tick-icon';

const groupItemStyle = css`
	position: relative;
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

const getButtonInitialAriaAttribute = (newsletterName: string) => ({
	'aria-label': `add ${newsletterName} to subscribe list`,
	'data-aria-label-when-unchecked': `add ${newsletterName} to subscribe list`,
	'data-aria-label-when-checked': `remove ${newsletterName} from subscribe list`,
});

export const NewsletterCard = ({ newsletter }: { newsletter: Newsletter }) => {
	return (
		<article
			key={newsletter.name}
			css={groupItemStyle}
			aria-label={newsletter.name}
		>
			<NewsletterDetail text={newsletter.frequency} />
			<h3>{newsletter.name}</h3>
			<p>{newsletter.description}</p>

			<div css={buttonHolderStyle}>
				<Button
					{...getButtonInitialAriaAttribute(newsletter.name)}
					priority="tertiary"
					size="xsmall"
					iconSide="left"
					icon={
						<>
							<span className={ICON_PLUS_CLASS}>
								<SvgPlus />
							</span>
							<span className={ICON_TICK_CLASS}>
								<SvgCheckmark />
							</span>
						</>
					}
					cssOverrides={buttonStyle}
					data-newsletter-id={newsletter.identityName}
					data-role={BUTTON_ROLE}
				>
					Sign up
				</Button>
			</div>
		</article>
	);
};
