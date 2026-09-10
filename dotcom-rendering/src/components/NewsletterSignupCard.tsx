import { css } from '@emotion/react';
import {
	from,
	headlineMedium20,
	space,
	textSans14,
	textSansBold15,
} from '@guardian/source/foundations';
import { SvgNewsletterFilled } from '@guardian/source/react-components';
import { palette as themePalette } from '../palette';

export type NewsletterSignupCardProps = {
	name: string;
	frequency: string;
	description: string;
	illustrationSquare?: string;
	children?: React.ReactNode;
	isSignedIn?: boolean | 'Pending';
	isModal?: boolean;
};

const containerStyles = css`
	clear: left;
	background-color: ${themePalette('--newsletter-card-background')};
	padding: ${space[3]}px ${space[3]}px ${space[4]}px ${space[3]}px;
`;

const dividerStyles = css`
	clear: left;
	border: none;
	border-top: 1px solid ${themePalette('--newsletter-card-divider')};
	margin: ${space[6]}px 0 ${space[2]}px;
`;

const headerStyles = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	gap: ${space[2]}px;
	margin-bottom: ${space[1]}px;
`;

const titleAndMetaStyles = css`
	display: flex;
	flex-direction: column;
`;

const titleStyles = css`
	${headlineMedium20};
	margin-bottom: ${space[1]}px;
	color: ${themePalette('--newsletter-card-title')};
`;

const frequencyTagStyles = css`
	display: flex;
	align-items: center;
	gap: 6px;
	color: ${themePalette('--newsletter-card-frequency-tag')};
	${textSansBold15};
	margin-bottom: ${space[2]}px;
`;

const frequencyTextStyles = css`
	display: flex;
	flex-wrap: wrap;
	column-gap: ${space[1]}px;
`;

const frequencyLabelStyles = css`
	white-space: nowrap;
`;

const badgeStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background-color: ${themePalette('--newsletter-card-badge-background')};

	svg {
		fill: ${themePalette('--newsletter-card-badge-icon')};
		height: 18px;
		width: 18px;
	}
`;

const innerDividerStyles = css`
	border: none;
	border-top: 1px solid ${themePalette('--newsletter-card-divider')};
	margin: 0 -${space[3]}px ${space[2]}px;
`;

const descriptionStyles = css`
	${textSans14};
	line-height: 1.15;
	clear: both;
	color: ${themePalette('--newsletter-card-description')};
`;

const illustrationStyles = css`
	flex-shrink: 0;
	width: 70px;
	height: 70px;
	border-radius: 50%;
	object-fit: cover;

	${from.mobileMedium} {
		width: 90px;
		height: 90px;
	}

	${from.tablet} {
		width: 100px;
		height: 100px;
	}
`;

const NewsletterSignupHeader = (
	props: Omit<NewsletterSignupCardProps, 'children'>,
) => (
	<>
		<div css={frequencyTagStyles}>
			<span css={badgeStyles}>
				<SvgNewsletterFilled />
			</span>
			<span css={frequencyTextStyles}>
				<span css={frequencyLabelStyles}>Free newsletter |</span>
				<span css={frequencyLabelStyles}>{props.frequency}</span>
			</span>
		</div>
		<hr css={innerDividerStyles} />
		<div css={headerStyles}>
			<div css={titleAndMetaStyles}>
				<p css={titleStyles}>
					Sign up to <span>{props.name}</span>
				</p>
				<p css={descriptionStyles}>{props.description}</p>
			</div>
			{!!props.illustrationSquare && (
				<img
					css={illustrationStyles}
					src={props.illustrationSquare}
					alt=""
					loading="lazy"
					decoding="async"
				/>
			)}
		</div>
	</>
);

export const NewsletterSignupCard = ({
	name,
	frequency,
	description,
	illustrationSquare,
	children,
	isSignedIn,
	isModal = false,
}: NewsletterSignupCardProps) => {
	const content = (
		<aside css={containerStyles} aria-label="newsletter promotion">
			<NewsletterSignupHeader
				frequency={frequency}
				name={name}
				description={description}
				illustrationSquare={illustrationSquare}
				isSignedIn={isSignedIn}
			/>
			{children}
		</aside>
	);

	return (
		<>
			{!isModal && <hr css={dividerStyles} />}
			{content}
		</>
	);
};
