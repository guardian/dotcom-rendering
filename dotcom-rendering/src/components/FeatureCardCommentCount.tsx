import { css } from '@emotion/react';
import { Link } from '@guardian/source/react-components';
import { getZIndex } from '../lib/getZIndex';
import { DISCUSSION_ID_DATA_ATTRIBUTE } from '../lib/useCommentCount';
import { palette } from '../palette';
import { CardCommentCount } from './CardCommentCount.importable';
import { Island } from './Island';

type Props = {
	linkTo: string;
	discussionId: string;
	discussionApiUrl: string;
};

export const FeatureCardCommentCount = ({
	linkTo,
	discussionId,
	discussionApiUrl,
}: Props) => {
	return (
		<Link
			{...{
				[DISCUSSION_ID_DATA_ATTRIBUTE]: discussionId,
			}}
			data-ignore="global-link-styling"
			data-link-name="Comment count"
			href={`${linkTo}#comments`}
			cssOverrides={css`
				/* See: https://css-tricks.com/nested-links/ */
				z-index: ${getZIndex('card-nested-link')};
				/* The following styles turn off those provided by Link */
				color: inherit;
				/* stylelint-disable-next-line property-disallowed-list */
				font-family: inherit;
				font-size: inherit;
				line-height: inherit;
				text-decoration: none;
				min-height: 10px;
			`}
		>
			<Island priority="feature" defer={{ until: 'visible' }}>
				<CardCommentCount
					discussionApiUrl={discussionApiUrl}
					discussionId={discussionId}
					colour={palette('--feature-card-footer-text')}
				/>
			</Island>
		</Link>
	);
};
