import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	space,
	textEgyptian14,
} from '@guardian/source/foundations';
import sanitise from 'sanitize-html';
import { palette } from '../palette';
import { Avatar } from './Avatar';
import { FollowWrapper } from './FollowWrapper.importable';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';

type Props = {
	id: string;
	displayName: string;
	avatarUrl?: string;
	bio?: string;
};

const containerStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
	padding: ${space[2]}px 0;
`;

const topRowStyles = css`
	display: flex;
	flex-direction: row;
	gap: ${space[3]}px;
`;

const avatarContainerStyles = css`
	width: 60px;
	height: 60px;
	flex-shrink: 0;

	${from.tablet} {
		width: 80px;
		height: 80px;
	}
`;

const contentStyles = css`
	display: flex;
	flex-direction: column;
	flex: 1;
	min-width: 0;
`;

const titleStyles = css`
	${headlineBold17};
	color: ${palette('--follow-accent-color')};
	margin: 0 0 ${space[1]}px;
`;

const bioStyles = css`
	${textEgyptian14};
	font-weight: 500;
	line-height: 1.3;
	color: ${palette('--follow-bio-text')};
	margin: 0;

	p {
		margin: 0 0 ${space[1]}px;
	}

	a {
		color: ${palette('--link-kicker-text')};
		text-underline-offset: 3px;
	}

	a:not(:hover) {
		text-decoration-color: ${palette('--bio-link-underline')};
	}

	a:hover {
		text-decoration: underline;
	}
`;

const followButtonContainerStyles = css`
	display: flex;
`;

const containsText = (html: string) => {
	const htmlWithoutTags = sanitise(html, {
		allowedTags: [],
		allowedAttributes: {},
	});
	return htmlWithoutTags.length > 0;
};

export const FollowContributorProfile = ({
	id,
	displayName,
	avatarUrl,
	bio,
}: Props) => {
	const hasBio = bio && containsText(bio);
	const sanitizedBio = hasBio ? sanitise(bio, {}) : undefined;

	return (
		<div css={containerStyles}>
			<div css={topRowStyles}>
				{!!avatarUrl && (
					<div css={avatarContainerStyles}>
						<Avatar
							src={avatarUrl}
							alt={displayName}
							shape="round"
							imageSize="small"
						/>
					</div>
				)}
				<div css={contentStyles}>
					<h3 css={titleStyles}>{displayName}</h3>
					{!!sanitizedBio && (
						<div
							css={bioStyles}
							dangerouslySetInnerHTML={{ __html: sanitizedBio }}
						/>
					)}
				</div>
			</div>
			<div css={followButtonContainerStyles}>
				<FollowWrapper
					id={id}
					displayName={displayName}
					variant="pill"
				/>
			</div>
			<StraightLines count={1} />
		</div>
	);
};
