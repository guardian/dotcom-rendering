import { css } from '@emotion/react';
import {
	from,
	headline,
	neutral,
	space,
	sport,
	textSans,
} from '@guardian/source-foundations';
import { NewsletterFrequency } from './NewsletterFrequency';
import { SecureSignup } from './SecureSignup';

type Props = {
	newsletter: Newsletter;
	previousFloatingElementType?: FloatingElementRole;
};

// 'supporting' elements float left on desktop and hangs over
// the border between the left column and the main column so
// the text will wrap round them.
//
// To stop the container of this element wrapping round a 'supporting'
// block, it should have clear:both from leftCol, so the signUp block
// is always clear

// CORRECT (leftCol layout with clear:both):
//     |  ttttttttttt
//     |  ttttttttttt
//     |  tttttttt
//  sssssssss
//  sssssssss
//  sssssssss
//     |  +---------+
//     |  | SIGN-UP |
//     |  +---------+
//     |  ttttttttttt
//     |  ttttttttttt

// WRONG (leftCol layout with clear:none):
//     |  ttttttttttt
//     |  ttttttttttt
//     |  tttttttt
//  sssssssss
//  sssssssss-------+
//  sssssssssSIGN   |
//     |  | -UP     |
//     |  +---------+
//     |  ttttttttttt
//     |  ttttttttttt

// the other floating element, 'thumbnail' and 'richlink'
// stay in the left coloumn, so this element should be
// clear: none if preceeded by them:

// WRONG (leftCol layout with clear:both):
//     |  ttttttttttt
//     |  tttttttt
//  rrr|
//  rrr|
//  rrr|
//  rrr|
//     |  +---------+
//     |  | SIGN-UP |
//     |  +---------+
//     |  ttttttttttt
//     |  ttttttttttt

// CORRECT (leftCol layout with clear:none):
//     |  ttttttttttt
//     |  tttttttt
//  rrr|
//  rrr|  +---------+
//  rrr|  | SIGN-UP |
//  rrr|  +---------+
//     |  ttttttttttt
//     |  ttttttttttt

const containerStyles = (
	previousFloatingElementType?: FloatingElementRole,
) => css`
	clear: both;
	border: ${neutral[0]} 3px dashed;
	border-radius: 12px;
	margin-bottom: ${space[3]}px;
	padding: ${space[2]}px;

	${from.tablet} {
		padding: ${space[2]}px ${space[3]}px;
	}

	${from.leftCol} {
		clear: ${previousFloatingElementType === 'supporting'
			? 'both'
			: 'none'};
	}
`;

const stackBelowTabletStyles = css`
	display: flex;
	flex-direction: column;
	margin-bottom: ${space[2]}px;

	${from.tablet} {
		flex-direction: row;
		margin-bottom: ${space[1]}px;
	}
`;

const titleStyles = (theme: string) => css`
	${headline.xsmall({ fontWeight: 'bold' })}
	flex-grow: 1;
	span {
		color: ${theme === 'news' ? sport[500] : 'inherit'};
	}
`;

const descriptionStyles = css`
	${textSans.medium({ lineHeight: 'tight' })}
	margin-bottom: ${space[2]}px;
`;

export const EmailSignup = ({
	newsletter,
	previousFloatingElementType,
}: Props) => {
	const {
		identityName,
		name,
		description,
		frequency,
		successDescription,
		theme,
	} = newsletter;

	return (
		<aside css={containerStyles(previousFloatingElementType)}>
			<div css={stackBelowTabletStyles}>
				<p css={titleStyles(theme)}>
					Sign up to <span>{name}</span> today
				</p>
				<NewsletterFrequency frequency={frequency} />
			</div>
			<p css={descriptionStyles}>{description}</p>
			<SecureSignup
				newsletterId={identityName}
				successDescription={successDescription}
			/>
		</aside>
	);
};
