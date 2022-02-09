import { useState, useEffect } from 'react';
import { css } from '@emotion/react';

import { joinUrl } from '@guardian/libs';
import { space, from } from '@guardian/source-foundations';
import { App as Comments } from '@guardian/discussion-rendering';
import { RightColumn } from './RightColumn';
import { AdSlot } from './AdSlot';

import { Flex } from './Flex';
import { SignedInAs } from './SignedInAs';
import { ContainerLayout } from './ContainerLayout';
import { Hide } from './Hide';
import { getCommentContext } from '../lib/getCommentContext';
import { useDiscussion } from '../lib/useDiscussion';
import { decidePalette } from '../lib/decidePalette';

export type Props = {
	format: ArticleFormat;
	discussionApiUrl: string;
	shortUrlId: string;
	discussionD2Uid: string;
	discussionApiClientHeader: string;
	enableDiscussionSwitch: boolean;
	isAdFreeUser: boolean;
	shouldHideAds: boolean;
	user?: UserProfile;
	expanded?: boolean;
};

const commentIdFromUrl = () => {
	if (typeof window === 'undefined') return;
	const { hash } = window.location;
	if (!hash) return;
	if (!hash.includes('comment')) return;
	if (!hash.split('-')[1]) return;
	return parseInt(hash.split('-')[1], 10);
};

export const Discussion = ({
	format,
	discussionApiUrl,
	shortUrlId,
	discussionD2Uid,
	discussionApiClientHeader,
	enableDiscussionSwitch,
	isAdFreeUser,
	shouldHideAds,
	user,
	expanded,
}: Props) => {
	const [commentPage, setCommentPage] = useState<number>();
	const [commentPageSize, setCommentPageSize] = useState<25 | 50 | 100>();
	const [commentOrderBy, setCommentOrderBy] = useState<
		'newest' | 'oldest' | 'recommendations'
	>();
	const [isExpanded, setIsExpanded] = useState<boolean>(!!expanded);
	const [hashCommentId, setHashCommentId] = useState<number | undefined>(
		commentIdFromUrl(),
	);

	const { commentCount, isClosedForComments } = useDiscussion(
		joinUrl(discussionApiUrl, 'discussion', shortUrlId),
	);

	const palette = decidePalette(format);

	const hasCommentsHash =
		typeof window !== 'undefined' &&
		window.location &&
		window.location.hash === '#comments';

	const handlePermalink = (commentId: number) => {
		if (typeof window === 'undefined') return false;
		window.location.hash = `#comment-${commentId}`;
		const comment = window.document.getElementById(`comment-${commentId}`);
		if (comment) {
			// The comment was already on the page so just scroll to it.
			comment.scrollIntoView();
		}
		setHashCommentId(commentId);
		return false;
	};

	const handleExpanded = (value: number): void => {
		const { ga } = window;

		if (!ga) {
			return;
		}

		ga('allEditorialPropertyTracker.send', 'event', {
			eventCategory: 'Performance',
			eventAction: 'DiscussionExpanded',
			eventValue: Math.round(value),
			nonInteraction: true,
		});
	};

	// Check the url to see if there is a comment hash, e.g. ...crisis#comment-139113120
	// If so, make a call to get the context of this comment so we know what page it is
	// on.
	useEffect(() => {
		if (hashCommentId) {
			getCommentContext(discussionApiUrl, hashCommentId)
				.then((context) => {
					setCommentPage(context.page);
					setCommentPageSize(context.pageSize);
					setCommentOrderBy(context.orderBy);
					setIsExpanded(true);
				})
				.catch((e) => console.error(`getCommentContext - error: ${e}`));
		}
	}, [discussionApiUrl, hashCommentId]);

	useEffect(() => {
		if (hasCommentsHash) {
			setIsExpanded(true);
		}
	}, [hasCommentsHash]);

	const hideAd = isAdFreeUser || shouldHideAds;

	return (
		<>
			<ContainerLayout
				padSides={false}
				padContent={false}
				// If we're not hiding an advert stretch to the right
				stretchRight={!hideAd}
				leftContent={
					// eslint-disable-next-line react/jsx-wrap-multilines
					<SignedInAs
						palette={palette}
						enableDiscussionSwitch={enableDiscussionSwitch}
						user={user}
						commentCount={commentCount}
						isClosedForComments={isClosedForComments}
					/>
				}
			>
				<Flex>
					<div
						css={css`
							${from.leftCol} {
								padding-left: 10px;
							}
							width: 100%;
							max-width: 100%;
						`}
						data-cy="discussion"
					>
						<Hide when="above" breakpoint="leftCol">
							<div
								css={css`
									padding-bottom: ${space[2]}px;
								`}
							>
								<SignedInAs
									palette={palette}
									enableDiscussionSwitch={
										enableDiscussionSwitch
									}
									user={user}
									commentCount={commentCount}
									isClosedForComments={isClosedForComments}
								/>
							</div>
						</Hide>
						<Comments
							user={user}
							baseUrl={discussionApiUrl}
							pillar={format.theme}
							initialPage={commentPage}
							pageSizeOverride={commentPageSize}
							isClosedForComments={
								isClosedForComments || !enableDiscussionSwitch
							}
							orderByOverride={commentOrderBy}
							shortUrl={shortUrlId}
							additionalHeaders={{
								'D2-X-UID': discussionD2Uid,
								'GU-Client': discussionApiClientHeader,
							}}
							expanded={isExpanded}
							commentToScrollTo={hashCommentId}
							onPermalinkClick={handlePermalink}
							apiKey="dotcom-rendering"
							onExpanded={(value) => {
								handleExpanded(value);
							}}
						/>
					</div>
					<>
						{!hideAd && (
							<RightColumn>
								<div
									css={css`
										position: static;
										height: 100%;
										padding-left: 20px;
									`}
								>
									<AdSlot
										position="comments"
										display={format.display}
									/>
								</div>
							</RightColumn>
						)}
					</>
				</Flex>
			</ContainerLayout>
		</>
	);
};
