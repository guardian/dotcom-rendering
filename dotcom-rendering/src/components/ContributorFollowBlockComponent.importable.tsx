import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	space,
	textEgyptian14,
} from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import sanitise from 'sanitize-html';
import { palette } from '../palette';
import { Avatar } from './Avatar';
import { ContributorFollowBlock } from './ContributorFollowBlock.importable';
import { Island } from './Island';

type Props = {
	contributorId: string;
	displayName: string;
	avatarUrl?: string;
	bio?: string;
};

const contributorBlockStyles = css`
	display: flex;
	flex-direction: column;
	padding: ${space[2]}px ${space[2]}px ${space[2]}px 0;
`;

const topRowStyles = css`
	display: flex;
	gap: ${space[3]}px;
	margin: ${space[2]}px ${space[3]}px ${space[4]}px 0;
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

const nameAndBioStyles = css`
	display: flex;
	flex-direction: column;
	flex: 1;
	min-width: 0;
`;

const titleStyles = css`
	${headlineBold17};
	color: ${palette('--contributor-follow-accent-color')};
	margin: 0 0 ${space[2]}px;
`;

const bioStyles = css`
	${textEgyptian14};
	font-weight: 500;
	color: ${palette('--contributor-follow-bio-text')};
	margin: 0;
`;

const followButtonContainerStyles = css`
	display: flex;
	margin-bottom: ${space[4]}px;
`;

const containsText = (html: string) => {
	const htmlWithoutTags = sanitise(html, {
		allowedTags: [],
		allowedAttributes: {},
	});
	return htmlWithoutTags.length > 0;
};

export const ContributorFollowBlockComponent = ({
	contributorId,
	displayName,
	avatarUrl,
	bio,
}: Props) => {
	const hasBio = bio !== undefined && containsText(bio);
	const sanitizedBio = hasBio ? sanitise(bio, {}) : undefined;

	return (
		<div css={contributorBlockStyles}>
			<StraightLines
				count={4}
				color={palette('--contributor-follow-straight-lines')}
			/>
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
				<div css={nameAndBioStyles}>
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
				<Island priority="feature" defer={{ until: 'visible' }}>
					<ContributorFollowBlock
						contributorId={contributorId}
						displayName={displayName}
					/>
				</Island>
			</div>
			<StraightLines
				count={1}
				color={palette('--contributor-follow-straight-lines')}
			/>
		</div>
	);
};
