import { css } from '@emotion/react';
import {
	from,
	headlineMedium20,
	space,
	textSans14,
	textSans15,
} from '@guardian/source/foundations';
import { SvgNewsletterFilled } from '@guardian/source/react-components';
import { palette as themePalette } from '../palette';

export type NewsletterSignupCardProps = {
	name: string;
	frequency: string;
	description: string;
	illustrationSquare?: string;
	children?: React.ReactNode;
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
	color: ${themePalette('--newsletter-card-frequency-tag')};
	${textSans15};
	margin-left: -1px;
	margin-top: -1px;
	margin-bottom: ${space[1]}px;

	svg {
		fill: currentColor;
		height: 20px;
		width: 20px;
	}
`;

const descriptionStyles = css`
	${textSans14};
	line-height: 1.15;
	margin-bottom: ${space[2]}px;
	clear: both;
	color: ${themePalette('--newsletter-card-description')};
`;

const illustrationStyles = css`
	flex-shrink: 0;
	width: 90px;
	height: 90px;
	border-radius: 50%;
	object-fit: cover;

	${from.tablet} {
		width: 100px;
		height: 100px;
	}
`;

const NewsletterSignupHeader = (props: {
	frequency: string;
	name: string;
	description: string;
	illustrationSquare?: string;
}) => (
	<div css={headerStyles}>
		<div css={titleAndMetaStyles}>
			<div css={frequencyTagStyles}>
				<SvgNewsletterFilled />
				Newsletter | {props.frequency}
			</div>
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
);

export const NewsletterSignupCard = ({
	name,
	frequency,
	description,
	illustrationSquare,
	children,
}: NewsletterSignupCardProps) => (
	<>
		<hr css={dividerStyles} />
		<aside css={containerStyles} aria-label="newsletter promotion">
			<NewsletterSignupHeader
				frequency={frequency}
				name={name}
				description={description}
				illustrationSquare={illustrationSquare}
			/>
			{children}
		</aside>
	</>
);
